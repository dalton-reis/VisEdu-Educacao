function RendererPiece() {}

RendererPiece.prototype = new Piece();
RendererPiece.prototype.constructor = RendererPiece;
RendererPiece.prototype.$setupProperties = RendererPiece.prototype._setupProperties;
RendererPiece.prototype.$load = RendererPiece.prototype.load;

RendererPiece.prototype.type = Types.typeRenderer;


RendererPiece.prototype._setupProperties = function() {
	this.properties['name'] = this.type.name;
	this.properties['clear'] = 0x101010;
	this.properties['background'] = 0x000000;
	this.properties['grid'] = true;
	this.properties['axis'] = true;
	this.properties['mode'] = '3D';
	this.update();
}

RendererPiece.prototype.load = function(properties) {
	this.$load(properties);
	this.update();
	return this;
}
RendererPiece.prototype.update = function() {
	VisEdu.reloadProperties(this.properties);
}

RendererPiece.prototype.genGameObject = function() {
	return VisEdu.root;
}
