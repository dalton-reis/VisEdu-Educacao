function ElementGraphicalBehaviour() {}

ElementGraphicalBehaviour.prototype = new GraphicalBehaviour();
ElementGraphicalBehaviour.constructor = ElementGraphicalBehaviour;

GraphicalBehaviour.prototype.addPiece = function(piece, parentPiece) {
	Game.apiHandler.addGameObject(piece.getGameObject(), parentPiece.gameObject);
}