/*

	Classe que representa o armazenador local

*/
var FuncaoStorer = function(){
	
	this.salvar = function(item){
		var listaFuncoes = this.getFuncoesSalva();
		var func = new Array();
		func[0] = item.getDominioDaFuncao();
		func[1] = item.getTextoFuncao();
		func[2] = item.getIndiceFuncao();
		func[3] = item.getTipoFuncao();
		func[4] = listaFuncoes.length;
		listaFuncoes.push(func);
		localStorage.setItem("lista", JSON.stringify(listaFuncoes));
	};
	
	this.remove = function(id, val){
		var listaFuncoes = this.getFuncoesSalva();
		var func = null;
		
		for(var i = 0; i<listaFuncoes.length; i++){
			
			if(listaFuncoes[i] != null){
				var pos = listaFuncoes[i][2];
				var tipo = listaFuncoes[i][3];
				
				if(pos == id && tipo == "3D" && val == "3D"){
					func = listaFuncoes[i];
					funcaoList3D[func[2]] = null;
					listaFuncoes[func[4]] = null;
					break;
				}else if (pos == id && tipo == "2D" && val == "2D"){
					func = listaFuncoes[i];
					funcaoList2D[func[2]] = null;
					listaFuncoes[func[4]] = null;
					break;
				}
			}			
			
		}	
		localStorage.setItem("lista", JSON.stringify(listaFuncoes));			
	};
	
	this.carregaListaFuncao = function(t){
	
		var listaFuncoes = this.getFuncoesSalva();
		
		if(listaFuncoes != null){
 
			
			for(var i = 0; i< listaFuncoes.length; i++){
				
				if(listaFuncoes[i] != null){
					var tipo = listaFuncoes[i][3];
					
					if(tipo == "3D" && t == "3D"){				
						var dominio = listaFuncoes[i][0];
						var texto = listaFuncoes[i][1];
						var posicaoLista = listaFuncoes[i][2];					
						var funcao = new Funcao3D(texto, posicaoLista, dominio);
				
						//Adiciona o objeto na lista de objeto de acordo com o valor da variavel 'indice' da classe 'Main3D'
						funcaoList3D[posicaoLista] = funcao;
						cena3D.add(funcao.getMalhaGraficaFuncao());	
						//Adiciona a equacao na lista 'td_equationList'
						document.getElementById("td_equationList").appendChild(funcao.getDivFuncao());
						//Funcao ASCIIMathML que traduz a notacao matematica digitada para notacao escrita
						if (BrowserDetect.browser == 'Firefox'){
							translate();
						}
						
						//Para nao adicionar 2 funcoes com o mesmo ID
						if((i+1) == listaFuncoes.length){
							indice3D = listaFuncoes[listaFuncoes.length-1][2];
							indice3D++;		
						}
					}else if (tipo == "2D" && t == "2D"){
						var dominio = listaFuncoes[i][0];
						var texto = listaFuncoes[i][1];
						var posicaoLista = listaFuncoes[i][2];
						var funcao = new Funcao2D(texto, posicaoLista, dominio);
						
						//Adiciona o objeto na lista de objeto do Visualizador Grafico
						funcaoList2D[posicaoLista] = funcao;
						cena.add(funcao.getFuncaoGrafica());
						//Adiciona a equacao na lista 'td_equationList'
						document.getElementById("td_equationList").appendChild(funcao.getDivFuncao());
						//Funcao ASCIIMathML que traduz a notacao matematica digitada para notacao escrita
						if (BrowserDetect.browser == 'Firefox'){
							translate();
						}
						
						//Para nao adicionar 2 funcoes com o mesmo ID
						if((i+1) == listaFuncoes.length){
							indice2D = listaFuncoes[listaFuncoes.length-1][2];
							indice2D++;		
						}
					}
				}		
			}
		}
	};
	
	this.getFuncoesSalva = function(){
		return this.getListaSalva("lista");
	};
	
	this.getListaSalva = function(chave){
		var listaFuncoes = localStorage.getItem(chave);
		
		if(listaFuncoes == null || listaFuncoes == ""){
			listaFuncoes = new Array();
		}else{
			listaFuncoes = JSON.parse(listaFuncoes);
		}
		return listaFuncoes;		
	};
}