
function aItemEditorEncaixeSeta() {		

	/*
	CLASSE ABSTRATA - o que for undefined deve ser setado nas classes filhos
	*/

	aItemEditor.call( this ); //herda atributos classe ItemEditorAbstract 
	
	var scope = this;
	
	//eventos
	
	scope.onChange = undefined; //evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	scope.onAddFilho = undefined; //evento será executado quando um filho for adicionado
	scope.onRemoveFilho = undefined; //evento será executado quando um filho for removido
	scope.onChangeFilhos = undefined; //evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	
	//propriedades	
	
	scope.corHex = CG.colors.corPecasSeta;
	scope.tipoEncaixe = ETiposEncaixe.SETA;
	
	//implementacao
	
	scope.gerarMeshsPecaSuperior( CG.objects.generateShapeEncaixeSeta() );
	
}

aItemEditorEncaixeSeta.prototype = Object.create( aItemEditor.prototype );

