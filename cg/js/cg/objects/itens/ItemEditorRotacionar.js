
function ItemEditorRotacionar() {		

	aItemEditorEncaixeDiamante.call( this ); 
	
	var scope = this;
	
	//propriedades
	
	scope.id = EIdsItens.ROTACIONAR;	
	
}

ItemEditorRotacionar.prototype = Object.create( aItemEditorEncaixeDiamante.prototype );

