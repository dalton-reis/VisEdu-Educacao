/**
 * Item responsável pela animação do objeto gráfico
 */
ItemEditorAnimacao = function() {
	AItemEditorEncaixeSeta.call( this );
	var scope = this;
	//eventos
	//evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	scope.onChange = function () {}; 
	//evento será executado quando um filho for adicionado
	scope.onAddFilho = function ( item ) {}; 
	//evento será executado quando um filho for removido
	scope.onRemoveFilho = function ( item ) {}; 
	//evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	scope.onChangeFilhos = function ( filho ) {}; 
	//evento será executado quando o nome do item for alterado
	scope.afterChangeNome = function ( nomeAntigo ) {}; 
	//propriedades
	scope.id =  EIdsItens.ANIMACAO
	scope.corHex = CG.colors.corPecaIluminacao;
	scope.gerarMeshsPecaSuperior();
	/** Função utilizada nas animações*/
	scope.easing = CG.listaTiposEasing['Linear'];
};
ItemEditorAnimacao.prototype = Object.create( AItemEditorEncaixeSeta.prototype );