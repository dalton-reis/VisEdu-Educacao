/**
 * 
 */

ItemEditorIluminacao = function() {		

	AItemEditorEncaixeSeta.call( this );
	
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
	scope.id =  EIdsItens.ILUMINACAO;
	scope.corHex = CG.colors.corPecaIluminacao;
	
	scope.tipoLuz = CG.listaTipoLuz.Ambient;
	
	scope.posicao = new THREE.Vector3();
	scope.posicao.set( 100, 400, 0 );		
	
	scope.propriedadeCor = new THREE.Color();
	scope.propriedadeCor.setHex( 0xFFFFFF );
	
	scope.intensidade = 1.5;	
	scope.corFundoLuz = new THREE.Color();
	scope.corFundoLuz.setHex( 0xffaa00 );
	
	scope.distancia = 0;
	
	scope.angulo = Math.PI * 0.1;
	scope.expoente = 10;
	
	//TARGET
	scope.posicaoTarget = new THREE.Vector3();
	scope.posicaoTarget.set( 0, 0, 0 );
	
	//scope.rotacaoTarget = new THREE.Vector3();
	//scope.rotacaoTarget.set( 0, 0, 0 );
	
	//scope.escalaTarget = new THREE.Vector3();
	//scope.escalaTarget.set( 0, 0, 0 );
	
	scope.rotacaoTarget = undefined;
	scope.escalaTarget = undefined;
	
	//scope.visivelTarget = true;
	scope.visivelTarget = undefined;
	//	
	
	scope.gerarMeshsPecaSuperior();	
};

ItemEditorIluminacao.prototype = Object.create( AItemEditorEncaixeSeta.prototype );