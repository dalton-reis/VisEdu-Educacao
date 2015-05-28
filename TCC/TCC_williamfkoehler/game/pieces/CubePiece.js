function CubePiece() {}

CubePiece.prototype = new Piece();
CubePiece.prototype.constructor = CubePiece;

CubePiece.prototype.type = Types.typeCube;

CubePiece.prototype.genGameObject = function() {
	return VisEdu.factory.createCube(this);
}