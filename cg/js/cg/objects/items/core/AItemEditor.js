
function AItemEditor() {

	/*
	CLASSE ABSTRATA  - eventos que geram exceção devem ser implementados nas classes filhos
	*/

	AObjetoGrafico.call( this ); //herda atributos classe ObjetoGrafico

	var scope = this;

	//propriedades
	scope.nome = "";
    	scope.nomeReadOnly = false;
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

	scope.encaixePai = undefined; //link para o mesh onde o item está encaixado
	scope.grupoPai = undefined; //link para o grupo (THREE.Object3D) onde o objeto (THREE.Object3D) do item atual está inserido

	scope.meshBaseEncaixe = null;
	scope.meshPecaSuperior = null;
	scope.meshPecaSuperiorEncaixe = null;
	scope.meshTexto = null;

	//eventos abstratos

	//@Override
	scope.onChange = function () { throw new Error ("função onChange não implemenada!");  }; //evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	//@Override
	scope.onAddFilho = function ( item ) { throw new Error ("função onAddFilho não implemenada!");  }; //evento será executado quando um filho for adicionado
	//@Override
	scope.onRemoveFilho = function ( item ) { throw new Error ("função onRemoveFilho não implemenada!");  }; //evento será executado quando um filho for removido
	//@Override
	scope.onChangeFilhos = function ( filho ) { throw new Error ("função onChangeFilhos não implemenada!");  }; //evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	scope.gerarShapeEncaixeItem = function () { throw new Error ("função gerarShapeEncaixeItem não implemenada!");  }; //evento que retorna o mesh de encaixe do item
	scope.afterChangeNome = function ( nomeAntigo) { throw new Error ("função afterChangeNome não implemenada!");  }; //evento será executado quando o nome do item for alterado

	//implementacao
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

		scope.afterChangeNome( nomeAntigo );
	};

	scope.gerarMeshsPecaSuperior = function ( ) {

		var shapeEncaixe = scope.gerarShapeEncaixeItem();

		if (shapeEncaixe) {
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
			scope.meshPecaSuperiorEncaixe = CG.objects.generateMeshFromShape( shapeEncaixe , scope.corHex );
			scope.meshPecaSuperiorEncaixe.position.set( 0, -18, 0 );
			scope.meshPecaSuperiorEncaixe.rotation.set( 0, 0, 0 );
			var scale = 0.2;
			scope.meshPecaSuperiorEncaixe.scale.set( scale, scale, scale );
			scope.objeto.add(scope.meshPecaSuperiorEncaixe);
			scope.addIntersectableMesh(scope.meshPecaSuperiorEncaixe);
		}

	};

}

AItemEditor.prototype = Object.create( AObjetoGrafico.prototype );


