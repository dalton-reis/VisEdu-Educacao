var PiecesController = new function () {
	
	this.tab = null;
	
	this.setupDraggables = function() {
		$.each($('.template'), function(index, item) {
			DragAndDropController.setupDraggable($(item).data('piece'));
		})
	}
	
	this.createPallet = function(container) {
		new CameraPiece().createTemplate().appendTo(container);
		container.append('<br/>');
		new GraphicObjectPiece().createTemplate().appendTo(container);
		container.append('<br/>');
		new CubePiece().createTemplate().appendTo(container);
		new PolygonPiece().createTemplate().appendTo(container);
		new SplinePiece().createTemplate().appendTo(container);
		container.append('<br/>');
		new TranslatePiece(). createTemplate().appendTo(container);
		new RotatePiece().createTemplate().appendTo(container);
		new ScalePiece().createTemplate().appendTo(container);
		container.append('<br/>');
		new LightPiece().createTemplate().appendTo(container);
	}
	
	this.onPieceClicked = function(htmlPiece) {
		if (this.checkNotDragged(htmlPiece)) {			
			if (this.selected) {
				$(this.selected).removeClass("selected").addClass("resting");
			}
			if (this.selected == htmlPiece) {
				this.selected = null
			} else {
				$(htmlPiece).addClass('selected').removeClass("resting");
				this.selected = htmlPiece;
				if (this.tab) {
					this.tab.tabs("option", "active", 2);
				}
			}
			PropertiesController.setupProperties();
		}
	}
	
	this.checkNotDragged = function(htmlPiece) {
		return $(htmlPiece).hasClass('renderer') ||
			($(htmlPiece).css('top') == '0px' && $(htmlPiece).css('left') == '0px');
	}
	
	this.createTree = function(tree) {
		var renderPiece = new RendererPiece();
		renderPiece.createElement().appendTo(tree);
		renderPiece.getGameObject();
		var node = $("<div class='object-node'></div>").appendTo(tree);
		new ConnectorCrossPiece().createElement().appendTo(node);
		node.append("<br/>");
		new ConnectorArrowPiece().createElement().appendTo(node);
		
	}
	
	this.fitPiece = function(piece) {
		var pieceElement = piece.htmlObject;
		pieceElement.parent().height(pieceElement.outerHeight()).width(pieceElement.outerWidth());
	}
	
	this.selected = null;

}