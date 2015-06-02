function TranslatePiece() {}

TranslatePiece.prototype = new TransformPiece();
TranslatePiece.prototype.constructor = TranslatePiece;
TranslatePiece.prototype.$_setupProperties = TranslatePiece.prototype._setupProperties;

TranslatePiece.prototype.type = Types.typeTranslate;

TranslatePiece.prototype.getTransformComponent= function(piece) {
	return piece.gameObject.translateComponent;
}

TranslatePiece.prototype._setupProperties = function() {
	this.$_setupProperties();
	this.properties['values'] = new THREE.Vector3(0, 0, 0);
}