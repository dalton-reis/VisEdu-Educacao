function TreeObjectDNDBehaviour() {}

TreeObjectDNDBehaviour.prototype = new TreePluralDNDBehaviour();
TreeObjectDNDBehaviour.prototype.$addPiecePlural = TreeObjectDNDBehaviour.prototype.addPiece;
TreeObjectDNDBehaviour.prototype.$reloadPiecePlural = TreeObjectDNDBehaviour.prototype.reloadPiece;
TreeObjectDNDBehaviour.prototype.$removePiecePlural = TreeObjectDNDBehaviour.prototype.removePiece;

TreeObjectDNDBehaviour.prototype.reallocating;

TreeObjectDNDBehaviour.prototype.removePiece = function(piece) {
	var node = piece.htmlObject.next();
	if (!this.reallocating) {
		$.each(node.find('>.connector >.element'), function(index, item) {
			var child = $(item).data('piece');
			child.type.treeBehaviour.removePiece(child);
		}); 
	}
	node.detach();
	this.$removePiecePlural(piece);
}

TreeObjectDNDBehaviour.prototype.reloadPiece = function(piece, property) {
	this.$reloadPiecePlural(piece, property)
	var parent = piece.htmlObject.parent();
	var node = parent.find('> .object-node');
	node.detach();
	parent.append(node);
}

TreeObjectDNDBehaviour.prototype.addPiece = function(droppable, piece) {
	var htmlObject = piece.htmlObject;
	if (htmlObject && htmlObject.hasClass('element')) {
		this.reallocating = true;
		var objectNode = htmlObject.next();
	} else {
		var objectNode = $("<div class='object-node'>");
		objectNode 
		.append(new ConnectorSquarePiece().init().createElement())
		.append($('<br/>'))
		.append(new ConnectorDiamondPiece().init().createElement())
		.append($('<br/>'))		
		.append(new ConnectorArrowPiece().init().createElement())
		;				
	}
	this.$addPiecePlural.call(this, droppable, piece);
	droppable.append(objectNode);
	if (this.reallocating) {
		$.each(objectNode.find('>.connector >.element'), function(index, item) {
			var child = $(item).data('piece');
			child.type.graphicalBehaviour.addPiece(child, piece);
		});
		this.reallocating = false;		
	}
}