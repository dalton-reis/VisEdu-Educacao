function Piece() {}

Piece.prototype.htmlObject = null;
Piece.prototype.gameObject = null;

Piece.prototype.id = null;
Piece.prototype.properties = {};

Piece.prototype.setupProperties = function() {
	
}
Piece.prototype.init = function() {
	return this;
}

Piece.prototype.genElement = function(isTemplate) {
	var str = "<div class='piece resting ";
	if (isTemplate) {
		str += "template ";
	} else {
		str += "element ";
	}
	
	str += this.type.clazz + " " + this.type.connector + 
		"' >";
	
	if (this.type.connector) {
		str +="<img/>";
	}
	
	if (this.type.name) {
		str += "<div class='txt'>" + this.type.name;
		if (this.type.count) {
			if (!this.id) {
				this.id = this.type.count; 
			}
			str += " " + this.id;
		}
		str += "</div>";
	}

	str += "</div>";	
	this.htmlObject = $(str).data('piece', this);	
	if (isTemplate) {
		this.onDragBehaviour = new TemplateDNDBehaviour();
	} else {
		this.onDragBehaviour = new ElementDNDBehaviour();
		this._addMouseEvent();
	}
	
	this.onDragBehaviour.piece = this;
	return this.htmlObject;
}

Piece.prototype._addMouseEvent = function(evt) {
	this.htmlObject.mouseup(function(evt) {
		PiecesController.onPieceClicked(this);
	})
}

Piece.prototype.createTemplate = function() {
	return this.genElement(true);
}

Piece.prototype.createElement = function() {
	return this.genElement(false);
}

Piece.prototype.genGameObject = function() {}

Piece.prototype.getGameObject = function() {
	return this.gameObject = this.genGameObject();
}
