
function AItemEditorEncaixeCruz() {		

	/*
	CLASSE ABSTRATA - o que for undefined deve ser setado nas classes filhos
	*/

	AItemEditor.call( this ); 
	
	var scope = this;
	
	//propriedades	
	
	scope.valorXYZ = new THREE.Vector3();
	scope.valorXYZ.set( 0, 0, 0 );
	scope.valueDescription = "Posicao";	
	scope.corHex = CG.colors.corPecasCruz;
	scope.tipoEncaixe = ETiposEncaixe.CRUZ;
	
	//eventos abstratos
	//@Override
	scope.onChange = function () { throw new Error ("fun��o onChange n�o implemenada!");  }; //evento ser� executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	//@Override
	scope.onAddFilho = function ( item ) { throw new Error ("fun��o onAddFilho n�o implemenada!");  }; //evento ser� executado quando um filho for adicionado
	//@Override
	scope.onRemoveFilho = function ( item ) { throw new Error ("fun��o onRemoveFilho n�o implemenada!");  }; //evento ser� executado quando um filho for removido
	//@Override
	scope.onChangeFilhos = function ( filho )  { throw new Error ("fun��o onChangeFilhos n�o implemenada!");  }; //evento ser� executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	//@Override
	scope.afterChangeNome = function ( nomeAntigo ) { throw new Error ("fun��o afterChangeNome n�o implemenada!");  }; //evento ser� executado quando o nome do item for alterado
	
	//implementacao
	
	//@Override
	scope.gerarShapeEncaixeItem = function ( ) {
		return CG.objects.generateShapeEncaixeCruz() ;
	};
	
	scope.gerarMeshsPecaSuperior();

	
}

AItemEditorEncaixeCruz.prototype = Object.create( AItemEditor.prototype );


