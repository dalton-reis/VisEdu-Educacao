function SplinePiece() {}

SplinePiece.prototype = new Piece();
SplinePiece.prototype.constructor = SplinePiece;

SplinePiece.prototype.type = Types.typeSpline;