function SpecificDNDBehaviour() {}

SpecificDNDBehaviour.prototype.removePiece = function(piece) {
	var htmlObject = piece.htmlObject; 
	htmlObject.parent().removeClass('busy');
	htmlObject.detach();
}

SpecificDNDBehaviour.prototype.addPiece = function(ui, droppable, piece) {
	var htmlObject = piece.htmlObject;
	if (htmlObject && htmlObject.hasClass('element')) {
		this.removePiece(piece);
	} else {
		piece = new piece.constructor().init();
		piece.type.count++;
	}
	droppable.append(piece.createElement());		
	DragAndDropController.setupDraggable(piece);
	
	droppable.addClass('busy');
	droppable.droppable('disable');	
	

	piece.type.graphicalBehaviour.addPiece(piece, $(droppable).parent().prev().data('piece'));
}