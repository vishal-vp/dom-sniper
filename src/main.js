import browser from 'webextension-polyfill';
import $ from 'jquery';
import * as constants from './constants';

let previousElement;
let previousBackground;
let previousCursor;
const hiddenElements = [];

// Setup communication between with background script.
const myPort = browser.runtime.connect();

/**
 * Hide target element.
 */
function hideTarget() {
  let element = $(this);
  if (element.is('html')) {
    // Do not hide html DOM element else events (undo) won't work.
    element = $('body');
  }
  const display = element.css('display');
  element.css('display', 'none');
  hiddenElements.push({
    element: $(this),
    display,
  });
  return false;
}

/**
 * Highlight the element on hover.
 */
function highlightTarget(event) {
  // Get the current element.
  const element = $(event.target);
  if (element.is(previousElement) || element.is('html')) {
    // Ignore if element has not changed.
    return;
  }
  if (previousElement) {
    // Restore previous element appearance.
    previousElement.css('backgroundColor', previousBackground).css('cursor', previousCursor);
  }
  // Change background and cursor.
  const background = element.css('backgroundColor');
  const cursor = element.css('cursor');
  element.css('backgroundColor', 'green');
  element.css('cursor', 'crosshair');
  previousElement = element;
  previousBackground = background;
  previousCursor = cursor;
}

/**
 * Activate extension. Bind event listeners.
 */
function bindEvents() {
  $('*').on('mousemove', highlightTarget);
  $('*').on('click', hideTarget);
}

/**
 * Deactivate extension. Unbind all events listeners.
 */
function unbindEvents() {
  $('*').off('mousemove', highlightTarget);
  $('*').off('click', hideTarget);
  if (previousElement) {
    // Restore previous element appearance.
    previousElement.css('backgroundColor', previousBackground).css('cursor', previousCursor);
    previousElement = null;
    previousBackground = null;
    previousCursor = null;
  }
}

/**
 * Handle undo and deactivate key presses.
 */
function keyPressListener(event) {
  // Ignore IME Composition.
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  if (event.keyCode === 27) {
    // Escape key is pressed. Deactivate extension.
    myPort.postMessage({ action: constants.browserActions.DEACTIVATE });
    unbindEvents();
  } else if (event.keyCode === 90) {
    // Ctrl + z is pressed. Unhide last hidden element.
    const lastDOMObject = hiddenElements.pop();
    if (lastDOMObject) {
      lastDOMObject.element.css('display', lastDOMObject.display);
    }
  }
}

// Handle click events from extension toolbar icon.
myPort.onMessage.addListener((message) => {
  if (message.isActivated) {
    bindEvents();
  } else {
    unbindEvents();
  }
});

// Bind one time keypress events.
$('html').on('keyup', keyPressListener);
