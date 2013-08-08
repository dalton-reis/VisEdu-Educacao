function Abrir() {	
	
	this.stringToNodo= function(stringNodo) {
	
		function NodoAbrir() {	
			this.id = null;			
			this.pai = null;			
			this.texto = null;			
			this.tipo = null;			
			this.atributos = new List();			
			this.nodo= null;			
		}
		
		function RelacaoAbrir () {
			this.nodoOrigem = null;
			this.nodoDestino = null;
			this.nome = null;
		}
	
		var nodosAbrir = new Array();	
		
		var relacoesAbrir = new List(); //lista de relacaoes

		function addNodoAbrir(nodo) {			
			nodosAbrir[nodosAbrir.length] = nodo;			
		}
		
		//cria instancias de NodoAbrir
		for (var i=0;i<stringNodo.length;i++) {		   
		   if  (stringNodo.charAt(i) == "[") {
				i++;				
				if ( stringNodo.substring(i,i+5) == "nodo:") {
					i += 5;
					 var nodoTemp = new NodoAbrir();
					 
					 while(stringNodo.charAt(i) != "]") {						  
						  if  (stringNodo.charAt(i) == "[") {
							   i++;							   
							   if ( stringNodo.substring(i,i+3) == "id:") {
									i += 3;
									var x=i;
									while  (stringNodo.charAt(x)!= "]") {
										 x++;
									}
									nodoTemp.id = stringNodo.substring(i,x);
									i = x;
							   }
							   else if ( stringNodo.substring(i,i+4) == "pai:") {
									i += 4;
									var x=i;
									while  (stringNodo.charAt(x)!= "]") {
										 x++;
									}
									nodoTemp.pai = stringNodo.substring(i,x);
									i = x;
							   }
							   else if ( stringNodo.substring(i,i+6) == "texto:") {
									i += 6;
									var x=i;
									while  (stringNodo.charAt(x)!= "]") {
										 x++;
									}
									nodoTemp.texto = stringNodo.substring(i,x);
									i = x;
							   }
							   else if ( stringNodo.substring(i,i+5) == "tipo:") {
									i += 5;
									var x=i;
									while  (stringNodo.charAt(x)!= "]") {
										 x++;
									}
									nodoTemp.tipo = stringNodo.substring(i,x);
									i = x;
							   }
							   else if ( stringNodo.substring(i,i+10) == "atributos:") {
									i += 10;
									while(stringNodo.charAt(i) != "]") {
										 if ( stringNodo.substring(i,i+9) == "atributo:") {
											  i += 9;
											  var atributoTemp = new Atributo();
											  while(stringNodo.charAt(i) != "]") {
												   if  (stringNodo.charAt(i) == "[") {
														i++;
														if ( stringNodo.substring(i,i+5) == "nome:") {
															 i += 5;
															 var x=i;
															 while  (stringNodo.charAt(x)!= "]") {
																  x++;
															 }
															 atributoTemp.nome = stringNodo.substring(i,x);
															 i = x;
														}
														else if ( stringNodo.substring(i,i+5) == "tipo:") {
															 i += 5;
															 var x=i;
															 while  (stringNodo.charAt(x)!= "]") {
																  x++;
															 }
															 atributoTemp.tipo = stringNodo.substring(i,x);
															 i = x;
														}
												   }
												   i++;
											  }
											  nodoTemp.atributos.add(atributoTemp);
										 }
										 i++;
									}
							   }
						  }
						  i++;
					 }
					 
					 addNodoAbrir(nodoTemp);
				}
				else if ( stringNodo.substring(i,i+9) == "relacoes:") {
					i += 10;
					while(stringNodo.charAt(i) != "]") {
						if ( stringNodo.substring(i,i+8) == "relacao:") {
							i += 8;
							var relacaoTemp = new RelacaoAbrir();
							while(stringNodo.charAt(i) != "]") {
								   if  (stringNodo.charAt(i) == "[") {
										i++;
										if ( stringNodo.substring(i,i+11) == "nodoOrigem:") {
											 i += 11;
											 var x=i;
											 while  (stringNodo.charAt(x)!= "]") {
												  x++;
											 }	
											 relacaoTemp.nodoOrigem = stringNodo.substring(i,x);
											 i = x;
										}
										else if ( stringNodo.substring(i,i+12) == "nodoDestino:") {
											 i += 12;
											 var x=i;
											 while  (stringNodo.charAt(x)!= "]") {
												  x++;
											 }											
											 relacaoTemp.nodoDestino = stringNodo.substring(i,x);
											 i = x;
										}
										else if ( stringNodo.substring(i,i+5) == "nome:") {
											 i += 5;
											 var x=i;
											 while  (stringNodo.charAt(x)!= "]") {
												  x++;
											 }
											 relacaoTemp.nome = stringNodo.substring(i,x);
											 i = x;
										}
								   }
								   i++;
							  }
							  relacoesAbrir.add(relacaoTemp);
						 }
						 i++;
					}
				}
			}
		}
		
		
		
		function getNodoPorId(id) {
			for (var i=0; i<nodosAbrir.length ; i++) {
				if	(nodosAbrir[i].id == id)
					return nodosAbrir[i].nodo;
			}
			return null;
		}
		
		var relacoes = new List(); //lista de relacaoes
		
		//cria instancias de Nodo
		for (var i=0; i<nodosAbrir.length;i++) {
		   var nodoAbrir = nodosAbrir[i];
		   nodoAbrir.nodo = new Nodo(nodoAbrir.texto, nodoAbrir.tipo);
		   nodoAbrir.nodo.id = nodoAbrir.id;
		   nodoAbrir.nodo.atributos = nodoAbrir.atributos;
		   nodoAbrir.nodo.relacoes = relacoes;
		}  
		
		
		

        //relaciona nodos aos Nodo pai
		for (var i=0; i<nodosAbrir.length;i++) {
			var nodoAbrir = nodosAbrir[i];
			var nodoPai = null;

			if   (nodoAbrir.pai != "0")
				nodoPai = getNodoPorId(nodoAbrir.pai);
			
			if   (nodoPai)
				nodoPai.addNodo(nodoAbrir.nodo);				
		}
		  
		//cria instancias de Relacao
		for(var i = 0; i < relacoesAbrir.size(); i++) {
			var relacaoAbrir = relacoesAbrir.fromIndex(i);
			var relacao = new Relacao(getNodoPorId(relacaoAbrir.nodoOrigem),
									  getNodoPorId(relacaoAbrir.nodoDestino),
									  relacaoAbrir.nome);
			relacoes.add(relacao);							
		}
		  
		//alert("teste");  
		
          return getNodoPorId("1");  		
	};
	
}