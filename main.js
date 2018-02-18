(function ($) {
$(document).ready(function () {

var $canvas = $('#canvas');
var $cursorCoords = $('#cursor-coords');

var canvasWidth = $canvas.width();
var canvasHeight = $canvas.height();

var translateX = 0;
var translateY = 0;
var scale = 1;

var startX;
var startY;
var isMousedown;
var isPanning;
var shapeSize = 100;
var nearestAmount = shapeSize / 4;

function nearest(value, roundAmount) {
	return Math.round(value / roundAmount) * roundAmount;
}

function updateCoords(event) {
	$cursorCoords.text([
		'(~',
		nearest(event.offsetX, 1),
		', ~',
		nearest(event.offsetY, 1),
		')'
	].join(''));
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

	for (var x = 0; x < (canvasWidth / nearestAmount); x += 1) {
		for (var y = 0; y < (canvasHeight / nearestAmount); y += 1) {
			$canvas.drawRect({
				layer: true,
				fillStyle: (x + y) % 2 === 0 ? '#eee' : '#fff',
				x: x * nearestAmount,
				y: y * nearestAmount,
				width: nearestAmount, height: nearestAmount,
				fromCenter: false
			});
		}
	}

}

function drawShapes() {

	$canvas.drawRect({
		layer: true,
		fillStyle: '#36c',
		x: 0, y: 100,
		width: shapeSize, height: shapeSize
	});
	$canvas.drawRect({
		layer: true,
		fillStyle: '#6c3',
		x: 200, y: 100,
		width: shapeSize, height: shapeSize
	});
	$canvas.drawRect({
		layer: true,
		fillStyle: '#c33',
		x: 400, y: 100,
		width: shapeSize, height: shapeSize
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
			var oldScale = scale;
			scale += 1;
			var scaleChange = scale / oldScale;

			// TODO: Figure out this math
			translateX = (event.offsetX / scale) - event.offsetX;
			translateY = (event.offsetY / scale) - event.offsetY;

			$canvas.setLayer('scale', {
				scale: scale
			});
			$canvas.setLayer('translate', {
				translateX: translateX,
				translateY: translateY
			});
			$canvas.drawLayers();
			updateCoords(event);
		}
	});

}

addEventBindings();
draw();

});
}(jQuery));
