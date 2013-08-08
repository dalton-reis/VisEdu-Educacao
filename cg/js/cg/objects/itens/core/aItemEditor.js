
function aItemEditor() {		

	/*
	CLASSE ABSTRATA  - o que for undefined deve ser setado nas classes filhos
	*/

	aObjetoGrafico.call( this ); //herda atributos classe ObjetoGrafico 
	
	var scope = this;
	
	//eventos
	
	scope.onChange = undefined; //evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	scope.onAddFilho = undefined; //evento será executado quando um filho for adicionado
	scope.onRemoveFilho = undefined; //evento será executado quando um filho for removido
	scope.onChangeFilhos = undefined; //evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
		
	//propriedades
	scope.nome = "";		
	scope.corHex = undefined;
	scope.tipoEncaixe = undefined;
	
	scope.changeCursor = true;
	scope.canMove = true;
	
	scope.visible = true;
	scope.changeVisibility = true;
	scope.visibleDescription = "Visivel";
	
	scope.tamanhoPadrao = 20;
	scope.tamanhoFilhos = 0;
	scope.largura = undefined;
	
	//eventos
	scope.afterChangeNome = undefined; //evento será executado quando o nome do item for alterado;
	
	
	//implementacao
	
	scope.meshBaseEncaixe = null;
	scope.meshPecaSuperior = null;
	scope.meshPecaSuperiorEncaixe = null;
	scope.meshTexto = null;
	
	
	scope.setNome = function ( nome ) {
		scope.objeto.remove( scope.meshTexto ); //remove objeto do nome anterior
		
		//define novo nome
		var	nomeAntigo = scope.nome;
		scope.nome =	nome;	
		scope.meshTexto = CG.objects.generateTextMesh( nome, CG.colors.corTexto, scope );	
		scope.meshTexto.position.set( 30, -14, 0 );
		scope.meshTexto.rotation.set( 0, 0, 0 );
		var scale = 0.3;
		scope.meshTexto.scale.set( scale, scale, scale );		
		scope.objeto.add(scope.meshTexto);
		
		if	(scope.meshPecaSuperior) {
			var larguraMeshPecaSuperior = (scope.textGeometry.boundingBox.max.x*scale) + 20;
			scope.meshPecaSuperior.scale.x = larguraMeshPecaSuperior;
			scope.largura = (scope.meshPecaSuperior.position.x - scope.meshBaseEncaixe.position.x) +  larguraMeshPecaSuperior;
		}
		
		if	(scope.afterChangeNome !== undefined) {		
			scope.afterChangeNome( nomeAntigo );			
		}
	}
	
	scope.gerarMeshsPecaSuperior = function ( shapeEncaixe ) {
		
		//cria pontos peca superior
		var points = [];	
		points.push( new THREE.Vector2 (   0,   0 ) );
		points.push( new THREE.Vector2 (  24,   0 ) );
		points.push( new THREE.Vector2 (  24, -20 ) );
		points.push( new THREE.Vector2 (   0, -20 ) );
		points.push( new THREE.Vector2 (   0, -18 ) );
		points.push( new THREE.Vector2 (  22, -18 ) );
		points.push( new THREE.Vector2 (  22,  -2 ) );
		points.push( new THREE.Vector2 (   0,  -2 ) );			
		var squareShape = new THREE.Shape( points );
		scope.meshBaseEncaixe = CG.objects.generateMeshFromShape( squareShape, scope.corHex );			
		scope.objeto.add(scope.meshBaseEncaixe);
		scope.addIntersectableMesh(scope.meshBaseEncaixe);
		
		//cria pontos peca superior
		var points = [];	
		points.push( new THREE.Vector2 (  0, 0 ) );
		points.push( new THREE.Vector2 (  1, 0 ) );
		points.push( new THREE.Vector2 (  1, -20 ) );
		points.push( new THREE.Vector2 (  0, -20 ) );			
		var squareShape = new THREE.Shape( points );
		scope.meshPecaSuperior = CG.objects.generateMeshFromShape( squareShape, scope.corHex );
		scope.meshPecaSuperior.position.x = 23;
		scope.objeto.add(scope.meshPecaSuperior);
		scope.addIntersectableMesh(scope.meshPecaSuperior);
		
		//cria encaixe peca
		scope.meshPecaSuperiorEncaixe = CG.objects.generateMeshFromShape( shapeEncaixe, scope.corHex );
		scope.meshPecaSuperiorEncaixe.position.set( 0, -18, 0 );
		scope.meshPecaSuperiorEncaixe.rotation.set( 0, 0, 0 );
		var scale = 0.2;
		scope.meshPecaSuperiorEncaixe.scale.set( scale, scale, scale );
		scope.objeto.add(scope.meshPecaSuperiorEncaixe);
		scope.addIntersectableMesh(scope.meshPecaSuperiorEncaixe);
		
	}
	
}

aItemEditor.prototype = Object.create( aObjetoGrafico.prototype );


