window.onload = Carrega;

var cena;
var camera;
var controls;
var renderer;
var container;
var mouse = new THREE.Vector2();
var indice = 0;
var listaDeObjetos = new Array(); // ciando um vetor sem tamanho
var listaEfera = [];
var objetoSelecionado = undefined;
var offset = new THREE.Vector3();
var objetoAtual, setObjeto;
var listaTamanhos = new Array();
var listaMaterial = new Array();
var listaMassas = new Array();
var stats;
var base;
//Fisíca:
var simulation = new HEFESTO.Simulation();
var timming = new HEFESTO.Timming();

//Colisões:
//Base
var cdGround = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdGround.id = 'padrao';
cdGround.maxCollision = 256 * 256;
//Madeira
var cdMadeira_Madeira = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdMadeira_Metal = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdMadeira_Borracha = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdMadeira_Plastico = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
//Metal
var cdMetal_Madeira = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdMetal_Metal = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdMetal_Borracha = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdMetal_Plastico = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
//Borracha
var cdBorracha_Madeira = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdBorracha_Metal = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdBorracha_Borracha = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdBorracha_Plastico = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
//Plástico
var cdPlastico_Madeira = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdPlastico_Metal = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdPlastico_Borracha = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
var cdPlastico_Plastico = new HEFESTO.CollisionData(0.9, 0.9, 0.01);



function Carrega() {
    inicializa();
    renderiza();
    adicionacd();
    posicaCamera();
}


function  inicializa() {

    simulation.init();

    cena = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //movimentar a camera
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    container = document.getElementById('container');
    //alert(container);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setClearColor(0xFFFFFF);


    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(10, 10, 50);
    cena.add(pointLight);
    //camera.position.set(posicao[0],posicao[1],posicao[3]);
    camera.position.z = 20;
    camera.position.y = 23;
    camera.position.x = 20;

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cena.add(new THREE.AxisHelper(300));
    cena.add(new THREE.GridHelper(150, 15));

    renderer.domElement.addEventListener('mousedown', onDocumentMouseDown);

    renderer.domElement.addEventListener("mousemove", onDocumentMouseMove);

    renderer.domElement.addEventListener('mouseup', onDocumentMouseUP);

    projector = new THREE.Projector();
    plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 8, 8), new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.25, transparent: true, wireframe: true}));
    plane.visible = false;
    cena.add(plane);
    // var geometriBase = new THREE.BoxGeometry(150, 1, 150);
    //var materialBase = new THREE.MeshBasicMaterial({color: 0X0000FF});
    //base = new THREE.Mesh(geometriBase, materialBase);
    //base.rotation.x = -2;
    //cena.add(base);

    var base = new GAMU.Base(300, 1, 300);
    base.material = new THREE.MeshBasicMaterial({color: 0xf0400a, transparent: true, opacity: 0.2});
    var baseMesh = base.build();
    cena.add(baseMesh);
    //


    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

}

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

function adicionacd() {
    simulation.bindCollisionData(cdGround);

    simulation.bindCollisionData(cdMadeira_Madeira);
    simulation.bindCollisionData(cdMadeira_Metal);
    simulation.bindCollisionData(cdMadeira_Borracha);
    simulation.bindCollisionData(cdMadeira_Plastico);

    simulation.bindCollisionData(cdMetal_Madeira);
    simulation.bindCollisionData(cdMetal_Metal);
    simulation.bindCollisionData(cdMetal_Borracha);
    simulation.bindCollisionData(cdMetal_Plastico);

    simulation.bindCollisionData(cdBorracha_Madeira);
    simulation.bindCollisionData(cdBorracha_Metal);
    simulation.bindCollisionData(cdBorracha_Borracha);
    simulation.bindCollisionData(cdBorracha_Plastico);

    simulation.bindCollisionData(cdPlastico_Madeira);
    simulation.bindCollisionData(cdPlastico_Metal);
    simulation.bindCollisionData(cdPlastico_Borracha);
    simulation.bindCollisionData(cdPlastico_Plastico);
}

function renderiza() {
    controls.update();
    requestAnimationFrame(renderiza);
    renderer.render(cena, camera);
    stats.update();
}

function posicaCamera() {
    var x, y, z;

    x = document.getElementById("posCamX");
    x.innerHTML = 'Camera X: ' + (camera.position.x).toFixed(2);

    y = document.getElementById("posCamY");
    y.innerHTML = 'Camera Y: ' + (camera.position.y).toFixed(2);

    z = document.getElementById("posCamZ");
    z.innerHTML = 'Camera Z: ' + (camera.position.z).toFixed(2);
}

function criarObjeto(_objeto) {
    var objeto = _objeto;

    switch (objeto) {
        case "Esfera":
        {
            try {
                if (document.getElementById("MassaEsfera").value === "" || document.getElementById("MassaEsfera").value <= 0) {
                    alert("O valor da da massa não pode ser vazio nem menor que zero!");
                } else {
                    objetoAtual = new Objeto(parseInt(document.getElementById("Raio").value), document.getElementById("MaterialEsfera").value, indice);
                    objetoAtual.criaEsfera();
                    listaTamanhos[indice] = (objetoAtual.getTamanho());
                    listaMaterial[indice] = (objetoAtual.getMaterial());
                    listaMassas[indice] = document.getElementById("MassaCubo").value + " Kg";
                    document.getElementById("listaObjetos").appendChild(objetoAtual.getDiv());
                    indice++;
                }
            } catch (e) {
                alert(e);
            }
            break;
        }
        case "Caixa":
        {
            try {
                if (document.getElementById("MassaCubo").value === "" || document.getElementById("MassaCubo").value <= 0) {
                    alert("O valor da da massa não pode ser vazio nem menor que zero!");
                } else {
                    objetoAtual = new Objeto(document.getElementById("TamanhoCubo").value, document.getElementById("MaterialCubo").value, indice);
                    objetoAtual.criaCubo();
                    listaTamanhos[indice] = (objetoAtual.getTamanho());
                    listaMaterial[indice] = (objetoAtual.getMaterial());
                    listaMassas[indice] = document.getElementById("MassaCubo").value + " Kg";
                    document.getElementById("listaObjetos").appendChild(objetoAtual.getDiv());
                    indice++;
                }
            } catch (e) {
                alert(e);
            }
            break;
        }
        case "Alvo":
        {
            try {
                objetoAtual = new Objeto(document.getElementById("TamanhoAlvo").value, null, indice);
                objetoAtual.criarAlvo();
                listaTamanhos[indice] = (objetoAtual.getTamanho());
                listaMaterial[indice] = ("Nenhum");
                listaMassas[indice] = "00.00Kg";
                document.getElementById("listaObjetos").appendChild(objetoAtual.getDiv());
                indice++;
            } catch (e) {
                alert(e);
            }
            break;
        }
    }
}

function onDocumentMouseDown(event) {
    event.preventDefault();//Garante não ser interronpido por outro evento.
    //Problema da interação resolvido:	
    var vector = new THREE.Vector3(((event.clientX - container.offsetLeft) / container.clientWidth) * 2 - 1, -((event.clientY - container.offsetTop) / container.clientHeight) * 2 + 1, 0.5);
    projector.unprojectVector(vector, camera);
    //vector.unproject(camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(listaDeObjetos);
    if (intersects.length > 0) {
        controls.enabled = false;
        objetoSelecionado = intersects[0].object;
        //intersects[0].object.material.color.setHex(Math.random() * 0xFFFFFF);
        setObjeto = intersects[0].object;
        PropriedadesObjeto(indice - 1);
        var intersects = raycaster.intersectObject(plane);
        offset.copy(intersects[ 0 ].point).sub(plane.position);
        container.style.cursor = 'move';
    } else {
        container.style.cursor = 'auto';
    }
}
;

function onDocumentMouseMove(event) {
    posicaCamera();
    if (objetoSelecionado !== undefined) {
        var z = objetoSelecionado.position.z;
        Posicoes();
    }
    mouse.x = ((event.clientX - container.offsetLeft) / container.clientWidth) * 2 - 1;
    mouse.y = -(((event.clientY - container.offsetTop)) / container.clientHeight) * 2 + 1;
//Código que está como exemplo no git:
    //var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
    var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    //vector.unproject(camera);
    projector.unprojectVector(vector, camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    if (objetoSelecionado) {
        var intersects = raycaster.intersectObject(plane);
        objetoSelecionado.position.copy(intersects[ 0 ].point.sub(offset));
        objetoSelecionado.position.z = z;
        return;
    }

    //Solução para melhora a seleção de objetos:
    var intersects = raycaster.intersectObjects(listaDeObjetos);
    if (intersects.length > 0) { //Certeza de que está interagindo com um objeto???
        container.style.cursor = 'pointer';
        if (objetoSelecionado !== undefined) {
            plane.position.copy(objetoSelecionado.position);
        }
        plane.lookAt(camera.position);
    } else {
        container.style.cursor = "auto";
    }
    //controls.enabled=false;
}
;

function onDocumentMouseUP() {
    controls.enabled = true;
    objetoSelecionado = undefined;
    container.style.cursor = "auto";
}

function Posicoes() {
    var X, Y, Z;
    if (setObjeto !== undefined) {
        X = document.getElementById("posX");
        X.innerHTML = 'Posi&ccedil;&atildeo X: ' + (setObjeto.position.x).toFixed(2);

        Y = document.getElementById("posY");
        Y.innerHTML = 'Posi&ccedil;&atildeo Y: ' + (setObjeto.position.y).toFixed(2);

        Z = document.getElementById("posZ");
        Z.innerHTML = 'Posi&ccedil;&atildeo Z: ' + (setObjeto.position.z).toFixed(2);
    }
}

function mudaCamera() {
    var x, xp, y, yp, z, zp;

    if (document.getElementById("cameraX").value !== "") {
        x = document.getElementById("cameraX");
        xp = parseFloat(x.value);
        camera.position.x = xp;
        x.value = "";
    }

    if (document.getElementById("cameraY").value !== "") {
        y = document.getElementById("cameraY");
        yp = parseFloat(y.value);
        camera.position.y = yp;
        y.value = "";
    }
    if (document.getElementById("cameraZ").value !== "") {
        z = document.getElementById("cameraZ");
        zp = parseFloat(z.value);
        camera.position.z = zp;
        z.value = "";
    }
    posicaCamera();


}

function PropriedadesObjeto(pos) {
    var escrtica;
    var str = "";

    //Propriedades do Objeto selecionado:
    str = "Tamanho: " + listaTamanhos[pos] + "<br>  Material: " + listaMaterial[pos] + "<br> Massa: " + listaMassas[pos];

    escrtica = document.getElementById("listaProriedades");
    escrtica.innerHTML = str;
    //document.getElementById("Propriedades").appendChild(escrtica);
}


function selecionaObjetos(pos) {
    setObjeto = listaDeObjetos[pos];
    var hex = 0x00ff00;
    var bbox = new THREE.BoundingBoxHelper(setObjeto, hex);
    bbox.update();
    cena.add(bbox);
    Posicoes();
    PropriedadesObjeto(pos);
}
;

function mudaPosicao() {
    var x, y, z;

    if (setObjeto !== undefined) {
        if (document.getElementById("pX").value !== "") {
            x = parseFloat(document.getElementById("pX").value);
            setObjeto.position.x = setObjeto.position.x + x;
        }
        if (document.getElementById("pY").value !== "") {
            y = parseFloat(document.getElementById("pY").value);
            setObjeto.position.y = setObjeto.position.y + y;
        }
        if (document.getElementById("pZ").value !== "") {
            z = parseFloat(document.getElementById("pZ").value);
            setObjeto.position.z = setObjeto.position.z + z;
        }
        Posicoes();
        limpaTexto();
    }
}
;

function limpaTexto() {
    var x, y, z;

    x = document.getElementById("pX");
    x.value = '';

    y = document.getElementById("pY");
    y.value = '';

    z = document.getElementById("pZ");
    z.value = '';

}
;


