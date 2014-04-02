/*
	Classe que representa a entidade 'Funcao' 3D
*/
var Funcao3D = function(_funcao, indice, dominio){
	
	var funcao = _funcao;
	var funcao_Id = ""+indice;
	var div, sub_div1, sub_div2, checkbox, trash_icon;
	var geometria, material, funcao_malha;
	var range_1_Min = -2, 
		range_1_Max = 2, 
		range_2_Min = -2, 
		range_2_Max = 2;
	var range_1, range_2;
	var nivelDetalhe, funcaoGerada;
	var tipo = "3D";
	var contradominioDaFuncao = dominio;
	
	
	//Cores sorteadas para geracao do objetos
	var cores = new Array();
		cores.push(0xff0000);
		cores.push(0x00ff00);
		cores.push(0x0000ff);
		cores.push(0xffff00);
		cores.push(0xff6600);
		cores.push(0x9900ff);
		cores.push(0x666666);		
	
	this.getDivFuncao = function(){
		if(div == undefined){
			//Cria a div principal da equacao que sera inserida na lista.
			div = document.createElement("div");
			div.id = "div_"+funcao_Id;
			
			//sub_div1 serve para alinhamento da equacao na parte esqueda da div principal
			sub_div1 = document.createElement("div");
			sub_div1.id = "sub_div1_"+funcao_Id;
			sub_div1.className = 'div_equationStyle';
			//adiciona a equação digitada na sub div 1
			sub_div1.innerHTML = '&nbsp;`'+contradominioDaFuncao+" = "+funcao+'`';				
			sub_div1.onclick = this.selecionaObjetoGrafico;			
			
			//cria o checkbox que sera inserido na div da equacao
			checkbox = document.createElement("input");
			checkbox.type = 'checkbox';
			checkbox.checked = true;
			checkbox.style.margin = '8px';
			checkbox.id = "chk_"+funcao_Id;
			checkbox.onclick = this.exibeVisualizacaoGrafica;
				
			//sub_div1 serve para alinhamento do checkbo na parte direita da div principal
			sub_div2 = document.createElement("div");
			sub_div2.id = "sub_div2_"+funcao_Id;
			sub_div2.className = 'checkbox_equationStyle';
			//adiciona o checkbox na div
			sub_div2.appendChild(checkbox);
			
			trash_icon = document.createElement("img");
			trash_icon.id = "trash_"+funcao_Id;
			trash_icon.className = 'trash_equationStyle';
			trash_icon.onclick = this.removeAll;
			sub_div2.appendChild(trash_icon);
			
			//adiciona as duas sub <div> na div principal da equacao. 
			div.appendChild(sub_div1);
			div.appendChild(sub_div2);
		}		
		return div;
	};
	
	this.exibeVisualizacaoGrafica = function(){
		var obj = cena3D.getObjectByName(funcao_Id);
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
				OBJETO_SELECIONADO = null;
				atualizaPainelObjSelecionado();
			}
		}
		
		var tmp = cena3D.getObjectByName(funcao_Id);
		if(tmp != undefined){			
			//remove a geometria e o material do objeto da memoria
			tmp.geometry.dispose();
			tmp.material.dispose();
			//remove ele da cena3D
			cena3D.remove(tmp);
		}
		var funcao = document.getElementById(div.id);	
		document.getElementById('td_equationList').removeChild(funcao);
		
		armazenadorLocal.remove(funcao_Id, "3D");
	
	};	
	
	this.getDominioDaFuncao = function(){
		return contradominioDaFuncao;
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
	this.getMalhaGraficaFuncao = function(){
		return funcao_malha;			
	};
	
	this.getGeometriaEquacaoGrafica = function(){
		return funcao_malha.geometry;
	};
	
	this.getMaterialEquacaoGrafica = function(){
		return funcao_malha.material;
	};
	
	//Metodo privado que cria a equacao grafica a partir da funcao passado como parametro 
	this.criaFuncaoVisual = function(cor, tipo_mat){
		nivelDetalhe = 40; 
		
		//Cria a parte geometrica do objeto grafico baseado no parametro 'funcaoDeMalha'
		geometria = new THREE.ParametricGeometry(this.funcaoDeMalha, nivelDetalhe, nivelDetalhe);
		
		//Cria o material e a cor baseado nos parametros 'cor' e 'tipo_mat'
		if(tipo_mat == "Solido"){
			material = new THREE.MeshLambertMaterial( { color: cor, side: THREE.DoubleSide } );			
		} else if(tipo_mat == "Basico"){		
			material = new THREE.MeshBasicMaterial( { color: cor, side: THREE.DoubleSide } );			
		} else if(tipo_mat == "Brilhante"){		
			material = new THREE.MeshPhongMaterial( { color: cor, specular: '#ffffff', shininess: 100, side: THREE.DoubleSide } );			
		} 		
		funcao_malha = null;
		//Une a geometria e o material em uma malha grafica
		funcao_malha = new THREE.Mesh(geometria, material);
		//O nome da equacao recebe o mesmo nome do seu respectivo checkbox na lista de equacao.
		funcao_malha.name = funcao_Id;
	}
	
	this.funcaoDeMalha = function (val_1, val_2) {
		range_1 = range_1_Max - range_1_Min;
		range_2 = range_2_Max - range_2_Min;
		
		val_1 = range_1 * val_1 + range_1_Min;
		val_2 = range_2 * val_2 + range_2_Min;
		
		if(contradominioDaFuncao == 'z'){
			var x = val_1;
			var y = val_2;
			var z = funcaoGerada(x, y); 
			return new THREE.Vector3(x, y, z);		
		} else if (contradominioDaFuncao == 'y'){
			var x = val_1;
			var z = val_2;
			var y = funcaoGerada(x, z); 
			return new THREE.Vector3(x, y, z);
		} else {
			var z = val_1;
			var y = val_2;
			var x = funcaoGerada(z, y); 
			return new THREE.Vector3(x, y, z);
		}	
	};
	
	
	this.setRange1 = function(min, max){
		range_1_Max = max;
		range_1_Min = min;
	};
	
	this.setRange2 = function(min, max){
		range_2_Max = max;
		range_2_Min = min;
	};
	
	this.getRange1max = function(){
		return range_1_Max;
	};
	
	this.getRange1min = function(){
		return range_1_Min;
	};
	
	this.getRange2max = function(){
		return range_2_Max;
	};
	
	this.getRange2min = function(){
		return range_2_Min;
	};
	
	/*
	|------------------------------------------------------------------------------------|
	|                                                                                    |
	|				  3 ETAPAS PARA CRIACAO DO OBJETO GRAFICO                            |
	|                                                                                    |
	|  1 - A funcao digitada passa pelo parser (Parser.parse) que valida a mesma         |
	|  2 - A funcao validada eh exibida no visualizador grafico com seu material		 |
	|	   definido de acordo com o browser  											 |
	|  3 - A camera tem sua posicao redefinida todas vez que uma funcao eh criada        |
	|                                                                                    |
	|------------------------------------------------------------------------------------|
	*/
	//ETAPA 1	
	if(contradominioDaFuncao == 'z'){
		funcaoGerada = Parser.parse(funcao).toJSFunction(['x', 'y']);
	} else if (contradominioDaFuncao == 'y'){
		funcaoGerada = Parser.parse(funcao).toJSFunction(['x', 'z']);
	} else {
		funcaoGerada = Parser.parse(funcao).toJSFunction(['z', 'y']);	
	}	
	
	//ETAPA 2
	
	
	if (BrowserDetect.browser != 'Mozilla'){		
		this.criaFuncaoVisual(cores[(funcao_Id+1)%cores.length], "Solido");
	} else {
		this.criaFuncaoVisual(cores[(funcao_Id+1)%cores.length], "Basico");
	}
	
	//ETAPA 3
	redefineCamera();
	
	//Exibe a Bounding Box do objeto, baseado nos valores passado no parametro (boundingbox)
	this.getBoundingBox = function(){

		//Calcula  BoundingBox do Objeto
		this.getGeometriaEquacaoGrafica().computeBoundingBox();
		
		var xMax = this.getGeometriaEquacaoGrafica().boundingBox.max.x;
		var xMin = this.getGeometriaEquacaoGrafica().boundingBox.min.x;
		var yMax = this.getGeometriaEquacaoGrafica().boundingBox.max.y;
		var yMin = this.getGeometriaEquacaoGrafica().boundingBox.min.y;
		var zMax = this.getGeometriaEquacaoGrafica().boundingBox.max.z;
		var zMin = this.getGeometriaEquacaoGrafica().boundingBox.min.z;
		
		var geom = new THREE.Geometry();
		
		//Face 1
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMax ) );//1
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMax ) );//2
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMax ) );//2
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMax ) );//3
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMax ) );//3
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMax ) );//4
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMax ) );//4
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMax ) );//1
		
		//Face 2
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMin ) );//8
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMin ) );//7
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMin ) );//7
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMin ) );//6
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMin ) );//6
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMin ) );//5
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMin ) );//5
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMin ) );//8	
		
		//Ligacoes 
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMax ) );//1
		geom.vertices.push( new THREE.Vector3( xMin, yMax, zMin ) );//8
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMax ) );//2
		geom.vertices.push( new THREE.Vector3( xMax, yMax, zMin ) );//7
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMax ) );//3
		geom.vertices.push( new THREE.Vector3( xMax, yMin, zMin ) );//6
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMax ) );//4
		geom.vertices.push( new THREE.Vector3( xMin, yMin, zMin ) );//5
		
		//Habilita BoundingBox pontilhada
		/*geometria.computeLineDistances();
		var material = new THREE.LineDashedMaterial( { color: 0x888888, dashSize: 0.2, gapSize: 0.1} );*/
		
		var mat = new THREE.LineBasicMaterial( { color: 0x666666} );
		var bbox = new THREE.Line( geom, mat );
		bbox.name = "boundingbox";
		bbox.type = THREE.Line;
		funcao_malha.add(bbox);		
	};
	
	this.removeBoundingBox = function(){
		var bbox = funcao_malha.getObjectByName("boundingbox");
		funcao_malha.remove(bbox);
	};
	
	this.selectEquacaoNaLista = function(){
		var div1, div2;
	
		div1 = document.getElementById("sub_div1_"+OBJETO_SELECIONADO.getMalhaGraficaFuncao().name);
		div2 = document.getElementById("sub_div2_"+OBJETO_SELECIONADO.getMalhaGraficaFuncao().name);
		div1.className = 'div_equationSelectedStyle';
		div2.className = 'checkbox_equationSelectedStyle';
	};
	
	this.unSelectEquacaoNaLista = function(){
		var div1, div2;
		
		div1 = document.getElementById("sub_div1_"+OBJETO_SELECIONADO.getMalhaGraficaFuncao().name);
		div2 = document.getElementById("sub_div2_"+OBJETO_SELECIONADO.getMalhaGraficaFuncao().name);
		div1.className = 'div_equationStyle';
		div2.className = 'checkbox_equationStyle';
	};
	
	
	this.selecionaObjetoGrafico = function(){
			
		if(OBJETO_SELECIONADO != undefined){
			OBJETO_SELECIONADO.unSelectEquacaoNaLista();
			OBJETO_SELECIONADO.removeBoundingBox();
			OBJETO_SELECIONADO = undefined;
		}		
		OBJETO_SELECIONADO = getListaFuncaoCena(funcao_Id);
		
		var div_tmp = document.getElementById("sub_div1_"+funcao_Id);
		
		if ( div_tmp.className == 'div_equationStyle'){					
			if(OBJETO_SELECIONADO.getMaterialEquacaoGrafica().visible != true ){
				OBJETO_SELECIONADO.getMaterialEquacaoGrafica().visible = true;
				document.getElementById("chk_"+funcao_Id).checked = true;
			}
			OBJETO_SELECIONADO.getBoundingBox();
			//Chama o metodo da classe VisualizadorGrafico3D para atualizar o painel de valores da funcao selecionada
			atualizaPainelObjSelecionado();
			OBJETO_SELECIONADO.selectEquacaoNaLista();
		} else {			
			OBJETO_SELECIONADO.unSelectEquacaoNaLista();
			OBJETO_SELECIONADO.removeBoundingBox();
			OBJETO_SELECIONADO = undefined;
		}
	};
	
	
};