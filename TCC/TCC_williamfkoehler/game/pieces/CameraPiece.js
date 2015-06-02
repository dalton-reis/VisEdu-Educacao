function CameraPiece() {}

CameraPiece.prototype = new Piece();
CameraPiece.prototype.constructor = CameraPiece;
CameraPiece.prototype.$_setupProperties = CameraPiece.prototype._setupProperties;

CameraPiece.prototype.type = Types.typeCamera;

CameraPiece.prototype.genGameObject = function() {
	return VisEdu.factory.createCamera(this);
}

CameraPiece.prototype._setupProperties = function() {
	this.$_setupProperties();
	this.properties['x'] = 100;
	this.properties['y'] = 300;
	this.properties['z'] = 300;
	this.properties['x_lookat'] = 0;
	this.properties['y_lookat'] = 0;
	this.properties['z_lookat'] = 0;
	this.properties['near'] = 100;
	this.properties['far'] = 600;
	this.properties['fov'] = 45;
}