import $ from 'jquery';
import invert from 'invert-color';
import Color from 'color';

const highlightColor = '#00ff00';
let previousElement, previousBackground, previousCursor;
let isActivated = false;

function mouseMoveListener(event) {
  // Get the current element.
  const element = $(event.target);
  if (element.is(previousElement)) {
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
  $(this).css('display', 'none');
  return false;
}

function deactivateKeyPressListener(event) {
  // Deactivate extension when esc key is pressed.
  if (event.keyCode === 27) {
    myPort.postMessage({'action': 'deactivate'});
    unbindEvents();
  }
}

function bindEvents() {
  $('*').on('mousemove', mouseMoveListener);
  $('*').on('click', elementClickListener);
  $(document).on('keyup', deactivateKeyPressListener);
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
