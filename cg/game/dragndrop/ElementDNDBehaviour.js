function ElementDNDBehaviour() {
}

ElementDNDBehaviour.prototype = new DNDBehaviour();
ElementDNDBehaviour.prototype.$_start = ElementDNDBehaviour.prototype.start;

ElementDNDBehaviour.prototype.helper = 'original';
ElementDNDBehaviour.prototype.containment = 'pieces-tree';

ElementDNDBehaviour.prototype.start = function() {
	this.$_start();
	DragAndDropController.setupDroppableTrash(this.piece);	
}

ElementDNDBehaviour.prototype.revert = function(event, ui) {
	this.piece.htmlObject.data('ui-draggable').originalPosition = {
		top : 0,
		left : 0
	};
	return !event;
}