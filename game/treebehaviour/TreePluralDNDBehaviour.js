function TreePluralDNDBehaviour() {}

TreePluralDNDBehaviour.prototype = new TreeDNDBehaviour();
TreePluralDNDBehaviour.prototype.$addPiece = TreePluralDNDBehaviour.prototype.addPiece;
TreePluralDNDBehaviour.prototype.$reloadPiece = TreePluralDNDBehaviour.prototype.reloadPiece;
TreePluralDNDBehaviour.prototype.$removePiece = TreePluralDNDBehaviour.prototype.removePiece;

TreePluralDNDBehaviour.prototype.removePiece = function(piece) {
	var parent = piece.htmlObject.parent();
	this.$removePiece(piece);
	parent.next().detach();
	parent.detach();
}
/*
TreePluralDNDBehaviour.prototype.reloadPiece = function(piece, property) {
	this.$reloadPiece(piece, property);
}
*/
TreePluralDNDBehaviour.prototype.addPiece = function(droppable, piece) {
	this.$addPiece(droppable, piece);

	var constructor = droppable.data('piece').constructor;
	var newConnector = new constructor().init();
	droppable.after(newConnector.createElement()).after($('<br/>'));
}