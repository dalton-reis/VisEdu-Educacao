function teste() {
    var cdGround = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
    cdGround.id = 'padrao';
    cdGround.maxCollision = 256 * 256;

    var simulation = new HEFESTO.Simulation();
    var timming = new HEFESTO.Timming();

    $(function () {
        WINDOW.initialize();

        DEMO.initialize('canvas-3d');

        simulation.init();

        continueInitilization();
    });

    function continueInitilization() {
        if (!simulation.isBusy()) {
            simulation.bindCollisionData(cdGround);
            initializeScene();

            DEMO._camera.position.set(25, 300, 800);

            WINDOW.resizeCallback = function (inWidth, inHeight) {
                DEMO.resize(inWidth, inHeight);
            };
            DEMO.resize(WINDOW.ms_Width, WINDOW.ms_Height);

            timming.start();
            timming.update();
            mainLoop();
        } else {
            requestAnimationFrame(continueInitilization);
        }
    }

    function mainLoop() {
        requestAnimationFrame(mainLoop);
        if (!simulation.isBusy()) {
            simulation.integrate(timming.getLastFrameDuration() * 0.001);

            DEMO.update();
            DEMO._stats.update();
            timming.update();
        }
    }
    ;

    function initializeScene() {
        var base = new GAMU.Base(1500, 1, 1500);
        base.material = new THREE.MeshBasicMaterial({color: 0xf0400a, transparent: true, opacity: 0.2});
        var baseMesh = base.build();
        DEMO._scene.add(baseMesh);

        createBall(100, 100, 100);
    }
    ;

    //Cria a esfera
    var geometryBall = new THREE.SphereGeometry(20, 32, 16);
    function createBall(x, y, z) {
        var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, shading: THREE.SmoothShading});

        var mesh = new THREE.Mesh(geometryBall, material);

        var position = new THREE.Vector3(100, 100, 100);

        GAMU.positionMesh(mesh, position, new THREE.Vector3());
        DEMO._scene.add(mesh);

        mesh.matrixAutoUpdate = false;

        var rb = new HEFESTO.RigidBody(mesh);
        rb.radius = 20;

        rb.canSleep = false;
        rb.inverseMass = 200;
        rb.aceleration.y = -100.0;


        if (parseInt((Math.random() * 100), 10) % 2 == 0) {
            rb.rotation.x = 0.4;
        } else {
            rb.rotation.z = 0.4;
        }

        rb.orientation.r = 1;

        rb.inertiaTensor.set(5360957.0, -0.0, -0.0, -0.0, 5360957.0, -0.0, -0.0, -0.0, 5360957.0);
        rb.linearDamping = 0.95;
        rb.angularDamping = 0.8;

        simulation.bindRigidBody(rb);

        //Adiciona Colisão    
        var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE, cdGround, rb, null);
        simulation.bindCollision(collisionGround);
    }
    ;
}