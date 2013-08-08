function PainelFabricaEditor( editor, signals ) {
	
	THREE.Object3D.call( this );
	
	var scope = this;
	
	//propriedades
	
	if	( !(editor instanceof Editor) ) {
		throw new Error ( "argumento deve ser da classe Editor !" );	
	}
	scope.editor = editor;
	
	//implementacao	
	
	//lixeira 
	
	scope.lixeira = new Lixeira();	
	scope.lixeira.addMeshsIntersectedObjectsList( scope.editor.intersectableObjectsList );
	scope.add( scope.lixeira.objeto );
	
	//fundo fabrica
	
	scope.painelHeight = 200;
	var squareShape = new THREE.Shape();
	squareShape.moveTo( 0,1 );
	squareShape.lineTo( 0, 0);
	squareShape.lineTo( 600, 0 );
	squareShape.lineTo( 600, -scope.painelHeight  );
	squareShape.lineTo( 0, -scope.painelHeight  );	
	scope.meshPainelFundoFabrica = CG.objects.addRetangulo( scope, squareShape, CG.colors.corPainel, 0, 0, 2, 0, 0, 0, 1, true, CG.colors.corContorno);
	scope.meshPainelFundoFabrica.encaixe = scope.lixeira;
	scope.meshPainelFundoFabrica.encaixe.tipoEncaixe = ETiposEncaixe.ENCAIXE_LIXEIRA;
	scope.editor.intersectableObjectsList.push( scope.meshPainelFundoFabrica );
	
	//fabrica itens 	
	
	scope.fabrica = new Fabrica();
	
	var painelItems = new THREE.Object3D();
	scope.add(painelItems);	
	
	
	
	scope.criaNovoItemFabrica = function ( idItem, x, y, z, inserirNaLista ) {
	
		var item = scope.fabrica.fabricarNovoItem( idItem, inserirNaLista );		
		item.objeto.position.set( x, y, z );		
	    item.addMeshsIntersectedObjectsList( scope.editor.intersectableObjectsList );
		painelItems.add( item.objeto );
		item.grupoPai = painelItems;
		
		return item;
		
	}
	
	scope.criaNovoItemFabrica( EIdsItens.CAMERA, 0, 0, 4, true );
	scope.criaNovoItemFabrica( EIdsItens.OBJETOGRAFICO, 0, 0, 4, true );	
	scope.criaNovoItemFabrica( EIdsItens.CUBO, 0, 0, 4, true );
	scope.criaNovoItemFabrica( EIdsItens.TRANSLADAR, 0, 0, 4, true );
	scope.criaNovoItemFabrica( EIdsItens.ROTACIONAR, 0, 0, 4, true );
	scope.criaNovoItemFabrica( EIdsItens.REDIMENSIONAR, 0, 0, 4, true );
		
		
	signals.windowResize.add( function ( object ) {
	
		var x = scope.editor.pontoInicial.x + Util.math.getGraphicValue( scope.editor.dom.offsetWidth ) - 42;
		var y = scope.editor.pontoInicial.y - scope.painelHeight + 7;
		scope.lixeira.objeto.position.set( x, y, 5 );
		
		if	(scope.meshPainelFundoFabrica.position.x !== scope.editor.pontoInicial.x) {
		
			scope.meshPainelFundoFabrica.position.x = scope.editor.pontoInicial.x;
			scope.meshPainelFundoFabrica.position.y = scope.editor.pontoInicial.y;
			scope.meshPainelFundoFabrica.contorno.position.copy(scope.meshPainelFundoFabrica.position);
			
			var xItem = scope.editor.pontoInicial.x + 20;
			var yItem = scope.editor.pontoInicial.y - 22;
			var distanciaEntreItens = 29;

			for (var i = 0; i < scope.fabrica.itens.length; i++) {
			
				scope.fabrica.itens[i].objeto.position.x = xItem;
				scope.fabrica.itens[i].objeto.position.y = yItem;
				
				yItem -= distanciaEntreItens;
				
			}	
			
		}

	} );	
		
		
}

PainelFabricaEditor.prototype = Object.create( THREE.Object3D.prototype );