function RenderDNDBehaviour() {}

RenderDNDBehaviour.prototype = new TreeDNDBehaviour();
RenderDNDBehaviour.prototype.removePiece = function(piece) {}

RenderDNDBehaviour.prototype.reloadPiece = function(piece, property) {
	VisEdu.reloadProperties(piece.properties);
	
}

RenderDNDBehaviour.prototype.addPiece = function(droppable, piece) {}