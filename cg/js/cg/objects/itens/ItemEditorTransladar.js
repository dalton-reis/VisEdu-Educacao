
function ItemEditorTransladar() {		
  
	aItemEditorEncaixeDiamante.call( this ); 
	
	var scope = this;
	
	//propriedades
	
	scope.id = EIdsItens.TRANSLADAR;
	
}

ItemEditorTransladar.prototype = Object.create( aItemEditorEncaixeDiamante.prototype );

