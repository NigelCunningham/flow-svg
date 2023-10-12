/*global SVG, console, window, document, jQuery*/

var flowSVG = (function () {
    "use strict";
    var draw, lowerConnector, shapeFuncs, i, config, userOpts = {}, shapes, interactive = true, chartGroup, layoutShapes, itemIds = {}, indexFromId = {}, startEl, startId, lookup = {}, isPositioned = [], toggleNext, clicked = [], showButtons = true, scrollto = true, scrollOffset;
    var lowest = 0, lowestElement = 0, orphanX = 0, orphanY = 0;
