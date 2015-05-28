function LightPiece() {}

LightPiece.prototype = new Piece();
LightPiece.prototype.constructor = LightPiece;

LightPiece.prototype.type = Types.typeLight;
