
var createBasicMaterial = function(_color) {
	return new THREE.MeshBasicMaterial( {color: _color * 0x00ff00} );
};


var createLambertMaterial = function(_color) {
	return new THREE.MeshLambertMaterial( { color: _color * 0xffffff } );
};

var createTextureMaterial = function(_texture) {
	var texture = THREE.ImageUtils.loadTexture(_texture);
	texture.anisotropy = renderer.getMaxAnisotropy();

	return new THREE.MeshBasicMaterial( { map: texture } );
};


var createCube = function (_material, _width, _height, _depth) {
	var geometry = new THREE.BoxGeometry(_width, _height, _depth);

	return new THREE.Mesh(geometry, _material);
};

var setPosition = function(obj, x, y, z) {
	obj.position.x = x;
	obj.position.y = y;
	obj.position.z = z;
};