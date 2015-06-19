/**
 * Created by Gabriel on 31/05/2015.
 */

window.onload = inicializaCena;

//HEFESTO._host = 'costao.inf.furb.br:8080';
HEFESTO._host = 'costao.inf.furb.br:8080';
HEFESTO._service = 'hefesto-wsNew';

var sm = new HEFESTO.SimulationManager('canvas-3d');
var cannon;
var cdGround;

var target;
var tutorialLigado = false;
var rb_target;
var colisions = 0;
var auxF;
var auxMaterial;
var gravidade;
var auxGravidade;
var passada =1;

var materialType = BD.MaterialProjetil.SILICONE;
auxMaterial = materialType;

$(function () { $("[data-toggle='tooltip']").tooltip({html:true}); });

function inicializaCena(){

    cdGround = new HEFESTO.CollisionData(0.9, 1, 0.01);
    cdGround.id = 'ground';
    cdGround.maxCollision = 256 * 256 * 256;
    sm.addCollisionData(cdGround);

    sm.initDrawableScene();
    var width = document.getElementById('canvas-div').clientWidth;

    var height = window.innerHeight - document.getElementById('canvas-div').getBoundingClientRect().top ;
    height -= 20; //ajuste de margem e footer
    sm.sb.renderer.setSize(width, height);
    sm.sb.scene.add(new THREE.GridHelper(300, 15));
    sm.sb.camera.position.set(2, 30, 170);

    $('#stats').remove();
    sm.sb.update();

    console.log("Inicializou!!!");

    sm.simulation.contactListener = function (data) {
        console.log("Colidiu!!!");
        colisions++;
        if(tutorialLigado && colisions === 0){
            setTimeout(function(){
                console.log("Delay...");
                changeAngleS2();
            },1500);
        }

    }
}

var atualizarMaterial = function(el, material) {
    materialType = material;
    var matImg = document.getElementById('materialAtualImg');
    matImg.src = el.src;
    matImg.title = el.title;
};

sm.onInitSimulation = function() {
    /**
    var angle = document.getElementById('fieldAngulo').value;
    if (angle) {
        cannon.angle = angle;
    }
    **/
    gravidade = new HEFESTO.GravityForce(new THREE.Vector3(0, -10, 0));
    sm.addForce(gravidade);

    target = new BD.Target(sm.sb.scene, new THREE.Vector3(50, 30, -50),30, "Cubo");
    bindTargetCube(target.alvo,target.tamanho);

    cannon = new BD.Cannon(sm.sb.scene, new THREE.Vector3(-150, 0, -50));
    //cannon.angle = 45;
    // desenha o canhao
    cannon.draw();

    sm.sb.update();

    sm.bindAll();
    console.log("Executou o bindAll");
};

sm.justDraw = function() {
    if (cannon) {
        cannon.rotateAround(new THREE.Vector3(0, 1, 0), Math.PI * 50);
        sm.sb.scene.add(cannon.tubeMesh);
    }
    //console.log("Entrou Aqui!!!");
}

function bindTargetBall(targetMesh, tamanho){
    rb_target = new HEFESTO.RigidBody(undefined);
    rb_target.radius = tamanho;
    rb_target.canSleep = false;
    rb_target.position = new THREE.Vector3(targetMesh.position.x,targetMesh.position.y,targetMesh.position.z);
    rb_target.linearDamping = 0.8;
    rb_target.angularDamping = 0.95;
    //(4 * Math.PI * (r * r * r)) / 3;
    rb_target.mass = ((4 * Math.PI * (tamanho * tamanho * tamanho)) / 3)*BD.MaterialProjetil.FERRO.densidade;
    rb_target.useWorldForces = true;
    rb_target.velocity = new THREE.Vector3(0,0,0);
    rb_target.acceleration = new THREE.Vector3(0,0,0);
    var tensor = getInertiaTensorCoeffs(rb_target.mass);
    rb_target.inertiaTensor.set(tensor.elements[0], tensor.elements[1], tensor.elements[2], tensor.elements[3], tensor.elements[4], tensor.elements[5], tensor.elements[6], tensor.elements[7], tensor.elements[8]);
    //rb_target.bindContactData = true;
    rb_target.ignoreIntegration = true;
    sm.addBody(rb_target,true);

    rb_target.mesh = targetMesh;
}

function bindTargetCube(targetMesh, tamanho){
    rb_target = new HEFESTO.RigidBody(undefined);
    rb_target.halfSize = new THREE.Vector3(tamanho, tamanho, tamanho);
    rb_target.canSleep = false;
    rb_target.position = new THREE.Vector3(targetMesh.position.x,targetMesh.position.y,targetMesh.position.z);
    rb_target.linearDamping = 0.8;
    rb_target.angularDamping = 0.95;
    rb_target.mass = (tamanho * tamanho * tamanho)*BD.MaterialProjetil.FERRO.densidade;
    rb_target.useWorldForces = true;
    rb_target.velocity = new THREE.Vector3(0,0,0);
    rb_target.acceleration = new THREE.Vector3(0,0,0);
    var tensor = getBlockInertiaTensor(rb_target.mass , rb_target.halfSize);
    rb_target.inertiaTensor.set(tensor.elements[0], tensor.elements[1], tensor.elements[2], tensor.elements[3], tensor.elements[4], tensor.elements[5], tensor.elements[6], tensor.elements[7], tensor.elements[8]);
    //rb_target.bindContactData = true;
    rb_target.ignoreIntegration = true;
    sm.addBody(rb_target,true);

    rb_target.mesh = targetMesh;
}

var iniciarSimulacao = function() {
    sm.play = true;
    sm.initSimulation();
};

var getInertiaTensorCoeffs = function(mass) {
    var random = Math.random() + 0.5;
    var coeff = 0.4 * mass * random * random;
    var m = new THREE.Matrix3();

    m.elements[0] = coeff;
    m.elements[4] = coeff;
    m.elements[8] = coeff;
    return m;
};

getBlockInertiaTensor = function(mass, halfSize) {
    var m = new THREE.Matrix3();
    var squares = new THREE.Vector3(halfSize.x * halfSize.x, halfSize.y * halfSize.y, halfSize.z * halfSize.z);

    m.elements[0] = 0.3 * mass * (squares.y + squares.z);
    m.elements[4] = 0.3 * mass * (squares.x + squares.z);
    m.elements[8] = 0.3 * mass * (squares.x + squares.y);
    return m;
}


function createCanonBall() {
    try {
        var angle = document.getElementById('fieldAngulo').value;
        if (angle) {
            cannon.angle = angle;
            exception(angle);
        }

    //console.log(cannon.angle);
    var geometry = new THREE.SphereGeometry(5,16,32);
    var material = materialType.cgMaterial;
    var mesh = new THREE.Mesh(geometry, material);
    mesh.matrixAutoUpdate = false;

    var position = cannon.determineProjetilPosition();

    sm.sb.scene.add(mesh);
    mesh.updateMatrix();
    mesh.matrix.setPosition(position);
    sm.sb.update();

    bindBall(mesh);
    }catch(e){
        alert(e);
    }
}

function bindBall(mesh){
    try {
        var rb = new HEFESTO.RigidBody(undefined);
        rb.radius = 5;
        rb.canSleep = false;
        var pos = cannon.determineProjetilPosition();
        rb.position = new THREE.Vector3(pos.x, pos.y, pos.z);
        //rb.velocity = new THREE.Vector3();
        rb.linearDamping = 0.8;
        rb.angularDamping = 0.95;

        /** volume / massa */
        var r = rb.radius * 0.1;
        var volume = (4 * Math.PI * (r * r * r)) / 3;
        rb.mass = volume * materialType.densidade;
        rb.useWorldForces = true;

        /** aceleracao dada pela lei de hooke F = K . x  e pelo angulo */
        //rb.velocity = new THREE.Vector3(cannon.determineAngleVelocityVector().x, cannon.determineAngleVelocityVector().y, 0);
        //console.log(rb.velocity);
        var K = document.getElementById('fieldK').value;
        exception(K);
        var x = document.getElementById('fieldX').value;
        exception(x);
        //lei de hooke F = K . x;
        K = K / 100;
        var f = K * x;
        // aceleracao = f / m
        var ac = f / rb.mass;

        //aplica sobre a aceleracao baseada no angulo
        rb.acceleration.x += ac;
        //rb.acceleration.y += ac;

        /** velocidade dada pelo angulo */
        rb.velocity = new THREE.Vector3(cannon.determineAngleVelocityVector(ac, x).x, cannon.determineAngleVelocityVector(ac, x).y, 0);

        var tensor = getInertiaTensorCoeffs(rb.mass);
        rb.inertiaTensor.set(tensor.elements[0], tensor.elements[1], tensor.elements[2], tensor.elements[3], tensor.elements[4], tensor.elements[5], tensor.elements[6], tensor.elements[7], tensor.elements[8]);

        sm.addBody(rb, true);
        //alert('Corpo R�gido criado com sucesso!')

        rb.mesh = mesh;

        var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE, cdGround, rb, null);
        sm.addCollision(collisionGround, true);

        //var collisionAll = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cdGround, rb_target, rb);
        //var collisionAll = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_SPHERE, cdGround, rb_target, rb);
        var collisionAll = new HEFESTO.Collision(HEFESTO.CollisionType.ALL, cdGround, rb, null);
        sm.addCollision(collisionAll, true);

        //console.log(rb);

        //sm.simulation.addForceToBody(gravidade,rb);

        if (tutorialLigado && option === "2" && passada > 0) {
            setTimeout(function () {
                $("#fieldK").prop('disabled', false);
                $("#fieldX").prop('disabled', false);

                passada--;
            }, 1500);
            auxF = f;
        }

        if (tutorialLigado && auxF != f && option === "2") {
            setTimeout(function () {
                console.log("Delay...");
                nextStep();
            }, 1500);
            passada = 1;
        }

        if (tutorialLigado && option === "3" && passada > 0) {
            setTimeout(function () {
                ativaImagens();
            }, 1500);
            auxMaterial = materialType;
            passada--;
        }

        if (tutorialLigado && option === "3" && materialType !== auxMaterial) {
            setTimeout(function () {
                ativaImagens();
                nextStep();
            }, 1500);
            passada = 1;
        }

        if (tutorialLigado && passada > 0 && option === "4") {
            auxGravidade = gravidade.gravity.y;
            console.log(auxGravidade + " Gravidade" + gravidade.y);
            passada--;
            setTimeout(function () {
                alteraGravidade2();
                console.log("Delay...");
            }, 2000);
        }

        if (tutorialLigado && auxGravidade !== gravidade.gravity.y && passada <= 0 && option === "4") {
            auxGravidade = gravidade.y;
            passada = 1;
            console.log("Entrou na segunda...");
            setTimeout(function () {
                doneStep("Agora voc&ecirc; acabou de ver o que aconte quando altera a agravidade.");
                console.log("Delay...");
            }, 2000);
        }
    }catch(e){
        alert(e);
    }
}

function createCanonCube() {

    var angle = document.getElementById('fieldAngulo').value;
    if (angle) {
        cannon.angle = angle;
    }
    //console.log(cannon.angle);
    var geometry = new THREE.BoxGeometry(5, 5, 5);
    var material = materialType.cgMaterial;
    var mesh = new THREE.Mesh(geometry, material);
    mesh.matrixAutoUpdate = false;

    var position = cannon.determineProjetilPosition();

    sm.sb.scene.add(mesh);
    mesh.updateMatrix();
    mesh.matrix.setPosition(position);
    sm.sb.update();

    bindCube(mesh);
}

function bindCube(mesh){
    try {
        var rb = new HEFESTO.RigidBody(undefined);
        rb.halfSize = new THREE.Vector3(5 / 2, 5 / 2, 5 / 2);
        rb.canSleep = false;
        var pos = cannon.determineProjetilPosition();
        rb.position = new THREE.Vector3(pos.x, pos.y, pos.z);
        //rb.velocity = new THREE.Vector3();
        rb.linearDamping = 0.8;
        rb.angularDamping = 0.95;

        /** volume / massa */
        //var r = rb.radius * 0.1;
        var volume = 5 * 5 * 5;
        rb.mass = volume * materialType.densidade;
        rb.useWorldForces = true;

        /** aceleracao dada pela lei de hooke F = K . x  e pelo angulo */
        rb.velocity = new THREE.Vector3(cannon.determineAngleVelocityVector().x, cannon.determineAngleVelocityVector().y, 0);
        //console.log(rb.velocity);
        var K = document.getElementById('fieldK').value;
        exception(K);
        var x = document.getElementById('fieldX').value;
        //lei de hooke F = K . x;
        K = K / 100;
        var f = K * x;
        // aceleracao = f / m
        var ac = f / rb.mass;

        //aplica sobre a aceleracao baseada no angulo
        rb.acceleration.x += ac;
        //rb.acceleration.y += ac;

        /** velocidade dada pelo angulo */
        //rb.velocity = new THREE.Vector3(cannon.determineAngleVelocityVector(ac,x).x, cannon.determineAngleVelocityVector(ac,x).y, 0);

        var tensor = getBlockInertiaTensor(rb.mass, rb.halfSize);
        rb.inertiaTensor.set(tensor.elements[0], tensor.elements[1], tensor.elements[2], tensor.elements[3], tensor.elements[4], tensor.elements[5], tensor.elements[6], tensor.elements[7], tensor.elements[8]);

        sm.addBody(rb, true);
        //alert('Corpo R�gido criado com sucesso!')

        rb.mesh = mesh;

        var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_HALFSPACE, cdGround, rb, null);
        sm.addCollision(collisionGround, true);

        var collisionAll = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_BOX, cdGround, rb, rb_target);
        sm.addCollision(collisionAll, true);

        //console.log(rb);

        //sm.simulation.addForceToBody(gravidade,rb);

        if (tutorialLigado && option === "2" && passada > 0) {
            setTimeout(function () {
                $("#fieldK").prop('disabled', false);
                $("#fieldX").prop('disabled', false);

                passada--;
            }, 1500);
            auxF = f;
        }

        if (tutorialLigado && auxF != f && option === "2") {
            setTimeout(function () {
                console.log("Delay...");
                nextStep();
            }, 1500);
            passada = 1;
        }

        if (tutorialLigado && option === "3" && passada > 0) {
            setTimeout(function () {
                ativaImagens();
            }, 1500);
            auxMaterial = materialType;
            passada--;
        }

        if (tutorialLigado && option === "3" && materialType !== auxMaterial) {
            setTimeout(function () {
                ativaImagens();
                nextStep();
            }, 1500);
            passada = 1;
        }

        if (tutorialLigado && passada > 0 && option === "4") {
            auxGravidade = gravidade.gravity.y;
            console.log(auxGravidade + " Gravidade" + gravidade.y);
            passada--
            setTimeout(function () {
                alteraGravidade2();
                console.log("Delay...");
            }, 2000);
        }

        if (tutorialLigado && auxGravidade !== gravidade.gravity.y && passada <= 0 && option === "4") {
            auxGravidade = gravidade.y;
            passada = 1;
            console.log("Entrou na segunda...");
            setTimeout(function () {
                doneStep("Agora voc&ecirc; acabou de ver o que aconte quando altera a agravidade.");
                console.log("Delay...");
            }, 2000);
        }
    }catch(e){
        alert(e);
    }

}

function changeForce(){
    var img = document.getElementById("gravidade");
    var g = BD.Gravidades[document.getElementById("listGravidades").value];

    sm.simulation.removeForce(gravidade);
    gravidade = new HEFESTO.GravityForce(new THREE.Vector3(0, g.valor*-1, 0));
    img.src = g.caminho;
    //img.title = g.id +": "+ g.valor+"m/s&sup2;";
    $(img).attr('html', true);
    $(img).attr('data-original-title', g.id +": "+ g.valor+"m/s&sup2;");
    sm.simulation.bindForce(gravidade);

    //console.log(y*-1.0);
    //console.log(BD.Gravidades[g]);

    console.log("Mundou a Gravidade");
}

function atualizaImgaemGravidade(value){
    var iconImage = document.getElementById('iconGravidade');
    var valorGravidade = document.getElementById('valorGravidade');
    var valor = BD.Gravidades[value];

    iconImage.src = valor.caminho;
    iconImage.title = valor.id;
    valorGravidade.innerHTML ='<h5>Valor: '+ valor.valor+'m/s&sup2;</h5>'
}

function exception(value){
    if(isNaN(value)){
        throw "ERROR: Valor inv&aacute;lido encontrado."
    }
}