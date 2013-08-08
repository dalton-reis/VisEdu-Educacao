VisualizadorGrafico = function ( editor, signals ) {

	UI.Panel.call( this ); 
	IEditorObserver.call( this ); //interface

	var scope = this;	
	
	//propriedades
	
	if	( !(editor instanceof Editor )) {
		throw new Error ( "argumento deve ser da classe Editor !" );	
	}	
	scope.editor = editor;
	scope.editor.visualizadorGrafico = this;
	scope.setPosition( 'absolute' );
	scope.setBackgroundColor( '#ddd' );	
	scope.setDisplay( 'broke' );	
	
	//implementacao
	
	var objetosCriados = [];
	
	signals.windowResize.add( function ( object ) { onWindowResize(); } );
	
	
	
	//@Override	
	scope.onChangeItems = function ( ) {
		
		//limpa ojetos adicionados ao scene do visualizador
		for (var i=0; i < objetosCriados.length; i++) {			
			scene.remove(objetosCriados[i]);			
		}	
		objetosCriados = [];
		
		//limpa ojetos helpers
		for (var i=0; i < views.length; i++) {			
			if (views[0].cameraHelper !== undefined && views[0].cameraHelper) {
				sceneHelper.remove(views[0].cameraHelper);	
				views[0].cameraHelper = undefined;
			}
		}	
		
				
		visualizarItem(scope.editor.painelMontagem, scene);		
	
	}	
	
	//@Override
	scope.onChangeObjetoEmEdicao = function() {
		//vazio
	}
	
	scope.editor.observadores.push( scope ); //adicona esta classo como observador do editor
	
	
	/*var radius = 10;
	var widthSegments = 32;
	var heightSegments = 16;
	var geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
	var cameraMesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x000000, opacity: 1 } ) );*/
	
	
	var pontoLuz;	
	
	visualizarItem = function ( item, objetoAux ) {
	
		switch ( item.id ) {
			case EIdsItens.OBJETOGRAFICO:
				
				if	( item.visible ) {
				
					var novoObjeto = new THREE.Object3D();
					objetoAux.add( novoObjeto );
					if	(objetoAux instanceof THREE.Scene) {					
						objetosCriados.push(novoObjeto);
					}
					
					//aplica transformacoes
					novoObjeto.matrizTransformacao = new THREE.Matrix4()				
					novoObjeto.matrizTransformacao.multiply( novoObjeto.matrix );
					
					
					for ( var i = item.filhos.length-1; i >= 0 ; i-- ) {
						if	( item.filhos[i].tipoEncaixe == ETiposEncaixe.DIAMANTE ) {
							visualizarItem( item.filhos[i], novoObjeto );							
						}
					}			
								
					//cria formas geometricas
					for ( var i = 0; i < item.filhos.length; i++ ) {
						if	( item.filhos[i].tipoEncaixe == ETiposEncaixe.QUADRADO ) {
							visualizarItem( item.filhos[i], novoObjeto );
						}
					}
					
					item.matrix = novoObjeto.matrizTransformacao;
					novoObjeto.applyMatrix( novoObjeto.matrizTransformacao );
					
					//cria filhos
					for ( var i = 0; i < item.filhos.length; i++ ) {
						if	( item.filhos[i].tipoEncaixe == ETiposEncaixe.SETA ) {
							visualizarItem( item.filhos[i], novoObjeto );
						}
					}
					
				}

				break;
			case EIdsItens.CUBO:
				
				if	( item.visible ) {
				
					var corCubo = item.propriedadeCor.getHex();
					
					var geometria = new THREE.CubeGeometry( item.valorXYZ.x, item.valorXYZ.y, item.valorXYZ.z );
					var cubo = new THREE.Mesh( geometria, new THREE.MeshPhongMaterial() );
					cubo.material.color.setHex( corCubo );
					cubo.material.map = item.usarTextura ? item.textura : null;
					cubo.material.needsUpdate = true;
					cubo.geometry.buffersNeedUpdate = true;
					cubo.geometry.uvsNeedUpdate = true;									
					//cubo.visible = item.visible;
						
					cubo.position.set( item.posicao.x, item.posicao.y, item.posicao.z );						
					
					objetoAux.add(cubo);
					
				}
				
				break;
			case EIdsItens.TRANSLADAR:
			
				if	( item.visible ) {
				
					var m1 = new THREE.Matrix4();				
					m1.makeTranslation( item.valorXYZ.x, item.valorXYZ.y, item.valorXYZ.z );
								
					objetoAux.matrizTransformacao.multiply( m1 );
					
				}
				
				break;		
			case EIdsItens.ROTACIONAR:
				
				if	( item.visible ) {
				
					var m1 = new THREE.Matrix4();
					var m2 = new THREE.Matrix4();
					var m3 = new THREE.Matrix4();				
					m1.makeRotationX( Util.math.converteGrausParaRadianos( item.valorXYZ.x ) );
					m2.makeRotationY( Util.math.converteGrausParaRadianos( item.valorXYZ.y ) );
					m3.makeRotationZ( Util.math.converteGrausParaRadianos( item.valorXYZ.z ) );

					//objetoAux.matrizTransformacao.multiplyMatrices( m1, m2 );				
					objetoAux.matrizTransformacao.multiply( m1 );
					objetoAux.matrizTransformacao.multiply( m2 );
					objetoAux.matrizTransformacao.multiply( m3 );
					
				}
				
				break;
			case EIdsItens.REDIMENSIONAR:	
			
				if	( item.visible ) {
				
					var m1 = new THREE.Matrix4();				
					m1.makeScale( item.valorXYZ.x, item.valorXYZ.y, item.valorXYZ.z );
							
					objetoAux.matrizTransformacao.multiply( m1 );
				
				}
				
				break;
			case EIdsItens.PAINELMONTAGEMEDITOR: 
			
				for ( var i = 0; i < item.filhos.length; i++ ) {
					visualizarItem( item.filhos[i], objetoAux );
				}
				
				var indiceView = 1;
				var viewCamera = views[ indiceView ];
				
				viewCamera.clearColorHex = item.corLimpar.getHex();
				
				break;
			case EIdsItens.CAMERA:	
				var indiceView = 1;
				var viewCamera = views[ indiceView ];
				
				var atualizarMatrizCamera = ( ( viewCamera.camera.near !== item.near ) ||
											   ( viewCamera.camera.far !== item.far ) ||
											   ( viewCamera.camera.fov !== item.fov ) );											   
			
				viewCamera.camera.position.copy( item.valorXYZ );				
				viewCamera.camera.lookAt( item.lookAt.clone() );	
				viewCamera.camera.near = item.near;
				viewCamera.camera.far = item.far;
				viewCamera.camera.fov = item.fov;				
				
				if	(!viewCamera.cameraHelper) {
				
					viewCamera.cameraHelper = new CGCameraHelper( viewCamera.camera );	/*THREE.CameraHelper*/					
					sceneHelper.add(viewCamera.cameraHelper);
					
				}
				
				if	(atualizarMatrizCamera) {
					viewCamera.camera.updateProjectionMatrix();	
					viewCamera.cameraHelper.update();
				}
				
				pontoLuz.position.copy( item.valorXYZ );
				
				break;	
			default:
			  throw new Error ("Não foi possível processar a visualização do item. Id " + item.id + " não era esperada!");
		}
		
	}
	
		
	
	//WEB GL IMPLEMENTATION
	
	
	var scene, sceneHelper, renderer, controls;
	var windowWidth, windowHeight;
	
	var views = [
		{ 
			left: 0,
			bottom: 0,
			width: 0.5,
			height: 1.0,
			background: { r: 0.9, g: 0.9, b: 0.9, a: 1 },
			posicao: [ 0, 600, 1800 ],
			lookAt: [ 0, 0, 0 ],
			up: [ 0, 1, 0 ],
			fov:45,
			near:1,
			far:99999,
			cameraHelper: null
		},
		{ 
			left: 0.5,
			bottom: 0,
			width: 0.5,
			height: 1,
			background: { r: 0, g: 0, b: 0, a: 1 },
			posicao: [ 0, -999998, 0 ],
			lookAt: [ 0, -999999, 0 ],
			up: [ 0, 1, 0 ],
			fov: 45,
			near:50,
			far:500,
			cameraHelper: null
		},
		{ 
			left: 0.5,
			bottom: 0,
			width: 0.5,
			height: 1,
			background: { r: 0, g: 0, b: 0, a: 1 },
			posicao: [ 0, -999998, 0 ],
			lookAt: [ 0, -999999, 0 ],
			up: [ 0, 1, 0 ],
			fov: 45,
			near:50,
			far:500,
			cameraHelper: null
		}
	];	
	scope.views = views;
	
	initVisualizador();	
	
	function generateCamera( indiceView ) {
	
		var view = views[indiceView];
		
		camera = new THREE.PerspectiveCamera( view.fov, 1, view.near, view.far );		
		camera.position.x = view.posicao[ 0 ];
		camera.position.y = view.posicao[ 1 ];
		camera.position.z = view.posicao[ 2 ];
		camera.up.x = view.up[ 0 ];
		camera.up.y = view.up[ 1 ];
		camera.up.z = view.up[ 2 ];		
		camera.lookAt( new THREE.Vector3().set( view.lookAt[ 0 ], view.lookAt[ 1 ], view.lookAt[ 2 ] ) );
		view.camera = camera;	
		
	}
	
	function initVisualizador() {

		//var container = document.getElementById( 'visualizador' );
		
		// SCENES 
		scene = new THREE.Scene();
		sceneHelper = new THREE.Scene();
		scene.add(sceneHelper);
		//sceneHelper.add(scene);
		
		// CAMERAS
		
		for (var i =  0; i < views.length-1; ++i ) {

			generateCamera( i );
			
		}

		//CONTROLER		
		
		controls = new THREE.TrackballControls( views[0].camera, scope.dom  );				
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.noRotate = false;
		controls.noZoom = false;
		controls.noPan = false;
		controls.staticMoving = false;
		controls.dynamicDampingFactor = 0.3;
		

		// LIGTHS
		
		
		var color = 0xffffff;
		var intensity = 2;
		var distance = 0;
		pontoLuz = new THREE.PointLight( color, intensity, distance );	
		scene.add( light );		
		
		var color = 0xffffff;
		var intensity = 1;
		//diretionalLightVisualizador = new THREE.DirectionalLight( color, intensity );		
		//scene.add( diretionalLightVisualizador );
		
		
		
		var skyColor = 0xFFFFFF;
		var groundColor = 0xFFFFFF;
		var intensity = 1;
		var light = new THREE.HemisphereLight( skyColor, groundColor, intensity );	
		light.position.set( 1, 1, 1 ).multiplyScalar( 200 );
		scene.add( light );
		
		
		// OBJECTS
		
		var grid = new THREE.GridHelper( 500, 25 );
		sceneHelper.add( grid );
		
		geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3 ( 700, 0, 0 ) );
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 0 ) );
		geometry.computeLineDistances();
		var material = new THREE.LineBasicMaterial( { linewidth: 1, color: 0xFF0000, transparent: true } );
		var lineX = new THREE.Line( geometry, material );
		sceneHelper.add( lineX );
		
		geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 0 ) );
		geometry.vertices.push( new THREE.Vector3 ( 0, 700, 0 ) );
		geometry.computeLineDistances();
		material = new THREE.LineBasicMaterial( { linewidth: 1, color: 0x00FF00, transparent: true } );
		var lineY = new THREE.Line( geometry, material );			
		sceneHelper.add( lineY );
	
		
		geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 0 ) );
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 700 ) );
		geometry.computeLineDistances();
		material = new THREE.LineBasicMaterial( { linewidth: 1, color: 0x0000FF, transparent: true } );
		var lineZ = new THREE.Line( geometry, material );
		sceneHelper.add( lineZ );
		
		
		// RENDERER		

		renderer = new THREE.WebGLRenderer( { antialias: true } );
									
		scope.dom.appendChild( renderer.domElement );
	}	
	
	function onWindowResize() {

		if ( windowWidth != scope.dom.offsetWidth || windowHeight != scope.dom.offsetHeight ) {

			windowWidth  = scope.dom.offsetWidth;
			windowHeight =  scope.dom.offsetHeight;

			renderer.setSize ( windowWidth, windowHeight );

		}

	}	
	
	scope.renderizar = function () {	
	
		
		
		for ( var i = 0; i < views.length-1; ++i ) {

			var view = views[i];
			var camera = view.camera;		

			var left   = Math.floor( windowWidth  * view.left );
			var bottom = Math.floor( windowHeight * view.bottom );
			var width  = Math.floor( windowWidth  * view.width );
			var height = Math.floor( windowHeight * view.height );
			renderer.setViewport( left, bottom, width, height );
			renderer.setScissor( left, bottom, width, height );
			renderer.enableScissorTest ( true );
			if	(view.clearColorHex !== undefined) {
				renderer.setClearColorHex( view.clearColorHex, view.background.a  );
			} else {
				renderer.setClearColor( view.background, view.background.a );
			}
			
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			
			
			if	(view.cameraHelper) {				
				
				//renderer.render( sceneHelper, camera );	
				scene.remove( sceneHelper );
				
				renderer.render( scene, camera );
				
				scene.add( sceneHelper );
				
			} else {
			
				renderer.render( scene, camera );
				
			}
			
		}
		
		controls.update();

	}
}

VisualizadorGrafico.prototype = Object.create( UI.Panel.prototype );