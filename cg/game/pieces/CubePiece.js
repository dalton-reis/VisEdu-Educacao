function CubePiece() {}

CubePiece.prototype = new Piece();
CubePiece.prototype.constructor = CubePiece;
CubePiece.prototype.$_setupProperties = CubePiece.prototype._setupProperties;

CubePiece.prototype.type = Types.typeCube;

CubePiece.prototype.genGameObject = function() {
	return VisEdu.factory.createCube(this);
}

CubePiece.prototype._setupProperties = function() {
	this.$_setupProperties();
	this.properties['width'] = 100;
	this.properties['height'] = 100;
	this.properties['depth'] = 100;
	this.properties['x'] = 0;
	this.properties['y'] = 0;
	this.properties['z'] = 0;
	this.properties['color'] = 0xB4B4E1;
	this.properties['enableTexture'] = false;
	this.properties['textureImage'] = '';
	this.properties['listTextureImage'] = '';
}