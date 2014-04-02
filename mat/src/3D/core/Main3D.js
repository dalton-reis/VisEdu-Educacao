document.getElementById("bu_EquacaoOK").onclick = adicionarNovaFuncao;

//Mantem o dominio atual da funcao gerada
var dominio = 'z';

function adicionarNovaFuncao(){
	document.getElementById("div_error").style.visibility = 'hidden';
	document.getElementById("div_error").innerHTML="";
	try{
		var texto = document.getElementById("in_EquacaoTexto").value;
		if(texto == ""){
			throw 'Erro: Digite alguma fun&ccedil;&atilde;o!';
		}
		//Cria um novo objeto Equacao
		var obj_Funcao = new Funcao3D(texto, indice3D, dominio);
		
		//Adiciona o objeto da funcao no Visualizador Grafico
		funcaoList3D[indice3D] = obj_Funcao;
		cena3D.add(obj_Funcao.getMalhaGraficaFuncao());	
		
		//Adiciona a <div> da equacao na lista 'td_equationList'
		document.getElementById("td_equationList").appendChild(obj_Funcao.getDivFuncao());
		
		//Salva a equacao localmente
		armazenadorLocal.salvar(obj_Funcao);
		
		//Funcao ASCIIMathML que traduz a notacao matematica digitada para notacao escrita
		if (BrowserDetect.browser == 'Firefox'){
			translate();
		}
		indice3D++;
		document.getElementById("in_EquacaoTexto").value = "";
	}catch(erro){
        var h = '<span class="ui-icon ui-icon-alert" style="float:left;margin: 3px;"></span>';
		document.getElementById("div_error").style.visibility = 'visible';		
		document.getElementById("div_error").innerHTML = h + erro;			
	}
};


function getListaFuncaoCena(pos){
	var arrayEquacoes = new Array;
	
	if(pos != undefined){
		return funcaoList3D[pos];
	}else{
		for(var i = 0; i<funcaoList3D.length; i++){
			if(funcaoList3D[i] != null){
				arrayEquacoes.push(funcaoList3D[i].getMalhaGraficaFuncao());
			}
		}
		return arrayEquacoes;
	}	
};

function adicionaFuncoesDidaticas(id){
	if(id =="0"){
		//for(var w = 0; w<teta; w++){
			//document.getElementById("in_EquacaoTexto").value = "x^2/25 - y^2/16+"+w;
			document.getElementById("in_EquacaoTexto").value = "x^2/25 - y^2/16";
			adicionarNovaFuncao();
		/*}
		alteraDominioFuncao();
		for(var w = 0; w<teta; w++){
			document.getElementById("in_EquacaoTexto").value = "x^2/25 - z^2/16+"+w;
			adicionarNovaFuncao();
		}
		alteraDominioFuncao();
		for(var w = 0; w<52; w++){
			document.getElementById("in_EquacaoTexto").value = "z^2/25 - y^2/16+"+w;
			adicionarNovaFuncao();
		}*/
	}else if(id=="1"){
		
		document.getElementById("in_EquacaoTexto").value = "x^2 + y^2";
		adicionarNovaFuncao();
		
	}
	$('#div_exemploDidaticos').dialog("close");
};

//Funcao para trocar o valor do resultado da funcao principal
function alteraDominioFuncao(){
	if(document.getElementById('bu_dominioDaFuncao').value == 'z = '){
		dominio = 'y';
		document.getElementById('bu_dominioDaFuncao').value = "y = ";
		document.getElementById('range_2').innerHTML = "&nbsp; Z: ";		
	}else if(document.getElementById('bu_dominioDaFuncao').value == 'y = '){	
		dominio = 'x';
		document.getElementById('bu_dominioDaFuncao').value = "x = ";
		document.getElementById('range_1').innerHTML = "&nbsp; Z: ";
		document.getElementById('range_2').innerHTML = "&nbsp; Y: ";	
	} else {
		dominio = 'z';
		document.getElementById('bu_dominioDaFuncao').value = "z = ";
		document.getElementById('range_1').innerHTML = "&nbsp; X: ";	
		document.getElementById('range_2').innerHTML = "&nbsp; Y: ";	
	}
};

function exibeWireframe(){
	if(OBJETO_SELECIONADO.getMalhaGraficaFuncao().material.wireframe == false){
		OBJETO_SELECIONADO.getMalhaGraficaFuncao().material.wireframe = true;
	}else{
		OBJETO_SELECIONADO.getMalhaGraficaFuncao().material.wireframe = false;
	}
	//Ao alterar o material do objeto algumas propriedades precisam ser atualziadas.
	OBJETO_SELECIONADO.getMaterialEquacaoGrafica().needsUpdate = true;
	OBJETO_SELECIONADO.getGeometriaEquacaoGrafica().buffersNeedUpdate = true;
	OBJETO_SELECIONADO.getGeometriaEquacaoGrafica().uvsNeedUpdate = true;	
};


function exibeGrade(){
	var obj = cena3D.getObjectByName("grade");
	if(obj.material.visible == true){
		obj.material.visible = false;
	}else{
		obj.material.visible = true;
	}	
};

function exibeEixos(){
	var eixo = cena3D.getObjectByName("eixo");
	var eixo_n = cena3D.getObjectByName("eixo_n");
	var rot = cena3D.getObjectByName("rotulos");
	if(eixo.material.visible == true){
		eixo.material.visible = false;
		eixo_n.material.visible = false;
		rot.material.visible = false;
	}else{
		eixo.material.visible = true;
		eixo_n.material.visible = true;
		rot.material.visible = true;
	}	
};

function exibeLuzY(){
	var luzY = cena3D.getObjectByName("luzY");
	if(luzY.intensity == 1){
		luzY.intensity = 0;	
	}else{
		luzY.intensity = 1;
	}	
};

function exibeLuzX(){
	var luzX = cena3D.getObjectByName("luzX");
	if(luzX.intensity == 1){
		luzX.intensity = 0;		
	}else{
		luzX.intensity = 1;
	}	
};

function exibeLuzZ(){
	var luzZ = cena3D.getObjectByName("luzZ");
	if(luzZ.intensity == 1){
		luzZ.intensity = 0;		
	}else{
		luzZ.intensity = 1;
	}	
};

 function limpaLista() {
	var lista, funcao;
    
	for(var i = 0; i<funcaoList3D.length; i++){		
		
		if(funcaoList3D[i] != null){
				//Remove a BBox do objeto atual selecionado
				funcaoList3D[i].removeBoundingBox();
			if(OBJETO_SELECIONADO != undefined){
				OBJETO_SELECIONADO.unSelectEquacaoNaLista();
				OBJETO_SELECIONADO = null;
				//Metodo da classe 'VisualizadorGrafico' que atualiza as informacoes dos paineis quando nenhum objeto estiver selecionado
				atualizaPainelObjSelecionado();
			}
			
			lista =	document.getElementById('td_equationList');
			if(lista.childElementCount != 0){	
				if(funcaoList3D[i] != undefined){
					funcao = document.getElementById(funcaoList3D[i].getDivId());
					lista.removeChild(funcao);
				}
			}
			var tmp = cena3D.getObjectByName(i+'');	
			if(tmp != undefined){			
				//remove a geometria e o material do objeto da memoria
				tmp.geometry.dispose();
				tmp.material.dispose();
				//remove ele da cena3D
				cena3D.remove(tmp);	
			}
		}
		
	}
	indice3D = 0;	
	localStorage.clear();
	
	exibeMenu();
};

function exibeMenu(){
	
	if(document.getElementById("menu").style.visibility == 'visible'){
		document.getElementById("menu").style.visibility = 'hidden';
	}else{
		document.getElementById("menu").style.visibility = 'visible';
	}
};

//  -----------  FUNCOES JQUERY  ------------  //


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
	my: "left-11 top+43", 
	at: "rigth top"}
);

//Botao do menu que abre o dialog 'Limpa'
$('#li_limpa').click(function(){
	exibeMenu();
	$('#div_limpaLista').dialog("open");
	document.getElementById("div_limpaLista").style.visibility = 'visible';	
});

//Dialog 'Limpa'
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


//Botao do menu que abre o dialog 'Ajuda'
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
$('#comboBox_cameraPosicaoes').change(function() {
	var val = $("#comboBox_cameraPosicaoes option:selected").text();
	redefineCamera();
	if(val == "Acima"){
		camera3D.getPosicao().set(0.1,20,0);
	} else if(val == "Abaixo"){
		camera3D.getPosicao().set(0.1,-20,0);
	} else if(val == "Esquerda"){
		camera3D.getPosicao().set(-20,0,0);
	} else if(val == "Direita"){
		camera3D.getPosicao().set(20,0,0);
	}else if(val == "Frente"){
		camera3D.getPosicao().set(0,0,20);
	}else if(val == "Atras"){
		camera3D.getPosicao().set(0,0,-20);
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
	} else if(val == "Laranja"){
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.setHex("0xff6600");
	} else if(val == "Roxo"){
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.setHex("0x9900ff");
	} else if(val == "Cinza"){
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.setHex("0x666666");
	}
});

//Altera o material do objeto selecionado
$('#comboBox_material').change(function() {
	var val = $("#comboBox_material option:selected").text();
	var cor_atual = OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHex();
	var wireframe = OBJETO_SELECIONADO.getMaterialEquacaoGrafica().wireframe == true ? true : false;
	
	if(val == "Solido"){
		OBJETO_SELECIONADO.getMalhaGraficaFuncao().material = new THREE.MeshLambertMaterial( {color: cor_atual, side: THREE.DoubleSide } );
	} else if(val == "Basico"){		
		OBJETO_SELECIONADO.getMalhaGraficaFuncao().material = new THREE.MeshBasicMaterial( {color: cor_atual, side: THREE.DoubleSide } );
	} else if(val == "Brilhante"){		
		OBJETO_SELECIONADO.getMalhaGraficaFuncao().material = new THREE.MeshPhongMaterial( {color: cor_atual, specular: '#a9fcff', shininess: 100, side: THREE.DoubleSide } );
	} 
	if(wireframe) {
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().wireframe = true;
	} else{
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().wireframe = false;
	}
	//Ao alterar o material do objeto algumas propriedades precisam ser atualziadas.
	OBJETO_SELECIONADO.getMaterialEquacaoGrafica().needsUpdate = true;
	OBJETO_SELECIONADO.getGeometriaEquacaoGrafica().buffersNeedUpdate = true;
	OBJETO_SELECIONADO.getGeometriaEquacaoGrafica().uvsNeedUpdate = true;	
});

//Recria o objeto grafico passando os novos valores para o range de X
$(function() {
	$( "#slider-range_1" ).slider({
		range: true,
		min: -10,
		max: 10,
		step: 0.2,
		values: [ -2, 2 ],
		slide: function( event, ui ) {
			$( "#in_range_1" ).val(ui.values[ 0 ] + "   |   " + ui.values[ 1 ]);
			if(OBJETO_SELECIONADO != null){
				OBJETO_SELECIONADO.setRange1(ui.values[ 0 ], ui.values[ 1 ]);
				recriaFuncaoGrafica();
			}
		}
		});
		
	$( "#in_range_1" ).val( $( "#slider-range_1" ).slider( "values", 0 ) + "   |   " + $( "#slider-range_1" ).slider( "values", 1 ) );
	$( "#slider-range_1" ).slider('disable');
});

//Recria o objeto grafico passando os novos valores para o range de Y
$(function() {
	$( "#slider-range_2" ).slider({
		range: true,
		min: -10,
		max: 10,
		step: 0.2,
		values: [ -2, 2 ],
		slide: function( event, ui ) {
			$( "#in_range_2" ).val(ui.values[ 0 ] + "   |   " + ui.values[ 1 ]);
			if(OBJETO_SELECIONADO != null){
				OBJETO_SELECIONADO.setRange2(ui.values[ 0 ], ui.values[ 1 ]);
				recriaFuncaoGrafica();
			}
		}
		});
	$( "#in_range_2" ).val( $( "#slider-range_2" ).slider( "values", 0 ) + "   |   " + $( "#slider-range_2" ).slider( "values", 1 ) );
	$( "#slider-range_2" ).slider('disable');
});

function recriaFuncaoGrafica(){
	//Armazena a cor do Objeto atual selecionado
	var cor = OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHex();
	
	//Armazena o tipo do material do objeto selecionado
	var tipo_material = "";
	if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica() instanceof THREE.MeshLambertMaterial){
		tipo_material = "Solido";
	} else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica() instanceof THREE.MeshBasicMaterial){
		tipo_material = "Basico";
	} else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica() instanceof THREE.MeshPhongMaterial){
		tipo_material = "Brilhante";
	} 
	
	//Captura o objeto da cena3D
	var tmp = cena3D.getObjectByName(OBJETO_SELECIONADO.getMalhaGraficaFuncao().name);
	//verfifica se o wirefram não está habilitado
	var wireframe = OBJETO_SELECIONADO.getMaterialEquacaoGrafica().wireframe == true ? true : false;
	
	//Remove a BBox do objeto atual selecionado
	OBJETO_SELECIONADO.removeBoundingBox();
	//remove a geometria e o material do objeto da memoria
	tmp.geometry.dispose();
	tmp.material.dispose();
	//remove ele da cena3D
	cena3D.remove(tmp);	
	//cria novamente sua malha de ponto, mas dessa vez com o range de X ou Y alterados
	OBJETO_SELECIONADO.criaFuncaoVisual(cor, tipo_material);
	//recria a BoundinBox
	OBJETO_SELECIONADO.getBoundingBox();
	//mantem ou nao o wireframa visivel
	if(wireframe) {
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().wireframe = true;
	} else{
		OBJETO_SELECIONADO.getMaterialEquacaoGrafica().wireframe = false;
	}
	//adiciona ele novamente a cena3D com o mesmo nome
	cena3D.add(OBJETO_SELECIONADO.getMalhaGraficaFuncao());
};