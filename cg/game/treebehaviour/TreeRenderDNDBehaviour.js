function TreeRenderDNDBehaviour() {}

TreeRenderDNDBehaviour.prototype = new TreeDNDBehaviour();
TreeRenderDNDBehaviour.prototype.removePiece = function(piece) {}

TreeRenderDNDBehaviour.prototype.reloadPiece = function(piece, property) {
	VisEdu.reloadProperties(piece.properties);
	
}

TreeRenderDNDBehaviour.prototype.addPiece = function(droppable, piece) {}