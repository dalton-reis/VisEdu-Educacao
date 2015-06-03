var Objeto = function (_tamanho, _material, indicie) {
    var tamanho = _tamanho;
    var material_ = _material;
    var objeto_ID = indicie;
    var div, sub_div;
    var rigidBody;

    this.getTamanho = function () {
        return tamanho;
    };

    this.getMaterial = function () {
        return material_;
    };

    this.criaEsfera = function () {
        if (tamanho === "") {
            throw 'ERROR: O campo do tamanho não pode está vazio!';
        }

        if (tamanho <= 0) {
            throw 'ERROR: O tamanho não pode ser igual ou menor que zero!';
        }
        var geometria = new THREE.SphereGeometry(tamanho, 32, 16);
        var material = new THREE.MeshLambertMaterial();
        var esfera = new THREE.Mesh(geometria, material);

        esfera.position.x = 5;
        esfera.position.y = 30;
        esfera.position.z = Math.random() * 5 - Math.random() * 3;

        esfera.material.color.setHex(getMaterial(material_));

        cena.add(esfera);
        //Falta colocar essa linh:
        //esfera.matrixAutoUpdate = false;
        
        //criando um corpo rigido:
        rigidBody = new HEFESTO.RigidBody(esfera);
        rigidBody.radius = 5;

        rigidBody.canSleep = false;
        rigidBody.mass = 200;
        rigidBody.aceleration.y = -10.0;

        if (parseInt((Math.random() * 100), 10) % 2 == 0) {
            rigidBody.rotation.x = 0.4;
        } else {
            rigidBody.rotation.z = 0.4;
        }

        rigidBody.orientation.r = 1;

        rigidBody.inertiaTensor.set(5360957.0, -0.0, -0.0, -0.0, 5360957.0, -0.0, -0.0, -0.0, 5360957.0);
        rigidBody.linearDamping = 0.95;
        rigidBody.angularDamping = 0.8;

        simulation.bindRigidBody(rigidBody);
        listaEfera.push(rigidBody);
        // Fim da Criação do corpo Rígido. 

        //var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE, cdGround, rigidBody, null);
        //simulation.bindCollision(collisionGround);
        if (document.getElementById("base").checked === true) {
            colisaoBaseBola(rigidBody);
        }
        
        listaDeObjetos.push(esfera);
        
        //objetoAtual2 = new ObjetoReal(rigidBody, esfera);
    };

    this.criaCubo = function () {
        if (tamanho === "") {
            throw 'ERROR: O campo do tamanho não pode está vazio!';
        }

        if (tamanho <= 0) {
            throw 'ERROR: O tamanho não pode ser igual ou menor que zero!';
        }

        var geometria = new THREE.CubeGeometry(tamanho, tamanho, tamanho);
        var material = new THREE.MeshLambertMaterial();
        var cubo = new THREE.Mesh(geometria, material);

        cubo.position.x = Math.random() * 5 - Math.random() * 3;
        cubo.position.y = Math.random() * 5 - Math.random() * 3;
        cubo.position.z = Math.random() * 5 - Math.random() * 3;

        cubo.material.color.setHex(getMaterial(material_));

        listaDeObjetos.push(cubo);

        cena.add(cubo);

    };

    this.criarAlvo = function () {
        if (tamanho === "") {
            throw 'ERROR: O campo do tamanho não pode está vazio!';
        }

        if (tamanho <= 0) {
            throw 'ERROR: O tamanho não pode ser igual ou menor que zero!';
        }

        var tetura = new THREE.ImageUtils.loadTexture("textura/lavatile.jpg");

        var geometria = new THREE.SphereGeometry(tamanho, 100, 100);
        var material = new THREE.MeshLambertMaterial({map: tetura});
        var alvo = new THREE.Mesh(geometria, material);

        alvo.position.x = Math.random() * 5 - Math.random() * 3;
        alvo.position.y = 20 + (Math.random() * 5 - Math.random() * 3);
        alvo.position.z = Math.random() * 5 - Math.random() * 3;

        listaDeObjetos.push(alvo);

        cena.add(alvo);
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

    this.getDiv = function () {
        div = document.createElement("div");
        div.id = "div" + objeto_ID;
        div.className = "div_objeto";
        div.innerHTML = "<br> <br> Objeto " + objeto_ID;
        div.onclick = function () {
            alert(objeto_ID);
            selecionaObjetos(objeto_ID);
        };

        sub_div = document.createElement("div");
        sub_div.id = "sub_div" + objeto_ID;

        return div;
    };
};


//function adicionaFisica(objeto) {
//    rigidBody = new HEFESTO.RigidBody(objeto);
//    rigidBody.radius = 20;
//
//    rigidBody.canSleep = false;
//    rigidBody.inverseMass = 200;
//    rigidBody.aceleration.y = -10.0;
//
//    if (parseInt((Math.random() * 100), 10) % 2 == 0) {
//        rigidBody.rotation.x = 0.4;
//    } else {
//        rigidBody.rotation.z = 0.4;
//    }
//
//    rigidBody.orientation.r = 1;
//
//    rigidBody.inertiaTensor.set(5360957.0, -0.0, -0.0, -0.0, 5360957.0, -0.0, -0.0, -0.0, 5360957.0);
//    rigidBody.linearDamping = 0.95;
//    rigidBody.angularDamping = 0.8;
//
//    simulation.bindRigidBody(rigidBody);
//
//}

function colisaoBaseBola(rb) {
    var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE, cdGround, rb, null);
    simulation.bindCollision(collisionGround);
}

function colisaoEsferaEsfera(rb, material) {
    if (material === "Madeira") {
        for (var i = 0; i < listaEfera.length; i++) {
            var collisionWood1 = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_SPHERE, cdMadeira_Borracha, rb, listaEfera[i]);
            simulation.bindCollision(collisionWood1);

            var collisionWood2 = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_SPHERE, cdMadeira_Madeira, rb, listaEfera[i]);
            simulation.bindCollision(collisionWood2);

            var collisionWood3 = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_SPHERE, cdMadeira_Metal, rb, listaEfera[i]);
            simulation.bindCollision(collisionWood3);

            var collisionWood4 = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_SPHERE, cdMadeira_Plastico, rb, listaEfera[i]);
            simulation.bindCollision(collisionWood4);
        }
    }
}

function colisaoCuboEsfera(rb, material) {
    if (material === "Madeira") {
        for (var i = 0; i < listaEfera.length; i++) {
            var collisionWood1 = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cdMadeira_Borracha, rb, listaEfera[i]);
            simulation.bindCollision(collisionWood1);

            var collisionWood2 = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cdMadeira_Madeira, rb, listaEfera[i]);
            simulation.bindCollision(collisionWood2);

            var collisionWood3 = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cdMadeira_Metal, rb, listaEfera[i]);
            simulation.bindCollision(collisionWood3);

            var collisionWood4 = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cdMadeira_Plastico, rb, listaEfera[i]);
            simulation.bindCollision(collisionWood4);
        }
    }

}