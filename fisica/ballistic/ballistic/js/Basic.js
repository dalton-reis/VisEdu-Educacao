/**
 * Created by Gabriel on 31/05/2015.
 */

window.onload = inicializaCena;

HEFESTO._host = 'costao.inf.furb.br:8080';
//HEFESTO._host = 'localhost:8080';
HEFESTO._service = 'hefesto-wsNew';

var sm = new HEFESTO.SimulationManager('canvas-3d');
var cannon;
var cdGround;

var target;
var input;

//Variáveis para usar no tutorial:
var tutorialLigado = false;
var rb_target;
var colisions = 0;
var auxF;
var auxMaterial;
var gravidade;
var auxGravidade;
var passada =1;
var color;
//

var inicializada = -1;

var posAnt = new THREE.Vector3(0,0,0);
var posAntDes = new THREE.Vector3(0,0,0);
var isDesenhaTrajetoria = true;
var listCircle = [];
var listCannonBall = [];
var incDecAngle = 1;
var play = false;
var materialType = BD.MaterialProjetil.SILICONE;
auxMaterial = materialType;

var ant = 0;
var passouPosicao = 5;

var vectorColors = [0xFF0000, 0x0000FF, 0xF99008, 0x000000, 0x78008A, 0x002D8A, 0x930000, 0x370093, 0x000444, 0x314357, 0x2F4295, 0x952F65, 0xDB167E, 0xDB165C,
                    0xDBA816,0x23814F, 0xE705FF, 0x049046, 0xFF6300, 0x00AEFF, 0x630046, 0xD17600, 0xD15100, 0x001087, 0x870021];

$(function () { $("[data-toggle='tooltip']").tooltip({html:true}); });


$(window).blur(function() {
    console.log("Blur Win");
    //play = false;
    playPausa(false);
});

function playPausa(valor){
    var inconPlay =  document.getElementById('iconPlay');
    var btnPlay = document.getElementById('btnPlay');
    play = valor;
    console.log(play);

    if(inicializada < 0 && play){
        console.log("Incializou!!");
        iniciarSimulacao();
        inicializada++
    }

    if(play){
        inconPlay.className = "glyphicon glyphicon-pause";
        $(btnPlay).attr('html', true).attr('data-original-title',"Parar Simula&ccedil;&atilde;o");
    }else{
        inconPlay.className = "glyphicon glyphicon-play";
        $(btnPlay).attr('html', true).attr('data-original-title',"Retomar Simula&ccedil;&atilde;o");
    }
}


window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
    WINDOW.resizeCallback = function(inWidth, inHeight) { sm.sb.resize(inWidth, inHeight); };

    //sm.sb.resize(WINDOW.ms_Width, WINDOW.ms_Height);

}


function inicializaCena(){
    //myVar();
    cdGround = new HEFESTO.CollisionData(0.1, 0.1, 0.01);
    cdGround.id = 'ground';
    cdGround.maxCollision = 256 * 256 * 256;
    sm.addCollisionData(cdGround);

    sm.initDrawableScene();
    var width = document.getElementById('canvas-div').clientWidth;
    //console.log(width);
    var height = window.innerHeight - document.getElementById('canvas-div').getBoundingClientRect().top ;
    height -= 20; //ajuste de margem e footer
    sm.sb.renderer.setSize(width, height);
    var hellper = new THREE.GridHelper(500, 15);
    hellper.position.y+= 10;
    sm.sb.scene.add(new THREE.GridHelper(500, 15));

    var grid = new THREE.GridHelper(300,15);
    grid.rotation.x = Math.PI/2;
    //sm.sb.scene.add(grid);
    sm.sb.camera.position.set(2, 30, 170);

    //$('#stats').remove();
    $('#stats').hide();
    sm.sb.update();

    atualizaImgaemGravidade(document.getElementById('listGravidades').value);
    //console.log("Gravidade: "+document.getElementById('listGravidades').value);

    input = document.getElementById("fieldAngulo");
    input.addEventListener("keyup",onKeyPress);
    document.addEventListener('keypress',whatKey);
    $("#altGravidade").prop('disabled', true);
    $("#btnTutorial").prop('disabled', true);
    $("#btnDispara").prop('disabled', true);
    $("#btnConfig").prop('disabled', true);

    var img = document.getElementById("gravidade");
    var g = BD.Gravidades["TERRA"];

    img.src = g.caminho;
    $(img).attr('html', true);
    $(img).attr('data-original-title', g.id +": "+ g.valor.gravity.y*-1+" m/s&sup2;");

    var field = "camera";

    document.getElementById(field+"X").value = sm.sb.camera.position.x.toFixed(2);
    document.getElementById(field+"Y").value = sm.sb.camera.position.y.toFixed(2);
    document.getElementById(field+"Z").value = sm.sb.camera.position.z.toFixed(2);
    var _showFPS = document.getElementById('showFPS').checked;
    if(_showFPS){
        $('#stats').show( "fast" );
    }else{
        $('#stats').hide();
    }

    isDesenhaTrajetoria = document.getElementById('desenhaTrajetoria').checked;
    //console.log("Desenha: "+isDesenhaTrajetoria);

    console.log("Inicializou!!!");
    //Implementação para o tutorial:
    sm.simulation.contactListener = function (data) {
        //console.log("Colidiu!!!");
        colisions++;
        if(tutorialLigado && colisions === 0){
            setTimeout(function(){
                console.log("Delay...");
                changeAngleS2();
            },2500);
        }
    };
    //
}


function whatKey(event){
    if(!tutorialLigado) {
        switch (event.which) {
            case 65:
            case 97:
                cannon.baseMesh.position.x -= 1;
                cannon.BasetubeMesh.position.x -= 1;
                cannon.tubeMesh.position.x -= 1;
                break;
            case 68:
            case 100:
                cannon.baseMesh.position.x += 1;
                cannon.BasetubeMesh.position.x += 1;
                cannon.tubeMesh.position.x += 1;
                break;
            case 87:
            case 119:
                incAngle();
                break;
            case 83:
            case 115:
                decAngle();
                break;
        }
    }
}

function onKeyPress(event){
    //console.log(input.value);
    exception(input.value);
    rotacionarCanhao(input.value);
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
    for(var g in BD.Gravidades){
        g = BD.Gravidades[g];
        sm.addForce(g.valor);
        //console.log(g);
    }

   var gValue = BD.Gravidades["TERRA"];
    //console.log(gValue.id);
    gravidade = gValue.valor;
    //sm.addForce(gravidade);

    //target = new BD.Target(sm.sb.scene, new THREE.Vector3(50, 30, -50),30, "Cubo");
    //bindTargetCube(target.alvo,target.tamanho);

    cannon = new BD.Cannon(sm.sb.scene, new THREE.Vector3(-150, 0, -50));
    //cannon.angle = 45;
    // desenha o canhao
    cannon.draw();
    criaAlvoDeEsfera();
    rotacionarCanhao(input.value);
    sm.sb.update();

    $("#altGravidade").prop('disabled', false);
    $("#btnTutorial").prop('disabled', false);
    $("#btnDispara").prop('disabled', false);
    $("#btnConfig").prop('disabled', false);

    sm.bindAll();
    //console.log("Executou o bindAll");
};
//Cria uma Parede de esfera:
function criaAlvoDeEsfera(){
    var tamanhoMax = 5;
    var posPintar = new THREE.Vector2(parseInt(tamanhoMax/2),parseInt(tamanhoMax/2));
    var posAnterior = new THREE.Vector2();
    var chegouMeio = false;
    var tamanhoEsfera = 4;

    posAnterior.x = -70;
    posAnterior.y = 60;

    for(var i =0; i<tamanhoMax; i++) {
        for (var j = 0; j < tamanhoMax; j++) {
            var geometry = new THREE.SphereGeometry(tamanhoEsfera, 16, 32);
            if((posPintar.x ===j || posPintar.y ==j)|| i=== parseInt(tamanhoMax/2) && j === parseInt(tamanhoMax/2)){
                var material = new THREE.MeshLambertMaterial({color: 0x0FF0000});
                //console.log("Entrou Aqui!!!");
            }else {
                var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
            }

            var sphere = new THREE.Mesh(geometry, material);
            sphere.position.z = posAnterior.x;
            sphere.position.y = posAnterior.y;
            //console.log(posAnterior.x);
            posAnterior.x += tamanhoEsfera*2;
            sm.sb.scene.add(sphere);
            sm.sb.update();
            sphere.matrixAutoUpdate = false;
            bindBallsTarget(sphere,tamanhoEsfera);
        }
        posAnterior.y-=tamanhoEsfera*2;
        posAnterior.x = -70;
        if(!chegouMeio) {
            posPintar.x--;
            posPintar.y++;
        }else{
            posPintar.x++;
            posPintar.y--;
        }
        if(posPintar.x ===0){
            chegouMeio = true;
        }
    }
}

function bindBallsTarget(mesh, tamanho){
    rb_target = new HEFESTO.RigidBody(undefined);
    rb_target.radius = tamanho;
    rb_target.canSleep = false;
    rb_target.position = new THREE.Vector3(mesh.position.x,mesh.position.y,mesh.position.z);
    rb_target.linearDamping = 0.8;
    rb_target.angularDamping = 0.95;
    //(4 * Math.PI * (r * r * r)) / 3;
    rb_target.mass = ((4 * Math.PI * (tamanho * tamanho * tamanho)) / 3)*BD.MaterialProjetil.FERRO.densidade;
    rb_target.useWorldForces = false;
    rb_target.velocity = new THREE.Vector3(0,0,0);
    rb_target.acceleration = new THREE.Vector3(0,0,0);
    var tensor = getInertiaTensorCoeffs(rb_target.mass);
    rb_target.inertiaTensor.set(tensor.elements[0], tensor.elements[1], tensor.elements[2], tensor.elements[3], tensor.elements[4], tensor.elements[5], tensor.elements[6], tensor.elements[7], tensor.elements[8]);
    rb_target.bindContactData = true;
    rb_target.ignoreIntegration = true;
    sm.addBody(rb_target,true);

    rb_target.mesh = mesh;
}

sm.justDraw = function() {

    if (cannon) {
        cannon.rotateAround(new THREE.Vector3(0, 1, 0), Math.PI * 50);
        sm.sb.scene.add(cannon.tubeMesh);
    }

    //console.log("Entrou Aqui JustDraw!!!");
};

var angleAterior = 0;
function rotacionarCanhao(angle){
    //cannon.rotateAround(new THREE.Vector3(2, 2, 0), Math.PI * 20);
    //cannon.tubeMesh.rotation.y = 0;
    //cannon.tubeMesh.rotation.y = 45 * Math.PI / 180;
    //cannon.tubeMesh.rotation.y = 0;
    //GAMU.positionMesh(cannon.tubeMesh, cannon.tubeMesh.position, new THREE.Vector3(0, -90 *Math.PI/180, 0));

    if(angle > 90){
        angle = 90;
        $("#fieldAngulo").val(90);
    }else{
        if(angle < -10){
            angle = -10;
            $("#fieldAngulo").val("-10");
        }
    }

    var newAngle = angle - angleAterior;

    //console.log(cannon.tubeMesh.matrix);
    cannon.rotateAround( new THREE.Vector3(1, 0, 0), newAngle * Math.PI/180);
    //cannon.tubeMesh.matrix.makeRotationY(90 * Math.PI / 180);
    //cannon.tubeMesh.updateMatrix();
    angleAterior = angle;
    /**
    var axis = new THREE.Vector3(1, 0, 0);
    var radians = 90 * Math.PI / 180;
    var rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    cannon.tubeMesh.matrix.multiply(rotObjectMatrix);

    cannon.tubeMesh.rotation.setFromRotationMatrix(cannon.tubeMesh.matrix);
    **/
    //console.log("Tubo: "+cannon.tubeMesh.rotation.y);
    //console.log("Rotacionou!!!!");
}

function incAngle(){
    var inputAngle = document.getElementById('fieldAngulo');
    var angle = parseFloat(inputAngle.value);

    angle+=incDecAngle;

    rotacionarCanhao(angle);

    inputAngle.value = angle;
}

function decAngle(){
    var inputAngle = document.getElementById('fieldAngulo');
    var angle = parseFloat(inputAngle.value);

    angle-=incDecAngle;
    rotacionarCanhao(angle-incDecAngle);

    inputAngle.value = angle;
}

function updateConfig(_id){
    var id = _id;
    var _incDecAngle = parseFloat(document.getElementById('inc').value);
    exception(_incDecAngle);
    incDecAngle = _incDecAngle;
    var _showFPS = document.getElementById('showFPS').checked;
    if(_showFPS){
        $('#stats').show( "fast" );
    }else{
        $('#stats').hide();
    }
    isDesenhaTrajetoria = document.getElementById('desenhaTrajetoria').checked;
    var field = "camera";
    var posCamera = new THREE.Vector3(parseFloat(document.getElementById(field+'X').value),parseFloat(document.getElementById(field+'Y').value),parseFloat(document.getElementById(field+'Z').value));
    //console.log(posCamera);
    sm.sb.camera.position.set(posCamera.x,posCamera.y,posCamera.z);
    //console.log("Show FPS: "+_showFPS);
    $("#"+id).modal('toggle');

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
};


function createCanonBall() {
    try {
        var angle = document.getElementById('fieldAngulo').value;
        if (angle) {
            cannon.angle = angleAterior;
            exception(angleAterior);
            //console.log("Angulo Atual: "+angleAterior);
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
        color = new THREE.Color( vectorColors[Math.floor((Math.random() * vectorColors.length))]); //0xffffff * (800 * Math.random() - 400 * Math.random());
        bindBall(mesh);
    }catch(e){
        alert(e);
    }
}
var rb;
var pComR = false;
var deltaS = 2;
//var linear = 1.0199988;
//var linear = 1.019999999;
//var linear = 1.789;
var linear = 1;
var angular = 0.05;
function bindBall(mesh){
    try {
        rb = new HEFESTO.RigidBody(undefined);
        rb.radius = 5;
        rb.canSleep = false;
        var pos = cannon.determineProjetilPosition();
        rb.position = new THREE.Vector3(pos.x, pos.y, pos.z);
        //rb.velocity = new THREE.Vector3();
        rb.linearDamping = linear;
        rb.angularDamping = angular;

        /** volume / massa */
        var r = rb.radius * 0.15;
        var volume = (4 * Math.PI * (r * r * r)) / 3;
        rb.mass = volume * materialType.densidade;
        rb.useWorldForces = false;

        /** aceleracao dada pela lei de hooke F = K . x  e pelo angulo */
        //rb.velocity = new THREE.Vector3(cannon.determineAngleVelocityVector().x, cannon.determineAngleVelocityVector().y, 0);
        //console.log(rb.velocity);
        var K = document.getElementById('fieldK').value;
        exception(K);
        var x = document.getElementById('fieldX').value;
        exception(x);
        //lei de hooke F = K . x;
        //K = K / 100;
        var fel = K * x;
        //console.log("Massa: "+rb.mass);
        //console.log("Fel = "+ fel);

        //Forca peso: P = m * g
        var P = (rb.mass * (gravidade.gravity.y)*-1);
        //console.log("P=" +P+" m="+rb.mass +"g="+(gravidade.gravity.y)*-1);
        //Psen de alfa:
        //var pSen = pComR ? P*Math.sin(cannon.angle): P*Math.sin(cannon.angle* Math.PI / 180);
        var pSen = P*Math.sin(cannon.angle* Math.PI / 180);
        //console.log("P seno de Alfa: "+pSen);

        // aceleracao = f / m
        var ac = (fel - pSen) / rb.mass;
        //console.log("Aceleração: "+ac);

        var velocidadeDeLancamento = Math.sqrt((2*ac)*deltaS);
        console.log("Velocidade: "+velocidadeDeLancamento);
        //aplica sobre a aceleracao baseada no angulo
        //rb.acceleration.x += ac;
        //rb.acceleration.y += aceleracao;
        /** velocidade dada pelo angulo */
        rb.velocity = new THREE.Vector3(cannon.determineAngleVelocityVector(velocidadeDeLancamento).x, cannon.determineAngleVelocityVector(velocidadeDeLancamento).y, 0);
        //console.log("VelX: "+cannon.determineAngleVelocityVector(velocidadeDeLancamento).x);
        //console.log("VelY: "+cannon.determineAngleVelocityVector(velocidadeDeLancamento).y);

        var tensor = getInertiaTensorCoeffs(rb.mass);
        rb.inertiaTensor.set(tensor.elements[0], tensor.elements[1], tensor.elements[2], tensor.elements[3], tensor.elements[4], tensor.elements[5], tensor.elements[6], tensor.elements[7], tensor.elements[8]);

        sm.addBody(rb, true);
        //alert('Corpo Rï¿½gido criado com sucesso!')

        rb.mesh = mesh;

        listCannonBall[listCannonBall.length] = rb;

        var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE, cdGround, rb, null);
        sm.addCollision(collisionGround, true);

        //var collisionAll = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_SPHERE, cdGround, rb_target, rb);
        //var collisionAll = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_SPHERE, cdGround, rb_target, rb);
        var collisionAll = new HEFESTO.Collision(HEFESTO.CollisionType.ALL, cdGround, rb, null);
        sm.addCollision(collisionAll, true);
        addLista(velocidadeDeLancamento);
        //console.log(rb);
            sm.simulation.addForceToBody(gravidade, rb);
        //Implementações para o tutorial:
        if (tutorialLigado && option === "2" && passada > 0) {
            setTimeout(function () {
                $("#fieldK").prop('disabled', false);
                $("#fieldX").prop('disabled', false);

                passada--;
            }, 2500);
            auxF = fel;
        }

        if (tutorialLigado && auxF != fel && option === "2") {
            setTimeout(function () {
                console.log("Delay...");
                nextStep();
            }, 2500);
            passada = 1;
        }

        if (tutorialLigado && option === "3" && passada > 0) {
            setTimeout(function () {
                ativaImagens();
            }, 2500);
            auxMaterial = materialType;
            passada--;
        }

        if (tutorialLigado && option === "3" && materialType !== auxMaterial) {
            setTimeout(function () {
                ativaImagens();
                nextStep();
            }, 2500);
            passada = 1;
        }

        if (tutorialLigado && passada > 0 && option === "4") {
            auxGravidade = gravidade.gravity.y;
            console.log(auxGravidade + " Gravidade" + gravidade.y);
            passada--;
            setTimeout(function () {
                alteraGravidade2();
                console.log("Delay...");
            }, 2500);
        }

        if (tutorialLigado && auxGravidade !== gravidade.gravity.y && passada <= 0 && option === "4") {
            auxGravidade = gravidade.y;
            passada = 1;
            console.log("Entrou na segunda...");
            setTimeout(function () {
                doneStep("Agora voc&ecirc; acabou de ver o que aconte quando altera a agravidade.");
                console.log("Delay...");
            }, 2500);
        }//Fim das implementações para o tutorial.
    }catch(e){
        alert(e);
    }
}
//Fazendo o canhão lançar cubos com o alvo para vaer se dava Error
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
        //alert('Corpo Rï¿½gido criado com sucesso!')

        rb.mesh = mesh;

        var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_HALFSPACE, cdGround, rb, null);
        sm.addCollision(collisionGround, true);

        var collisionAll = new HEFESTO.Collision(HEFESTO.CollisionType.BOX_AND_BOX, cdGround, rb, rb_target);
        sm.addCollision(collisionAll, true);

        //console.log(rb);

        //sm.simulation.addForceToBody(gravidade,rb);
        //Implementações para o tutorial:
        if (tutorialLigado && option === "2" && passada > 0) {
            setTimeout(function () {
                $("#fieldK").prop('disabled', false);
                $("#fieldX").prop('disabled', false);

                passada--;
            }, 2500);
            auxF = f;
        }

        if (tutorialLigado && auxF != f && option === "2") {
            setTimeout(function () {
                console.log("Delay...");
                nextStep();
            }, 2500);
            passada = 1;
        }

        if (tutorialLigado && option === "3" && passada > 0) {
            setTimeout(function () {
                ativaImagens();
            }, 2500);
            auxMaterial = materialType;
            passada--;
        }

        if (tutorialLigado && option === "3" && materialType !== auxMaterial) {
            setTimeout(function () {
                ativaImagens();
                nextStep();
            }, 2500);
            passada = 1;
        }

        if (tutorialLigado && passada > 0 && option === "4") {
            auxGravidade = gravidade.gravity.y;
            console.log(auxGravidade + " Gravidade" + gravidade.y);
            passada--
            setTimeout(function () {
                alteraGravidade2();
                console.log("Delay...");
            }, 2500);
        }

        if (tutorialLigado && auxGravidade !== gravidade.gravity.y && passada <= 0 && option === "4") {
            auxGravidade = gravidade.y;
            passada = 1;
            console.log("Entrou na segunda...");
            setTimeout(function () {
                doneStep("Agora voc&ecirc; acabou de ver o que aconte quando altera a agravidade.");
                console.log("Delay...");
            }, 2500);
        }//Fim das implementações para o tutorial.
    }catch(e){
        alert(e);
    }

}

function changeForce(){
    var img = document.getElementById("gravidade");
    var g = BD.Gravidades[document.getElementById("listGravidades").value];

    //sm.simulation.removeForce(gravidade);
    gravidade = g.valor;
    img.src = g.caminho;
    //img.title = g.id +": "+ g.valor+"m/s&sup2;";
    $(img).attr('html', true);
    $(img).attr('data-original-title', g.id +": "+ g.valor.gravity.y*-1+" m/s&sup2;");
    //sm.simulation.bindForce(gravidade);

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
    valorGravidade.innerHTML ='<h5 class="text-modal">Gravidade: '+ valor.valor.gravity.y*-1+' m/s&sup2;</h5>'
}

function exception(value){
    if(isNaN(value)){
        throw "ERROR: Valor inv&aacute;lido encontrado."
    }
}

function desenhaTrajetoria(mesh){
    if(posAnt.x !== mesh.position.x || posAnt.y !== mesh.position.y || posAnt.z !== mesh.position.z) {
        /**setTimeout(function () {
                    desenhaCirculo(mesh)
                    console.log("Desenha Trajetoria");
                }, 3000);*/
        if( Math.abs(posAntDes.x-mesh.position.x)>5 || Math.abs(posAntDes.y-mesh.position.y)>5 || Math.abs(posAntDes.z-mesh.position.z)>5){
            desenhaCirculo(mesh);
            //console.log("Desenha Trajetoria");
            posAntDes.x = mesh.position.x;
            posAntDes.y = mesh.position.y;
            posAntDes.z = mesh.position.z;
        }
        posAnt.x = mesh.position.x;
        posAnt.y = mesh.position.y;
        posAnt.z = mesh.position.z;
    }

}

var desenhaCirculo = function(mesh) {
    var material = new THREE.MeshBasicMaterial({
        color: color
    });

    //console.log("Color: " + material.color.getStyle());

    material.side = THREE.DoubleSide;

    var radius = 1;
    var segments = 32;

    var circleGeometry = new THREE.CircleGeometry(radius, segments);
    var circle = new THREE.Mesh(circleGeometry, material);
    circle.position.set(mesh.position.x,mesh.position.y,mesh.position.z);
    listCircle[listCircle.length]= circle;
    sm.sb.scene.add(circle);
};

function addLista(velocidade){
    var list = document.getElementById("list");
    var divPricial = document.createElement('div');
    var r = 255;
    var divMaterial = document.createElement('div');
    var paragraph = document.createElement('p');
    paragraph.innerHTML= materialType.id;
    //$(paragraph).attr('rel', "tooltip");
    $(divPricial).popover({
        placement: 'left',
        html: true,
        content : 'Velocidade: '+ velocidade.toFixed(2)+  '<br> Velocidade<sub>x</sub>: '+rb.velocity.x.toFixed(2)+'<br> Velocidade<sub>y</sub>: '+rb.velocity.y.toFixed(2)+'<br>&Acirc;ngulo: '+cannon.angle+'&deg',
        trigger: 'hover'
    });
    //divMaterial.innerHTML="<p>"+materialType.id+"</p>";
    divMaterial.appendChild(paragraph);
    divMaterial.style.width = "156px";
    divMaterial.style.marginRight = "10px"
    //divMaterial.className = "col-xs-3";
    divPricial.appendChild(divMaterial);
    var divCor = document.createElement('div');
    //divCor.style.backgroundColor = "rgb("+r+",0,0)";
    $( divCor ).css( "background-color", color.getStyle() );
    //console.log(color.getStyle()+"  "+ divCor.style.backgroundColor);
    divCor.style.width = "25px";
    divCor.style.height = "5px";
    divCor.style.position = "relative";
    divCor.style.top = "-22px";
    divCor.style.marginLeft = "100px";
    //divCor.className = "col-xs-3";

    divPricial.appendChild(divCor);

    $(list).append(divPricial);
    //console.log("Adicionou!!!");
}

function removeTrajetorias(){
    for(var i = 0; i < listCircle.length; i++){
        sm.sb.scene.remove(listCircle[i]);
    }
    listCircle = [];
}

function removeCannonBalls(){
    for(var i = 0; i<listCannonBall.length; i++){
        sm.sb.scene.remove(listCannonBall[i].mesh);
        sm.simulation.removeRigidBody(listCannonBall[i]);
    }

    listCannonBall = [];
}

function resetSimulation(){
    sm.sb.camera.position.set(1.90, 28.50, 161.50);
    var list = document.getElementById("list");
    list.innerHTML = "<div style='margin-bottom: 25px;'>"+
    "<button class='btn btn-aula' type='button' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample' style='position: absolute; top: 0px; right: 0px; margin: 10px'>"+
        "<span class='glyphicon glyphicon-chevron-up'></span>"+
        "</button>"+
       "</div>";

    var field = "camera";

    document.getElementById(field+"X").value = sm.sb.camera.position.x.toFixed(2);
    document.getElementById(field+"Y").value = sm.sb.camera.position.y.toFixed(2);
    document.getElementById(field+"Z").value = sm.sb.camera.position.z.toFixed(2);
    removeTrajetorias();
    removeCannonBalls();

}