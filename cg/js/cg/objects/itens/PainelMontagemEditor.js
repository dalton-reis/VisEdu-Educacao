
function PainelMontagemEditor ( editor, signals ) {

	aItemEditor.call( this ); 

	var scope = this;
	
	//propriedades
	
	if	( !(editor instanceof Editor) ) {
		throw new Error ( "argumento deve ser da classe Editor !" );	
	}
	scope.editor = editor;
		
	scope.id = EIdsItens.PAINELMONTAGEMEDITOR;
	scope.nome = EIdsItens.PAINELMONTAGEMEDITOR.descricao;
	scope.changeVisibility = false;	
	scope.changeCursor = true; 	
	scope.corHex = CG.colors.corPainel;
	scope.corLimpar = new THREE.Color();
	scope.corLimpar.setHex ( 0x000000 );
	scope.nomeReadOnly = true;
	scope.tamanhoPadrao = 20;
	scope.tamanhoFilhos = 0;

	//implementacao
		
		
	//OBJETOS CABEÇALHO	
	
	//cria bloco base esquerada
		
	var points = [];	
	points.push( new THREE.Vector2 (    0,     0 ) );
	points.push( new THREE.Vector2 (  120,     0 ) );
	points.push( new THREE.Vector2 (  120,    -20 ) );
	points.push( new THREE.Vector2 (   20,    -20 ) );
	points.push( new THREE.Vector2 (   20, -9999 ) );
	points.push( new THREE.Vector2 (    0, -9999 ) );
	var squareShape = new THREE.Shape( points );
    var meshBlocoInicio = CG.objects.addRetangulo( scope.objeto, squareShape, CG.colors.corPainel, 0, 0, 0, 0, 0, 0, 1, true, CG.colors.corContorno );	
	scope.addIntersectableMesh(meshBlocoInicio);
	
	//cria label descritiva "Inicio"	

	var meshTexto = CG.objects.generateTextMesh( scope.nome, CG.colors.corTexto );
	var scale = 0.35;
	meshTexto.scale.set( scale, scale, scale );	
	scope.objeto.add(meshTexto);
	
	
	
	//OBJETOS DETALHES	
	
	
	//ENCAIXE CRUZ
	
	scope.objetoCruz = new THREE.Object3D();
	scope.objetoDetalhes.add(scope.objetoCruz);
	
	//cria fundo cruz 
	
	squareShape = new THREE.Shape();
	squareShape.moveTo( 0,0 );
	squareShape.lineTo( 0, 20 );
	squareShape.lineTo( 200, 20 );
	squareShape.lineTo( 200, 0 );
	squareShape.lineTo( 0, 0 );	
	var meshFundoCruz = CG.objects.addRetangulo( scope.objetoCruz, squareShape, CG.colors.corFundo, 0, 0, -1, 0, 0, 0, 1 );
	meshFundoCruz.visible = false;
	scope.addIntersectableMesh(meshFundoCruz, false);	
	scope.objetoCruz.add(meshFundoCruz);	
	
	//cria encaixe cruz 	

	generateCruz = function() {				
		
		var mesh = CG.objects.generateMeshFromShape( CG.objects.generateShapeCruz(), CG.colors.corEncaixes );	
		mesh.position.set( Util.math.espacoEntreObjetos-3, 2, 0 );
		mesh.rotation.set( 0, 0, 0 );
		var scale = 0.2;
		mesh.scale.set( scale, scale, scale );
		return mesh;
		
	}	
	scope.meshCruz = generateCruz();		
	meshFundoCruz.encaixe = scope.meshCruz; //relaciona a seta com o fundo
	meshFundoCruz.encaixe.tipoEncaixe = ETiposEncaixe.CRUZ;
	meshFundoCruz.encaixe.possuiItem = false;
	scope.objetoCruz.add(scope.meshCruz);
	
	
		
		
	//ENCAIXE SETA	
		
	//cria fundo seta
	
	scope.objetoSeta = new THREE.Object3D();
	scope.objetoDetalhes.add(scope.objetoSeta);
		
				
	squareShape = new THREE.Shape();
	squareShape.moveTo( 0,0 );
	squareShape.lineTo( 0, 20 );
	squareShape.lineTo( 200, 20 );
	squareShape.lineTo( 200, 0 );
	squareShape.lineTo( 0, 0 );	
	var meshFundoSeta = CG.objects.addRetangulo( scope.objetoSeta, squareShape, CG.colors.corFundo, 0, 0, -1, 0, 0, 0, 1 );
	meshFundoSeta.visible = false;
	scope.addIntersectableMesh(meshFundoSeta, false);	
	scope.objetoSeta.add(meshFundoSeta);	
	
	//cria encaixe seta 

	generateSeta = function() {				
		
		var mesh = CG.objects.generateMeshFromShape( CG.objects.generateShapeSeta(), CG.colors.corEncaixes );	
		mesh.position.set( Util.math.espacoEntreObjetos-1, 2, 0 );
		mesh.rotation.set( 0, 0, 0 );
		var scale = 0.2;
		mesh.scale.set( scale, scale, scale );
		return mesh;
		
	}	
	mesh = generateSeta();		
	meshFundoSeta.encaixe = mesh; //relaciona a seta com o fundo
	meshFundoSeta.encaixe.tipoEncaixe = ETiposEncaixe.SETA;
	scope.objetoSeta.add(mesh);
	
	
	
	
	
	scope.onAddFilho = function ( item ) {	
		
		if	( !(item instanceof aItemEditor) )
			throw new Error ("objeto deve ser do tipo aItemEditor!");
			
		var meshPai;
		var positionObj;
		if (item.tipoEncaixe == ETiposEncaixe.SETA) {
			//gera nova seta 
			var mesh = generateSeta();
			scope.objetoDetalhes.add(mesh);
			mesh.position.set(	scope.objetoSeta.position.x+3 ,
								scope.objetoSeta.position.y+1 ,
								scope.objetoSeta.position.z  );	
								
					
			meshPai	= mesh;	
			positionObj = scope.objetoSeta;
								
		} else if (item.tipoEncaixe == ETiposEncaixe.CRUZ) {			
									
			meshPai = scope.meshCruz;
			positionObj = scope.objetoCruz;
			scope.objetoCruz.possuiItem = true;	
			
		}
		
		//adiciona objeto ao encaixe			
		scope.objetoDetalhes.add(item.objeto); //para imprimir
		item.grupoPai = scope.objetoDetalhes;	
		item.encaixePai = meshPai;		
		item.objeto.position.set(	positionObj.position.x+Util.math.espacoEntreObjetos,
									positionObj.position.y-20 ,
									positionObj.position.z  );		
					
		item.mostrarDetalhes();		
		
	}
	
	scope.onChange = function() {
	
		var filho;	
			
		var novoY = getYBase() - 20 - Util.math.espacoEntreObjetos;	

		//reposiciona encaixe quadrado
		var yCruz = novoY;
		new TWEEN.Tween( scope.objetoCruz.position ).to( {
						x: scope.objetoCruz.position.x,
						y: yCruz-20,
						z: scope.objetoCruz.position.z }, 1000 )
					.easing( TWEEN.Easing.Elastic.Out).start();
		novoY -= 20 + Util.math.espacoEntreObjetos;	
			
		var	novoXseta = scope.objetoCruz.position.x;
		
		for (var i = 0; i < scope.filhos.length; i++) {
		
			filho = scope.filhos[i];
			
			if (filho.tipoEncaixe == ETiposEncaixe.SETA) {
			
				
				new TWEEN.Tween( filho.objeto.position ).to( {
								x: novoXseta,
								y: novoY,
								z: filho.objeto.position.z }, 1000 )
							.easing( TWEEN.Easing.Elastic.Out).start();
							
				new TWEEN.Tween( filho.encaixePai.position ).to( {
								x: novoXseta,
								y: novoY - 18,
								z: filho.encaixePai.position.z }, 1000 )
							.easing( TWEEN.Easing.Elastic.Out).start();	
				
				novoY -= filho.getSize() + Util.math.espacoEntreObjetos;
				
			} else if (filho.tipoEncaixe == ETiposEncaixe.CRUZ) {
			
				new TWEEN.Tween( filho.objeto.position ).to( {
							x: scope.objetoCruz.position.x,
							y: yCruz,
							z: scope.objetoCruz.position.z }, 1000 )
						.easing( TWEEN.Easing.Elastic.Out).start();
						
			}
			
			
			
		}				
		
		//move seta para nova posicao 
		novoY -= 19;
		new TWEEN.Tween( scope.objetoSeta.position ).to( {
						x: scope.objetoSeta.position.x,
						y: novoY,
						z: scope.objetoSeta.position.z }, 1000 )
					.easing( TWEEN.Easing.Elastic.Out).start();					
					
		scope.editor.notificarOnChageItems();			
					
	}
	
	scope.onChangeFilhos = function ( filhoChanged ) {	
		
		scope.recalculaTamanhoFilhos();
		scope.onChange();		
		
	}
	
	scope.onRemoveFilho = function ( item ) { 
		
		if (item.tipoEncaixe == ETiposEncaixe.CRUZ) {
			scope.objetoCruz.possuiItem = false;
		} else {
			scope.objetoDetalhes.remove(item.encaixePai);			
		}
		
		scope.objetoDetalhes.remove(item.objeto);
		
	}	
	
	function getYBase() {
		return scope.editor.pontoInicial.y - scope.editor.painelFabricaEditor.painelHeight - Util.math.espacoEntreObjetos
	}
	
	signals.windowResize.add( function ( event ) {		
		
		if	(meshBlocoInicio.position.x !== scope.editor.pontoInicial.x) {
		
			var xBase = scope.editor.pontoInicial.x;
			var yBase = getYBase();
			var zBase = 0;
			
			meshBlocoInicio.position.set( xBase, yBase, zBase );			
			meshBlocoInicio.contorno.position.copy(meshBlocoInicio.position);	
			
			meshTexto.position.set( xBase+26, yBase-15, zBase );
			
			scope.objetoCruz.position.set( xBase+21+Util.math.espacoEntreObjetos, yBase-40-Util.math.espacoEntreObjetos, zBase-2 );
			
			scope.objetoSeta.position.set( xBase+18+Util.math.espacoEntreObjetos, yBase-60-Util.math.espacoEntreObjetos, zBase-2 );
			
			scope.onChange();
			
		}

	} );
	
	scope.addMeshsIntersectedObjectsList( scope.editor.intersectableObjectsList );
	
	
		
};


PainelMontagemEditor.prototype = Object.create( aItemEditor.prototype );


