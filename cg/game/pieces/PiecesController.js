var PiecesController = new function () {
	
	this.tab = null;
	this.bbox;
	
	this.setupDraggables = function() {
		$.each($('.template'), function(index, item) {
			DragAndDropController.setupDraggable($(item).data('piece'));
		})
	}
	
	this.createPallet = function(container) {
		new CameraPiece().init().createTemplate().appendTo(container).after($('<div>').addClass('gap'));
		container.append('<br/>');
		new GraphicObjectPiece().init().createTemplate().appendTo(container).after($('<div>').addClass('gap'));
		container.append('<br/>');
		new CubePiece().init().createTemplate().appendTo(container).after($('<div>').addClass('gap'));
		new PolygonPiece().init().createTemplate().appendTo(container).after($('<div>').addClass('gap'));
		new SplinePiece().init().createTemplate().appendTo(container);
		container.append('<br/>');
		new TranslatePiece().init(). createTemplate().appendTo(container).after($('<div>').addClass('gap'));
		new RotatePiece().init().createTemplate().appendTo(container).after($('<div>').addClass('gap'));
		new ScalePiece().init().createTemplate().appendTo(container);
		container.append('<br/>');
		new LightPiece().init().createTemplate().appendTo(container).after($('<div>').addClass('gap'));
	}
	
	this.onPieceClicked = function(htmlPiece) {
		if (this.checkNotDragged(htmlPiece)) {			
			if (this.selected) {
				$(this.selected).removeClass("selected").addClass("resting");
				this.uncheckSelected();
			}
			if (this.selected == htmlPiece) {
				this.selected = null
			} else {
				$(htmlPiece).addClass('selected').removeClass("resting");
				this.selected = htmlPiece;
				if (this.tab) {
					this.tab.tabs("option", "active", 2);
				}
				this.checkSelected();
			}
			PropertiesController.setupProperties();
		}
	}
	
	this.uncheckSelected = function() {
		if (this.bbox) {
			this.bbox.parent.remove(this.bbox);
			this.bbox = null;
		}		
	}
	
	this.checkSelected = function() {		
		this.uncheckSelected();
		var piece = $(this.selected).data('piece');
		if (piece.gameObject) {
			var threeObject = piece.gameObject.threeObject;
			this.bbox = new THREE.BoundingBoxHelper( threeObject, 0xFF0000);
			this.bbox.update();
			Game.scene.threeObject.add(this.bbox);
		}
	}
	
	this.checkNotDragged = function(htmlPiece) {
		return $(htmlPiece).hasClass('renderer') ||
			($(htmlPiece).css('top') == '0px' && $(htmlPiece).css('left') == '0px');
	}
	
	this.createTree = function(tree) {
		var renderPiece = new RendererPiece().init();
		renderPiece.createElement().appendTo(tree);
		renderPiece.getGameObject();
		var node = $("<div class='object-node'></div>").appendTo(tree);
		new ConnectorCrossPiece().init().createElement().appendTo(node);
		node.append("<br/>");
		new ConnectorArrowPiece().init().createElement().appendTo(node);
		Game.apiHandler.properties = renderPiece.properties;
	}
	
	this.fitPiece = function(piece) {
		var pieceElement = piece.htmlObject;
		pieceElement.parent().height(pieceElement.outerHeight()).width(pieceElement.outerWidth());
	}
	
	this.selected = null;

}