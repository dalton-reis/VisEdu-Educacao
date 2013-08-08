Editor = function ( signals ) {
		
	UI.Panel.call( this ); 
	
	var scope = this;
	
	//propriedades		
	
	scope.setCursor( 'auto' );
	scope.setOverflow( 'hidden' );
	scope.setPosition( 'absolute' );
	scope.setBackgroundColor( '#fff' );
	scope.setDisplay( 'broke' );
		
	scope.intersectableObjectsList = [];
	scope.observadores = [];
	
	var tamanhoRenderer = 9999;	/* 	Variavel global para setar o tamanho do rerender.
									Feito isso pois o rerender muda o tamanho dos objetos 
									quando a relação entre largura e altura muda. Desta forma
									o rerender sempre deve ser gerado quadrado, alterando o valor desta variavel */	
	scope.pontoInicial = new THREE.Vector3().set( 0, 0, 0 );
	
	
	//implementacao	
	
	
	signals.windowResize.add( function ( object ) { onWindowResize(); } );
	
	var camera, scene, renderer;
	var scrollVertical, scrollHorizontal, xMaxScroll, xMinScroll, yMaxScroll, yMinScroll;
	
	initEditor();
	
	scope.painelFabricaEditor = new PainelFabricaEditor( scope, signals );
	scene.add(scope.painelFabricaEditor);
	
	
	
	function gerarPainelMontagem() {
	
		if	( scope.painelMontagem ) {
		
			removeMeshsIntersectedObjectsList( scope.painelMontagem );
			scene.remove( scope.painelMontagem.objeto );
			EIdsItens.zerarContadores();
			
		}
		
		scope.painelMontagem = new PainelMontagemEditor( scope, signals );
		scene.add( scope.painelMontagem.objeto );
		
	}
	
	gerarPainelMontagem();
	
	
	scope.regerarPainelMontagem = function () {
	
		gerarPainelMontagem();
		signals.windowResize.dispatch();
		
	}
	
	function removeMeshsIntersectedObjectsList( item ) {
	
		item.removeMeshsIntersectedObjectsList( scope.intersectableObjectsList );	
		
		for (var i = 0; i < item.filhos.length; i++) {
			
			removeMeshsIntersectedObjectsList( item.filhos[i] );	
			
		}			
	
	}
	
	function initEditor() {
	
		//var container = document.getElementById("editor");
		
		// SCENES

		scene = new THREE.Scene();

		// CAMERAS

		camera = new THREE.PerspectiveCamera( 50, 1/*window.innerWidth / window.innerHeight*/, 1, 5500 );
					
		//LIGTHS
		
		var skyColor = 0xFFFFFF;
		var groundColor = 0xFFFFFF;
		var intensity = 1;
		var light = new THREE.HemisphereLight( skyColor, groundColor, intensity );	
		light.position.set( 1, 1, 1 ).multiplyScalar( 200 );
		scene.add( light );
		
		// SCROLL
		
		//cria scroll Vertical
		var points = [];	
		points.push( new THREE.Vector2 (  0, 0 ) );
		points.push( new THREE.Vector2 (  5, 0 ) );
		points.push( new THREE.Vector2 (  5, 1 ) );
		points.push( new THREE.Vector2 (  0, 1 ) );			
		var squareShape = new THREE.Shape( points );
		scrollVertical = CG.objects.generateMeshFromShape( squareShape, CG.colors.corScroll );
		scrollVertical.material.opacity = 0.3;
		scrollVertical.material.transparent = true;
		scene.add( scrollVertical );
		scope.intersectableObjectsList.push( scrollVertical );
		
		//cria scroll Horizontal
		var points = [];	
		points.push( new THREE.Vector2 (  0, 0 ) );
		points.push( new THREE.Vector2 (  1, 0 ) );
		points.push( new THREE.Vector2 (  1, 5 ) );
		points.push( new THREE.Vector2 (  0, 5 ) );			
		var squareShape = new THREE.Shape( points );
		scrollHorizontal = CG.objects.generateMeshFromShape( squareShape, CG.colors.corScroll );
		scrollHorizontal.material.opacity = 0.3;
		scrollHorizontal.material.transparent = true;
		scene.add( scrollHorizontal );
		scope.intersectableObjectsList.push( scrollHorizontal );	
	

		// RENDERER

		renderer = new THREE.WebGLRenderer( { clearColor: 0xFFFFFF, clearAlpha: 1 } );
		renderer.setSize( tamanhoRenderer, tamanhoRenderer );
		
		//container.appendChild(renderer.domElement);	
		scope.dom.appendChild( renderer.domElement );						

	}
	
	scope.renderizar = function () {
	
		renderer.render( scene, camera );
		
	}
	
	
	
	
	
	
	
	
	
	
	
	//FUNÇÕES PARA EVENTOS DE MOUSE	
	
    //variaveis globais para uso nas funções internas
	var mouse = new THREE.Vector2(),
		posicaoInicialObjeto = new THREE.Vector3(),
		offset = new THREE.Vector3(),
		INTERSECTLIST = null, 
		INTERSECTED = null, 
		SELECTED = null, 
		MESHENCAIXE = null,
		OBJETOEMEDICAO = null;	
	var projector = new THREE.Projector();
	
	
	//var plane = new THREE.Mesh( new THREE.PlaneGeometry( 4000, 4000, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } ) );
	squareShape = new THREE.Shape();
	squareShape.moveTo( 0,0 );
	squareShape.lineTo( 0, 4000 );
	squareShape.lineTo( 4000, 4000 );
	squareShape.lineTo( 4000, 0 );
	squareShape.lineTo( 0, 0 );	
	var plane = CG.objects.addRetangulo( scene, squareShape, CG.colors.corPainel, -2000, -2000, 1, 0, 0, 0, 1, true, CG.colors.corContorno);
	plane.visible = false;
	scene.add( plane );
	

	getIntersectedItem = function ( intersectsObjects ) {
	
		for (var i=0; i<intersectsObjects.length; i++) {
			if	( (intersectsObjects[i].object == scrollVertical) ||
				  (intersectsObjects[i].object == scrollHorizontal) ||
				  (SELECTED && intersectsObjects[i] == SELECTED) ||
				  ((intersectsObjects[i].object.encaixe == undefined) && 
				   (intersectsObjects[i].object.item !== undefined) &&
				   (intersectsObjects[i].object.selectable == undefined || intersectsObjects[i].object.selectable)) ) {	;				  
				return intersectsObjects[i].object;
			}
		}
						
		return null;
		
	}	
	
	getMeshComEncaixe = function ( intersectsObjects ) {
	
		for (var i=0; i<intersectsObjects.length; i++) {
			if	(  ( intersectsObjects[i].object.encaixe !== undefined ) && 
				   (( intersectsObjects[i].object.encaixe.possuiItem == undefined ) || ( !intersectsObjects[i].object.encaixe.possuiItem ))	){	
			
				return intersectsObjects[i].object;	
				
			}
		}		
		return null;
		
	}
	
	desfazEfeitoMouseOver = function (liberarVariaveis) {
	
		if ( INTERSECTED ) {
			if ( (INTERSECTED == scrollVertical) || (INTERSECTED == scrollHorizontal) ) {
				INTERSECTED.material.opacity = 0.3;
			} else {
				INTERSECTED.item.setMeshsEmissiveColor( INTERSECTED.currentHex );	
			}
			
			//INTERSECTED.item.setMeshsColor( INTERSECTED.currentHex );			
		}	
		
		if	(liberarVariaveis) {		
			INTERSECTED = null;
			INTERSECTLIST = null;			
		}
		
	} 	
	
	desfazEfeitoMouseOverEncaixe = function (liberarVariaveis) {
	
		if ( MESHENCAIXE ) {	
		
			if	(MESHENCAIXE.encaixe.tipoEncaixe == ETiposEncaixe.ENCAIXE_LIXEIRA) {						
							
				MESHENCAIXE.encaixe.setMeshsColor( MESHENCAIXE.currentHex );
			
			} else {
			
				MESHENCAIXE.encaixe.material.emissive.setHex( MESHENCAIXE.currentHex );
				
			}
		}	
		
		if	(liberarVariaveis) {		
			MESHENCAIXE = null;		
		}
		
	}
	
	scope.selecionarObjeto = function ( objeto ) {
		
		if	(OBJETOEMEDICAO !== objeto) {
		
			if	(OBJETOEMEDICAO) {			
							
				OBJETOEMEDICAO.setMeshsColor( OBJETOEMEDICAO.currentHex );
							
			}
			
			OBJETOEMEDICAO = objeto;
			
			if	(OBJETOEMEDICAO) {
			
				OBJETOEMEDICAO.currentHex = OBJETOEMEDICAO.corHex;				
				OBJETOEMEDICAO.setMeshsColor( CG.colors.corObjetoEmEdicao );
							
			}
			
			scope.notificarOnChageObjetoEmEdicao( OBJETOEMEDICAO );		
			
		}
		
	};
	
	scope.getObjetoSelecionado = function () {
	
		return OBJETOEMEDICAO;
	
	}
	
	scope.onMouseMove = function ( event ) {
	
		event.preventDefault();	
				
		mouse.x = ( ( event.clientX - scope.dom.offsetLeft ) / tamanhoRenderer )  * 2 - 1;
		mouse.y = - ( ( event.clientY - scope.dom.offsetTop ) / tamanhoRenderer ) * 2 + 1;
		
		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
		projector.unprojectVector( vector, camera );
		
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
		
		INTERSECTLIST = raycaster.intersectObjects( scope.intersectableObjectsList );
		
		desfazEfeitoMouseOverEncaixe(false);
		
		if ( SELECTED != null) {
			
			if ( ( SELECTED == scrollVertical ) || ( SELECTED == scrollHorizontal ) ) {
				
				var intersects = raycaster.intersectObject( plane );
				var position = intersects[0].point.sub( offset );				
							
				if ( SELECTED == scrollVertical ) {	
				
					position.x = posicaoInicialObjeto.x;				
					position.y += posicaoInicialObjeto.y;
					
					if	(position.y > yMinScroll)
						position.y = yMinScroll;
					if	(position.y < yMaxScroll)
						position.y = yMaxScroll;
						
					scope.painelMontagem.objeto.position.y = scope.painelMontagem.getSize() * ( ( position.y - yMinScroll) / (yMaxScroll - yMinScroll) );	
					
				} else {
				
					position.x += posicaoInicialObjeto.x;				
					position.y = posicaoInicialObjeto.y;
					
					if	(position.x < xMinScroll)
						position.x = xMinScroll;
					if	(position.x > xMaxScroll)
						position.x = xMaxScroll;
					
					scope.painelMontagem.objeto.position.x = - ( 2000 * ( ( position.x - xMinScroll) / (xMaxScroll - xMinScroll) ) );						
						
				}
				position.z = posicaoInicialObjeto.z;

					
				
				SELECTED.position.copy( position );	
				
			} else if ( SELECTED.item.canMove ) {
			
				var intersects = raycaster.intersectObject( plane );
				var position = intersects[0].point.sub( offset );
				
				position.x += posicaoInicialObjeto.x;
				position.y += posicaoInicialObjeto.y;
				position.z = 4;
				SELECTED.item.objeto.position.copy( position );			
				
				if ( INTERSECTLIST.length > 0 ) {
				
					if	(SELECTED.item !== undefined) {
						MESHENCAIXE = getMeshComEncaixe( INTERSECTLIST );
					
						if	(MESHENCAIXE) {
						
							if	( MESHENCAIXE.encaixe.tipoEncaixe == ETiposEncaixe.ENCAIXE_LIXEIRA ) {
							
								MESHENCAIXE.currentHex = MESHENCAIXE.encaixe.corHex;				
								MESHENCAIXE.encaixe.setMeshsColor( CG.colors.corEmissiveLixeira );
							
							} else if ( MESHENCAIXE.encaixe.tipoEncaixe == SELECTED.item.tipoEncaixe )	{
																			
								MESHENCAIXE.currentHex = MESHENCAIXE.encaixe.material.emissive.getHex();				
								MESHENCAIXE.encaixe.material.emissive.setHex( CG.colors.corEmissiveEncaixe );
								
							} else {
							
								MESHENCAIXE = null;
								
							}
							
						}
					}
				} else {
					desfazEfeitoMouseOverEncaixe(true);
				}
			
			}
			
		} else {		
		
			if ( INTERSECTLIST.length > 0 ) {
			
				var intersectedObject = getIntersectedItem( INTERSECTLIST );
				
				if (intersectedObject) {
					if (INTERSECTED != intersectedObject) {
				
						desfazEfeitoMouseOver(false);					
											
						INTERSECTED = intersectedObject;				
						INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
						
						if ( ( INTERSECTED == scrollVertical ) || ( INTERSECTED == scrollHorizontal ) ) {						
							
							INTERSECTED.material.opacity = 1;
							renderer.domElement.style.cursor = 'pointer';
							
						} else {
						
							INTERSECTED.item.setMeshsEmissiveColor( CG.colors.corEmissive );
							
							if	(INTERSECTED.item.changeCursor) {	
								renderer.domElement.style.cursor = 'pointer';
							}	
							else	
								renderer.domElement.style.cursor = 'auto';
								
						}							
						
					}
					
				} 
				
			} else {			
				
				desfazEfeitoMouseOver(true);
				desfazEfeitoMouseOverEncaixe(true);
				
				renderer.domElement.style.cursor = 'auto';	
				
			}	
			
		}

	}	

	scope.onMouseDown = function ( event ) {		

		event.preventDefault();
		
		if ( event.button == 2 ) 
			return;

		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.0 );		
		projector.unprojectVector( vector, camera );
		
		var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
		
		var intersects = raycaster.intersectObjects( scope.intersectableObjectsList );
		
		if ( intersects.length > 0 ) {			
			 
			SELECTED = getIntersectedItem(intersects); 			
			
			if	(SELECTED) {
				
				if ( ( SELECTED !== scrollVertical ) && ( SELECTED !== scrollHorizontal ) ) {	
					
					if ( scope.painelFabricaEditor.fabrica.ehItemDaFabrica( SELECTED.item ) ) {	
						
						var x = SELECTED.item.objeto.position.x,
							y = SELECTED.item.objeto.position.y,
							z = SELECTED.item.objeto.position.z;
							
						var item = scope.painelFabricaEditor.criaNovoItemFabrica( SELECTED.item.id, x, y, 3, false );			
												
						SELECTED = item.meshs[0]; //busca primeiro mesh intersectavel
						
						MESHENCAIXE = scope.painelFabricaEditor.meshPainelFundoFabrica; //associa MESHENCAIXE para o caso de clicar e soltar (entao remove o elemento)
					}
					
					if	(SELECTED.item.canMove) {	

						var intersects = raycaster.intersectObject( plane );	
						offset.copy( intersects[ 0 ].point );//.sub( plane.position );			
						posicaoInicialObjeto.copy( SELECTED.item.objeto.position );
					
						renderer.domElement.style.cursor = 'move';
					
					} 
					
				} else {
				
					var intersects = raycaster.intersectObject( plane );	
					offset.copy( intersects[ 0 ].point );//.sub( plane.position );			
					posicaoInicialObjeto.copy( SELECTED.position );
				
					renderer.domElement.style.cursor = 'move';
					
				}
				
			}

		}
			
		if ( event.button == 0 ) {					
			
		} else if ( event.button == 2 ) {  
			
		} 			
			
	}
	
	scope.onMouseUp = function ( event ) {

		event.preventDefault();	
		
		if ( event.button == 2 ) 
			return;
			
		var objetoParaSelecionar = null;
		
		
		if ( SELECTED ) {			
			
			if ( ( SELECTED !== scrollVertical ) && ( SELECTED !== scrollHorizontal ) ) {	
			
				SELECTED.item.objeto.position.z = posicaoInicialObjeto.z;
				
				if	(MESHENCAIXE) {
				
					SELECTED.item.grupoPai.remove(SELECTED.item.objeto); //remove da cena atual
										
					if	(SELECTED.item.pai) {
					
						SELECTED.item.pai.remove(SELECTED.item); //remove objeto do objeto pai			
											
					}	
					
					if	(MESHENCAIXE.encaixe.tipoEncaixe == ETiposEncaixe.ENCAIXE_LIXEIRA) {
					
						removeMeshsIntersectedObjectsList( SELECTED.item );					
						
					} else {
						
						MESHENCAIXE.item.add(SELECTED.item); //adiciona na cena de encaixe
							
					} 
					
				} else {			
					
					if	(SELECTED.item.encaixePai) {
						SELECTED.item.objeto.position.copy(posicaoInicialObjeto);
					}
							
					if	( ( SELECTED.item.objeto.position.x == posicaoInicialObjeto.x && SELECTED.item.objeto.position.y == posicaoInicialObjeto.y ) &&
						  ( !scope.painelFabricaEditor.fabrica.ehItemDaFabrica(SELECTED.item) ) ){						
						objetoParaSelecionar = SELECTED.item;
					}
					
				}
				
			}
			
			SELECTED = null;
				
		}
		
		
		scope.selecionarObjeto( objetoParaSelecionar );	
		
		
		renderer.domElement.style.cursor = 'auto';

	}
	
	
	
	renderer.domElement.addEventListener( 'mousemove', scope.onMouseMove, false );	
	renderer.domElement.addEventListener( 'mousedown', scope.onMouseDown, false );
	renderer.domElement.addEventListener( 'mouseup', scope.onMouseUp, false );	
	
	
	
	
	
	//FUNÇÕES DIVERSAS				
				
	
	function onWindowResize () {
	
		var maior; 
		
		if	(scope.dom.offsetHeight > scope.dom.offsetWidth) {
		
			maior = scope.dom.offsetHeight;
			
		} else {
		
			maior = scope.dom.offsetWidth;
			
		}
		
		if	(tamanhoRenderer !== maior) {	
		
			tamanhoRenderer = maior;
			
			var posicaoXY = ((tamanhoRenderer/2)*0.75); //relacao entre a posicao dos objetos e a largura do rerender
			scope.pontoInicial = new THREE.Vector3().set( -posicaoXY, posicaoXY, 0 );
			
			camera.position.z = tamanhoRenderer*(800/1000); //seta a distancia com base na relacao entre a posicao da camera e o tamanho do rerender
			camera.updateProjectionMatrix();	
			
			renderer.setSize ( tamanhoRenderer, tamanhoRenderer );
			
		}
		
		
		xMinScroll = scope.pontoInicial.x + 11;
		xMaxScroll = scope.pontoInicial.x + Util.math.getGraphicValue( scope.dom.offsetWidth ) - 67;
		yMinScroll = scope.pontoInicial.y - scope.painelFabricaEditor.painelHeight - 55;
		yMaxScroll = - ( Util.math.getGraphicValue( scope.dom.offsetHeight / 2 ) - 17 );
	
		scrollVertical.position.x = xMaxScroll + 45;
		scrollVertical.position.y = yMinScroll;		
		scrollVertical.position.z = 15;
		scrollVertical.scale.y = 50;
		
		scrollHorizontal.position.x = xMinScroll;
		scrollHorizontal.position.y = yMaxScroll + 2;		
		scrollHorizontal.position.z = 15;
		scrollHorizontal.scale.x = 50;
		
		scope.painelMontagem.objeto.position.x = 0;
		scope.painelMontagem.objeto.position.y = 0;
		
	}
		
		
	//@Override	
	scope.notificarOnChageObjetoEmEdicao = function ( item ) {
	
		for (var i = 0; i < scope.observadores.length; i++) {
		
			scope.observadores[i].onChangeObjetoEmEdicao( item );
			
		}
		
	}
	
	//@Override	
	scope.notificarOnChageItems = function ( ) {
	
		for (var i = 0; i < scope.observadores.length; i++) {
		
			scope.observadores[i].onChangeItems();
			
		}
			
	}
	
}

Editor.prototype = Object.create( UI.Panel.prototype );







