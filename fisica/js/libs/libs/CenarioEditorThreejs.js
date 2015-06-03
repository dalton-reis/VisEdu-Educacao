window.onload = start;

var scene;
var camera;
var posInitCamera;
var controls;
var render;
var container;
var mouse = new THREE.Vector2();
var indice = 0;
var objectSelect = undefined;
var offset = new THREE.Vector3();
var objectActual, setObject;
var stats;
var base;
var play = false;
var auxPaly = play;
var primeiraPosicao = 0;
var strAquivo;
var bbox;
var divSelect;
var modoTutorial = false;
var canhao;
var tutorialCriaObjeto = false;

// LISTA DE OBJETOS:
var listObjetcsGraphics = [];
var listObjetcsPhys = [];
var listaRigidBody = [];

var forces = [];

$(window).blur(function() {
	console.log("Blur Win");
	auxPlay = play;
	playPausa(false);
});

$(function() {
	$('.dropdown-submenu > a').submenupicker();
});

$(function() {
	$('.modal-dialog').draggable({
		handle : ".modal-header"
	});
})

/*
 * $(document).ready(function(){ console.log("Funcionou"); $(function(){
 * $("[data-toggle='tooltip']").tooltip(); });
 * 
 * $(function () { $('[data-toggle="popover"]').popover() }); });
 * 
 * /** $(document).ready(function () { $("#Madeira").click(function () {
 * console.log("Jquery Funcionou!!!"); }); });
 */
/**
 * $(window).focus(function () { console.log("Focus Win"); setTimeout("play =
 * auxPlay", 100); setTimeout("console.log(play)", 101); });
 */

function start() {
	selecionaServidor();
	// HEFESTO._host = 'costao.inf.furb.br:8080';
	console.log("Entrou Aqui!");
	inicializaSimualcao();
}

function criaCena() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth
			/ window.innerHeight, 0.1, 1000);

	posInitCamera = new THREE.Vector3(20, 23, 20);

	restCamera(camera, posInitCamera);

	// movimenta a camera
	controls = new THREE.TrackballControls(camera);
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	container = document.getElementById('container');
	// alert(container);
	render = new THREE.WebGLRenderer();
	render.setSize(container.offsetWidth, container.offsetHeight);
	render.setClearColor(0xFFFFFF);

	container.innerHTML = "";
	container.appendChild(render.domElement);

	// var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	// scene.add(directionalLight);
	// directionalLight.position.set(-600, 600, 600);

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(100, 500, 200);

	spotLight.castShadow = true;

	spotLight.shadowMapWidth = 1024;
	spotLight.shadowMapHeight = 1024;

	spotLight.shadowCameraNear = 500;
	spotLight.shadowCameraFar = 4000;
	spotLight.shadowCameraFov = 30;

	scene.add(spotLight);

	// camera.position.set(posInitCamera.x,posInitCamera.y,posInitCamera.z);

	// camera.position.z = 20;
	// camera.position.y = 23;
	// camera.position.x = 20;

	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(new THREE.AxisHelper(300));
	scene.add(new THREE.GridHelper(150, 15));

	projector = new THREE.Projector();
	plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 8, 8),
			new THREE.MeshBasicMaterial({
				color : 0x000000,
				opacity : 0.25,
				transparent : true,
				wireframe : true
			}));
	plane.visible = false;
	scene.add(plane);

	var baseGeometry = new THREE.BoxGeometry(300, 1, 300);
	var baseMaterial = new THREE.MeshBasicMaterial({
		color : 0x00FF00,
		transparent : true,
		opacity : 0.2
	});
	var base = new THREE.Mesh(baseGeometry, baseMaterial);

	scene.add(base);

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	// stats.domElement.style.top = '0px';
	stats.domElement.style.bottom = '0px';
	stats.domElement.style.right = '0px';
	container.appendChild(stats.domElement);
}

function adicionaEventos() {
	render.domElement.addEventListener('mousedown', onDocumentMouseDown);

	render.domElement.addEventListener("mousemove", onDocumentMouseMove);

	render.domElement.addEventListener('mouseup', onDocumentMouseUP);

	var arquivo = document.getElementById("arquivo");
	arquivo.addEventListener('change', function(event) {

		var file = event.target.files[0];

		console.log(file);

		var reader = new FileReader();
		reader.addEventListener('load', function(event) {
			strAquivo = event.target.result;
			// console.log(strAquivo);
		}, false);

		reader.readAsBinaryString(file);

		// console.log("Segundo:" + reader.result);
	}, false);
}

function carregaExemplos() {
	var value = document.getElementById('Exemplos').value;
	if (value !== "") {
		var xmlhttp;
		console.log(value);
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("GET", "./ExemplosProntos/" + value + ".txt", true);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200 || xmlhttp.status == 0) {
					var string = xmlhttp.responseText;
					// alert(string);
					Import(JSON.parse(string), scene);
				}
			}
		};

		xmlhttp.send(null);
	} else {
		alert("Escolha um exemplo");
	}
}

function selecionaExemplo(value) {
	if (value !== "") {
		document.getElementById('DescricaoExemplo').innerHTML = '';
		$("#DescricaoExemplo").append("Explica&ccedil;&atilde;o: " + value);
	}
}

function criarObjetoFis(type) {
	try {
		objetoAtual = new ObjetoFisica(
				document.getElementById("Nome" + type).value,
				type === 'Cubo' ? getVector3('tamanho' + type)
						: parseInt(document.getElementById("Tamanho" + type).value),
				type, document.getElementById("Material" + type).value, indice,
				getVector3("pos" + type), getVector3("v" + type), document
						.getElementById("Massa" + type).value, document
						.getElementById("amortce_Linear_" + type).value,
				document.getElementById("amortce_Angular_" + type).value,
				getVector3("rot" + type), getVector3("ac" + type),
				getQuaternion("o" + type), colisao(type),
				type === 'Alvo' ? false : true, type === 'Alvo' ? false
						: check('usaForcas_' + type));
		console.log(objetoAtual.getAceleracao());
		// console.log(check('usaForcas_'+type))
		objetoAtual.CriaObjeto(type, scene);// Colocar como parametro a cena.
		// console.log(document.getElementById("MaterialEsfera").value);
		listObjetcsPhys.push(objetoAtual);
		// console.log(objetoAtual.getOrientacao());
		document.getElementById("listaObjetos").appendChild(
				objetoAtual.getDiv2());
		document.getElementById("listaDeObjetos_Esfera").appendChild(
				objetoAtual.addLista('Esfera')); // Mudar para MAIUSCULA A
		// PRIMEIRA LETRA DA LISTAS
		document.getElementById("listaDeObjetos_Cubo").appendChild(
				objetoAtual.addLista('Cubo')); // Mudar para MAIUSCULA A
		// PRIMEIRA LETRA DA LISTAS
		document.getElementById("listaDeObjetos_Alvo").appendChild(
				objetoAtual.addLista('Alvo')); // Mudar para MAIUSCULA A
		// PRIMEIRA LETRA DA LISTAS
		indice++;
		if (modoTutorial) {
			setTimeout(function() {
				aposCriacaoCubo()
			}, 1000);
		}
	} catch (e) {
		lert(e);
	}
}

function criaForca() {
	console.log(document.getElementById('nomeForca').value);
	var force = {
		name : document.getElementById('nomeForca').value,
		values : getVector3("Forcas")
	}
	bindForce(force);

	if (modoTutorial) {
		setTimeout(function() {
			addForcaP2()
		},1000);
		
	}
}

function createCannon() {
	/*
	 * cannon = new GAMU.Cannon(scene); cannon.angle = 0; cannon.initialVelocity =
	 * 800; cannon.position = new THREE.Vector3(-100, 0, -100); cannon.build();
	 */

	canhao = new THREE.PerspectiveCamera(9, 1, 1, 50);
	canhao.position.set(0, 9, 0);
	// canhao.lookAt(0,0,0);
	scene.add(canhao);

	var helperCanhao = new THREE.CameraHelper(canhao, 10);
	scene.add(helperCanhao);
}

function playPausa(valor) {
	play = valor;
	console.log(play);
	if (play === true) {
		document.getElementById('btnPlay').className = 'btn btn-success navbar-btn';
		document.getElementById('btnPause').className = 'btn btn-primary navbar-btn';
		if (bbox !== null) {
			scene.remove(bbox);
		}
		for (var i = primeiraPosicao; i < listObjetcsPhys.length; i++) {
			if (listObjetcsGraphics[i] !== undefined) {
				var newPositions = listObjetcsGraphics[i].position;
				listObjetcsPhys[i].setPosicoes(newPositions.x, newPositions.y,
						newPositions.z);
				var rigidbody = new rigidBody(i);
				console.log(listObjetcsPhys[i].getPosicaoInicial());
				rigidbody.creatRigidBody();
			}
			primeiraPosicao = listObjetcsPhys.length;
			// console.log(primeiraPosicao);
		}
	} else {
		document.getElementById('btnPlay').className = 'btn btn-primary navbar-btn';
		document.getElementById('btnPause').className = 'btn btn-success navbar-btn';
	}
	
	if(modoTutorial === true){
		ativa();//preciso terminar de fazer o ativa para ativar todos os botões.
	}
}

function renderiza() {
	requestAnimationFrame(renderiza);
	if (!simulation.isBusy()) {
		if (play === true) {
			simulation.integrate(timming.getLastFrameDuration() * 0.001);
		}
		controls.update();
		render.render(scene, camera);
		stats.update();
		timming.update();
		// }
	}
}

function onDocumentMouseDown(event) {
	event.preventDefault();
	var vector = new THREE.Vector3(
			((event.clientX - container.offsetLeft) / container.clientWidth) * 2 - 1,
			-((event.clientY - container.offsetTop) / container.clientHeight) * 2 + 1,
			0.5);
	projector.unprojectVector(vector, camera);
	var raycaster = new THREE.Raycaster(camera.position, vector.sub(
			camera.position).normalize());
	var intersects = raycaster.intersectObjects(listObjetcsGraphics);
	if (intersects.length > 0) {
		controls.enabled = false;
		objectSelect = intersects[0].object;
		setObject = intersects[0].object;
		retornaID();
		// PropriedadesObjeto(listObjetcsPhys.length - 1);
		var intersects = raycaster.intersectObject(plane);
		offset.copy(intersects[0].point).sub(plane.position);
		container.style.cursor = 'move';
	} else {
		container.style.cursor = 'auto';
	}
};

function retornaID() {
	for (var i = 0; i < listObjetcsGraphics.length; i++) {
		if (objectSelect === listObjetcsGraphics[i]) {
			selecionaObjetos(i);
		}
	}
}

function onDocumentMouseMove(event) {
	Posicoes(camera, "camera", '');
	if (objectSelect !== undefined) {
		var z = objectSelect.position.z;
		Posicoes(setObject, "p", '');
	}
	mouse.x = ((event.clientX - container.offsetLeft) / container.clientWidth) * 2 - 1;
	mouse.y = -(((event.clientY - container.offsetTop)) / container.clientHeight) * 2 + 1;

	var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
	projector.unprojectVector(vector, camera);
	var raycaster = new THREE.Raycaster(camera.position, vector.sub(
			camera.position).normalize());
	if (objectSelect) {
		if (bbox !== null) {
			scene.remove(bbox);
		}
		var intersects = raycaster.intersectObject(plane);
		objectSelect.position.copy(intersects[0].point.sub(offset));
		objectSelect.position.z = z;
		return;
	}
	var intersects = raycaster.intersectObjects(listObjetcsGraphics);
	if (intersects.length > 0) {
		container.style.cursor = 'pointer';
		if (objectSelect !== undefined) {

			plane.position.copy(objectSelect.position);
		}
		plane.lookAt(camera.position);
	} else {
		container.style.cursor = "auto";
	}
};
function onDocumentMouseUP() {
	controls.enabled = true;
	objectSelect = undefined;
	container.style.cursor = "auto";
}
function Posicoes(object, campo, msg) {
	var X, Y, Z;
	if (object !== undefined) {
		X = document.getElementById(campo + "X");
		X.value = (object.position.x).toFixed(2);
		Y = document.getElementById(campo + "Y");
		Y.value = (object.position.y).toFixed(2);
		Z = document.getElementById(campo + "Z");
		Z.value = (object.position.z).toFixed(2);
	}
}

function mudaPos() {

	if (bbox !== null) {
		scene.remove(bbox);
	}

	mudaPosition(setObject, 'p', '')

	Posicoes(setObject, "p", '');
	destacaObjeto(setObject);
	if(modoTutorial===true){
		MudaPosicaoP2();
	}
	/*
	 * var hex = 0x000000; bbox = new THREE.BoundingBoxHelper(setObject, hex);
	 * bbox.update(); scene.add(bbox);
	 */
}

function mudaCamera() {
	mudaPosition(camera, 'camera', '');
	Posicoes(camera, 'camera', '');
	
	if(modoTutorial===true){
		MudaPosicaoCamP2();
	}
}

function destacaObjeto(object) {
	var hex = 0x000000;
	bbox = new THREE.BoundingBoxHelper(object, hex);
	bbox.update();
	scene.add(bbox);
}

function mudaPosition(object, field, msg) {
	var x, y, z;
	if (object !== undefined) {
		if (document.getElementById(field + "X").value !== "") {
			x = parseFloat(document.getElementById(field + "X").value);
			object.position.x = x;
		}
		if (document.getElementById(field + "Y").value !== "") {
			y = parseFloat(document.getElementById(field + "Y").value);
			object.position.y = y;
		}
		if (document.getElementById(field + "Z").value !== "") {
			z = parseFloat(document.getElementById(field + "Z").value);
			object.position.z = z;
		}
		clearField3(field);
		Posicoes(object, field, msg);
	}
}

function selecionaObjetos(pos) {
	if (bbox !== null) {
		scene.remove(bbox);
	}
	var objeto = listaRigidBody[pos] !== undefined ? listaRigidBody[pos]
			: listObjetcsGraphics[pos];
	console.log(listaRigidBody[pos]);
	setObject = listObjetcsGraphics[pos];
	Posicoes(objeto, "p", '');
	PropriedadesObjeto(pos);
	destacaObjeto(setObject);
	/*
	 * var hex = 0x000000; bbox = new THREE.BoundingBoxHelper(setObject, hex);
	 * bbox.update(); scene.add(bbox);
	 */

	if (divSelect !== undefined) {
		$(divSelect).toggleClass("divSelect");
		console.log("Entrou Aqui!!!");
	}
	divSelect = "#div" + pos;
	$(divSelect).toggleClass("divSelect");

	if (tutorialCriaObjeto) {
		setTimeout(function() {
			aposDivObjetos()
		}, 1000);
	}
};

function deleteObeject(pos) {
	if (!modoTutorial) {
		scene.remove(listObjetcsGraphics[pos]);
		listObjetcsGraphics[pos] = undefined;
		listObjetcsPhys[pos] = undefined;
		if (listaRigidBody[pos] !== undefined) {
			simulation.removeRigidBody(listaRigidBody[pos]);
		}
		if (bbox !== null) {
			scene.remove(bbox);
		}
	}
};

function PropriedadesObjeto(pos) {
	var escrtica;
	var str = "";
	var objeto = new ObjetoFisica();
	objeto = listObjetcsPhys[pos];
	console.log(objeto.getTipo());
	var tamanho = objeto.getTipo() === "Cubo" ? returnInfVector3(objeto
			.getTamanho()) : objeto.getTamanho();
	// console.log("Tamanho: "+tamanho)
	// Propriedades do Objeto selecionado:
	str = "Tamanho: " + tamanho + "<br>  Material: " + objeto.getMaterial()
			+ "<br> Massa: " + objeto.getMassa() + "<br> Velocidade: "
			+ returnInfVector3(objeto.getVelocidade())
			+ "<br> Acelara&ccedil;&atilde;o: "
			+ returnInfVector3(objeto.getAceleracao())
			+ "<br> Amortec. Angular: " + objeto.getAmortecAngular()
			+ "<br> Amortec. Linear: " + objeto.getAmortecLinear()
			+ "<br> Rota&ccedil;&atilde;o: "
			+ returnInfVector3(objeto.getRotacao())
			+ "<br> Orient&ccedil;&atilde;o: "
			+ returnInfVector3(objeto.getOrientacao());
	escrtica = document.getElementById("listaProriedades");
	escrtica.innerHTML = str;
}

var funcao = function() {
	alert("Teste!!!");
}

function teste() {
	desativaMenusMudaPosicaoObj();
	
	//desativaMenusSalva();
	//AtivaMenuAbrir();
	
	//$("#itemCanhao").toggleClass('disabled');

	/*
	 * modoTutorial = false; $("#menuArquivo").prop('disabled', false);
	 * $("#addForca").prop('disabled', false);
	 * $("#configCanhao").prop('disabled', false);
	 * $("#nrDeBolas").prop('disabled', false); $("#btnPause").prop('disabled',
	 * false); $("#btnPlay").prop('disabled', false);
	 * $("#btnMudarPosicao").prop('disabled', false);
	 * $("#btnMudarCamera").prop('disabled', false);
	 * $("#btnResetCamera").prop('disabled', false);
	 * 
	 * $('#addCanhao').click(createCannon);
	 * 
	 * $("#addAlvo").attr('data-target', '#modalAlvo');
	 * $("#addCubo").attr('data-target', '#modalCubo');
	 * $("#addEsfera").attr('data-target', '#modalEsfera');
	 * 
	 * //console.log("./ExemplosProntos/Cena.txt");
	 *  // simulation.removeForce(forces[0]); /* var xmlhttp;
	 * 
	 * if (window.XMLHttpRequest) { xmlhttp = new XMLHttpRequest(); } else {
	 * xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); } xmlhttp.open("GET",
	 * "./ExemplosProntos/Cena.txt", true); xmlhttp.onreadystatechange =
	 * function() { if (xmlhttp.readyState === 4) { if (xmlhttp.status === 200 ||
	 * xmlhttp.status == 0) { var string = xmlhttp.responseText alert(string); } } };
	 * 
	 * xmlhttp.send(null); // JSON.parse("strAquivo"); //
	 * simulation.removeRigidBody(listaRigidBody[0]); //
	 * scene.remove(listObjetcsGraphics[0]); // listObjetcsGraphics = []; //
	 * indice = 0; // document.getElementById("listaObjetos").innerHTML = "";
	 * /** var data = new XMLHttpRequest();
	 * 
	 * data.onreadystatechange = function () { if (data.readyState == 4 &&
	 * data.status == 200) { var texto = data.responseText; console.log(texto); } };
	 * 
	 * //s var file = new File //console.log(exportarCena());
	 * 
	 * /** var data = exportarCena(); for (var id in data.Objetos) { var o =
	 * data.Objetos[id]; console.log("id:" + id); console.log(o.posicao[0]+2); }
	 * /** $.each(data.Objetos, function (i, o) { console.log(o[i].position);
	 * });
	 */

	// console.log(exportObjetos(listObjetcsPhys[listObjetcsPhys.length-1]));
	// console.log(exportCamera(camera));
	// console.log(exportarCena());
	/**
	 * console.log("Posicao
	 * Inicial"+criaVetorPosicao(listObjetcsPhys[0].getPosicaoInicial()));
	 * console.log("Velocidade"+criaVetorPosicao(listObjetcsPhys[0].getVelocidade()));
	 * console.log("Rotacao"+criaVetorPosicao(listObjetcsPhys[0].getRotacao()));
	 * console.log("Aceleracao"+criaVetorPosicao(listObjetcsPhys[0].getAceleracao()));
	 * console.log("Orientacao"+criaVetorPosicao(listObjetcsPhys[0].getOrientacao()));
	 * console.log("Velocidade
	 * "+criaVetorPosicao(listObjetcsPhys[0].getVelocidade())); /** play =
	 * valor; if (play === true) { for (var i = primeiraPosicao; i <
	 * listObjetcsPhys.length; i++) { var rigidbody = new rigidBody(i);
	 * rigidbody.creatRigidBody(); primeiraPosicao = listObjetcsPhys.length;
	 * //console.log(primeiraPosicao); } /** for (var i = 0; i <
	 * listaRigidBody.length; i++) { if (cx <= 0) { console.log(cx);
	 * 
	 * listaRigidBody[i].position.x = listObjetcsGraphics[i].position.x;
	 * console.log(listaRigidBody[i].position.x);
	 * console.log(listObjetcsGraphics[i].position.x);
	 * listaRigidBody[i].position.y = listObjetcsGraphics[i].position.y;
	 * listaRigidBody[i].position.z = listObjetcsGraphics[i].position.z;
	 * listObjetcsGraphics[i].matrixAutoUpdate = false; } }
	 * 
	 * cx--; } else { for (var i = 0; i < listObjetcsGraphics.length; i++) {
	 * listObjetcsGraphics[i].position.x = listaRigidBody[i].position.x;
	 * //console.log(listaRigidBody[i].position.x);
	 * //console.log(listObjetcsGraphics[i].position.x);
	 * listObjetcsGraphics[i].position.y =
	 * parseFloat(listaRigidBody[i].position.y);
	 * listObjetcsGraphics[i].position.z =
	 * parseFloat(listaRigidBody[i].position.z);
	 * listObjetcsGraphics[i].matrixAutoUpdate = true; } }
	 */
}
