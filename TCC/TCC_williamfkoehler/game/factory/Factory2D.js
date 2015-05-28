function Factory2D() {}

Factory2D.prototype =  new Factory();
Factory2D.prototype.constructor = Factory2D.prototype; 

Factory2D.prototype.createCube = function() {
	return ThreeJSBuilder.createSquareObject(0, 0, 0, 50, 50, 0x00000);
}