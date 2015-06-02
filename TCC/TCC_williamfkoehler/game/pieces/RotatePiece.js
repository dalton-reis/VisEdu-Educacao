function RotatePiece() {}

RotatePiece.prototype = new TransformPiece();
RotatePiece.prototype.constructor = RotatePiece;
RotatePiece.prototype.$_setupProperties = RotatePiece.prototype._setupProperties;
RotatePiece.prototype.$load = RotatePiece.prototype.load;

RotatePiece.prototype.type = Types.typeRotate;

RotatePiece.prototype.getTransformComponent= function(piece) {
	return piece.gameObject.rotateComponent;
}

RotatePiece.prototype._setupProperties = function() {
	this.$_setupProperties();
	this.properties['values'] = new THREE.Vector3(0, 0, 0);
	this.properties['values-rotate'] = this.properties['values']
}

RotatePiece.prototype.load = function(properties) {
	this.$load(properties);
	this.properties['values-rotate'] = this.properties['values'];
	return this;
}

RotatePiece.prototype.checkVector= function(vector) {
	return VisEdu.factory.checkVectorRotate(vector);
}