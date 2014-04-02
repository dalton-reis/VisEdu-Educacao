//Executa a funcao 'main' assim que a pagina e carregada
window.onload = main;

var camera3D, 
	cena3D,
	rotulos3D,
	renderizador3D, 
	controles3D,	
	projetor3D,
	raio3D,
	container,
	mouse3D = {x: 0, y: 0},
	fps,
	armazenadorLocal;
	
//Indice para controle da lista de equacoes e serve tambem como nome de cada objetoGrafico	
var indice3D = 0;

//Lista de equacoes existentes na cena3D
var funcaoList3D = new Array();	
	
//variavel que tem o objeto selecionado a partir do duplo clique do mouse3D	
var OBJETO_SELECIONADO;	

function main(){
	inicia();
	anima();
};

function inicia(){
	//Detecta qual e o browser usado
	BrowserDetect.init();
	
	//Cria a cena3D
	cena3D = new THREE.Scene();
	
	//Adiciona a camera3D	
	camera3D = new Camera3D();
	cena3D.add(camera3D.getCamera3D());	
	
	//Cria o renderizador3D "WebGLRenderer"
	renderizador3D = new RenderizadorWebGL3D();
	container = document.getElementById("div_drawArea");
	container.appendChild(renderizador3D.getRender());	
	
	//Adiciona a grade auxiliar
	var grade = new Grade3D();
	//Tentativa de alterar a orientacao dos eixos
	//grade.getGrade().rotation.x = Math.PI /2;
	cena3D.add(grade.getGrade());
	
	//Adiciona os controle do mouse3D na camera3D
	controles3D = new Controles3D( camera3D.getCamera3D(), renderizador3D.getRender());
		
	//Cria o projetor3D da cena3D
	projetor3D = new THREE.Projector(); 
	
	//Cria o raio intersectador
	raio3D = new THREE.Raycaster();
	
	//Desenha o plano cartesiano e os eixos
	var eixos = new THREE.AxisHelper(17);	
	eixos.name = "eixo";
	cena3D.add(eixos);
	
	//Adiciona os eixos negativos com linhas pontilhadas
	var eixos_n = new Eixos3D();
	cena3D.add(eixos_n.getEixos());
		
	//Desenha os rotulos
	rotulos3D = new RotulosNumericos("3D");
	cena3D.add(rotulos3D.getRotulos());
	
	//Adiciona luz vertical na cena3D (X)
	var luzes = new Luzes3D();	
	cena3D.add(luzes.getLuz("x"));		
	cena3D.add(luzes.getLuz("y"));		
	cena3D.add(luzes.getLuz("z"));
	
	//Visualizador de Frames/s (FPS)
	fps = new FrameViewer3D();	
	container.appendChild( fps.getFrameViewer() );
	
	//Inicia o armazenador local e carrega a lista de equacoes
	armazenadorLocal = new FuncaoStorer();
	armazenadorLocal.carregaListaFuncao("3D");
};

function anima() {
	requestAnimationFrame( anima );
	renderizador3D.renderiza(cena3D, camera3D.getCamera3D()); 
	controles3D.updateControles();
	fps.updateFPS();
};

function selecionaObjeto( event ){		
	
	//Captura a posicao X do mouse3D, descontando a altura do menu superior		
	mouse3D.x = ((event.clientX - controles3D.getPosicao("L")) / renderizador3D.getRender().width) * 2 - 1;
	//Captura a posicao Y do mouse3D, descontando a largura da lista de equacoes
	mouse3D.y = -((event.clientY - controles3D.getPosicao("T")) / renderizador3D.getRender().height) * 2 + 1;
	
	//Cria um raio com origen na posicao do mouse3D em direcao a camera3D (dentro da cena3D)
	var vetor = new THREE.Vector3( mouse3D.x, mouse3D.y, 1 );
	projetor3D.unprojectVector( vetor, camera3D.getCamera3D() );
	raio3D.set( camera3D.getPosicao(), vetor.sub( camera3D.getPosicao() ).normalize() );
	
	// cria um array com todos os objetos da cena3D que sao interseccionados pelo raio.
	var intersects = raio3D.intersectObjects( getListaFuncaoCena() );
	
	if ( intersects.length > 0 ){
		atualizaBBoxSelecionada();
		OBJETO_SELECIONADO = funcaoList3D[intersects[0].object.name];
		//Objeto precisa estar visivel
		if(OBJETO_SELECIONADO.getMalhaGraficaFuncao().material.visible == true ){
			//Desenha a BoundingBox
			OBJETO_SELECIONADO.getBoundingBox();
			//Seleciona a equacao na lista de equacoes	
			OBJETO_SELECIONADO.selectEquacaoNaLista();
			atualizaPainelObjSelecionado();
		}						
	}else{
		atualizaBBoxSelecionada();
	}	
};

//Se clicou fora e o objeto tiver a boundinBox, ele remove e atualiza o painel de selecao de objetos
function atualizaBBoxSelecionada(){
	if(OBJETO_SELECIONADO != null){
		var obj = OBJETO_SELECIONADO.getMalhaGraficaFuncao().getObjectByName("boundingbox");
		if(obj != undefined){
			OBJETO_SELECIONADO.removeBoundingBox();
			OBJETO_SELECIONADO.unSelectEquacaoNaLista();
			OBJETO_SELECIONADO = null;
			atualizaPainelObjSelecionado();
		}
	}
};

function atualizaPainelObjSelecionado(){
	var div, combo, chkbox;
	
	if(OBJETO_SELECIONADO != null){
		div = document.getElementById("div_objetoSelecionado");
		div.innerHTML = "&nbsp;Objeto: "+ OBJETO_SELECIONADO.getMalhaGraficaFuncao().name;
		combo = document.getElementById("comboBox_cores");
		combo.disabled = false;
		combo = document.getElementById("comboBox_material");
		combo.disabled = false;
		chkbox = document.getElementById("checkbox_wireframe");
		chkbox.disabled = false;
		$( "#slider-range_2" ).slider('enable');
		$( "#slider-range_1" ).slider('enable');
		if(OBJETO_SELECIONADO.getDominioDaFuncao() == 'y'){
			document.getElementById('range_1').innerHTML = "&nbsp;X: ";
			document.getElementById('range_2').innerHTML = "&nbsp;Z: ";	
		}else if(OBJETO_SELECIONADO.getDominioDaFuncao() == 'x'){	
			document.getElementById('range_1').innerHTML = "&nbsp;Z: ";	
			document.getElementById('range_2').innerHTML = "&nbsp;Y: ";	
		} else {
			document.getElementById('range_1').innerHTML = "&nbsp;X: ";	
			document.getElementById('range_2').innerHTML = "&nbsp;Y: ";	
		}
	}else{		
		div = document.getElementById("div_objetoSelecionado");
		div.innerHTML = "&nbspObjeto: ";
		combo = document.getElementById("comboBox_cores");
		combo.disabled = true;
		combo = document.getElementById("comboBox_material");
		combo.disabled = true;
		chkbox = document.getElementById("checkbox_wireframe");
		chkbox.disabled = true;
		$( "#slider-range_2" ).slider('disable');
		$( "#slider-range_1" ).slider('disable');
	}
	atualizaCorObjSelecionado();
	atualizaMaterialObjSelecionado();
	atualizaRangeValoresXY();
};


function atualizaCorObjSelecionado(){
	var combo = document.getElementById("comboBox_cores");
	
	if(OBJETO_SELECIONADO != null){
		if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "ff0000"){
			combo.selectedIndex = 1;
		}else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "00ff00"){
			combo.selectedIndex = 2;
		}else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "0000ff"){
			combo.selectedIndex = 3;
		}else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "ffff00"){
			combo.selectedIndex = 4;
		}else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "ff6600"){
			combo.selectedIndex = 5;
		} else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "9900ff"){
			combo.selectedIndex = 6;
		} else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "666666"){
			combo.selectedIndex = 7;
		}
	}else{
		combo.selectedIndex = 0;
	}
};

//Ao selecionar um objeto grafico, ele atualiza o comboBox de material de acordo com o material do mesmo
function atualizaMaterialObjSelecionado(){
	var combo = document.getElementById("comboBox_material");
	var chkbox = document.getElementById("checkbox_wireframe");
	
	if(OBJETO_SELECIONADO != null){
		if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica() instanceof THREE.MeshLambertMaterial){
			combo.selectedIndex = 1;
		} else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica() instanceof THREE.MeshBasicMaterial){
			combo.selectedIndex = 2;
		} else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica() instanceof THREE.MeshPhongMaterial){
			combo.selectedIndex = 3;
		} 
		
		//Se estiver exibindo em wireframe
		if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().wireframe == false){
			chkbox.checked = false;
		}else{
			chkbox.checked = true;
		}
	}else{
		combo.selectedIndex = 0;
	}
};

//Ao selecionar um objeto grafico, ele atualiza o slider X e Y de acordo com os valores do mesmo
function atualizaRangeValoresXY(){
	if(OBJETO_SELECIONADO != null){
		$( "#slider-range_1" ).slider("values", 0, OBJETO_SELECIONADO.getRange1min());
		$( "#slider-range_1" ).slider("values", 1, OBJETO_SELECIONADO.getRange1max());
		$( "#in_range_1" ).val( $( "#slider-range_1" ).slider( "values", 0 ) + "   |   " + $( "#slider-range_1" ).slider( "values", 1 ) );
		$( "#slider-range_2" ).slider("values", 0, OBJETO_SELECIONADO.getRange2min());
		$( "#slider-range_2" ).slider("values", 1, OBJETO_SELECIONADO.getRange2max());
		$( "#in_range_2" ).val( $( "#slider-range_2" ).slider( "values", 0 ) + "   |   " + $( "#slider-range_2" ).slider( "values", 1 ) );
	}else{ 
		$( "#slider-range_1" ).slider("values", 0, -2);
		$( "#slider-range_1" ).slider("values", 1, 2);
		$( "#in_range_1" ).val( $( "#slider-range_1" ).slider( "values", 0 ) + "   |   " + $( "#slider-range_1" ).slider( "values", 1 ) );		
		$( "#slider-range_2" ).slider("values", 0, -2);
		$( "#slider-range_2" ).slider("values", 1, 2);
		$( "#in_range_2" ).val( $( "#slider-range_2" ).slider( "values", 0 ) + "   |   " + $( "#slider-range_1" ).slider( "values", 1 ) );
	}   
};

//Redefine a posicao da camera3D para inicial
function redefineCamera(){
	controles3D.resetControle();
};
