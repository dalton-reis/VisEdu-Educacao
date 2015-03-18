/**
 * Painel onde são exibidas os item que podem ser adicionados no renderizador
 */
function PainelFabrica( editor, signals ) {

	THREE.Object3D.call( this );

	var scope = this;

	//propriedades

	if ( !(editor instanceof Editor) ) {
		throw new Error ( "argumento deve ser da classe Editor !" );
	}
	scope.editor = editor;

	//implementacao

	//lixeira

	scope.lixeira = new Lixeira();
	scope.lixeira.addMeshsIntersectedObjectsList( scope.editor.intersectableObjectsList );
	scope.add( scope.lixeira.objeto );

	//fundo fabrica

	scope.painelHeight = 215;
	var squareShape = new THREE.Shape();
	squareShape.moveTo( 0,1 );
	squareShape.lineTo( 0, 0);
	squareShape.lineTo( 600, 0 );
	squareShape.lineTo( 600, -scope.painelHeight  );
	squareShape.lineTo( 0, -scope.painelHeight  );
	var meshPainelFundoFabrica = CG.objects.addRetangulo( scope, squareShape, CG.colors.corPainel, 0, 0, 2, 0, 0, 0, 1, true, CG.colors.corContorno);
	meshPainelFundoFabrica.encaixe = scope.lixeira;
	meshPainelFundoFabrica.encaixe.tipoEncaixe = ETiposEncaixe.LIXEIRA;
	scope.editor.intersectableObjectsList.push( meshPainelFundoFabrica );

	//fabrica itens

	scope.fabrica = new FabricaDeItens();

	var grupoItems = new THREE.Object3D();
	scope.add(grupoItems);


	var inserirItemFabrica = function ( idItem, x, y, z, inserirNaLista ) {
		var item = scope.fabrica.fabricarNovoItem( idItem, inserirNaLista );
		item.objeto.position.set( x, y, z );
	    	item.addMeshsIntersectedObjectsList( scope.editor.intersectableObjectsList );
		grupoItems.add( item.objeto );
		item.grupoPai = grupoItems;
		return item;
	};

	inserirItemFabrica( EIdsItens.CAMERA, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.OBJETOGRAFICO, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.CUBO, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.POLIGONO, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.SPLINE, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.DRONE, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.TARGET, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.TRANSLADAR, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.ROTACIONAR, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.REDIMENSIONAR, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.ILUMINACAO, 0, 0, 4, true );
	inserirItemFabrica( EIdsItens.ANIMACAO, 0, 0, 4, true );

	scope.fabricarNovoItem = function ( idItem, x, y, z ) {

		return inserirItemFabrica(idItem, x, y, z, false);

	};
	signals.windowResize.add( function ( object ) {

		var x = scope.editor.pontoInicial.x + Util.math.getGraphicValue( scope.editor.dom.offsetWidth ) - 42;
		var y = scope.editor.pontoInicial.y - scope.painelHeight + 7;
		scope.lixeira.objeto.position.set( x, y, 5 );

		if (meshPainelFundoFabrica.position.x !== scope.editor.pontoInicial.x) {

			meshPainelFundoFabrica.position.x = scope.editor.pontoInicial.x;
			meshPainelFundoFabrica.position.y = scope.editor.pontoInicial.y;
			meshPainelFundoFabrica.contorno.position.copy(meshPainelFundoFabrica.position);

			var xItem = scope.editor.pontoInicial.x + 20;
			var yItem = scope.editor.pontoInicial.y - 22;
			var distanciaEntreItens = 29;

			var xQuadrado = 0;

			for (var i = 0; i < scope.fabrica.itensFabricados.length; i++) {

				if (scope.fabrica.itensFabricados[i].id == EIdsItens.POLIGONO || scope.fabrica.itensFabricados[i].id == EIdsItens.SPLINE
					|| scope.fabrica.itensFabricados[i].id == EIdsItens.DRONE || scope.fabrica.itensFabricados[i].id == EIdsItens.TARGET) {
					scope.fabrica.itensFabricados[i].objeto.position.x = scope.editor.pontoInicial.x + (xQuadrado += 100);
					scope.fabrica.itensFabricados[i].objeto.position.y = scope.editor.pontoInicial.y - 22 - (distanciaEntreItens * 2);
				} else if (scope.fabrica.itensFabricados[i].id == EIdsItens.ROTACIONAR) {
					scope.fabrica.itensFabricados[i].objeto.position.x = scope.editor.pontoInicial.x + 132;
					scope.fabrica.itensFabricados[i].objeto.position.y = scope.editor.pontoInicial.y - 22 - (distanciaEntreItens * 3);
				} else if (scope.fabrica.itensFabricados[i].id == EIdsItens.REDIMENSIONAR) {
					scope.fabrica.itensFabricados[i].objeto.position.x = scope.editor.pontoInicial.x + 244;
					scope.fabrica.itensFabricados[i].objeto.position.y = scope.editor.pontoInicial.y - 22 - (distanciaEntreItens * 3);
				} else if(scope.fabrica.itensFabricados[i].id == EIdsItens.ANIMACAO ){
					scope.fabrica.itensFabricados[i].objeto.position.x = scope.editor.pontoInicial.x + 132;
					scope.fabrica.itensFabricados[i].objeto.position.y = scope.editor.pontoInicial.y - 22 - (distanciaEntreItens * 4);
				} else {
					scope.fabrica.itensFabricados[i].objeto.position.x = xItem;
					scope.fabrica.itensFabricados[i].objeto.position.y = yItem;

					yItem -= distanciaEntreItens;
				}
			}
		}
	} );
}

PainelFabrica.prototype = Object.create( THREE.Object3D.prototype );
