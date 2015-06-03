var ObjetoFisica = function (_nome, _tamanho, _tipo, _material, indicie, _posicoes, _velocidade, _massa, _amortecLinear, _amortecAngular, _rotacao, _aceleraco, _orientacao, _colicaoCom, _interagem) {
    var nome = _nome === "" ? _tipo + "" + indicie : _nome;
    var tamanho = _tamanho;
    var tipo = _tipo;
    var material = _material;
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
    var colideComBase = true;
    var interagem = _interagem;

    var div, sub_div;

    this.isInteragem = function () {
        return interagem;
    };
    this.isColideComBase = function () {
        return colideComBase;
    };

    this.getNome = function () {
        return nome;
    };

    this.getTamanho = function () {
        return parseInt(tamanho);
    };

    this.getTipo = function () {
        return tipo;
    };

    this.getMaterial = function () {
        return material;
    };

    this.getID = function () {
        return objeto_ID;
    };

    this.getPosicaoInicial = function () {
        return  posicoes;
    };

    this.getVelocidade = function () {
        return velocidade;
    };

    this.getRotacao = function () {
        return rotacao;
    };

    this.getAceleracao = function () {
        return aceleracao;
    };

    this.getMassa = function () {
        return parseFloat(massa);
    };

    this.getAmortecLinear = function () {
        return parseFloat(amortecLinear);
    };

    this.getAmortecAngular = function () {
        return parseFloat(amortecAngular);
    };

    this.getOrientacao = function () {
        return orientacao;
    };

    this.getColisaoCom = function () {
        return colisaoCom;
    };

//função onde a seleção de qual objeto vai ser criado é feito aqui:
//Não dá pra usar na interface porque os campos de entradas são diferentes.

    this.CriaObjeto = function () {
        switch (tipo) {
            case "Esfera":
                CriaEsfera();
            case"Cubo":
                CriaCubo();
            case "Alvo":
                CriaAlvo();
        }
    };

    this.CriaEsfera = function () {
        if (tamanho === "") {
            throw 'ERROR: O campo do tamanho não pode está vazio!';
        }

        if (tamanho <= 0) {
            throw 'ERROR: O tamanho não pode ser igual ou menor que zero!';
        }
        var geometria = new THREE.SphereGeometry(tamanho, 32, 16);
        var materialEsfera = new THREE.MeshLambertMaterial();
        var esfera = new THREE.Mesh(geometria, materialEsfera);

        esfera.position.x = parseInt(posicoes.x);
        esfera.position.y = parseInt(posicoes.y);
        esfera.position.z = parseInt(posicoes.z);
        /**
         esfera.position.x = 5;
         esfera.position.y = 5;
         esfera.position.z =5;
         **/
        esfera.material.color.setHex(getMaterial(material));
        //alert(esfera.position.x);
        console.log("Entrou Na criação de esfera!");
        cena.add(esfera);
        listaDeObjetosGraficos.push(esfera);

    };

    this.CriaCubo = function () {
        if (tamanho === "") {
            throw 'ERROR: O campo do tamanho não pode está vazio!';
        }

        if (tamanho <= 0) {
            throw 'ERROR: O tamanho não pode ser igual ou menor que zero!';
        }
        var geometria = new THREE.BoxGeometry(tamanho, tamanho, tamanho);
        var materialCubo = new THREE.MeshLambertMaterial();
        var cubo = new THREE.Mesh(geometria, materialCubo);

        cubo.position.x = parseInt(posicoes.x);
        cubo.position.y = parseInt(posicoes.y);
        cubo.position.z = parseInt(posicoes.z);

        cubo.material.color.setHex(getMaterial(material));

        cena.add(cubo);
        listaDeObjetosGraficos.push(cubo);

    };

    this.CriaAlvo = function () {
        if (tamanho === "") {
            throw 'ERROR: O campo do tamanho não pode está vazio!';
        }

        if (tamanho <= 0) {
            throw 'ERROR: O tamanho não pode ser igual ou menor que zero!';
        }
        /**
         var target = new GAMU.Target(cena, 3);
         target.position = new THREE.Vector3(100, 60, 0);
         target.build();
         /** var textura = new THREE.ImageUtils.loadTexture("textura/lavatile.jpg");
         
         var geometria = new THREE.SphereGeometry(tamanho, 100, 100);
         var material = new THREE.MeshLambertMaterial({map: textura});
         var alvo = new THREE.Mesh(geometria, material);
         
         alvo.position.x = parseInt(posicoes.x);
         alvo.position.y = parseInt(posicoes.y);
         alvo.position.z = parseInt(posicoes.z);
         **/
        var geometry = new THREE.BoxGeometry(tamanho, tamanho * 2, tamanho * 2);
        var material = new THREE.MeshBasicMaterial({color: 0x000000, transparent: true, opacity: 0.2});
        var alvo = new THREE.Mesh(geometry, material);
        alvo.position.x = parseInt(posicoes.x);
        alvo.position.y = parseInt(posicoes.y);
        alvo.position.z = parseInt(posicoes.z);

        listaDeObjetosGraficos.push(alvo);
        cena.add(alvo);
    };

    this.getDiv = function () {
        div = document.createElement("div");
        div.id = "div" + objeto_ID;
        div.innerHTML = "<h5>" + nome + "</h5>";
        div.className = "div_objeto";
        div.onclick = function () {
            console.log(objeto_ID);
            selecionaObjetos(objeto_ID);
        };

        sub_div = document.createElement("div");
        sub_div.id = "sub_div" + objeto_ID;

        return div;
    };

    this.addLista = function (tipoLista) {
        div = document.createElement("div");
        div.id = "objeto" + objeto_ID;
        div.className = "div_listaDeObjetos";

        sub_div = document.createElement("div");
        sub_div.id = "sub_div_objeto" + objeto_ID;
        sub_div.innerHTML = nome;
        sub_div.className = "nome_Objeto";

        var sub_div2 = document.createElement("div");
        sub_div2.id = "sub_div_objeto2" + objeto_ID;
        sub_div2.className = "checkbox_Objeto";

        var checkbox;
        checkbox = document.createElement("input");
        checkbox.type = 'checkbox';
        checkbox.id = 'check_obj_' + tipoLista + objeto_ID;


        sub_div2.appendChild(checkbox);
        div.appendChild(sub_div);
        div.appendChild(sub_div2);
        return  div;

    };

    this.teste = function () {
        var str = "";
        for (var i = 0; i < colisaoCom.length; i++) {

            str += colisaoCom[i] + " ";
        }
        return str;
    };
};

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
                return 0x0048ff;
            }
        }
    }
}
;

