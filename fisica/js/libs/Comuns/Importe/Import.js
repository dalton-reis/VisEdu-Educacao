var Import = function(strJson, cena) {
	// Para garantir melhor zerar todas as listas.
	// Também a lista por onde pode se selecionar os objetos.
	// console.log(strJson);
	indice = 0;
	play = false;
	primeiraPosicao = 0;
	var objetoAtual;
	// console.log(strJson.Camera.posicao);
	for (var i = 0; i < listaRigidBody.length; i++) {
		simulation.removeRigidBody(listaRigidBody[i]);
	}
	listaRigidBody = [];
	for (var i = 0; i < listObjetcsGraphics.length; i++) {
		cena.remove(listObjetcsGraphics[i]);
	}
	listObjetcsGraphics = [];
	listObjetcsPhys = [];

	var listaForces = document.getElementById("listForces");
	listaForces.innerHTML = "";

	for (var i = 0; i < forces; i++) {
		simulation.removeForce(forces[i]);
	}

	forces = [];

	var lista = document.getElementById('listaObjetos');
	lista.innerHTML = "";
	var titulo = document.createElement('label');
	titulo.innerHTML = "Objetos";
	titulo.className = 'labelTitulo';
	lista.appendChild(titulo);

	var propriedades = document.getElementById('Propriedades');
	propriedades.innerHTML = "";
	titulo = document.createElement('label');
	titulo.innerHTML = "Propriedades";
	titulo.className = 'labelTitulo';
	var listaPropriedades = document.createElement('label');
	listaPropriedades.className = "listaPropriedades";
	listaPropriedades.id = "listaProriedades";
	propriedades.appendChild(titulo);
	propriedades.appendChild(listaPropriedades);

	// lista.innerHTML = "<h2>Objetos</h2>";
	// Zerando listas da seleção com qual objeto deve colidir:

	document.getElementById('listaDeObjetos_Alvo').innerHTML = "";
	document.getElementById('listaDeObjetos_Cubo').innerHTML = "";
	document.getElementById('listaDeObjetos_Esfera').innerHTML = "";

	var posicaoCamera = auxVetor(strJson.Camera.posicao);
	camera.position.set(posicaoCamera.x, posicaoCamera.y, posicaoCamera.z);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	posInitCamera.x = posicaoCamera.x;
	posInitCamera.y = posicaoCamera.y;
	posInitCamera.z = posicaoCamera.z;

	// camera.position.x = posicaoCamera.x;
	// camera.position.y = posicaoCamera.y;
	// camera.position.z = posicaoCamera.z;

	for ( var id in strJson.Objetos) {
		// console.log(id);
		objetoAtual = strJson.Objetos[id];
		
		console.log(objetoAtual.tipo==="Cubo"?"Deu certo!!!":"Mudar");
		
		var objeto = new ObjetoFisica(objetoAtual.nome, 
				objetoAtual.tipo==="Cubo"?auxVetor(objetoAtual.tamanho):objetoAtual.tamanho,
				objetoAtual.tipo, objetoAtual.material, indice,
				auxVetor(objetoAtual.posicao),
				auxVetor(objetoAtual.velocidade), objetoAtual.massa,
				objetoAtual.amortecedorAngular, objetoAtual.amortecedorLinear,
				auxVetor(objetoAtual.rotacao),
				auxVetor(objetoAtual.aceleracao),
				auxQuartion(objetoAtual.orientacao), objetoAtual.colideCom,
				objetoAtual.interagem, objetoAtual.usaForcas);
		objeto.CriaObjeto(objetoAtual.tipo, cena);
		listObjetcsPhys.push(objeto);
		console.log(objetoAtual.posicao);
		document.getElementById("listaObjetos").appendChild(objeto.getDiv2());
		document.getElementById("listaDeObjetos_Esfera").appendChild(
				objeto.addLista('Esfera'));
		document.getElementById("listaDeObjetos_Cubo").appendChild(
				objeto.addLista('Cubo'));
		document.getElementById("listaDeObjetos_Alvo").appendChild(
				objeto.addLista('Alvo'));
		indice++;
		console.log("indice: " + indice);
		console.log("Material: " + objeto.getMaterial());
	}

	for ( var f in strJson.Forces) {
		// objetoAtual = strJson.Objetos[id]
		var force = strJson.Forces[f];
		force.values = auxVetor(force.values);
		bindForce(force);
		// console.log(force.valores);
	}

	function auxVetor(vetor) {
		return new THREE.Vector3(vetor[0], vetor[1], vetor[2]);
	}

	function auxQuartion(vetor) {
		// console.log(new THREE.Quaternion(vetor[0], vetor[1], vetor[2]));
		return new THREE.Quaternion(vetor[0], vetor[1], vetor[2]);
	}
	/**
	 * function getQuaternion(campo) { var r = document.getElementById(campo +
	 * 'R').value; var i = document.getElementById(campo + 'I').value; var j =
	 * document.getElementById(campo + 'J').value; return new
	 * THREE.Quaternion(r, i, j); } ;
	 */
	// console.log(listObjetcsGraphics);
	// console.log(listaRigidBody);
	// console.log(listObjetcsPhys);
	// console.log(play);
};