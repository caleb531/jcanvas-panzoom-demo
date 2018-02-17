(function ($) {
$(document).ready(function () {

var $canvas = $('#canvas');
var $cursorCoords = $('#cursor-coords');

// Initial variables
var translateX = 0;
var translateY = 0;
var scale = 1;

var startX;
var startY;
var isMousedown;
var isPanning;
var nearestAmount = 10;

function nearest(value, roundAmount) {
	return Math.round(value / roundAmount) * roundAmount;
}

function updateCoords(event) {
	$cursorCoords.text('(~' + nearest(event.offsetX, nearestAmount) + ', ~' + nearest(event.offsetY, nearestAmount) + ')');
}

function applyTransformations() {

	// Create a layer for translatening the canvas
	$canvas.scaleCanvas({
		layer: true,
		name: 'scale',
		scale: scale
	});
	$canvas.translateCanvas({
		layer: true,
		name: 'translate'
	});

}

function drawGrid() {

	// TODO: write this

}

function drawShapes() {

	$canvas.drawRect({
		layer: true,
		fillStyle: '#36c',
		x: 0, y: 100,
		width: 100, height: 100
	});
	$canvas.drawRect({
		layer: true,
		fillStyle: '#6c3',
		x: 200, y: 100,
		width: 100, height: 100
	});
	$canvas.drawRect({
		layer: true,
		fillStyle: '#c33',
		x: 400, y: 100,
		width: 100, height: 100
	});

}

function restoreTransformations() {

	// This is essential for restoring translate on each draw
	$canvas.restoreCanvas({
		layer: true,
		name: 'restore',
		count: 2
	});

}

function draw() {

	applyTransformations();
	drawGrid();
	drawShapes();
	restoreTransformations();

}

function addEventBindings() {

	// Add translatening behavior to canvas
	$canvas.on('mousedown', function (event) {
		startX = event.offsetX - (translateX * scale);
		startY = event.offsetY - (translateY * scale);
		isPanning = false;
		isMousedown = true;
	});
	$canvas.on('mousemove', function (event) {
		updateCoords(event);
		if (isMousedown) {
			isPanning = true;
			translateX = (event.offsetX - startX) / scale;
			translateY = (event.offsetY - startY) / scale;
			$canvas.setLayer('translate', {
				translateX: translateX,
				translateY: translateY
			});
			$canvas.drawLayers();
		}
	});
	$canvas.on('mouseup', function (event) {
		isMousedown = false;
		if (!isPanning) {
			scale += 1;
			var scaleChange = scale / (scale - 1);
			// translateX -= event.offsetX / scaleChange;
			// translateY -= event.offsetY / scaleChange;
			$canvas.setLayer('scale', {
				scale: scale
			});
			// $canvas.setLayer('translate', {
			// 	translateX: translateX,
			// 	translateY: translateY
			// });
			$canvas.drawLayers();
		}
	});

}

addEventBindings();
draw();

});
}(jQuery));
