function ThreeJSObjectFactory() {}

ThreeJSObjectFactory.prototype.getBoxObject = function(x, y, z, width, height, fillStyle, fillStroke) {
	return new BoxObject().initialize(x, y, z, width, height, fillStyle, fillStroke);
}

ThreeJSObjectFactory.prototype.getCircleObject = function(x, y, z, radius, fillStyle, fillStroke) {
	return new CircleObject().initialize(x, y, z, radius, fillStyle, fillStroke);
}

ThreeJSObjectFactory.prototype.getPolygonObject = function(x, y, z, points, faces, fillStyle, fillStroke) {
	return new PolygonObject().initialize(x, y, z, points, faces, fillStyle, fillStroke);	
}
