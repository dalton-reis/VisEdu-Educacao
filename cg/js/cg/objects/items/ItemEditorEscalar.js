
function ItemEditorEscalar() {

	AItemEditorEncaixeDiamante.call( this ); 
	
	var scope = this;
	
	//eventos 
	
	//@Override
	scope.onChange = function () {}; //evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	//@Override
	scope.onAddFilho = function ( item ) {};; //evento será executado quando um filho for adicionado
	//@Override
	scope.onRemoveFilho = function ( item ) {};; //evento será executado quando um filho for removido
	//@Override
	scope.onChangeFilhos = function ( filho ) {};; //evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	//@Override
	scope.afterChangeNome = function ( nomeAntigo ) {}; //evento será executado quando o nome do item for alterado
	
	//propriedades
	
	scope.id =  EIdsItens.REDIMENSIONAR;		
	scope.valorXYZ.set( 1, 1, 1 );
	
}

ItemEditorEscalar.prototype = Object.create( AItemEditorEncaixeDiamante.prototype );

