
function AItemEditorEncaixeQuadrado() {

	/*
	CLASSE ABSTRATA - eventos que geram exceção devem ser implementados nas classes filhos
	*/

	AItemEditor.call( this );

	var scope = this;

	//propriedades

	scope.valorXYZ = new THREE.Vector3();
	scope.valorXYZ.set( 0, 0, 0 );
	scope.posicao = new THREE.Vector3();
	scope.posicao.set( 0, 0, 0 );
	scope.valueDescription = "Tamanho";
	scope.propriedadeCor = new THREE.Color();
	scope.textura = undefined;
	scope.usarTextura = undefined;
	/** Objeto 3D utilizado na scene*/
	scope.object3D = undefined;

	scope.corHex = CG.colors.corPecasQuadrado;
	scope.tipoEncaixe = ETiposEncaixe.QUADRADO;

	//eventos abstratos

	//@Override
	scope.onChange = function () { throw new Error ("função onChange não implemenada!");  }; //evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	//@Override
	scope.onAddFilho = function ( item ) { throw new Error ("função onAddFilho não implemenada!");  }; //evento será executado quando um filho for adicionado
	//@Override
	scope.onRemoveFilho = function ( item ) { throw new Error ("função onRemoveFilho não implemenada!");  }; //evento será executado quando um filho for removido
	//@Override
	scope.onChangeFilhos = function ( filho )  { throw new Error ("função onChangeFilhos não implemenada!");  }; //evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	//@Override
	scope.afterChangeNome = function ( nomeAntigo ) { throw new Error ("função afterChangeNome não implemenada!");  }; //evento será executado quando o nome do item for alterado

	//implementacao

	//@Override
	scope.gerarShapeEncaixeItem = function ( ) {
		return CG.objects.generateShapeEncaixeQuadrado();
	};

	scope.gerarMeshsPecaSuperior();

}

AItemEditorEncaixeQuadrado.prototype = Object.create( AItemEditor.prototype );

