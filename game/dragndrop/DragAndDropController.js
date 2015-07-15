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
					containment: behaviour.containment
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
					if (count++ < 1) { //caso largue entre 2 objectos
						piece.type.treeBehaviour.addPiece($(this), piece);
						DragAndDropController.fitTree();
					}				
			}
		});
	}
	
	this.disableDroppables = function(piece) {
		$('.' + piece.type.connector + '.connector.ui-droppable').droppable('disable');
	}
	
	this.setupDroppableTrash = function(piece) {
		var count = 0;
		$('.trashCan').droppable(
			{
				disabled: false,			
				tolerance: 'touch',			
				drop: function(ev, ui) {
					if (count++ < 1) { //caso large entre 2 objectos
						piece.type.treeBehaviour.removePiece(piece);
						DragAndDropController.fitTree();
					}				
				}
		});
	}
	
	this.fitTree = function() {
		var totalHeight = 0;
		var tree = $('.pieces-tree'); 
		tree.children().each(function(){
		    totalHeight = totalHeight + $(this).outerHeight();
		});
		tree.height(totalHeight);
	}
}