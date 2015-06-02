function ElementGraphicalBehaviour() {
}

ElementGraphicalBehaviour.prototype = new GraphicalBehaviour();
ElementGraphicalBehaviour.constructor = ElementGraphicalBehaviour;

ElementGraphicalBehaviour.prototype.removePiece = function(piece, parentPiece) {
	Game.apiHandler.removeGameObject(piece.gameObject, parentPiece.gameObject)
}

ElementGraphicalBehaviour.prototype.reloadPiece = function(piece) {
	var parentPiece = piece.htmlObject.parent().parent().prev().data('piece');
	this.removePiece(piece, parentPiece);
	this.addPiece(piece, parentPiece);

}

ElementGraphicalBehaviour.prototype.addPiece = function(piece, parentPiece) {
	var gameObject = piece.getGameObject();
	Game.apiHandler.addGameObject(gameObject, parentPiece.gameObject);
	gameObject.threeObject.visible = piece.properties['active'];
}