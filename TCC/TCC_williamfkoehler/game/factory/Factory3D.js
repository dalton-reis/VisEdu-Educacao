function Factory3D() {}

Factory3D.prototype =  new Factory();
Factory3D.prototype.constructor = Factory3D.prototype; 

Factory3D.prototype.createCube = function() {
	return ThreeJSBuilder.createCubeObject(0, 0, 0, 50, 50, 50, 0xFFFFFF, 0xFF0000);
}
