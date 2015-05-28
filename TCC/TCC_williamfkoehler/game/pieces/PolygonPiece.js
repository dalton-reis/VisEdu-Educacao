function PolygonPiece() {}

PolygonPiece.prototype = new Piece();
PolygonPiece.prototype.constructor = PolygonPiece;

PolygonPiece.prototype.type = Types.typePolygon;