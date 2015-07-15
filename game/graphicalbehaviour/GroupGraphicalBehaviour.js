function GroupGraphicalBehaviour() {}

GroupGraphicalBehaviour.prototype = new ElementGraphicalBehaviour();
GroupGraphicalBehaviour.prototype.$_addPiece = GroupGraphicalBehaviour.prototype.addPiece;
GroupGraphicalBehaviour.constructor = GroupGraphicalBehaviour;

GroupGraphicalBehaviour.prototype.removePiece = function(piece, parentPiece) {
	Game.apiHandler.removeGameObject(piece.gameObject, parentPiece.gameObject);
}

GroupGraphicalBehaviour.prototype.reloadPiece = function(piece) {
	var parentPiece = piece.htmlObject.parent().parent().prev().data('piece');
	var layer = parentPiece.gameObject;
	var children = piece.gameObject.threeObject.children;
	Game.apiHandler.removeGameObject(piece.gameObject, layer)
	this.addPiece(piece, parentPiece);
	if (children && children.length){
		$.each(children, function(index, item) {
			piece.gameObject.threeObject.add(item);			
		});
	}
	this.transform(piece);
}

GroupGraphicalBehaviour.prototype.addPiece = function(piece, parentPiece) {
	this.$_addPiece(piece, parentPiece);
	this.transform(piece);
}

GroupGraphicalBehaviour.prototype.reload = function(piece) {
	var object = piece.gameObject.threeObject;
	object.matrix.identity();
}

GroupGraphicalBehaviour.prototype.transform = function(piece) {
	var transformPieces = piece.htmlObject.next().find('> .connector > .transform');
	$.each(transformPieces.get().reverse(), function(index, item) {
		var transformPiece = $(item).data('piece');
		transformPiece.type.graphicalBehaviour.apply(transformPiece, piece);
	});
	piece.properties['matrix'] = piece.gameObject.threeObject.matrix.elements;
}