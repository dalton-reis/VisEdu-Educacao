var objeto = new ObjetoFisica(objetoAtual.nome,
					objetoAtual.tamanho, objetoAtual.tipo,
					objetoAtual.material, indice,
					auxVetor(objetoAtual.posicao),				
					auxVetor(objetoAtual.velocidade), objetoAtual.massa,
					objetoAtual.amortecedorAngular,
					objetoAtual.amortecedorLinear,
					auxVetor(objetoAtual.rotacao),
					auxVetor(objetoAtual.aceleracao),
					auxQuartion(objetoAtual.orientacao), objetoAtual.colideCom,
					objetoAtual.interagem, objetoAtual.usaForcas);
			objeto.CriaObjeto(objetoAtual.tipo, cena);
			listObjetcsPhys.push(objeto);
			console.log(objetoAtual.posicao);
			document.getElementById("listaObjetos").appendChild(
					objeto.getDiv2());
			document.getElementById("listaDeObjetos_Esfera").appendChild(
					objeto.addLista('esfera'));
			document.getElementById("listaDeObjetos_Cubo").appendChild(
					objeto.addLista('cubo'));
			document.getElementById("listaDeObjetos_Alvo").appendChild(
					objeto.addLista('alvo'));
			indice++;
			console.log("indice: " + indice);
		}