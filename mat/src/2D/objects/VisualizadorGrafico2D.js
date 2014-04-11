//Carrega o metodo principal com as funcoes inicia() e anima() assim que a pagina eh carregada
window.onload = main2D;

var camera, 
	cena, 
	eixos,
	rotulos,
	grade,
	rendererizador, 
	controles,	
	projetor,
	raio,
	cursor,
	ponteiro,
	mouse = {x: 0, y: 0},
	fps2D,
	armazenadorLocal2D;

//Indice para controle da lista de equacoes e serve tambem como nome de cada objetoGrafico
var indice2D = 0;	

//Lista de equacoes existentes na cena
var funcaoList2D = new Array();
	
var x_normalizado, y_normalizado;
	
//variavel que tem o objeto selecionado a partir do duplo clique do mouse	
var OBJETO_SELECIONADO;	

function main2D(){
	inicia();
	anima();
};

function inicia(){
	//Cria a cena
	cena = new THREE.Scene();
	
	//Detecta qual e o browser usado
	BrowserDetect.init();
	
	//Cria e adiciona a camera
	camera = new Camera2D();
	cena.add(camera.getCamera2D());
		
	//Cria o renderizador "WebGLRenderer"
	renderizador = new THREE.WebGLRenderer({antialias: false});
	//Define o tamanho do renderizador
	renderizador.setSize(690, 690);
	//Cor de fundo do canvas
	renderizador.setClearColor(0xEEEEEE, 1);
	//Adiciona o metodo que pinta a BBox no listener de duplo clique
	renderizador.domElement.onmousemove = atualizaPosicaoCursor;
	renderizador.domElement.onclick = desselecionaObjeto;
	//Pega a <div> "div_drawArea" como area padrao para desenho	
	var container = document.getElementById("div_drawArea");
	//Adiciona o renderizador na area da <div> 'div_drawArea'.
	container.appendChild(renderizador.domElement);	
	
	
	//Cria o projetor da cena
	projetor = new THREE.Projector(); 
	//Cria o raio intersectador da cena
	raio = new THREE.Raycaster();
	raio.linePrecision = 0.01;

	//Cria as duas linhas do cursor
	cursor = new Cursor2D();
	cena.add(cursor.getCursor());
	
	rotulos = new RotulosNumericos("2D");
	cena.add(rotulos.getRotulos());
	
	ponteiro = new Ponteiro2D();
	cena.add(ponteiro.getPonteiro());
	
	//Desenha o plano cartesiano e os eixos
	eixos = new Eixos2D();
	cena.add(eixos.getEixos());
	
	//Adiciona a grade auxiliar
	grade = new Grade2D();
	cena.add(grade.getGrade());
	
	//Adiciona os controle do mouse na camera
	controles = new Controles2D( camera.getCamera2D(), renderizador.domElement);
	
	//Visualizador de Frames/s (FPS)
	fps2D = new FrameViewer2D();	
	container.appendChild( fps2D.getFrameViewer() );
	
	//Inicia o armazenador local e carrega a lista de equacoes
	armazenadorLocal2D = new FuncaoStorer();
	armazenadorLocal2D.carregaListaFuncao("2D");
};

function anima() {
	requestAnimationFrame( anima );
	renderizador.render(cena, camera.getCamera2D());
	fps2D.updateFPS();	
	controles.updateControles();
};

function atualizaPosicaoCursor( event ){		
	x_normalizado = (event.clientX - controles.getPosicao("L")) / controles.getLargura();
	y_normalizado = (event.clientY - controles.getPosicao("T")) / controles.getAltura();
	
	//Se o cursor estiver habilitado
	if(document.getElementById("slider_posX").style.visibility == 'visible'){			
		//Movimenta o cursor pelo canvas de acordo com a posicao do mouse
		var x = (x_normalizado * (camera.getDimensao("R") * 2)) - camera.getDimensao("R");
		var y = (-y_normalizado * (camera.getDimensao("T") * 2)) + camera.getDimensao("T");
		cursor.setPosicao(x, y);
		atualizaSliderXY(cursor.getPosicao("x"), cursor.getPosicao("y"));
		atualizaPosXYCursor(cursor.getPosicao("x"), cursor.getPosicao("y"));
		//Atualiza o valor do Y baseado na funcao digitada
		if(OBJETO_SELECIONADO != undefined && document.getElementById("checkbox_Ponteiro").checked == true){
			if(OBJETO_SELECIONADO.getContraDominio() == 'y'){
				if(x < OBJETO_SELECIONADO.getRangeMax() && x > OBJETO_SELECIONADO.getRangeMin()){
					ponteiro.setPosition(x, OBJETO_SELECIONADO.funcaoDeMalha(x).y);
					atualizaPosYPonteiro(OBJETO_SELECIONADO.funcaoDeMalha(x).y);
				}	
				//Se o dominio da funcao for 'x' ele atualizar o ponteiro na coord. Y senao atualiza na coord. X				
			}else if (OBJETO_SELECIONADO.getContraDominio() == 'x'){
				if(y < OBJETO_SELECIONADO.getRangeMax() && y > OBJETO_SELECIONADO.getRangeMin()){
					ponteiro.setPosition(OBJETO_SELECIONADO.funcaoDeMalha(y).x, y);
					atualizaPosXPonteiro(OBJETO_SELECIONADO.funcaoDeMalha(y).x);
				}
			}				
		}
	}
};

function atualizaSliderXY(x,y){
	//Ajuste dos valores max e min dos sliders e da posicao do ponteiro em caso de zoom-in e zoom-out
	$( "#slider_posX" ).slider( "option", "min", -camera.getDimensao("R") );
	$( "#slider_posX" ).slider( "option", "max", camera.getDimensao("R") );
	$( "#slider_posY" ).slider( "option", "min", -camera.getDimensao("T") );
	$( "#slider_posY" ).slider( "option", "max", camera.getDimensao("T") );
	$( "#slider_posX" ).slider("value", x);
	$( "#slider_posY" ).slider("value", y);
	
};

function atualizaPosXYCursor(x,y){
	document.getElementById("coord_X").innerHTML = "X: "+x.toFixed(1);
	document.getElementById("coord_Y").innerHTML = "Y: "+y.toFixed(1);
};

function atualizaPosXPonteiro(x){
	document.getElementById("ponteiro").innerHTML = "X: "+x.toFixed(1);
};

function atualizaPosYPonteiro(y){
	document.getElementById("ponteiro").innerHTML = "Y: "+y.toFixed(1);
};

function desselecionaObjeto(){
	if(OBJETO_SELECIONADO != undefined){
		OBJETO_SELECIONADO.unSelectEquacaoNaLista();
		OBJETO_SELECIONADO.removeBoundingBox();
		div = document.getElementById("div_objetoSelecionado");
		div.innerHTML = "&nbsp;Objeto: ";
		combo = document.getElementById("comboBox_cores");
		combo.disabled = true;
		$( "#slider-dominio_range" ).slider('disable');
		cena.getObjectByName("ponteiro").material.visible = false;
		$( "#slider-dominio_range" ).slider("values", 0, -4);
		$( "#slider-dominio_range" ).slider("values", 1, 4);
		$( "#dominio_range" ).val( $( "#slider-dominio_range" ).slider( "values", 0 ) + "   |   " + $( "#slider-dominio_range" ).slider( "values", 1 ) );	
		document.getElementById("ponteiro").innerHTML = "Y: ";
		document.getElementById("checkbox_Ponteiro").checked = false;
		document.getElementById("checkbox_Ponteiro").disabled = true;
		OBJETO_SELECIONADO = undefined;
	}	
};