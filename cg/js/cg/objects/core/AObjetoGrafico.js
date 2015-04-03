/**
 * CLASSE ABSTRATA - O que for undefined deve ser setado nas classes filhos
 *
 */

AObjetoGrafico = function  () {
	var scope = this;

	//PROPRIEDADES
	scope.codigo             = AObjetoGraficoCodigoCount++;
	scope.id                 = undefined;
	scope.enableChangeEvents = true;
	scope.tamanhoPadrao      = undefined;
	scope.tamanhoFilhos      = undefined;

	scope.pai    = null;
	scope.filhos = [];

	scope.objeto         = new THREE.Object3D();
	scope.objetoDetalhes = new THREE.Object3D();
	scope.objeto.add(scope.objetoDetalhes);

	scope.insertectableMeshs = [];


	//EVENTOS ABSTRATOS

	scope.onChange = function () { throw new Error ("função onChange não implemenada!");  }; //evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	scope.onAddFilho = function ( objeto ) { throw new Error ("função onAddFilho não implemenada!");  }; //evento será executado quando um filho for adicionado
	scope.onRemoveFilho = function ( objeto ) { throw new Error ("função onRemoveFilho não implemenada!");  }; //evento será executado quando um filho for removido
	scope.onChangeFilhos = function ( filho ) { throw new Error ("função onChangeFilhos não implemenada!");  }; //evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	scope.onChangeFilhosSuper = function () { //funcao para chamar onChangeFilhos classe pai

		if (scope.pai) {
			if (scope.pai.onChangeFilhos !== undefined) {
				scope.pai.onChangeFilhos( scope );
			}
		}
	};

	//FUNCOES
	scope.add = function (objeto) {
		//não pode existir mais de um item animação em um memso objeto gráfico
		if( scope.isAnimated && objeto.id == EIdsItens.ANIMACAO ){
			alert(CG.msgs.somenteUmaAnimacaoPorObjGrafico);
			return;
		}
		scope.filhos.push(objeto);

		scope.filhos.sort( function(x, y) { return( x.tipoEncaixe.seq - y.tipoEncaixe.seq); } ); //ordena os filhos no array pelo tipo de encaixe

		objeto.pai = scope;
		scope.tamanhoFilhos += objeto.getSize();

		if (scope.onAddFilho !== undefined) {
			scope.onAddFilho(objeto);
		}

		if (scope.enableChangeEvents) {
			if (scope.onChange !== undefined) {
				scope.onChange();
			}
			scope.onChangeFilhosSuper();
		}
	};

	scope.remove = function (objeto) {

		var index = scope.filhos.indexOf(objeto);
		if (index < 0) {
			return false;
		}

		scope.filhos.splice(index, 1); //remove do array
		scope.tamanhoFilhos -= objeto.getSize();

		if (scope.onRemoveFilho !== undefined) {
			scope.onRemoveFilho(objeto);
		}

		if (scope.enableChangeEvents) {
			if (scope.onChange !== undefined) {
				scope.onChange();
			}

			scope.onChangeFilhosSuper();
			objeto.pai = null;
		}

		return true;
	};

	scope.clearFilhos = function () {
		var filho;

		for (var i = 0; i < scope.filhos.length; i++) {
			filho     = scope.filhos[i];
			filho.pai = null;

			if (scope.onRemoveFilho !== undefined) {
				scope.onRemoveFilho(filho);
			}
		}

		scope.filhos.length = 0; //limpa lista

		if (scope.enableChangeEvents) {
			if (scope.onChange !== undefined) {
				scope.onChange();
			}

			scope.onChangeFilhosSuper();
		}
		scope.recalculaTamanhoFilhos();
	};

	scope.esconderDetalhes = function () {
		scope.objeto.remove(scope.objetoDetalhes);
	};

	scope.mostrarDetalhes = function () {
		scope.objeto.add(scope.objetoDetalhes);
	};

	scope.addMeshsIntersectedObjectsList = function (list) {
		for (var i = 0; i < scope.insertectableMeshs.length; i++) {
			list.push( scope.insertectableMeshs[i] );
		}
	};

	scope.removeMeshsIntersectedObjectsList = function (list) {
		var index;
		for (var i = 0; i < scope.insertectableMeshs.length; i++) {
			index = list.indexOf(scope.insertectableMeshs[i]);

			if (index >=  0) {
				//remove do array
				list.splice(index, 1);
			}
		}
	};

	scope.setMeshsColor = function (color) {
		for (var i = 0; i < scope.insertectableMeshs.length; i++) {
			if (scope.insertectableMeshs[i].changeColor) {
				scope.insertectableMeshs[i].material.color.setHex( color );
			}
		}
	};

	scope.setMeshsEmissiveColor = function (color) {

		for (var i = 0; i < scope.insertectableMeshs.length; i++) {
			if (scope.insertectableMeshs[i].changeColor) {
				if (scope.insertectableMeshs[i].material.emissive !== undefined && scope.insertectableMeshs[i].material.emissive) {
					scope.insertectableMeshs[i].material.emissive.setHex( color );
				}
			}
		}
	};

	scope.addIntersectableMesh = function (mesh, changeColor, selectable) {
		mesh.item        = scope;
		mesh.changeColor = (changeColor !== undefined) ? changeColor : true;
		mesh.selectable  = (selectable !== undefined) ? selectable : true;
		scope.insertectableMeshs.push(mesh);
	};

	scope.getSize = function () {
		return scope.tamanhoPadrao + scope.tamanhoFilhos;
	};

	scope.recalculaTamanhoFilhos = function () {
		var tamanho = 0;

		for (var i = 0; i < scope.filhos.length; i++) {
			tamanho += (scope.filhos[i].getSize() + Util.math.espacoEntreObjetos);
		}
		tamanho += Util.math.espacoEntreObjetos;
		scope.tamanhoFilhos = tamanho;
	};

	scope.update = function ( ) {

		if (scope.onChange !== undefined) {
			scope.onChange();
		}
		scope.onChangeFilhosSuper();
	};
};

AObjetoGraficoCodigoCount = 0;
