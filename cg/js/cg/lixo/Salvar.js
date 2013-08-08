function Salvar() {
	
	this.nodoToString = function(nodoRaiz) {
		
		var idAtual = 0;
		function atualizarIdsRecursivo(nodo) {
			
			idAtual++;
			
			nodo.id = idAtual;		
			
			for(var i = 0; i < nodo.nodeList.size(); i++) {
				atualizarIdsRecursivo(nodo.nodeList.fromIndex(i));			
			}
			
		}	
		
		atualizarIdsRecursivo(nodoRaiz);
				
		function nodoToStringRecursivo(nodo) {
			var idPai = 0;
			if	(nodo.pai)
				idPai = nodo.pai.id;
			var stringNode = "[nodo:[id:"+nodo.id+"][pai:"+idPai+"][texto:"+nodo.texto+"][tipo:"+nodo.tipo+"]"
						
			var size = nodo.atributos.size();				
			if	(size > 0) {
				stringNode += "[atributos:";				
				for (var i=0; i<size ; i++) {
					var atributo = nodo.atributos.fromIndex(i);
					stringNode += "[atributo:[nome:"+atributo.nome+"][tipo:"+atributo.tipo+"]]";				
				}
				stringNode += "]";
			}
			
			stringNode += "]";
			
			var strFilhos = "";			
			for(var i = 0; i < nodo.nodeList.size(); i++) {			
				strFilhos += nodoToStringRecursivo(nodo.nodeList.fromIndex(i));			
			}								
			
			return stringNode + strFilhos;
		}
		var stringNodos = nodoToStringRecursivo(nodoRaiz);
		
		
		function relacoesToString(relacoes) {
		
			var str = "";
			
			if	(relacoes) {
				var size = relacoes.size();				
				if	(size > 0) {
					str += "[relacoes:";				
					for (var i=0; i<size ; i++) {
						var relacao = relacoes.fromIndex(i);
						str += "[relacao:[nodoOrigem:"+relacao.nodoOrigem.id+"][nodoDestino:"+relacao.nodoDestino.id+"][nome:"+relacao.nome+"]]";				
					}
					str += "]";
				}
			}
			
			return str;
			
		}
		var stringRelacoes = relacoesToString(nodoRaiz.relacoes);
		
		return stringNodos + stringRelacoes;
		
	};	
	
}