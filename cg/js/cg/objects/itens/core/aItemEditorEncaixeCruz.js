
function aItemEditorEncaixeCruz() {		

	/*
	CLASSE ABSTRATA - o que for undefined deve ser setado nas classes filhos
	*/

	aItemEditor.call( this ); 
	
	var scope = this;
	
	//eventos
	
	scope.onChange = undefined; //evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	scope.onAddFilho = undefined; //evento será executado quando um filho for adicionado
	scope.onRemoveFilho = undefined; //evento será executado quando um filho for removido
	scope.onChangeFilhos = undefined; //evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	
	//propriedades	
	
	scope.valorXYZ = new THREE.Vector3();
	scope.valorXYZ.set( 0, 0, 0 );
	this.valueDescription = "Posicao";	
	this.corHex = CG.colors.corPecasCruz;
	this.tipoEncaixe = ETiposEncaixe.CRUZ;
	
	//implementacao
	
	this.gerarMeshsPecaSuperior( CG.objects.generateShapeEncaixeCruz() );

	
}

aItemEditorEncaixeCruz.prototype = Object.create( aItemEditor.prototype );


