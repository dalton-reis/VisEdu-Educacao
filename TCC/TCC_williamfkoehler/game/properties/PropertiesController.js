var PropertiesController = new function() {
	
	this.bindProperties = function() {
	}
	
	this.setupProperties = function() {
		var selected = PiecesController.selected;
		var piece = $(selected).data('piece');
		if (this._checkSelected(selected, piece)) {
			this._setupFields(piece);
		}
		
	}
	
	this._checkSelected = function(selected, piece) {
		if (selected) {
			$('.property.none').hide();
			$('.property.'+piece.type.name).show();
			return true;
		} else {
			$('.property.none').show();
			$('.property:not(.'+piece.type.name+')').hide();
			$('.property:not(.none)').hide()
			return false;
		}		
	}
	
	this._setupFields = function(piece) {
		this._setupName(piece);
	}
	
	this._setupName = function(piece) {
		$('.property.name > .input').val(piece.type.name);
	}
	
}