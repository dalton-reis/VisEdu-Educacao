function RotatePiece() {}

RotatePiece.prototype = new Piece();
RotatePiece.prototype.constructor = RotatePiece;

RotatePiece.prototype.type = Types.typeRotate;