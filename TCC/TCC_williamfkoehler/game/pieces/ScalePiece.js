function ScalePiece() {}

ScalePiece.prototype = new TransformPiece();
ScalePiece.prototype.constructor = ScalePiece;
ScalePiece.prototype.$_setupProperties = ScalePiece.prototype._setupProperties;

ScalePiece.prototype.type = Types.typeScale;

ScalePiece.prototype.getTransformComponent= function(piece) {
	return piece.gameObject.scaleComponent;
}

ScalePiece.prototype._setupProperties = function() {
	this.$_setupProperties();
	this.properties['values'] = new THREE.Vector3(1, 1, 1);
}