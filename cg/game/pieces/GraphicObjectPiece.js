function GraphicObjectPiece() {}

GraphicObjectPiece.prototype = new Piece();
GraphicObjectPiece.prototype.constructor = GraphicObjectPiece;

GraphicObjectPiece.prototype.type = Types.typeGraficObject;

GraphicObjectPiece.prototype.genGameObject = function() {
	return VisEdu.factory.createGraphicObject(this);
}