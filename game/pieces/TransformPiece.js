function TransformPiece() {}

TransformPiece.prototype = new Piece();
TransformPiece.prototype.constructor = TransformPiece;

TransformPiece.prototype.getTransformComponent= function(piece) {}

TransformPiece.prototype.checkVector= function(vector) {
	return VisEdu.factory.checkVector(vector);
}

