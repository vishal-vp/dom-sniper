import $ from 'jquery';
import invert from 'invert-color';
import Color from 'color';

let previousElement, previousBackground, previousCursor;
let bodyColor = $('body').css('backgroundColor');
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

function elementClickListener(event) {
  event.preventDefault();
  // Delete the clicked element.
  $(this).css('display', 'none');
  return false;
}

// Setup communication between with background script.
var myPort = browser.runtime.connect({name:"port-from-cs"});
myPort.postMessage({greeting: "hello from content script"});

myPort.onMessage.addListener(function(message) {
  if (message.isActivated) {
    $('*').on('mousemove', mouseMoveListener);
    $('*').on('click', elementClickListener);
  } else {
    $('*').off('mousemove', mouseMoveListener);
    $('*').off('click', elementClickListener);
    if (previousElement) {
      // Restore previous element appearance.
      previousElement.css('backgroundColor', previousBackground)
                     .css('cursor', previousCursor);
      previousElement = previousBackground = previousCursor = null;
    }
  }
});
