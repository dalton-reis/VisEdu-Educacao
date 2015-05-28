function SpecificPluralDNDBehaviour() {}

SpecificPluralDNDBehaviour.prototype = new SpecificDNDBehaviour();
SpecificPluralDNDBehaviour.prototype.$addPiece = SpecificPluralDNDBehaviour.prototype.addPiece;

SpecificPluralDNDBehaviour.prototype.removePiece = function(piece) {
	var parent = piece.htmlObject.parent();
	parent.next().detach(); //br
	parent.detach();
}

SpecificPluralDNDBehaviour.prototype.addPiece = function(ui, droppable, piece) {
	SpecificPluralDNDBehaviour.prototype.$addPiece.call(this, ui, droppable, piece);

	var constructor = droppable.data('piece').constructor;
	var newConnector = new constructor();
	droppable.after(newConnector.createElement()).after($('<br/>'));
}