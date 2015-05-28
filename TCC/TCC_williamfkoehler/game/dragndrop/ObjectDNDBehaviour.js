function ObjectDNDBehaviour() {}

ObjectDNDBehaviour.prototype = new SpecificPluralDNDBehaviour();
ObjectDNDBehaviour.prototype.$addPiecePlural = ObjectDNDBehaviour.prototype.addPiece;

ObjectDNDBehaviour.prototype.addPiece = function(ui, droppable, piece) {
	var htmlObject = piece.htmlObject;
	if (htmlObject && htmlObject.hasClass('element')) {
		var objectNode = htmlObject.next();
	} else {
		var objectNode = $("<div class='object-node'>");
		objectNode 
		.append(new ConnectorSquarePiece().createElement())
		.append($('<br/>'))
		.append(new ConnectorDiamondPiece().createElement())
		.append($('<br/>'))		
		.append(new ConnectorArrowPiece().createElement())
		;				
	}
	ObjectDNDBehaviour.prototype.$addPiecePlural.call(this, ui, droppable, piece);
	droppable
		.append(objectNode);
}