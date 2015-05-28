function CanvasObjectFactory() {}

CanvasObjectFactory.prototype.getBoxObject = function(x, y, width, height, fillStyle, fillStroke) {
	return new BoxObject().initialize(x, y, 0, width, height, fillStyle, fillStroke);
}

CanvasObjectFactory.prototype.getCircleObject = function(x, y, radius, fillStyle, fillStroke) {
	return new CircleObject().initialize(x, y, 0, radius, fillStyle, fillStroke);
}

CanvasObjectFactory.prototype.getPolygonObject = function(x, y, points, fillStyle, fillStroke) {
	return new PolygonObject().initialize(x, y, 0, radius, null, fillStyle, fillStroke);	
}