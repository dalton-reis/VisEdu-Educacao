document.getElementById("bu_EquacaoOK").onclick = adicionaFuncaoNaLista;


//Variavel que define o dominio da funcao gerada
var dominio = 'x';

function adicionaFuncaoNaLista(){
	document.getElementById("div_error").style.visibility = 'hidden';
	document.getElementById("div_error").innerHTML="";
	try{
		var texto = document.getElementById("in_EquacaoTexto").value;
		if(texto == ""){
			throw 'Erro: Digite alguma fun&ccedil;&atilde;o!';
		}
		//Cria o objeto Equacao que sera inserida na lista
		var obj_Funcao = new Funcao2D(texto, indice2D, dominio);
		
		//Adiciona o objeto na lista de objeto do Visualizador Grafico
		funcaoList2D[indice2D] = obj_Funcao;
		cena.add(obj_Funcao.getFuncaoGrafica());	
		
		//Adiciona a equacao na lista 'td_equationList'
		document.getElementById("td_equationList").appendChild(obj_Funcao.getDivFuncao());
		
		//Salva a equacao localmente
		armazenadorLocal2D.salvar(obj_Funcao);
		
		//Funcao ASCIIMathML que traduz a notacao matematica digitada para notacao escrita
		if (BrowserDetect.browser == 'Firefox'){
			translate();
		}
		indice2D++;
		document.getElementById("in_EquacaoTexto").value = "";	
	}catch(erro){
		var h = '<span class="ui-icon ui-icon-alert" style="float:left;margin: 3px;"></span>';
		document.getElementById("div_error").style.visibility = 'visible';		
		document.getElementById("div_error").innerHTML = h + erro;	
	}
	
};

//Metodo que retorna uma FUNCAO adicionada na lista de acordo com o 'indice' passado como parametro
function getListaEquacaoCena(pos){
	var arrayEquacoes = new Array;
	
	if(pos != undefined){
		return funcaoList2D[pos];
	}else{
		for(var i = 0; i<funcaoList2D.length; i++){
			if(funcaoList2D[i] != null){
				arrayEquacoes.push(funcaoList2D[i].getFuncaoGrafica());
			}
		}
		return arrayEquacoes;
	}	
};

function adicionaFuncoesDidaticas(id){
	if(id =="0"){
		document.getElementById("in_EquacaoTexto").value = "sin(x)";
		adicionaFuncaoNaLista();
	}else if(id=="1"){
		document.getElementById("in_EquacaoTexto").value = "cos(x)";
		adicionaFuncaoNaLista();
	}
	$('#div_exemploDidaticos').dialog("close");
};

//Funcao para trocar o valor do resultado da funcao principal
function funcaoDeXY(){
	if(document.getElementById('bu_dominioDaFuncaoXY').value == 'y = '){
		dominio = 'y';
		document.getElementById('bu_dominioDaFuncaoXY').value = "x = ";
		document.getElementById('label_Dominio').innerHTML = "&nbsp;Y: ";
		document.getElementById('ponteiro').innerHTML = "X: ";
	}else{	
		dominio = 'x';
		document.getElementById('bu_dominioDaFuncaoXY').value = "y = ";
		document.getElementById('label_Dominio').innerHTML = "&nbsp;X: ";
		document.getElementById('ponteiro').innerHTML = "Y: ";
	}
};


function exibeGrade(){
	var obj = grade.getGrade();
	if(obj.material.visible == true){
		obj.material.visible = false;
	}else{
		obj.material.visible = true;
	}	
};

function exibeEixos(){
	var eixo = eixos.getEixos();
	var rot = rotulos.getRotulos();
	if(eixo.material.visible == true){
		eixo.material.visible = false;
		rot.material.visible = false;
	}else{
		eixo.material.visible = true;
		rot.material.visible = true;
	}	
};

function exibeCursor(){
	var sliderX = document.getElementById("slider_posX");
	var sliderY = document.getElementById("slider_posY");	
	if(sliderX.style.visibility == 'visible'){
		sliderX.style.visibility = 'hidden';
		sliderY.style.visibility = 'hidden';
		cena.getObjectByName("cursor").material.visible = false;
		document.getElementById("checkbox_Ponteiro").disabled = true;
	}else{
		sliderX.style.visibility = 'visible';
		sliderY.style.visibility = 'visible';
		cena.getObjectByName("cursor").material.visible = true;
		document.getElementById("checkbox_Ponteiro").disabled = false;
	}
	cursor.setPosicao("x", 0);	
	cursor.setPosicao("y", 0);
	$( "#slider_posX" ).slider("value", 0);
	$( "#slider_posY" ).slider("value", 0);
	ponteiro.getPonteiroMaterial().visible = false;
	document.getElementById("coord_X").innerHTML = "X: ";
	document.getElementById("coord_Y").innerHTML = "Y: ";
};

function exibePonteiro(){
	if(ponteiro.getPonteiroMaterial().visible == true ){
		ponteiro.getPonteiroMaterial().visible = false;
	} else{
		ponteiro.getPonteiroMaterial().visible = true;		
	}
};

function limpaLista() {
	var lista, funcao;
    
	for(var i = 0; i<funcaoList2D.length; i++){		
		
		if(OBJETO_SELECIONADO != undefined){
			//Remove a BBox do objeto atual selecionado
			OBJETO_SELECIONADO.removeBoundingBox();
			funcaoList2D[i].unSelectEquacaoNaLista();
			var xpto = OBJETO_SELECIONADO;
			OBJETO_SELECIONADO = null;
			//Metodo da classe 'VisualizadorGrafico' que atualiza as informacoes dos paineis quando nenhum objeto estiver selecionado
			xpto.atualizaPainelSelecionado();
			xpto = null;
		}
		
		lista =	document.getElementById('td_equationList');
		if(lista.childElementCount != 0){
			if(funcaoList2D[i] != undefined){
				funcao = document.getElementById(funcaoList2D[i].getDivId());
				lista.removeChild(funcao);
			}
		}
		var tmp = cena.getObjectByName(i+'');
		if(tmp != undefined){	
			//remove a geometria e o material do objeto da memoria
			tmp.geometry.dispose();
			tmp.material.dispose();
			//remove ele da cena3D
			cena.remove(tmp);	
		}
		
	}
	indice2D = 0;	
	localStorage.clear();
	
	exibeMenu();
};


//  -----------  FUNCOES JQUERY  ------------  //

function exibeMenu(){
	
	if(document.getElementById("menu").style.visibility == 'visible'){
		document.getElementById("menu").style.visibility = 'hidden';
	}else{
		document.getElementById("menu").style.visibility = 'visible';
	}
}

//Botao do menu lateral direito
$('#bu_menu').button({
	icons: {	
	secondary: "ui-icon-triangle-1-s"},
	text: false
});

//Menu lateral
$( '#menu' ).menu();
$( '#menu' ).position({ 
	of: "#div5_painelHelpers",
	my: "right-18 top+15", 
	at: "right center"}
);


$('#li_limpa').click(function(){
	exibeMenu();
	$('#div_limpaLista').dialog("open");
	document.getElementById("div_limpaLista").style.visibility = 'visible';
});

$('#div_limpaLista').dialog({
	autoOpen: false,
	resizable: false,
	height:160,
	width: 350,
	modal: true,
	buttons: {
		"Limpar lista": function() {
			limpaLista();
			$( this ).dialog( "close" );
			exibeMenu();
		},
		Cancelar: function() {
			$( this ).dialog( "close" );
		}
	},
	show: {
      effect: "blind",
      duration: 300
    },
    hide: {
      effect: "blind",
      duration: 300
    }
});


//Botao do menu que abre o dialog 'Exemplos'
$('#li_exemplos').click(function(){
	exibeMenu();
	$('#div_exemploDidaticos').dialog("open");
	document.getElementById("div_exemploDidaticos").style.visibility = 'visible';	
});

//Dialog 'Exemplos'
$('#div_exemploDidaticos').dialog({
    autoOpen: false,
	modal: true,
	width: 900,
	height: 600,
	resizable: false,
	buttons: {OK: function(){$(this).dialog("close");}},
	show: {
      effect: "blind",
      duration: 300
    },
    hide: {
      effect: "blind",
      duration: 300
    }   
});

$('#li_ajuda').click(function() {
    $( "#div_ajuda" ).dialog( "open" );
	document.getElementById("div_ajuda").style.visibility = 'visible';
	exibeMenu();
});

//Dialog 'Ajuda'
$('#div_ajuda').dialog({
    autoOpen: false,
	modal: true,
	width: 1000,
	height: 700,
	resizable: false,
	buttons: {OK: function(){$(this).dialog("close");}},
	show: {
      effect: "blind",
      duration: 300
    },
    hide: {
      effect: "blind",
      duration: 300
    }   
});

//Botao do menu que abre o dialog 'Sobre'
$('#li_sobre').click(function() {
    $( "#div_sobre" ).dialog( "open" );
	document.getElementById("div_sobre").style.visibility = 'visible';
	exibeMenu();
});

//Dialog 'Sobre'
$('#div_sobre').dialog({
    autoOpen: false,
	modal: true,
	width: 600,
	height: 400,
	resizable: false,
	buttons: {OK: function(){$(this).dialog("close");}},
	show: {
      effect: "blind",
      duration: 300
    },
    hide: {
      effect: "blind",
      duration: 300
    }   
});

//Funcao que altera a cor do objeto selecionado, de acordo com a selecao do ComboBox
$('#comboBox_cores').change(function() {
	var val = $("#comboBox_cores option:selected").text();
	if(val == "Vermelho"){
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.setHex("0xff0000");
	} else if(val == "Verde"){
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.setHex("0x00ff00");
	} else if(val == "Azul"){
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.setHex("0x0000ff");
	} else if(val == "Amarelo"){
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.setHex("0xffff00");
	}
});

//Recria o objeto grafico passando os novos valores para o range de X
 $(function() {
 $( "#slider_posX" ).slider({
	min: -20,
	max: 20,
	step: 0.1,
	value: [ 0 ],
	slide: function( event, ui ) {
		}
	});
});

 $(function() {
 $( "#slider_posY" ).slider({
	orientation: "vertical",
	min: -20,
	max: 20,
	step: 0.1,
	value: [ 0 ],
	slide: function( event, ui ) {	
		}
	});
});

//Recria o objeto grafico passando os novos valores para o range de X
 $(function() {
 $( "#slider-dominio_range" ).slider({
	range: true,
	min: -15,
	max: 15,
	step: 0.2,
	values: [ -4, 4 ],
	slide: function( event, ui ) {
		$( "#dominio_range" ).val(ui.values[ 0 ] + "   |   " + ui.values[ 1 ] );
		if(OBJETO_SELECIONADO != null){
			OBJETO_SELECIONADO.setRange(ui.values[ 0 ], ui.values[ 1 ]);
			recriaEquacaoGrafica();
		}
	}
	});
	
$( "#dominio_range" ).val( $( "#slider-dominio_range" ).slider( "values", 0 ) + "   |   " + $( "#slider-dominio_range" ).slider( "values", 1 ));
$( "#slider-dominio_range" ).slider('disable');
});

recriaEquacaoGrafica = function(){
	//Armazena a cor do Objeto atual selecionado
	var cor = OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHex(); 
	
	//Captura o objeto da cena
	var tmp = cena.getObjectByName(OBJETO_SELECIONADO.getFuncaoGrafica().name);
	
	//Remove a BBox do objeto atual selecionado
	OBJETO_SELECIONADO.removeBoundingBox();
	//remove a geometria e o material do objeto da memoria
	tmp.geometry.dispose();
	tmp.material.dispose();
	//remove ele da cena3D
	cena.remove(tmp);	
	//cria novamente sua malha de ponto, mas dessa vez com o range de X ou Y alterados
	OBJETO_SELECIONADO.criaFuncaoVisual(cor);
	//recria a BoundinBox
	OBJETO_SELECIONADO.getBoundingBox();
	//adiciona ele novamente a cena3D com o mesmo nome
	cena.add(OBJETO_SELECIONADO.getFuncaoGrafica());
};