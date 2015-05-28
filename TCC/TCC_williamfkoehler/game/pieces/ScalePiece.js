function ScalePiece() {}

ScalePiece.prototype = new Piece();
ScalePiece.prototype.constructor = ScalePiece;

ScalePiece.prototype.type = Types.typeScale;