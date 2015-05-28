var DragAndDropController = new function() {
	
	this.setupDraggable = function(piece) {
		var behaviour = piece.onDragBehaviour;
		$(piece.htmlObject).draggable(
				{
					helper: behaviour.helper,
					
					start: function () {
						behaviour.start();
						piece.htmlObject.addClass('dragged');
					},
					
					stop: function () {
						behaviour.stop();
						piece.htmlObject.removeClass('dragged');
					},			
					
					revert: function(event, ui) {
						return behaviour.revert(event, ui);
					},
					
					containment: '.menu'
				}
			);
	}
	
	this.setupDroppables = function(piece) {
		var count = 0;
		$('.' + piece.type.connector + '.connector:not(.busy)').droppable(
			{
				disabled: false,			
				tolerance: 'touch',			
				drop: function(ev, ui) {
					if (count++ < 1) {
						piece.type.specificBehaviour.addPiece(ui, $(this), piece);
					}				
			}
		});
	}
	
	this.disableDroppables = function(piece) {
		$('.' + piece.type.connector + '.connector.ui-droppable').droppable('disable');
	}
}