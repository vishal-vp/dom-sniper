import $ from 'jquery';
import invert from 'invert-color';
import Color from 'color';

let previousElement, previousBackground, previousCursor;
let bodyColor = $('body').css('backgroundColor');

$('*').mousemove(function(event) {
  // Get the current element.
  const element = $(event.target);
  if (element === previousElement) {
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
});

$('*').click(function(event) {
  event.preventDefault();
  // Delete the clicked element.
  $(this).remove();
  return false;
});
