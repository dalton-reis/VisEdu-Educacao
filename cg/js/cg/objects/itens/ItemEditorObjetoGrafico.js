
ItemEditorObjetoGrafico = function() {		

	aItemEditorEncaixeSeta.call( this ); 
	
	var scope = this;
	
	//propriedades
	
	scope.id = EIdsItens.OBJETOGRAFICO;
	scope.tamanhoPadrao = 85 + ( Util.math.espacoEntreObjetos * 4 );
	
	//implementacao
	
	
	
	//OBJETOS DETALHES
	
	
	scope.meshPecaLateral = null;
	scope.meshPecaInferior = null;
	scope.meshFundoDiamanteInferior = null;
	scope.meshDiamanteInferior = null;
	scope.meshFundoQuadradoInferior = null;
	scope.meshQuadradoInferior = null;
	scope.meshFundoSetaInferior = null;
	scope.meshSetaInferior = null;
	
	var squareShape, geometria, material, mesh;
	
	//cria peca lateral	
	
	var points = [];	
	points.push( new THREE.Vector2 ( 0,  0 ) );
	points.push( new THREE.Vector2 ( 6,  0 ) );
	points.push( new THREE.Vector2 ( 6, -1 ) );
	points.push( new THREE.Vector2 ( 0, -1 ) );
	squareShape = new THREE.Shape( points );	
	geometria = new THREE.ShapeGeometry( squareShape );
	material = CG.objects.generateMaterialItems( CG.colors.corPecasSeta );	
	scope.meshPecaLateral = new THREE.Mesh( geometria, material );
	scope.meshPecaLateral.position.set( 0, -20, 0 );	
	scope.meshPecaLateral.scale.set( 1, 60 +( 4 * Util.math.espacoEntreObjetos ), 1 );
	scope.objetoDetalhes.add(scope.meshPecaLateral);
	scope.addIntersectableMesh(scope.meshPecaLateral);
		
	//cria peca inferior
	
	squareShape = new THREE.Shape();
	var points = [];	
	points.push( new THREE.Vector2 ( 0,  0 ) );
	points.push( new THREE.Vector2 ( 1,  0 ) );
	points.push( new THREE.Vector2 ( 1, -5 ) );
	points.push( new THREE.Vector2 ( 0, -5 ) );
	squareShape = new THREE.Shape( points );	
	geometria = new THREE.ShapeGeometry( squareShape );
	material = CG.objects.generateMaterialItems( CG.colors.corPecasSeta );	
	scope.meshPecaInferior = new THREE.Mesh( geometria, material );	
	scope.meshPecaInferior.position.set(0, -80-(4*Util.math.espacoEntreObjetos), 0);
	scope.meshPecaInferior.scale.x = scope.largura;
	scope.objetoDetalhes.add(scope.meshPecaInferior);	
	scope.addIntersectableMesh(scope.meshPecaInferior);
	
	
	//ENCAIXE DIAMANTE
	
	scope.objetoDiamante = new THREE.Object3D();
	scope.objetoDetalhes.add(scope.objetoDiamante);
	
	//cria fundo encaixe diamante peca inferior
	
	squareShape = new THREE.Shape();
	squareShape.moveTo( 4, -19 );
	squareShape.lineTo( 5, 0 );
	squareShape.lineTo( 150, 0 );
	squareShape.lineTo( 150, -20 );
	squareShape.lineTo( 5, -20 );	
	geometria = new THREE.ShapeGeometry( squareShape );
	material = CG.objects.generateMaterialItems( CG.colors.corFundo );	
	scope.meshFundoDiamanteInferior = new THREE.Mesh( geometria, material );
	scope.meshFundoDiamanteInferior.visible = false;
	scope.objetoDiamante.add(scope.meshFundoDiamanteInferior);
	scope.addIntersectableMesh(scope.meshFundoDiamanteInferior, false);
	
	//cria encaixe diamante peca inferior
	
	generateDimanteOG = function() {	
		
		var squareShape = CG.objects.generateShapeDiamante();	
		var geometria = new THREE.ShapeGeometry( squareShape );
		var material = CG.objects.generateMaterialItems( CG.colors.corEncaixes );
		var mesh = new THREE.Mesh( geometria, material );	
		mesh.position.set( 6 + Util.math.espacoEntreObjetos, -18, 0 );
		mesh.rotation.set( 0, 0, 0 );
		var scale = 0.2;
		mesh.scale.set( scale, scale, scale );
		return mesh;
		
	}	
	scope.meshDiamanteInferior = generateDimanteOG();
	scope.meshFundoDiamanteInferior.encaixe = scope.meshDiamanteInferior;//relaciona a seta com o fundo
	scope.meshFundoDiamanteInferior.encaixe.tipoEncaixe = ETiposEncaixe.DIAMANTE;
	scope.objetoDiamante.add(scope.meshDiamanteInferior);
	
	scope.objetoDiamante.position.set( 0, -20 - Util.math.espacoEntreObjetos, -1 );
	
	
	
	//ENCAIXE QUADRADO
	
	scope.objetoQuadrado = new THREE.Object3D();
	scope.objetoDetalhes.add(scope.objetoQuadrado);
	
	//cria fundo encaixe quadrado peca inferior
	
	squareShape = new THREE.Shape();
	squareShape.moveTo( 0, 0 );
	squareShape.lineTo( 5, 0 );
	squareShape.lineTo( 150, 0 );
	squareShape.lineTo( 150, -20 );
	squareShape.lineTo( 5, -20 );	
	geometria = new THREE.ShapeGeometry( squareShape );
	material = CG.objects.generateMaterialItems( CG.colors.corFundo );	
	scope.meshFundoQuadradoInferior = new THREE.Mesh( geometria, material );
	scope.meshFundoQuadradoInferior.visible = false;	
	scope.objetoQuadrado.add(scope.meshFundoQuadradoInferior);
	scope.addIntersectableMesh(scope.meshFundoQuadradoInferior, false);
	
	//cria encaixe quadrado peca inferior
	
	generateQuadradoOG = function() {	
		
		var squareShape = CG.objects.generateShapeQuadrado();	
		var geometria = new THREE.ShapeGeometry( squareShape );
		var material = CG.objects.generateMaterialItems( CG.colors.corEncaixes );
		var mesh = new THREE.Mesh( geometria, material );	
		mesh.position.set( 6 + Util.math.espacoEntreObjetos, -18, 0 );
		mesh.rotation.set( 0, 0, 0 );
		var scale = 0.2;
		mesh.scale.set( scale, scale, scale );
		return mesh;
		
	}			
	scope.meshQuadradoInferior = generateQuadradoOG();	
	scope.meshFundoQuadradoInferior.encaixe = scope.meshQuadradoInferior; //relaciona a seta com o fundo
	scope.meshFundoQuadradoInferior.encaixe.tipoEncaixe = ETiposEncaixe.QUADRADO;
	scope.meshFundoQuadradoInferior.encaixe.possuiItem = false;	
	scope.objetoQuadrado.add(scope.meshQuadradoInferior);
	
	scope.objetoQuadrado.position.set( 0, -40 - (2*Util.math.espacoEntreObjetos), -1 );
	
	
	
	//ENCAIXE SETA
	
	scope.objetoSeta = new THREE.Object3D();
	scope.objetoDetalhes.add(scope.objetoSeta);
	
	//cria fundo encaixe seta peca inferior	
	
	squareShape = new THREE.Shape();
	squareShape.moveTo( 0, 0 );
	squareShape.lineTo( 5, 0 );
	squareShape.lineTo( 150, 0 );
	squareShape.lineTo( 150, -20 );
	squareShape.lineTo( 5, -20 );	
	geometria = new THREE.ShapeGeometry( squareShape );
	material = CG.objects.generateMaterialItems( CG.colors.corFundo );	
	scope.meshFundoSetaInferior = new THREE.Mesh( geometria, material );
	scope.meshFundoSetaInferior.visible = false;		
	scope.objetoSeta.add(scope.meshFundoSetaInferior);
	scope.addIntersectableMesh(scope.meshFundoSetaInferior, false);	
	
	//cria encaixe seta peca inferior	
	
	generateSetaOG = function() {	
	
		var shapeSetaDireita = CG.objects.generateShapeSeta();	
		var geometria = new THREE.ShapeGeometry( shapeSetaDireita );
		var material = CG.objects.generateMaterialItems( CG.colors.corEncaixes );
		var mesh = new THREE.Mesh( geometria, material );	
		mesh.position.set( 6 + Util.math.espacoEntreObjetos, -17, 0 );
		mesh.rotation.set( 0, 0, 0 );
		var scale = 0.2;
		mesh.scale.set( scale, scale, scale );
		return mesh;
		
	}
	scope.meshSetaInferior = generateSetaOG();		
	scope.meshFundoSetaInferior.encaixe = scope.meshSetaInferior; //relaciona a seta com o fundo
	scope.meshFundoSetaInferior.encaixe.tipoEncaixe = ETiposEncaixe.SETA;
	scope.objetoSeta.add(scope.meshSetaInferior);	
	
	scope.objetoSeta.position.set( 0, -60 - (3*Util.math.espacoEntreObjetos), -1 );
	
	
	
	scope.onAddFilho = function ( item ) {	
	
		var mesh;
		
		if	(item.tipoEncaixe == ETiposEncaixe.SETA) {
		
			//gera nova seta e mova para a direita
			mesh = generateSetaOG();
			scope.objetoDetalhes.add(mesh);			
			mesh.position.set(	scope.objetoSeta.position.x + 7 + Util.math.espacoEntreObjetos,
								scope.objetoSeta.position.y - 18 ,
								scope.objetoSeta.position.z  );						
			
			item.objeto.position.set(	scope.objetoSeta.position.x + 7 + Util.math.espacoEntreObjetos,
										scope.objetoSeta.position.y - 20,
										scope.objetoSeta.position.z  );	
			
		} else if (item.tipoEncaixe == ETiposEncaixe.QUADRADO) {		
		
			
			item.objeto.position.set(	scope.objetoQuadrado.position.x + 7 + Util.math.espacoEntreObjetos,
										scope.objetoQuadrado.position.y - 20,
										scope.objetoQuadrado.position.z  );													
											
			mesh = scope.meshQuadradoInferior;
			mesh.possuiItem = true;			
			
		} else if (item.tipoEncaixe == ETiposEncaixe.DIAMANTE) {
		
			//gera nova seta e mova para a direita
			mesh = generateDimanteOG();			
			scope.objetoDetalhes.add(mesh);
			
			mesh.position.set(	scope.objetoDiamante.position.x + 6 + Util.math.espacoEntreObjetos,
								scope.objetoDiamante.position.y - 18 ,
								scope.objetoDiamante.position.z  );
			
			item.objeto.position.set(	scope.objetoDiamante.position.x + 7 + Util.math.espacoEntreObjetos,
										scope.objetoDiamante.position.y - 20,
										scope.objetoDiamante.position.z  );
			
		}
		
		//adiciona objeto ao encaixe					
		scope.objetoDetalhes.add(item.objeto); 
		item.encaixePai = mesh;
		item.grupoPai = scope.objetoDetalhes; //para imprimir
		
		
	
		item.mostrarDetalhes();		
		
	}
	
	scope.onChange = function () {
		var filho, 
			novoY = -22 - Util.math.espacoEntreObjetos;			
		scope.tamanhoFilhos = 0;
		
		//processa filhos do tipo de encaixe DIAMANTE
		for (var i = 0; i < scope.filhos.length; i++) {
		
			filho = scope.filhos[i];
			
			if (filho.tipoEncaixe == ETiposEncaixe.DIAMANTE) {
			
				new TWEEN.Tween( filho.objeto.position ).to( {
								x: scope.objetoDiamante.position.x + 7 + Util.math.espacoEntreObjetos,
								y: novoY,
								z: filho.objeto.position.z }, 1000 )
							.easing( TWEEN.Easing.Elastic.Out).start();
				
				new TWEEN.Tween( filho.encaixePai.position ).to( {
								x: scope.objetoDiamante.position.x + 7 + Util.math.espacoEntreObjetos,
								y: novoY - 18,
								z: filho.encaixePai.position.z }, 1000 )
							.easing( TWEEN.Easing.Elastic.Out).start();	
							
				scope.tamanhoFilhos += (filho.getSize() + Util.math.espacoEntreObjetos);
				novoY -= filho.getSize() + Util.math.espacoEntreObjetos;
				
			} 			
			
		}
		
		//reposiciona encaixe diamante
		new TWEEN.Tween( scope.objetoDiamante.position ).to( {
						x: scope.objetoDiamante.position.x,
						y: novoY,
						z: scope.objetoDiamante.position.z }, 1000 )
					.easing( TWEEN.Easing.Elastic.Out).start();
		novoY -= 20 + Util.math.espacoEntreObjetos;

		//reposiciona encaixe quadrado
		var yQuadrado = novoY;
		new TWEEN.Tween( scope.objetoQuadrado.position ).to( {
						x: scope.objetoQuadrado.position.x,
						y: novoY,
						z: scope.objetoQuadrado.position.z }, 1000 )
					.easing( TWEEN.Easing.Elastic.Out).start();
		novoY -= 20 + Util.math.espacoEntreObjetos;	
			
		for (var i = 0; i < scope.filhos.length; i++) {
		
			filho = scope.filhos[i];
			
			if (filho.tipoEncaixe == ETiposEncaixe.SETA) {
			
				new TWEEN.Tween( filho.objeto.position ).to( {
								x: filho.objeto.position.x,
								y: novoY,
								z: filho.objeto.position.z }, 1000 )
							.easing( TWEEN.Easing.Elastic.Out).start();
				
				new TWEEN.Tween( filho.encaixePai.position ).to( {
								x: filho.encaixePai.position.x,
								y: novoY - 18,
								z: filho.encaixePai.position.z }, 1000 )
							.easing( TWEEN.Easing.Elastic.Out).start();	
							
				scope.tamanhoFilhos += (filho.getSize() + Util.math.espacoEntreObjetos);
				novoY -= filho.getSize() + Util.math.espacoEntreObjetos;
				
			} else if (filho.tipoEncaixe == ETiposEncaixe.QUADRADO) {
			
				new TWEEN.Tween( filho.objeto.position ).to( {
							x: scope.objetoQuadrado.position.x + 7 + Util.math.espacoEntreObjetos,
							y: yQuadrado,
							z: scope.objetoQuadrado.position.z }, 1000 )
						.easing( TWEEN.Easing.Elastic.Out).start();			
											
			}				
			
		}			
		
		
		//estica lateral	
		new TWEEN.Tween( scope.meshPecaLateral.scale ).to( {
						x: scope.meshPecaLateral.scale.x,
						y: scope.getSize() - 25 ,
						z: scope.meshPecaLateral.scale.z }, 1000 )
					.easing( TWEEN.Easing.Elastic.Out).start();			
		
		//move base inferior para baixo	
		new TWEEN.Tween( scope.meshPecaInferior.position ).to( {
						x: scope.meshPecaInferior.position.x,
						y: - scope.getSize() + 5 + Util.math.espacoEntreObjetos,
						z: scope.meshPecaInferior.position.z }, 1000 )
					.easing( TWEEN.Easing.Elastic.Out).start();	

		//move seta para nova posicao 		
		new TWEEN.Tween( scope.objetoSeta.position ).to( {
						x: scope.objetoSeta.position.x,
						y: novoY,
						z: scope.objetoSeta.position.z }, 1000 )
					.easing( TWEEN.Easing.Elastic.Out).start();	
					
	}
	
	scope.onChange();
	
	scope.onChangeFilhos = function ( filhoChanged ) {	
	
		scope.recalculaTamanhoFilhos();
		scope.onChange();
		
		//chama evento onChangeFilhos padrao da classe pai			
		scope.onChangeFilhosSuper(); 
					
	}
	
	scope.onRemoveFilho = function ( item ) { 
	
		if (item.tipoEncaixe == ETiposEncaixe.QUADRADO) {
			item.encaixePai.possuiItem = false;
		} else {
			scope.objetoDetalhes.remove( item.encaixePai );
		}
		
		scope.objetoDetalhes.remove( item.objeto );
		
	}
	
	scope.afterChangeNome = function ( nomeAntigo ) {
	
		scope.meshPecaInferior.scale.x = scope.largura;
		
	}
	
};

ItemEditorObjetoGrafico.prototype = Object.create( aItemEditorEncaixeSeta.prototype );

