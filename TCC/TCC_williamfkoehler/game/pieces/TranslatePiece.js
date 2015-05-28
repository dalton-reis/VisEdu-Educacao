function TranslatePiece() {}

TranslatePiece.prototype = new Piece();
TranslatePiece.prototype.constructor = TranslatePiece;

TranslatePiece.prototype.type = Types.typeTranslate;