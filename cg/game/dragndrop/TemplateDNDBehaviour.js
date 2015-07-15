function TemplateDNDBehaviour() {}

TemplateDNDBehaviour.prototype = new DNDBehaviour();

TemplateDNDBehaviour.prototype.helper = 'clone';
TemplateDNDBehaviour.prototype.containment= '.menu';

TemplateDNDBehaviour.prototype.revert = function (event, ui) {
	this.piece.htmlObject.data('ui-draggable').originalPosition = this.piece.htmlObject.position();					
	return !event;
}