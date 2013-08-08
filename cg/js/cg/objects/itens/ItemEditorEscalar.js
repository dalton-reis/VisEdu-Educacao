
function ItemEditorEscalar() {

	aItemEditorEncaixeDiamante.call( this ); 
	
	var scope = this;
	
	//propriedades
	
	scope.id =  EIdsItens.REDIMENSIONAR;		
	scope.valorXYZ.set( 1, 1, 1 );
	
}

ItemEditorEscalar.prototype = Object.create( aItemEditorEncaixeDiamante.prototype );

