function Factory() {}

Factory.prototype.createCamera = function() {}

Factory.prototype.createGraphicObject = function(piece) {
	return ThreeJSBuilder.createGroupObject();
}

Factory.prototype.createCube = function() {}

Factory.prototype.createPolygon = function() {
}

Factory.prototype.createTranslate = function(piece) {}

Factory.prototype.createRotate = function(piece) {}

Factory.prototype.createScale = function(piece) {}
