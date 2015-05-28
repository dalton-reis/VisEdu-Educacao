function DNDBehaviour() {}

DNDBehaviour.prototype.piece = null;

DNDBehaviour.prototype.helper = '';

DNDBehaviour.prototype.start = function () {
	DragAndDropController.setupDroppables(this.piece);
}

DNDBehaviour.prototype.stop = function () {
	DragAndDropController.disableDroppables(this.piece);
}		
