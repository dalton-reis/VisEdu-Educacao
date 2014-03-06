/*
	Classe que representa a entidade 'Funcao2D'
*/
var Funcao2D = function(_funcao, indice, dominio){
	
	var funcao = _funcao;
	var funcao_Id = ""+indice;
	var div, sub_div1, sub_div2, checkbox, trash_icon;
	var geometria, material, funcao_grafica;
	var RangeMin = -4, 
		RangeMax = 4;
	var Range = RangeMax - RangeMin;
	//contem a funcao gerada a partir do Parser
	var funcaoGerada;
	//contem a incognita no qual sera gerado a funcao (x ou y).
	var dominioDaFuncao = dominio;
	var contraDominio = dominioDaFuncao == 'x' ? 'y' : 'x';                      
	var tipo = "2D";	
	
	//Metodo que retorna div que sera inserida na lista de funcoes
	this.getDivFuncao = function(){
		//Cria a div principal da equacao que sera inserida na lista.
		div = document.createElement("div");
		div.id = "div_"+funcao_Id;
		
		//sub_div1 serve para alinhamento da equacao na parte esqueda da div principal
		sub_div1 = document.createElement("div");
		sub_div1.id = "sub_div1_"+funcao_Id;
		sub_div1.className = 'div_equationStyle';
		//adiciona a equação digitada na sub div 1
		sub_div1.innerHTML = '&nbsp;`'+contraDominio+' = '+funcao+'`';	
		sub_div1.onclick = this.selecionaObjeto;			
		
		//cria o checkbox que sera inserido na div da equacao
		checkbox = document.createElement("input");
		checkbox.type = 'checkbox';
		checkbox.checked = true;
		checkbox.style.margin = '8px';
		checkbox.id = funcao_Id;
		checkbox.onclick = this.exibeVisualizacaoGrafica;
			
		//sub_div1 serve para alinhamento do checkbo na parte direita da div principal
		sub_div2 = document.createElement("div");		
		sub_div2.id = "sub_div2_"+funcao_Id;
		sub_div2.className = 'checkbox_equationStyle';
		//adiciona o checkbox na div
		sub_div2.appendChild(checkbox);
		
		//adiciona o icone da lixeira na sub_div1
		trash_icon = document.createElement("img");
		trash_icon.id = "trash_"+funcao_Id;
		trash_icon.className = 'trash_equationStyle';
		trash_icon.onclick = this.removeAll;
		sub_div2.appendChild(trash_icon);
		
		//adiciona as duas sub <div> na div principal da funcao. 
		div.appendChild(sub_div1);
		div.appendChild(sub_div2);
		
		return div;
	};
	
	this.exibeVisualizacaoGrafica = function(){
		var obj = cena.getObjectByName(funcao_Id);
		if(obj.material.visible == true){
			obj.material.visible = false;
		}else{
			obj.material.visible = true;
		}	
	};
	
	this.removeAll = function(){
		
		if(OBJETO_SELECIONADO != undefined){
			if(OBJETO_SELECIONADO.getIndiceFuncao() == funcao_Id){
				//Remove a BBox do objeto atual selecionado
				OBJETO_SELECIONADO.removeBoundingBox();
				OBJETO_SELECIONADO.unSelectEquacaoNaLista();
				//Metodo da classe 'VisualizadorGrafico' que atualiza as informacoes dos paineis quando nenhum objeto estiver selecionado
				var xpto = OBJETO_SELECIONADO;
				OBJETO_SELECIONADO = null;
				//Metodo da classe 'VisualizadorGrafico' que atualiza as informacoes dos paineis quando nenhum objeto estiver selecionado
				xpto.atualizaPainelSelecionado();
				xpto = null;
			}
		}
		
		var tmp = cena.getObjectByName(funcao_Id);	
		if(tmp != undefined){		
			//remove a geometria e o material do objeto da memoria
			tmp.geometry.dispose();
			tmp.material.dispose();
			//remove ele da cena3D
			cena.remove(tmp);
		}
		var funcao = document.getElementById(div.id);	
		document.getElementById('td_equationList').removeChild(funcao);
		
		armazenadorLocal2D.remove(funcao_Id, "2D");
	
	};	
	
	this.getDominioDaFuncao = function(){
		return dominioDaFuncao;
	};
	
	this.getTextoFuncao = function(){
		return funcao;
	};
	
	this.getIndiceFuncao = function(){
		return funcao_Id;
	};
	
	this.getTipoFuncao = function(){
		return tipo;
	};
	
	this.getDivId = function(){
		return div.id;
	};
	
	//Retorna o ojbeto grafico de acordo com o nome digitado no campo de texto.	
	this.getFuncaoGrafica = function(){
		return funcao_grafica;			
	};
	
	this.getGeometriaEquacaoGrafica = function(){
		return funcao_grafica.geometry;
	};
	
	this.getMaterialEquacaoGrafica = function(){
		return funcao_grafica.material;
	};
	
	this.setRange = function(min, max){
		RangeMax = max;
		RangeMin = min;
	};	
	
	this.getRangeMax = function(){
		return RangeMax;
	};
	
	this.getRangeMin = function(){
		return RangeMin;
	};
	
	this.getContraDominio = function(){
		return contraDominio;
	};
	
	//-------------- IMPORTANTE - |METODO QUE CRIA A FUNCAO GRAFICA| -------------//
	//Metodo privado que cria a funcao grafica a partir da funcao passado como parametro 
	this.criaFuncaoVisual = function(cor){
		
		//geometria = new THREE.ParametricGeometry(funcao, segmentos, segmentos);
		geometria = new THREE.Geometry();
		
		for(var i = RangeMin; i < RangeMax; i += 0.2){
			if((i+0.2).toFixed(2) <= RangeMax){
				geometria.vertices.push(this.funcaoDeMalha(i), this.funcaoDeMalha(i+0.2));
			}	
		}
			
		material = new THREE.LineBasicMaterial( { color: cor } );			
		
		//Une a geometria e o material em uma malha grafica
		funcao_grafica = new THREE.Line(geometria, material);
		//O nome da funcao recebe o mesmo nome do seu respectivo checkbox na lista de funcao.
		funcao_grafica.type = THREE.Line;
		funcao_grafica.name = funcao_Id;
	}
	
	//-------------- IMPORTANTE - |FAZ O PARSER DA FUNCAO DIGITADA|  -------------//
	//Cria o parser da funcao digitada e armazena a funcao Javascript em 'funcaoGerada'
	funcaoGerada = Parser.parse(funcao).toJSFunction([dominioDaFuncao]);	
	
	this.funcaoDeMalha = function (val) {			
		if(dominioDaFuncao == 'x'){
			var y = funcaoGerada(val); 
			return new THREE.Vector3(val, y, 0.1);
		}else if (dominioDaFuncao == 'y'){
			var x = funcaoGerada(val); 
			return new THREE.Vector3(x, val, 0.1);
		}	
	};	
		
	//-------------- IMPORTANTE - |CHAMA O METODO QUE CRIA A EQUACAO|  -------------//
	//A funcao e criada no contrutor da classe funcao
	this.criaFuncaoVisual(0x0000ff);
	
	
	//Exibe a Bounding Box do objeto, baseado nos valores passado no parametro (boundingbox)
	this.getBoundingBox = function(){

		//Calcula  BoundingBox do Objeto
		this.getGeometriaEquacaoGrafica().computeBoundingBox();
		
		var xMa = this.getGeometriaEquacaoGrafica().boundingBox.max.x;
		var xMi = this.getGeometriaEquacaoGrafica().boundingBox.min.x;
		var yMa = this.getGeometriaEquacaoGrafica().boundingBox.max.y;
		var yMi = this.getGeometriaEquacaoGrafica().boundingBox.min.y;
		
		var geom = new THREE.Geometry();
		
		geom.vertices.push( new THREE.Vector3( xMi, yMa, 0.1 ) );
		geom.vertices.push( new THREE.Vector3( xMa, yMa, 0.1 ) );
		geom.vertices.push( new THREE.Vector3( xMa, yMa, 0.1 ) );
		geom.vertices.push( new THREE.Vector3( xMa, yMi, 0.1 ) );
		geom.vertices.push( new THREE.Vector3( xMa, yMi, 0.1 ) );
		geom.vertices.push( new THREE.Vector3( xMi, yMi, 0.1 ) );
		geom.vertices.push( new THREE.Vector3( xMi, yMi, 0.1 ) );
		geom.vertices.push( new THREE.Vector3( xMi, yMa, 0.1 ) );
		
		geom.computeLineDistances();
		
		var mat = new THREE.LineDashedMaterial( { color: 0x111111, dashSize: 0.2, gapSize: 0.2} );
		var bbox = new THREE.Line( geom, mat );
		bbox.name = "boundingbox";
		bbox.type = THREE.Line;
		funcao_grafica.add(bbox);
	};
	
	this.removeBoundingBox = function(){
		var bbox = funcao_grafica.getObjectByName("boundingbox");
		funcao_grafica.remove(bbox);		
	};
	
	this.selecionaObjeto = function(){
			
		if(OBJETO_SELECIONADO != undefined){
			OBJETO_SELECIONADO.unSelectEquacaoNaLista();
			OBJETO_SELECIONADO.removeBoundingBox();
			OBJETO_SELECIONADO = undefined;
		}		
		OBJETO_SELECIONADO = getListaEquacaoCena(funcao_Id);
		
		var div_tmp = document.getElementById("sub_div1_"+funcao_Id);
		
		if ( div_tmp.className == 'div_equationStyle'){		
			if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().visible == true ){
				OBJETO_SELECIONADO.getBoundingBox();
				OBJETO_SELECIONADO.atualizaPainelSelecionado();
			}
			OBJETO_SELECIONADO.selectEquacaoNaLista();
		} else {			
			OBJETO_SELECIONADO.unSelectEquacaoNaLista();
			OBJETO_SELECIONADO.removeBoundingBox();
			OBJETO_SELECIONADO = undefined;
		}
	};
	
	this.selectEquacaoNaLista = function(){
		var div1, div2;
	
		div1 = document.getElementById("sub_div1_"+funcao_Id);
		div2 = document.getElementById("sub_div2_"+funcao_Id);
		div1.className = 'div_equationSelectedStyle';
		div2.className = 'checkbox_equationSelectedStyle';
	};
	
	this.unSelectEquacaoNaLista = function(){
		var div1, div2;
		
		div1 = document.getElementById("sub_div1_"+funcao_Id);
		div2 = document.getElementById("sub_div2_"+funcao_Id);
		div1.className = 'div_equationStyle';
		div2.className = 'checkbox_equationStyle';
	};
	
	
	this.atualizaPainelSelecionado = function(){
		var div, combo, chkbox;
		
		if(OBJETO_SELECIONADO != null){
			div = document.getElementById("div_objetoSelecionado");
			div.innerHTML = "&nbsp;Objeto: "+ OBJETO_SELECIONADO.getFuncaoGrafica().name;
			combo = document.getElementById("comboBox_cores");
			combo.disabled = false;
			$( "#slider-dominio_range" ).slider('enable');
			if(cena.getObjectByName("cursor").material.visible == true){
				document.getElementById("checkbox_Ponteiro").disabled = false;
			}	
		}else{		
			div = document.getElementById("div_objetoSelecionado");
			div.innerHTML = "&nbsp;Objeto: ";
			combo = document.getElementById("comboBox_cores");
			combo.disabled = true;
			$( "#slider-dominio_range" ).slider('disable');
		}
		atualizaCorObjSelecionado();
		atualizaRangeValorX();
	};
	
	
	function atualizaCorObjSelecionado(){
		var combo = document.getElementById("comboBox_cores");
		
		if(OBJETO_SELECIONADO != null){
			//Se a cor do objeto for VERMELHO
			if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "ff0000"){
				combo.selectedIndex = 1;
			//Se a cor do objeto for VERDE
			}else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "00ff00"){
				combo.selectedIndex = 2;
			//Se a cor do objeto for AZUL	
			}else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "0000ff"){
				combo.selectedIndex = 3;
			//Se a cor do objeto for AZUL	
			}else if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().color.getHexString() == "ffff00"){
				combo.selectedIndex = 4;
			}
		}else{
			combo.selectedIndex = 0;
		}
	};
	
	
	function atualizaRangeValorX(){
		if(OBJETO_SELECIONADO != null){
			$( "#slider-dominio_range" ).slider("values", 0, OBJETO_SELECIONADO.getRangeMin());
			$( "#slider-dominio_range" ).slider("values", 1, OBJETO_SELECIONADO.getRangeMax());
			$( "#dominio_range" ).val( $( "#slider-dominio_range" ).slider( "values", 0 ) + "   |   " + $( "#slider-dominio_range" ).slider( "values", 1 ) );
		}else{ 
			$( "#slider-dominio_range" ).slider("values", 0, -4);
			$( "#slider-dominio_range" ).slider("values", 1, 4);
			$( "#dominio_range" ).val( $( "#slider-dominio_range" ).slider( "values", 0 ) + "   |   " + $( "#slider-dominio_range" ).slider( "values", 1 ));
		}   
	};
	
};