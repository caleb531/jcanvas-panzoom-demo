# jCanvas Panzoom Demo

This project is my work-in-progress attempt at implementing a pannable, zoomable
canvas with jCanvas. I need your help to finish it.

## Requirements

There are four cases that must all work correctly in order for this
implementation to be considered valid:

1. **Pan**: User must be able to pan the canvas several times without jumps or
accelerated movement

2. **Zoom**: User must be able to zoom the canvas around the clicked point to at
least 3x (two clicks); the clicked region must remain under the user's cursor
(more or less, because of increased precision)

3. **Pan and zoom**: User must be able to *Pan* canvas after *Zoom* 

4. **Zoom and pan**: User must be able to *Zoom* canvas after *Pan*

The first three cases are functioning properly, however the last case is failing
to keep the clicked point on the cursor when zooming (at least after zooming
more than once).

## Your Mission

**Your task is to fix this fourth case without breaking the other three cases.**
See the *TODO* towards the end of `main.js` for details; I believe the correct solution will involve properly modifying `translateX` and `translateY`.

## Setup

Run `npm install` to install project dependencies, then open `index.html` in a web
browser to test the application.
