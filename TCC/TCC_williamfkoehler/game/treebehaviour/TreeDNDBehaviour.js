function TreeDNDBehaviour() {
}

TreeDNDBehaviour.prototype.removePiece = function(piece) {
	var htmlObject = piece.htmlObject;
	var parentPiece = htmlObject.parent().parent().prev().data('piece')
	htmlObject.parent().removeClass('busy');
	htmlObject.detach();
	piece.type.graphicalBehaviour.removePiece(piece, parentPiece);
	PiecesController.uncheckSelected();
}

TreeDNDBehaviour.prototype.reloadPiece = function(piece, property) {
	if (property.reloadTree) {
		this.addPieceTreeObject(piece.htmlObject.parent(), piece);
		PiecesController.onPieceClicked(piece.htmlObject[0]);
	}
	if (property.reloadScene && piece.type.graphicalBehaviour) {
		piece.type.graphicalBehaviour.reloadPiece(piece);
		PiecesController.checkSelected();
	}

}

TreeDNDBehaviour.prototype.addPieceTreeObject = function(droppable, piece) {
	var htmlObject = piece.htmlObject;
	htmlObject.detach();
	droppable.append(piece.createElement());
	DragAndDropController.setupDraggable(piece);

	droppable.addClass('busy');
}

TreeDNDBehaviour.prototype.addPiece = function(droppable, piece) {
	var htmlObject = piece.htmlObject;
	if (htmlObject && htmlObject.hasClass('element')) {
		this.removePiece(piece);
		droppable.droppable('disable');
	} else if (!piece.loading){
		piece = new piece.constructor().init();
		droppable.droppable('disable');
	}
	droppable.append(piece.createElement());
	DragAndDropController.setupDraggable(piece);

	droppable.addClass('busy');
	if (piece.type.graphicalBehaviour) {
		piece.type.graphicalBehaviour.addPiece(piece, $(droppable).parent()
				.prev().data('piece'));
	}
}