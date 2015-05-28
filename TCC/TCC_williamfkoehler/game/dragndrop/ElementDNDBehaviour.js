function ElementDNDBehaviour() {}

ElementDNDBehaviour.prototype = new DNDBehaviour();

ElementDNDBehaviour.prototype.helper = 'original';

ElementDNDBehaviour.prototype.revert = function (event, ui) {
	this.piece.htmlObject.data('ui-draggable').originalPosition = {top: 0, left: 0};					
	return !event;
}