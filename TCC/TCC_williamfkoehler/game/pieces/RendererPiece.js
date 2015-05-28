function RendererPiece() {}

RendererPiece.prototype = new Piece();
RendererPiece.prototype.constructor = RendererPiece;

RendererPiece.prototype.type = Types.typeRenderer;

RendererPiece.prototype.genGameObject = function() {
	return VisEdu.root;
}