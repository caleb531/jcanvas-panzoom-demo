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

function applyTransformations() {

	// Create a layer for translatening the canvas
	$canvas.scaleCanvas({
		layer: true,
		name: 'scale',
		scale: scale
	});
	$canvas.translateCanvas({
		layer: true,
		name: 'translate',
		translateX: translateX,
		translateY: translateY
	});

}

function drawGrid() {

	for (var x = 0; x < (canvasWidth / nearestAmount); x += 1) {
		for (var y = 0; y < (canvasHeight / nearestAmount); y += 1) {
			if ((x + y) % 2 === 0) {
				$canvas.drawRect({
					layer: true,
					fillStyle: '#eee',
					x: x * nearestAmount,
					y: y * nearestAmount,
					width: nearestAmount, height: nearestAmount,
					fromCenter: false
				});
			}
		}
	}

}

function drawShapes() {

	$canvas.drawRect({
		layer: true,
		opacity: 0.5,
		fillStyle: '#36c',
		x: 0, y: 200,
		width: shapeSize, height: shapeSize
	});
	$canvas.drawRect({
		layer: true,
		opacity: 0.5,
		fillStyle: '#6c3',
		x: 200, y: 200,
		width: shapeSize, height: shapeSize
	});
	$canvas.drawRect({
		layer: true,
		opacity: 0.5,
		fillStyle: '#c33',
		x: 400, y: 200,
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
		startX = (event.offsetX / scale) - translateX;
		startY = (event.offsetY / scale) - translateY;
		isPanning = false;
		isMousedown = true;
	});
	$canvas.on('mousemove', function (event) {
		if (isMousedown) {
			isPanning = true;
			translateX = (event.offsetX / scale) - startX;
			translateY = (event.offsetY / scale) - startY;
			$canvas.setLayer('translate', {
				translateX: translateX,
				translateY: translateY
			});
			$canvas.drawLayers();
		}
	});

	var translateIndex = 0;
	$canvas.on('mouseup', function (event) {
		isMousedown = false;
		if (!isPanning) {
			var oldScale = scale;
			var newScale = oldScale + 1;
			scale = newScale;

			translateX += (event.offsetX / newScale) - (event.offsetX / oldScale);
			translateY += (event.offsetY / newScale) - (event.offsetY / oldScale);

			$canvas.setLayer('scale', {
				scale: scale
			});
			$canvas.setLayer('translate', {
				translateX: translateX,
				translateY: translateY
			});
			$canvas.drawLayers();
		}
	});

}

addEventBindings();
draw();

});
}(jQuery));
