function LightPiece() {}

LightPiece.prototype = new Piece();
LightPiece.prototype.constructor = LightPiece;
LightPiece.prototype.$_setupProperties = LightPiece.prototype._setupProperties;

LightPiece.prototype.genGameObject = function() {
	return VisEdu.factory.createLight(this);
}

LightPiece.prototype.type = Types.typeLight;
LightPiece.prototype.types = ['Ambient', 'Hemisphere', 'Directional', 'PointLight', 'SpotLight'];

LightPiece.prototype._setupProperties = function() {
	this.$_setupProperties();
	this.properties['x'] = 100;
	this.properties['y'] = 400;
	this.properties['z'] = 0;
	this.properties['target_x'] = 0;
	this.properties['target_y'] = 0;
	this.properties['target_z'] = 0;
	
	this.properties['color'] = 0xFFFFFF;
	this.properties['background'] = 0xFFAA00;
	//this.properties['lightType'] = this.types
	this.properties['typeIndex'] = '0';
	
	this.properties['distance'] = 0;
	this.properties['angle'] = 0.3;
	this.properties['intensity'] = 1.5;
	this.properties['exponent'] = 10;
}
