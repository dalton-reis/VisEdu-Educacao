function CameraPiece() {}

CameraPiece.prototype = new Piece();
CameraPiece.prototype.constructor = CameraPiece;
CameraPiece.prototype.type = Types.typeCamera;