/**
 * Espaço gráfico
 */
VisualizadorGrafico = function ( editor, signals ) {

	UI.Panel.call( this );
	IEditorObserver.call( this ); //interface

	var scope = this;

	//SELECAO
	var mouse3D = {x: 0, y: 0};
	var listaObjetosSelecionaveis = [];

	if ( !(editor instanceof Editor )) {
		throw new Error ( "argumento deve ser da classe Editor !" );
	}

	//propriedades
	scope.editor = editor;
	scope.editor.visualizadorGrafico = this;
	scope.setPosition( 'absolute' );
	scope.setBackgroundColor( '#ddd' );
	scope.setDisplay( 'broke' );

	var tipoGrafico = 3;
	scope.editavel = true;

	//implementacao
	var pontoLuz     = null;
	var scene        = null;
	var sceneHelper  = null;
	var renderer     = null;
	var controls     = null;
	var windowWidth  = null;
	var windowHeight = null;

	var objetosCriados = [];
	var listaLuzes = [];
	var listaLuzesHelpers = [];
	var listaBBox = [];
	var cameraHelper = null;

	signals.windowResize.add( function ( object ) { onWindowResize(); } );

	//@Override
	scope.onChangeItems = function () {

		//limpa ojetos adicionados a cena do visualizador
		for (var i=0; i < objetosCriados.length; i++) {
			scene.remove(objetosCriados[i]);
		}
		objetosCriados = [];

		for (var i=0; i < listaLuzes.length; i++) {
			scene.remove(listaLuzes[i]);
		}
		listaLuzes = [];

		for (var i=0; i < listaLuzesHelpers.length; i++) {
			sceneHelper.remove(listaLuzesHelpers[i]);
		}
		listaLuzesHelpers = [];

		for (var i = 0; i < listaBBox.length; i++) {
			sceneHelper.remove(listaBBox[i]);
		}
		listaBBox = [];

		//REMOVE O HELPER DA CÂMERA
		sceneHelper.remove(cameraHelper);
		cameraHelper = undefined;

		//REMOVE A VISÃO DA CÂMERA
		views[1].camera.position.set(0, -999998, 0);

		//limpa ojetos helpers
		for (var i=0; i < views.length; i++) {
			if (views[0].cameraHelper !== undefined && views[0].cameraHelper) {
				sceneHelper.remove(views[0].cameraHelper);
				views[0].cameraHelper = undefined;
			}
		}

		scope.listaObjetosSelecionaveis = [];

		visualizarItem(scope.editor.painelMontagem, scene);
	};

	//@Override
	scope.onChangeItemEmEdicao = function( item ) {
		/* vazio */
	};

	scope.editor.observadores.push( scope ); //adicona esta classo como observador do editor

	var visualizarItem = function ( item, objetoAux ) {
		switch ( item.id ) {
			case EIdsItens.OBJETOGRAFICO:
				if ( item.visible ) {

					var novoObjeto = new THREE.Object3D();
					objetoAux.add( novoObjeto );
					if (objetoAux instanceof THREE.Scene) {
						objetosCriados.push(novoObjeto);
					}

					//aplica transformacoes
					novoObjeto.matrizTransformacao = new THREE.Matrix4();
					novoObjeto.matrizTransformacao.multiply( novoObjeto.matrix );

					for ( var i = item.filhos.length-1; i >= 0 ; i-- ) {
						if ( item.filhos[i].tipoEncaixe == ETiposEncaixe.DIAMANTE ) {
							visualizarItem( item.filhos[i], novoObjeto );
						}
					}

					//cria formas geometricas
					for ( var i = 0; i < item.filhos.length; i++ ) {
						if ( item.filhos[i].tipoEncaixe == ETiposEncaixe.QUADRADO ) {
							if (scope.editor.getItemSelecionado() != null) {
								if (((scope.editor.getItemSelecionado().id == EIdsItens.OBJETOGRAFICO) && (scope.editor.getItemSelecionado() == item)) || (item.PaiSelecionado == true)) {
									item.filhos[i].PaiSelecionado = true;
								} else {
									item.filhos[i].PaiSelecionado = false;
								}
							}

							visualizarItem( item.filhos[i], novoObjeto );
						}
					}

					item.matrix = novoObjeto.matrizTransformacao;
					novoObjeto.applyMatrix( novoObjeto.matrizTransformacao );

					//cria filhos
					for ( var i = 0; i < item.filhos.length; i++ ) {
						if ( item.filhos[i].tipoEncaixe == ETiposEncaixe.SETA ) {
							if (scope.editor.getItemSelecionado() != null) {
								if (((scope.editor.getItemSelecionado().id == EIdsItens.OBJETOGRAFICO) && (scope.editor.getItemSelecionado() == item)) || (item.PaiSelecionado == true)) {
									item.filhos[i].PaiSelecionado = true;
								} else {
									item.filhos[i].PaiSelecionado = false;
								}
							}
							visualizarItem( item.filhos[i], novoObjeto );
						}
					}
				}
				break;
			case EIdsItens.CUBO:
				desenhaCubo(item, objetoAux);
				break;
			case EIdsItens.SPLINE:
				desenharSpline(item, objetoAux);
				break;
			case EIdsItens.POLIGONO:
				desenharPoligono(item, objetoAux);
				break;
			case EIdsItens.TRANSLADAR:
				/*Se o item for animado as transformações adicionadas são para animação*/
				if ( item.visible && !item.pai.isAnimated) {
					var m1 = new THREE.Matrix4();
					m1.makeTranslation( item.valorXYZ.x, item.valorXYZ.y, item.valorXYZ.z );
					objetoAux.matrizTransformacao.multiply( m1 );
				}
				break;
			case EIdsItens.ROTACIONAR:
				/*Se o item for animado as transformações adicionadas são para animação*/
				if (item.visible && !item.pai.isAnimated) {
					var m1 = new THREE.Matrix4();
					var m2 = new THREE.Matrix4();
					var m3 = new THREE.Matrix4();
					m1.makeRotationX( Util.math.converteGrausParaRadianos( item.valorXYZ.x ) );
					m2.makeRotationY( Util.math.converteGrausParaRadianos( item.valorXYZ.y ) );
					m3.makeRotationZ( Util.math.converteGrausParaRadianos( item.valorXYZ.z ) );

					objetoAux.matrizTransformacao.multiply( m1 );
					objetoAux.matrizTransformacao.multiply( m2 );
					objetoAux.matrizTransformacao.multiply( m3 );
				}
				break;
			case EIdsItens.REDIMENSIONAR:
				/*Se o item for animado as transformações adicionadas são para animação*/
				if (item.visible && !item.isAnimated) {
					var m1 = new THREE.Matrix4();
					m1.makeScale( item.valorXYZ.x, item.valorXYZ.y, item.valorXYZ.z );
					objetoAux.matrizTransformacao.multiply( m1 );
				}
				break;
			case EIdsItens.RENDERIZADOR:
				scope.listaObjetosSelecionaveis = [];
				for ( var i = 0; i < item.filhos.length; i++ ) {
					visualizarItem( item.filhos[i], objetoAux );
				}

				var indiceView = 1;
				var viewCamera = views[ indiceView ];

				viewCamera.clearColorCamera = item.corLimpar.getHex();

				views[0].background = item.corFundo;

				tipoGrafico = item.tipoGrafico;

				if (tipoGrafico == 2) {
					views[0].camera.position.x = 0;
					views[0].camera.position.y = 0;
					views[0].camera.position.z = 1800;

					habilitarControls(false);
					item.verGrade = false;
				} else if (tipoGrafico == 3) {
					habilitarControls(true);
				}
				for (var i = 0; i < sceneHelper.children.length; i++) {
					if (sceneHelper.children[i].tipoItem == CG.listaItensGraficos.Grade) {
						sceneHelper.children[i].visible = item.verGrade;
					}

					if (sceneHelper.children[i].tipoItem == CG.listaItensGraficos.EixoX || sceneHelper.children[i].tipoItem == CG.listaItensGraficos.EixoY || sceneHelper.children[i].tipoItem == CG.listaItensGraficos.EixoZ) {
						sceneHelper.children[i].visible = item.verEixos;
					}
				}

				break;
			case EIdsItens.CAMERA:
				var indiceView = 1;
				var viewCamera = views[ indiceView ];

				if (tipoGrafico == 2) {
					item.valorXYZ.set(0, 0, 500);
					item.lookAt.set(0, 0, 0);
				}

				var atualizarMatrizCamera = ( ( viewCamera.camera.near !== item.near ) ||
											   ( viewCamera.camera.far !== item.far ) ||
											   ( viewCamera.camera.fov !== item.fov ) );

				viewCamera.camera.position.copy( item.valorXYZ );

				viewCamera.camera.lookAt( item.lookAt.clone() );
				viewCamera.camera.near = item.near;
				viewCamera.camera.far = item.far;
				viewCamera.camera.fov = item.fov;

				if (!viewCamera.cameraHelper || cameraHelper == undefined) {
					viewCamera.cameraHelper = new CGCameraHelper( viewCamera.camera );	/*THREE.CameraHelper*/
					sceneHelper.add(viewCamera.cameraHelper);
					cameraHelper = viewCamera.cameraHelper;
				}

				if (atualizarMatrizCamera) {
					viewCamera.camera.updateProjectionMatrix();
					viewCamera.cameraHelper.update();
				}

				pontoLuz.position.copy( item.valorXYZ );

				break;
			case EIdsItens.ILUMINACAO:
				desenharIluminacao(item, objetoAux);
				break;
			case EIdsItens.DRONE:
				desenhaDrone(item, objetoAux);
				break;
			case EIdsItens.TARGET:
				desenhaTarget(item, objetoAux);
				break;
			case EIdsItens.ANIMACAO:
				/* Nada aqui. Eh só para parar os pipocos =]*/
				break;

			default:
			  throw new Error ("Não foi possível processar a visualização do item. Id " + item.id + " não era esperada!");
		}
	};

	function desenharPoligono(item, objetoAux) {
		if (item.visible) {
			var points = [];

			for (var i = 0; i < item.listaPontos.length; i++) {
				points.push(item.listaPontos[i]);
			}

			var cor = item.propriedadeCor.getHex();

			if (item.primitiva == CG.listaDePrimitivas.Vertices || item.listaPontos.length <= 1) {
				var geometria = new THREE.SphereGeometry( 5, 32, 32 );
				var material  = new THREE.MeshPhongMaterial({ color: cor, ambient: cor, overdraw: true });

				var x, y, z;
				var point;

				for (var i = 0; i < item.listaPontos.length; i++) {
					point = new THREE.Mesh(geometria, material);

					x = item.listaPontos[i].x > 0 ? item.listaPontos[i].x - 4 : item.listaPontos[i].x + 4;
					y = item.listaPontos[i].y > 0 ? item.listaPontos[i].y - 4 : item.listaPontos[i].y + 4;
					z = item.listaPontos[i].z > 0 ? item.listaPontos[i].z - 4 : item.listaPontos[i].z + 4;

					point.position.set(x, y, z);
					objetoAux.add(point);
					point.item = item;
					scope.listaObjetosSelecionaveis.push(point);
				}
			} else if (item.primitiva == CG.listaDePrimitivas.Aberto) {
				var geometria = new THREE.Geometry();
				geometria.vertices = points;
				geometria.computeLineDistances();

				var material = new THREE.LineBasicMaterial( { linewidth: 2, color: cor, transparent: false } );
				var linha = new THREE.Line(geometria, material, THREE.LineStrip);
				linha.item = item;
				objetoAux.add(linha);
				scope.listaObjetosSelecionaveis.push(linha);
			} else if (item.primitiva == CG.listaDePrimitivas.Fechado) {
				var geometria = new THREE.Geometry();

				geometria.vertices = points;
				geometria.vertices.push(item.listaPontos[0]); //REPETE O PRIMEIRO PONTO

				var material = new THREE.LineBasicMaterial( { linewidth: 2, color: cor, transparent: false } );
				var line = new THREE.Line(geometria, material, THREE.LineStrip);
				line.item = item;
				objetoAux.add(line);
				scope.listaObjetosSelecionaveis.push(line);

				//DESENHA O POLIGONO INVISÍVEL PARA SELEÇÃO
				var geoTransparente = new THREE.Geometry();
				geoTransparente.vertices = points;

				//ADICIONA AS FACES DO TRIANGULO
				for (var i = 0; i < (item.listaPontos.length - 2); i++) {
					geoTransparente.faces.push(new THREE.Face3(0, i + 1, i + 2));
				}

				geoTransparente.computeLineDistances();

				var matTransparente      = new THREE.MeshPhongMaterial({opacity: 0.001, transparent: true, side:THREE.DoubleSide});
				var poligonoTransparente = new THREE.Mesh(geoTransparente, matTransparente);

				poligonoTransparente.item = item;
				objetoAux.add(poligonoTransparente);
				scope.listaObjetosSelecionaveis.push(poligonoTransparente);
			} else if (item.primitiva == CG.listaDePrimitivas.Preenchido) {
				// DESENHA A LINHA ANTES DAS FACES
				var geoLine = new THREE.Geometry();

				geoLine.vertices = points;
				geoLine.vertices.push(item.listaPontos[0]); //REPETE O PRIMEIRO PONTO

				var matLine = new THREE.LineBasicMaterial( { linewidth: 2, color: cor, transparent: false } );
				var line = new THREE.Line(geoLine, matLine, THREE.LineStrip);
				line.item = item;
				objetoAux.add(line);
				scope.listaObjetosSelecionaveis.push(line);

				var geometria = new THREE.Geometry();
				geometria.vertices = points;

				//ADICIONA AS FACES DOS TRIANGULOS
				for (var i = 0; i < (item.listaPontos.length - 2); i++) {
					geometria.faces.push(new THREE.Face3(0, i + 1, i + 2));
				}

				geometria.computeLineDistances();

				var material = new THREE.MeshPhongMaterial({color:cor, ambient: cor, overdraw: true, side:THREE.DoubleSide});
				var poligono = new THREE.Mesh(geometria, material);

				poligono.item = item;
				objetoAux.add(poligono);
				scope.listaObjetosSelecionaveis.push(poligono);
			}

			//CRIAR BBOX
			var geometriaBBox = new THREE.Geometry();
			geometriaBBox.vertices = points;
			geometriaBBox.computeLineDistances();

			var materialBBox = new THREE.LineBasicMaterial( { linewidth: 1, opacity: 0.0001, transparent: true } );
			var linhaBBox    = new THREE.Line(geometriaBBox, materialBBox, THREE.LineStrip);
			linhaBBox.item = item;

			linhaBBox.add(addBBox(item, linhaBBox));
			objetoAux.add(linhaBBox);
		}
	};

	function desenharSpline(item, objetoAux) {
		if (item.visible) {
			var points = [];

			for (var i = 0; i < item.listaPontos.length; i++) {
				points.push(item.listaPontos[i]);
			}

			var cor = item.propriedadeCor.getHex();

			if (item.tipoSpline == CG.listaTipoSpline.Bezier) {
				if (item.poliedroEnabled == true) { //DESENHAR POLIEDRO
					objetoAux.add(item.poliedro);
				}

				objetoAux.add(item.object3D);
				scope.listaObjetosSelecionaveis.push(item.object3D);

				item.object3D.add(addBBox(item, item.object3D));
			}
		}
	};

	function desenharIluminacao(item, objetoAux) {
		if (item.visible) {
			var light  = undefined;
			var helper = undefined;
			var cor = item.propriedadeCor.getHex();

			if (item.tipoLuz == CG.listaTipoLuz.Ambient) {
				light = new THREE.AmbientLight(cor);
				light.position.set( item.posicao.x, item.posicao.y, item.posicao.z );
			} else if (item.tipoLuz == CG.listaTipoLuz.Hemisphere) {
				light = new THREE.HemisphereLight(cor, item.corFundoLuz, item.intensidade);
				light.position.set( item.posicao.x, item.posicao.y, item.posicao.z );

				helper = new THREE.HemisphereLightHelper(light, 10);
			} else if (item.tipoLuz == CG.listaTipoLuz.Directional) {
				light = new THREE.DirectionalLight(cor, item.intensidade);
				light.position.set( item.posicao.x, item.posicao.y, item.posicao.z );

				helper = new THREE.DirectionalLightHelper(light, 20);

				light.target.position.set(item.posicaoTarget.x, item.posicaoTarget.y, item.posicaoTarget.z);
				light.target.matrixWorld.elements[ 12 ] = item.posicaoTarget.x;
				light.target.matrixWorld.elements[ 13 ] = item.posicaoTarget.y;
				light.target.matrixWorld.elements[ 14 ] = item.posicaoTarget.z;

			} else if (item.tipoLuz == CG.listaTipoLuz.PointLight) {
				light = new THREE.PointLight(cor, item.intensidade, item.distancia);
				light.position.set( item.posicao.x, item.posicao.y, item.posicao.z );

				helper = new THREE.PointLightHelper( light, 20 );
			} else if (item.tipoLuz == CG.listaTipoLuz.SpotLight) {
				light = new THREE.SpotLight(cor, item.intensidade, item.distancia, item.angulo, item.expoente);
				light.position.set( item.posicao.x, item.posicao.y, item.posicao.z );

				light.target.position.set(item.posicaoTarget.x, item.posicaoTarget.y, item.posicaoTarget.z);
				light.target.matrixWorld.elements[ 12 ] = item.posicaoTarget.x;
				light.target.matrixWorld.elements[ 13 ] = item.posicaoTarget.y;
				light.target.matrixWorld.elements[ 14 ] = item.posicaoTarget.z;

				helper = new THREE.SpotLightHelper(light, 10);
			}

			if (light !== undefined) {
				objetoAux.add(light);
				listaLuzes.push(light);
			}

			if (helper !== undefined) {
				sceneHelper.add(helper);
				helper.update();
				listaLuzesHelpers.push(helper);
			}
		}
	};

	function addBBox(item, object) {
		if (scope.editor.getItemSelecionado() != null) {
			if (((scope.editor.getItemSelecionado().id == item.id) && (scope.editor.getItemSelecionado() == item)) || (item.PaiSelecionado == true)) {
				var bbox = getBoundingBox(object);
				//bbox.position = object.position;
				sceneHelper.add(bbox);
				listaBBox.push(bbox);

				return bbox;
			}
		}
	};

	function getBoundingBox(object) {
		object.geometry.computeBoundingBox();

		var xMax = object.geometry.boundingBox.max.x;
		var xMin = object.geometry.boundingBox.min.x;
		var yMax = object.geometry.boundingBox.max.y;
		var yMin = object.geometry.boundingBox.min.y;
		var zMax = object.geometry.boundingBox.max.z;
		var zMin = object.geometry.boundingBox.min.z;

		var geometria = new THREE.Geometry();

		//Face 1
		geometria.vertices.push( new THREE.Vector3( xMin, yMax, zMax ) );//1
		geometria.vertices.push( new THREE.Vector3( xMax, yMax, zMax ) );//2
		geometria.vertices.push( new THREE.Vector3( xMax, yMax, zMax ) );//2
		geometria.vertices.push( new THREE.Vector3( xMax, yMin, zMax ) );//3
		geometria.vertices.push( new THREE.Vector3( xMax, yMin, zMax ) );//3
		geometria.vertices.push( new THREE.Vector3( xMin, yMin, zMax ) );//4
		geometria.vertices.push( new THREE.Vector3( xMin, yMin, zMax ) );//4
		geometria.vertices.push( new THREE.Vector3( xMin, yMax, zMax ) );//1

		//Face 2
		geometria.vertices.push( new THREE.Vector3( xMin, yMax, zMin ) );//8
		geometria.vertices.push( new THREE.Vector3( xMax, yMax, zMin ) );//7
		geometria.vertices.push( new THREE.Vector3( xMax, yMax, zMin ) );//7
		geometria.vertices.push( new THREE.Vector3( xMax, yMin, zMin ) );//6
		geometria.vertices.push( new THREE.Vector3( xMax, yMin, zMin ) );//6
		geometria.vertices.push( new THREE.Vector3( xMin, yMin, zMin ) );//5
		geometria.vertices.push( new THREE.Vector3( xMin, yMin, zMin ) );//5
		geometria.vertices.push( new THREE.Vector3( xMin, yMax, zMin ) );//8

		//Ligacoes
		geometria.vertices.push( new THREE.Vector3( xMin, yMax, zMax ) );//1
		geometria.vertices.push( new THREE.Vector3( xMin, yMax, zMin ) );//8
		geometria.vertices.push( new THREE.Vector3( xMax, yMax, zMax ) );//2
		geometria.vertices.push( new THREE.Vector3( xMax, yMax, zMin ) );//7
		geometria.vertices.push( new THREE.Vector3( xMax, yMin, zMax ) );//3
		geometria.vertices.push( new THREE.Vector3( xMax, yMin, zMin ) );//6
		geometria.vertices.push( new THREE.Vector3( xMin, yMin, zMax ) );//4
		geometria.vertices.push( new THREE.Vector3( xMin, yMin, zMin ) );//5

		var material = new THREE.LineBasicMaterial( { color: 0xFF3300} );
		var bbox = new THREE.Line(geometria, material);
		bbox.name = "boundingbox";
		bbox.type = THREE.Line;

		return bbox;
	};

	var views = [
		{
			left: 0,
			bottom: 0,
			width: 0.5,
			height: 1.0,
			background: 0xDDDDDD,
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
			background: 0x000000,
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

	function generateCamera(indiceView) {
		var view = views[indiceView];

		camera = new THREE.PerspectiveCamera(view.fov, 1, view.near, view.far);
		camera.position.x = view.posicao[0];
		camera.position.y = view.posicao[1];
		camera.position.z = view.posicao[2];

		camera.up.x = view.up[0];
		camera.up.y = view.up[1];
		camera.up.z = view.up[2];
		camera.lookAt(new THREE.Vector3().set(view.lookAt[0], view.lookAt[1], view.lookAt[2]));
		view.camera = camera;
	}

	function initVisualizador() {
		// SCENES
		scene = new THREE.Scene();
		sceneHelper = new THREE.Scene();
		scene.add(sceneHelper);

		// CAMERAS
		for (var i =  0; i < views.length; ++i ) {
			generateCamera( i );
		}

		//CONTROLER
		controls = new THREE.TrackballControls( views[0].camera, scope.dom  );
		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		habilitarControls(true);
		controls.dynamicDampingFactor = 0.3;

		// LIGTHS
		var color = 0xffffff;
		var intensity = 2;
		var distance = 0;
		pontoLuz = new THREE.PointLight( color, intensity, distance );
		scene.add( light );

		var skyColor = 0xFFFFFF;
		var groundColor = 0xFFFFFF;
		var intensity = 1;
		var light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
		light.position.set( 1, 1, 1 ).multiplyScalar( 200 );
		sceneHelper.add( light );

		// OBJECTS
		desenharGrade(sceneHelper);
		desenharEixos(sceneHelper);

		// RENDERER

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.sortObjects = false;
		renderer.setSize( scope.dom.offsetWidth, scope.dom.offsetHeight );

		renderer.shadowMapEnabled = true;
		renderer.shadowMapType = THREE.PCFShadowMap;

		renderer.domElement.ondblclick = selecionarObjeto;

		scope.dom.appendChild( renderer.domElement );

	}

	function desenharGrade(sceneHelper) {
		var grid = new THREE.GridHelper( 500, 25 );
		grid.tipoItem = CG.listaItensGraficos.Grade;
		sceneHelper.add( grid );
	}

	function desenharEixos(sceneHelper) {
		var geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3 ( 700, 0, 0 ) );
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 0 ) );
		geometry.computeLineDistances();
		var material = new THREE.LineBasicMaterial( { linewidth: 1, color: 0xFF0000, transparent: true } );
		var lineX = new THREE.Line( geometry, material );
		lineX.tipoItem = CG.listaItensGraficos.EixoX;
		sceneHelper.add(lineX);

		geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 0 ) );
		geometry.vertices.push( new THREE.Vector3 ( 0, 700, 0 ) );
		geometry.computeLineDistances();
		material = new THREE.LineBasicMaterial( { linewidth: 1, color: 0x00FF00, transparent: true } );
		var lineY = new THREE.Line( geometry, material );
		lineY.tipoItem = CG.listaItensGraficos.EixoY;
		sceneHelper.add( lineY );

		geometry = new THREE.Geometry();
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 0 ) );
		geometry.vertices.push( new THREE.Vector3 ( 0, 0, 700 ) );
		geometry.computeLineDistances();
		material = new THREE.LineBasicMaterial( { linewidth: 1, color: 0x0000FF, transparent: true } );
		var lineZ = new THREE.Line( geometry, material );
		lineZ.tipoItem = CG.listaItensGraficos.EixoZ;
		sceneHelper.add( lineZ );
	}

	function habilitarControls(habilitar) {
		controls.noRotate     = !habilitar;
		controls.staticMoving = !habilitar;
	};

	function onWindowResize() {
		if (windowWidth != scope.dom.offsetWidth || windowHeight != scope.dom.offsetHeight) {
			windowWidth  = scope.dom.offsetWidth;
			windowHeight =  scope.dom.offsetHeight;

			renderer.setSize (windowWidth, windowHeight);
		}
	};

	scope.renderizar = function () {
		for ( var i = 0; i < views.length; ++i ) {
			var view = views[i];
			var camera = view.camera;

			var left   = Math.floor(windowWidth  * view.left);
			var bottom = Math.floor(windowHeight * view.bottom);
			var width  = Math.floor(windowWidth  * view.width);
			var height = Math.floor(windowHeight * view.height);

			renderer.setViewport(left, bottom, width, height);
			renderer.setScissor(left, bottom, width, height);
			renderer.enableScissorTest(true);

			if (view.clearColorCamera !== undefined) {
				renderer.setClearColor( view.clearColorCamera, view.background.a  );
			} else {
				renderer.setClearColor( view.background, view.background.a );
			}

			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			if (view.cameraHelper) {
				scene.remove(sceneHelper);
				renderer.render(scene, camera);
				scene.add(sceneHelper);
			} else {
				renderer.render( scene, camera );
			}
		}
		controls.update();
	};

	function selecionarObjeto( event ) {
		mouse3D.x = ((event.clientX - scope.dom.offsetTop) / (renderer.domElement.width)) * 2 - 1;
		mouse3D.y = -((event.clientY - scope.dom.offsetTop) / renderer.domElement.height) * 2 + 1;

		var vetor = new THREE.Vector3(mouse3D.x, mouse3D.y, 1);
		var projetor3D = new THREE.Projector();
		projetor3D.unprojectVector(vetor, views[0].camera);

		var raio3D = new THREE.Raycaster();
		raio3D.set( views[0].camera.position, vetor.sub(views[0].camera.position).normalize());

		var intersects = raio3D.intersectObjects(scope.listaObjetosSelecionaveis);

		if (intersects.length > 0) {
			editor.selecionarItem(intersects[0].object.item);
		} else {
			editor.selecionarItem(null);

			scope.listaObjetosSelecionaveis = [];
			visualizarItem(scope.editor.painelMontagem, scene);
		}
	};

	/**
	 * Carrega um arquivo .obj com o 3D model do drone e adiciona ele para ser renderizado
	 */
	function desenhaDrone(item, objetoAux){
		if ( item.visible ) {
			var drone = item.object3D;
			if( drone != undefined ){
				objetoAux.add(drone);
				scope.listaObjetosSelecionaveis.push(drone);
				/** O object3D root do drone não tem geometria devido que eh lido de um obj. Por isso, passamos o primeiro filho */
				drone.add(addBBox(item, drone.children[0]));
			}
		}
	}

	/**
	 * Renderiza o plano que representa o target da cena
	 */
	function desenhaTarget(item, objetoAux){
		if ( item.visible ) {
			var plano = item.object3D;
			var cor = item.propriedadeCor.getHex();
			plano.material.color.setHex( cor );
			plano.material.map = item.usarTextura ? item.textura : null;
			plano.material.needsUpdate = true;
			plano.geometry.buffersNeedUpdate = true;
			plano.geometry.uvsNeedUpdate = true;
			plano.item = item;
			objetoAux.add(plano);
			scope.listaObjetosSelecionaveis.push(plano);

			plano.add(addBBox(item, plano));
		}
	}

	/**
	 * Renderiza um cubo ^.^
	 */
	function desenhaCubo(item, objetoAux) {
		if ( item.visible ) {
			var cubo = item.object3D;
			scope.listaObjetosSelecionaveis.push(cubo);
			cubo.item = item;
			var corCubo = item.propriedadeCor.getHex();
			cubo.material.color.setHex( corCubo );
			cubo.material.map = item.usarTextura ? item.textura : null;
			cubo.material.needsUpdate = true;
			cubo.geometry.buffersNeedUpdate = true;
			cubo.geometry.uvsNeedUpdate = true;
			//cubo.visible = item.visible;
			//cubo.position.set( item.posicao.x, item.posicao.y, item.posicao.z );
			objetoAux.add(cubo);
			cubo.add(addBBox(item, cubo));
		}

	}
};

VisualizadorGrafico.prototype = Object.create( UI.Panel.prototype );
