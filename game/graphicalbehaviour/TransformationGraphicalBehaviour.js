function TransformationGraphicalBehaviour() {}

TransformationGraphicalBehaviour.prototype = new GraphicalBehaviour();
TransformationGraphicalBehaviour.constructor = TransformationGraphicalBehaviour;

TransformationGraphicalBehaviour.prototype.reloadParent = function(parentPiece) {
	var parentGraphicalBehaviour = parentPiece.type.graphicalBehaviour;
	parentGraphicalBehaviour.reload(parentPiece);
	parentGraphicalBehaviour.transform(parentPiece);	
}

TransformationGraphicalBehaviour.prototype.removePiece = function(piece, parentPiece) {
	this.reloadParent(parentPiece);
}

TransformationGraphicalBehaviour.prototype.reloadPiece = function(piece) {
	var parentPiece = piece.htmlObject.parent().parent().prev().data('piece');
	this.reloadParent(parentPiece);
	
}

TransformationGraphicalBehaviour.prototype.addPiece = function(piece, parentPiece) {
	this.reloadParent(parentPiece);
}

TransformationGraphicalBehaviour.prototype.apply = function(piece, parentPiece) {
	if (piece.properties['active']) {
		var vector = piece.properties['values'];
		var transformComponent = piece.getTransformComponent(parentPiece);
		transformComponent.apply(piece.checkVector(vector));	
	}
}