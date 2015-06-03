var ObjetoFisica = function(_nome, _tamanho, _tipo, _material, indicie,
		_posicoes, _velocidade, _massa, _amortecLinear, _amortecAngular,
		_rotacao, _aceleraco, _orientacao, _colicaoCom, _interagem, _usaForcas) {
	var nome = _nome === "" ? _tipo + "" + indicie : _nome;
	var tamanho = _tamanho;
	var tipo = _tipo;
	var material = _material === "PlÃ¡stico" ? "Pl&aacute;stico" : _material;
	var objeto_ID = indicie;
	var posicoes = _posicoes;
	var velocidade = _velocidade;
	var rotacao = _rotacao;
	var aceleracao = _aceleraco;
	var massa = _massa;
	var amortecLinear = _amortecLinear;
	var amortecAngular = _amortecAngular;
	var orientacao = _orientacao;
	var colisaoCom = _colicaoCom;
	var colideComBase = _tipo === 'Alvo' ? false : true;
	var interagem = _interagem;
	var usaForcas = _usaForcas;

	var div, sub_div;

	this.setPosicoes = function(x, y, z) {
		posicoes.x = x;
		posicoes.y = y;
		posicoes.z = z
		// console.log(this.getPosicaoInicial());
	};

	this.isInteragem = function() {
		return interagem;
	};
	this.isColideComBase = function() {
		return colideComBase;
	};

	this.getNome = function() {
		return nome;
	};

	this.getTamanho = function() {
		return tamanho.x === undefined ? parseInt(tamanho) : tamanho;
	};

	this.getTipo = function() {
		return tipo;
	};

	this.getMaterial = function() {
		return material;
	};

	this.getID = function() {
		return objeto_ID;
	};

	this.getPosicaoInicial = function() {
		return posicoes;
	};

	this.getVelocidade = function() {
		return velocidade;
	};

	this.getRotacao = function() {
		return rotacao;
	};

	this.getAceleracao = function() {
		return aceleracao;
	};

	this.getMassa = function() {
		return parseFloat(massa);
	};

	this.getAmortecLinear = function() {
		return parseFloat(amortecLinear);
	};

	this.getAmortecAngular = function() {
		return parseFloat(amortecAngular);
	};

	this.getOrientacao = function() {
		return orientacao;
	};

	this.getColisaoCom = function() {
		return colisaoCom;
	};

	this.isUsaForcas = function() {
		return usaForcas;
	};

	// função onde a seleção de qual objeto vai ser criado é feito aqui:
	// Não dá pra usar na interface porque os campos de entradas são diferentes.

	this.CriaObjeto = function(tipo, scene) {
		switch (tipo) {
		case "Esfera":
			this.CriaEsfera(scene);
			break;
		case "Cubo":
			this.CriaCubo(scene);
			break;
		case "Alvo":
			this.CriaAlvo(scene);
			break;
		}
	};

	this.CriaEsfera = function(scene) {
		if (isNaN(tamanho)) {
			throw 'ERROR: O campo do tamanho precisa ser um número!';
		}

		if (tamanho === "") {
			throw 'ERROR: O campo do tamanho não pode está vazio!';
		}

		if (tamanho <= 0) {
			throw 'ERROR: O tamanho não pode ser igual ou menor que zero!';
		}

		if (isNaN(massa)) {
			throw 'ERROR: O campo do massa precisa ser um número!';
		}

		if (massa === "") {
			throw 'ERROR: O campo massa não pode estar vazio!';
		}

		if (massa <= 0) {
			throw 'ERROR: A massa não pode ser igual ou menor que zero!';
		}
		var geometria = new THREE.SphereGeometry(tamanho, 32, 16);
		var materialEsfera = new THREE.MeshLambertMaterial();
		var esfera = new THREE.Mesh(geometria, materialEsfera);

		esfera.position.x = parseInt(posicoes.x);
		esfera.position.y = parseInt(posicoes.y);
		esfera.position.z = parseInt(posicoes.z);

		esfera.material.color.setHex(getMaterial(material));
		// alert(esfera.position.x);
		console.log("Entrou Na criação de esfera!");
		scene.add(esfera);
		listObjetcsGraphics.push(esfera);

	};

	this.CriaCubo = function(scene) {

		if (isNaN(tamanho.x) || isNaN(tamanho.y) || isNaN(tamanho.z)) {
			throw 'ERROR: O campo do tamanho precisa ser um número!';
		}

		if (tamanho === "") {
			throw 'ERROR: O campo do tamanho não pode está vazio!';
		}

		if (tamanho <= 0) {
			throw 'ERROR: O tamanho não pode ser igual ou menor que zero!';
		}

		if (isNaN(massa)) {
			throw 'ERROR: O campo do massa precisa ser um número!';
		}

		if (massa === "") {
			throw 'ERROR: O campo massa não pode estar vazio!';
		}

		if (massa <= 0) {
			throw 'ERROR: A massa não pode ser igual ou menor que zero!';
		}
		var geometria = new THREE.BoxGeometry(tamanho.x, tamanho.y, tamanho.z);
		var materialCubo = new THREE.MeshLambertMaterial();
		var cubo = new THREE.Mesh(geometria, materialCubo);
		// console.log(tamanho);
		cubo.position.x = parseInt(posicoes.x);
		cubo.position.y = parseInt(posicoes.y);
		cubo.position.z = parseInt(posicoes.z);

		cubo.material.color.setHex(getMaterial(material));

		scene.add(cubo);
		listObjetcsGraphics.push(cubo);

	};

	this.CriaAlvo = function(scene) {
		if (isNaN(tamanho)) {
			throw 'ERROR: O campo do tamanho precisa ser um número!';
		}

		if (tamanho === "") {
			throw 'ERROR: O campo do tamanho não pode está vazio!';
		}

		if (tamanho <= 0) {
			throw 'ERROR: O tamanho não pode ser igual ou menor que zero!';
		}

		if (isNaN(massa)) {
			throw 'ERROR: O campo do massa precisa ser um número!';
		}

		if (massa === "") {
			throw 'ERROR: O campo massa não pode estar vazio!';
		}

		if (massa <= 0) {
			throw 'ERROR: A massa não pode ser igual ou menor que zero!';
		}
		var loader = new THREE.TGALoader();
		var texture = loader.load("textura/Alvo.tga");

		var textura = new THREE.ImageUtils.loadTexture("textura/" + material
				+ ".png");
		var geometry = new THREE.BoxGeometry(tamanho, tamanho * 2, tamanho * 2);
		// var material = new THREE.MeshBasicMaterial({color: 0x000000,
		// transparent: true, opacity: 0.2});
		var material2 = new THREE.MeshBasicMaterial({
			color : 0x000000,
			transparent : true,
			opacity : 0.5
		});
		var texturaF = new THREE.MeshBasicMaterial({
			map : textura
		});
		var materials = [ texturaF, texturaF, material2, material2, material2,
				material2 ];
		var materialFinal = new THREE.MeshFaceMaterial(materials);
		var alvo = new THREE.Mesh(geometry, materialFinal);
		alvo.position.x = parseInt(posicoes.x);
		alvo.position.y = parseInt(posicoes.y);
		alvo.position.z = parseInt(posicoes.z);

		listObjetcsGraphics.push(alvo);
		scene.add(alvo);
	};

	this.getDiv = function() {
		div = document.createElement("div");
		div.id = "div" + objeto_ID;
		div.innerHTML = "<h5>" + nome + "</h5>";
		div.className = "div_objeto";
		/*
		 * div.data-toggle="tooltip"; div.data-placement="right";
		 * div.title="Tooltip on right";
		 */
		div.onclick = function() {
			console.log(objeto_ID);
			selecionaObjetos(objeto_ID);
		};

		sub_div = document.createElement("div");
		sub_div.id = "sub_div" + objeto_ID;
		sub_div.innerHTML = "E";
		sub_div.className = "divDelete";

		div.appendChild(sub_div);

		return div;
	};

	this.getDiv2 = function() {
		div = document.createElement("div");
		div.id = "div" + objeto_ID;
		div.className = "div_objeto";
		var sub_divName = document.createElement("div");
		sub_divName.className = "obeject_Name";
		sub_divName.innerHTML = "<h5><strong>" + nome + "</strong></h5>";

		sub_divName.onclick = function() {
			console.log(objeto_ID);
			selecionaObjetos(objeto_ID);
		};
		var sub_divDelete;
		sub_divDelete = document.createElement("div");
		sub_divDelete.id = "sub_div" + objeto_ID;
		sub_divDelete.className = "div_Delete";
		var span = document.createElement("span");
		// span.icon = "glyphicon glyphicon-trash";
		span.className = 'glyphicon glyphicon-trash';
		// span.label = 'Adicionar';
		sub_divDelete.appendChild(span);

		sub_divDelete.onclick = function() {
			deleteElement("#div" + objeto_ID);
			deleteElement("#objeto" + objeto_ID + "_cubo");
			deleteElement("#objeto" + objeto_ID + "_esfera");
			deleteElement("#objeto" + objeto_ID + "_alvo");
			deleteObeject(objeto_ID);
		};

		div.appendChild(sub_divName);
		div.appendChild(sub_divDelete);

		return div;
	};

	this.addLista = function(tipoLista) {
		div = document.createElement("div");
		div.id = "objeto" + objeto_ID + "_" + tipoLista;
		div.className = "div_listaDeObjetos input-group";

		sub_div = document.createElement("label");
		sub_div.id = "sub_div_objeto" + objeto_ID;
		sub_div.innerHTML = nome;
		sub_div.className = "lObject";

		var sub_div2 = document.createElement("div");
		sub_div2.id = "sub_div_objeto2" + objeto_ID;
		sub_div2.className = "checkbox_Objeto";

		var checkbox;
		checkbox = document.createElement("input");
		checkbox.type = 'checkbox';
		checkbox.className = "form-control p bol"
		checkbox.id = 'check_obj_' + tipoLista + objeto_ID;

		// sub_div2.appendChild(checkbox);
		div.appendChild(checkbox);
		div.appendChild(sub_div);

		return div;

	};

	function deleteElement(element) {
		if (!modoTutorial) {
			$(element).remove();
		}
	}

	function getMaterial(__material) {
		var textura = __material;
		if (textura === "Madeira") {
			return 0xFFFF00;
		} else {
			if (textura === "Metal") {
				return 0x9f9f9f;
			} else {
				if (textura === "Borracha") {
					return 0xff0000;
				} else {
					if (textura === "Pl&aacute;stico" || textura === "Plástico") {
						return 0x0048ff;
					}
				}
			}
		}
	}
};
