window.onload = inicializa;
var cena;
var renderer;
var camera;
var container;
var stats;
var controls;
var cube;
var cannon;
var play = true;

//Física
var simulation;
var timming;

//Colisões:
var cdGround = new HEFESTO.CollisionData(0.9, 0.9, 0.1);
cdGround.id = 'cdGround';
cdGround.maxCollision = 256 * 256;

var cdEsfera_Cubo = new HEFESTO.CollisionData(0.16, 0.6, 0.01);
cdEsfera_Cubo.id = 'cdEsfera_Cubo';
cdEsfera_Cubo.maxCollision = 256 * 256;

var cdEsfera_Alvo = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdEsfera_Alvo.id = 'cdEsfera_Alvo';
cdEsfera_Alvo.maxCollision = 256 * 256;

function  inicializa() {
    simulation = new HEFESTO.Simulation();


    simulation.contactListener = function (data) {
        console.log("Alvo Atingido!");
    };

    simulation.rigidBodyDataListener = function (body) {
        console.log(body.position);

    };
    //console.log(simulation.rigidBodyDataListener);
    timming = new HEFESTO.Timming();

    simulation.init();
    continueInitilization();
}
function continueInitilization() {
    if (!simulation.isBusy()) {

        adicionacd();
        carregaCena();
        timming.start();
        timming.update();
        renderiza();
    } else {
        requestAnimationFrame(continueInitilization);
    }
}

function carregaCena() {
    cena = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000000);
    camera.position.z = 255.27790796507247;
    camera.position.y = 223.994074554937;
    camera.position.x = -467.3143619063365;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    container = document.getElementById('container');
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0xFFFFFF);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    cena.add(new THREE.AxisHelper(1500));
    cena.add(new THREE.GridHelper(750, 15));

    var baseGeometry = new THREE.BoxGeometry(1500, 1, 1500);
    var baseMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00, transparent: true, opacity: 0.2});
    var base = new THREE.Mesh(baseGeometry, baseMaterial);

    cena.add(base);
    var pointLight = new THREE.PointLight(0xFFFFFF);
    //pointLight.position.set(10, 10, 50);
    cena.add(pointLight);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);


    cannon = new GAMU.Cannon(cena);
    cannon.angle = 0;
    cannon.initialVelocity = 800;
    cannon.position = new THREE.Vector3(-200, 0, -200);
    cannon.build();
    window.addEventListener('keydown', whatkey);

    var target = new GAMU.Target(cena, 60);
    target.position = new THREE.Vector3(600, 60, 0);
    target.build();

    var posAux = new THREE.Vector3(target.position.x, target.position.y, target.position.z);

    posAux.x += 30;


    var geometry = new THREE.BoxGeometry(60, 120, 120);
    var material = new THREE.MeshBasicMaterial({color: 0x000000, transparent: true, opacity: 0.2});
    cube = new THREE.Mesh(geometry, material);
    GAMU.positionMesh(cube, posAux, new THREE.Vector3());
    cube.matrixAutoUpdate = false;
    console.log(cube.matrixAutoUpdate);
    cena.add(cube);

    var rb_target = new HEFESTO.RigidBody(cube);
    rb_target.ignoreIntegration = true;
    rb_target.bindContactData = true;
    rb_target.mass = 4000;
    rb_target.inertiaTensor.set(960000.0381469727, -0.0, -0.0, -0.0, 960000.0381469727, -0.0, -0.0, -0.0, 960000.0381469727);
    rb_target.halfSize = new THREE.Vector3(30, 60, 60);
    simulation.bindRigidBody(rb_target);

    //criaBola();
    createCannonBall(cannon);

}
var rb2;
function criaBola() {
    var geometryBall = new THREE.SphereGeometry(30, 32, 16);
    var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, shading: THREE.SmoothShading});
    var mesh = new THREE.Mesh(geometryBall, material);
    //GAMU.positionMesh(mesh, position, new THREE.Vector3());
    mesh.position.y = 30;
    mesh.position.x = -30;
    mesh.position.z = -30;
    cena.add(mesh);
    mesh.matrixAutoUpdate = false;
    rb2 = new HEFESTO.RigidBody(mesh);
    rb2.bindContactData = true;
    rb2.canSleep = false;
    rb2.mass = 200;
    rb2.ignoreIntegration = true;
    rb2.aceleration.y = -100.0;
    if (parseInt((Math.random() * 100), 10) % 2 == 0) {
        rb2.rotation.x = 0.4;
    } else {
        rb2.rotation.z = 0.4;
    }

    rb2.orientation.r = 1;
    rb2.inertiaTensor.set(5360957.0, -0.0, -0.0, -0.0, 5360957.0, -0.0, -0.0, -0.0, 5360957.0);
    rb2.linearDamping = 0.95;
    rb2.angularDamping = 0.8;
    rb2.radius = 30;
    simulation.bindRigidBody(rb2);
    //Adiciona Colisão   
    var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.ALL, cdGround, rb2, null);
    simulation.bindCollision(collisionGround);

    console.log("Passou aqui!");
    //console.log(rb2.position);
}

function adicionacd() {
    simulation.bindCollisionData(cdGround);
    simulation.bindCollisionData(cdEsfera_Cubo);
    simulation.bindCollisionData(cdEsfera_Alvo);
}

function renderiza() {
    requestAnimationFrame(renderiza);
    if (!simulation.isBusy()) {
        if (play === true) {
            //simulation.getRigidBodyData('all');
            //console.log(rb2.position);
            simulation.integrate(timming.getLastFrameDuration() * 0.001);
        }
        renderer.render(cena, camera);
        stats.update();
        timming.update();
        controls.update();
    }
}

function playPausa(valor) {
    play = valor;
}

function whatkey(event) {

    switch (event.keyCode) {
        case 32:
            //console.log('Entrou Aqui');
            createCannonBall(cannon);
            break;
        case 66:
            console.log(camera.position);
            break;
    }
}
var createCannonBall = function (cannon) {
    var cannonBall = new GAMU.CannonBall(cannon);
    cannonBall.ballMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, shading: THREE.SmoothShading});

    var cannonBallMesh = cannonBall.build();
    cena.add(cannonBallMesh);

    var velocity = cannon.determineVelocityVector();

    bindCannonBall(cannonBall, velocity);
};

var bindCannonBall = function (cannonBall, velocity) {
    var rb = new HEFESTO.RigidBody(cannonBall.mesh);
    //rb.bindContactData = true;
    rb.radius = cannonBall.radius;

    rb.mass = 200;

    rb.velocity.x = velocity.x;
    rb.velocity.y = velocity.y;
    rb.velocity.z = 250;
//tirando essa linha a bola repate mas sai voando.
    rb.acceleration.y = -100.0;
    //rb.aceleration.z = 250;


    rb.inertiaTensor.set(5360957.0, -0.0, -0.0, -0.0, 5360957.0, -0.0, -0.0, -0.0, 5360957.0);
    rb.linearDamping = 0.99;
    rb.angularDamping = 0.8;

    simulation.bindRigidBody(rb);

    bindGroundCollision(rb);
    bindCollisionWithAll(rb);


};

var bindGroundCollision = function (rb) {
    var collision = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE, cdGround, rb, null);

    simulation.bindCollision(collision);

    //rb.__baseCollision = collision;
};

var bindCollisionWithAll = function (rb) {
    var collision2 = new HEFESTO.Collision(HEFESTO.CollisionType.ALL, cdEsfera_Alvo, rb, null);

    simulation.bindCollision(collision2);
};
