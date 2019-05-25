import browser from "webextension-polyfill";
import $ from 'jquery';
import invert from 'invert-color';
import Color from 'color';

const highlightColor = '#00ff00';
let previousElement, previousBackground, previousCursor;
let isActivated = false;
let hiddenElements = [];

// Bind one time keypress events.
$('html').on('keyup', keyPressListener);

function mouseMoveListener(event) {
  // Get the current element.
  const element = $(event.target);
  if (element.is(previousElement) || element.is('html')) {
    // Ignore if element has not changed.
    return;
  }
  if (previousElement) {
    // Restore previous element appearance.
    previousElement.css('backgroundColor', previousBackground)
                   .css('cursor', previousCursor);
  }
  // Change background and cursor.
  const background = element.css('backgroundColor');
  const cursor = element.css('cursor');
  element.css('backgroundColor', 'green');
  element.css('cursor', 'crosshair');
  previousElement = element;
  previousBackground = background;
  previousCursor = cursor;
  return false;
}

function elementClickListener() {
  // Delete the clicked element.
  let element = $(this);
  if (element.is('html')) {
    // Do not hide html DOM element else events (undo) won't work.
    element = $('body');
  }
  const display = element.css('display');
  element.css('display', 'none');
  hiddenElements.push({
    element: $(this),
    display: display
  })
  return false;
}

function keyPressListener(event) {
  // Ignore IME Composition.
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  // Deactivate extension when esc key is pressed.
  if (event.keyCode === 27) {
    myPort.postMessage({'action': 'deactivate'});
    unbindEvents();
  } else if (event.keyCode === 90) {
    // Unhide hidden element.
    const lastDOMObject = hiddenElements.pop();
    if (lastDOMObject) {
      lastDOMObject.element.css('display', lastDOMObject.display);
    }
  }
  return false;
}

function bindEvents() {
  $('*').on('mousemove', mouseMoveListener);
  $('*').on('click', elementClickListener);
}

function unbindEvents() {
  $('*').off('mousemove', mouseMoveListener);
  $('*').off('click', elementClickListener);
  if (previousElement) {
    // Restore previous element appearance.
    previousElement.css('backgroundColor', previousBackground)
                   .css('cursor', previousCursor);
    previousElement = previousBackground = previousCursor = null;
  }
}

// Setup communication between with background script.
const myPort = browser.runtime.connect();

myPort.onMessage.addListener(function(message) {
  if (message.isActivated) {
    bindEvents();
  } else {
    unbindEvents();
  }
});
