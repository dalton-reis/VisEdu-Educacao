window.onload = Carrega;

var cena;
var camera;
var controls;
var renderer;
var container;
var mouse = new THREE.Vector2();
var indice = 0;
var objetoSelecionado = undefined;
var offset = new THREE.Vector3();
var objetoAtual, setObjeto;
var stats;
var base;
var play = false;
var auxPlay = play;
var cx = 0;
var primeiraPosicao = 0;
var strAquivo;
//LISTA DE OBJETOS:
var listaDeObjetosGraficos = new Array(); // ciando um vetor sem tamanho
var listaObjetosFis = [];
var listaCorposRigidos = [];

//Fisíca:
var simulation;
var timming = new HEFESTO.Timming();

//Colisões:
//Base
var cdGround = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdGround.id = 'cdGround';
cdGround.maxCollision = 256 * 256;
//Madeira
var cdMadeira_Madeira = new HEFESTO.CollisionData(0.9, 1, 0.01);
cdMadeira_Madeira.id = 'cdMadeira_Madeira';
cdMadeira_Madeira.maxCollision = 256 * 256;

var cdMadeira_Metal = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdMadeira_Metal.id = 'cdMadeira_Metal';
cdMadeira_Metal.maxCollision = 256 * 256;

var cdMadeira_Borracha = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdMadeira_Borracha.id = 'cdMadeira_Borracha';
cdMadeira_Borracha.maxCollision = 256 * 256;

var cdMadeira_Plastico = new HEFESTO.CollisionData(0.9, 0.5, 0.01);
cdMadeira_Plastico.id = 'cdMadeira_Plastico';
cdMadeira_Plastico.maxCollision = 256 * 256;

//Metal
var cdMetal_Metal = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdMetal_Metal.id = 'cdMetal_Borracha';
cdMetal_Metal.maxCollision = 256 * 256;

var cdMetal_Borracha = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdMetal_Borracha.id = 'cdMetal_Borracha';
cdMetal_Borracha.maxCollision = 256 * 256;

var cdMetal_Plastico = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdMetal_Plastico.id = 'cdMetal_Borracha';
cdMetal_Plastico.maxCollision = 256 * 256;

//Borracha
var cdBorracha_Borracha = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdBorracha_Borracha.id = 'cdBorracha_Borracha';
cdBorracha_Borracha.maxCollision = 256 * 256;

var cdBorracha_Plastico = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdBorracha_Plastico.id = 'cdBorracha_Plastico';
cdBorracha_Plastico.maxCollision = 256 * 256;

//Plástico
var cdPlastico_Plastico = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdPlastico_Plastico.id = 'cdPlastico_Plastico';
cdPlastico_Plastico.maxCollision = 256 * 256;


$(window).blur(function () {
    console.log("Blur Win");
    auxPlay = play;
    play = false;
});

$(window).focus(function () {
    console.log("Focus Win");
    /**
     if (!simulation.isBusy()) {
     play = auxPlay;
     } **/
    setTimeout("play = auxPlay", 100);
    setTimeout("console.log(play)", 101);
});

function Carrega() {
    inicializaSimualcao();
}

function inicializaSimualcao() {
    simulation = new HEFESTO.Simulation();
    simulation.init();

    continueInitilization();
}


function  inicializa() {

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
    camera.position.z = 20;
    camera.position.y = 23;
    camera.position.x = 20;

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cena.add(new THREE.AxisHelper(300));
    cena.add(new THREE.GridHelper(150, 15));

    renderer.domElement.addEventListener('mousedown', onDocumentMouseDown);

    renderer.domElement.addEventListener("mousemove", onDocumentMouseMove);

    renderer.domElement.addEventListener('mouseup', onDocumentMouseUP);

    var arquivo = document.getElementById("arquivo");
    arquivo.addEventListener('change', function (event) {

        var file = event.target.files[ 0 ];

        var reader = new FileReader();
        reader.addEventListener('load', function (event) {

            strAquivo = event.target.result;
            //console.log(strAquivo);
        }, false);

        reader.readAsBinaryString(file);

        // console.log("Segundo:" + reader.result);
    }, false);

    //setTimeout("play=true", 1000);
    setTimeout("console.log(play)", 10000);
    //window.addEventListener('blur', pausaTrocaDeAba);
    //window.addEventListener('focus', voltaTrocaDeAba);
    /**
     simulation.contactListener = function (data) {
     //var au = document.getElementById('audio');
     console.log("Houve Colisão!!!");
     //console.log(data.contactPoint);
     //au.play();
     };
     /**
     simulation.rigidBodyDataListener = function (body) {
     console.log(" Entrou aqui!!!");
     var aux = function (v) {
     return 'x(' + v.x + ') y(' + v.y + ') z(' + v.z + ')';
     };
     var str = 'Id: ' + body.id + '<br/>';
     str += 'Position: ' + aux(body.position) + '<br/>';
     str += 'Orientation: ' + aux(body.orientation) + '<br/>';
     str += 'Velocity: ' + aux(body.velocity) + '<br/>';
     str += 'Aceleration: ' + aux(body.aceleration) + '<br/>';
     str += 'Rotation: ' + aux(body.rotation) + '<br/>';
     str += 'InverseInertiaTensor: ' + body.inverseInertiaTensor + '<br/>';
     
     console.log(str);
     
     };
     **/
    projector = new THREE.Projector();
    plane = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000, 8, 8), new THREE.MeshBasicMaterial({color: 0x000000, opacity: 0.25, transparent: true, wireframe: true}));
    plane.visible = false;
    cena.add(plane);


    var baseGeometry = new THREE.BoxGeometry(300, 1, 300);
    var baseMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00, transparent: true, opacity: 0.2});
    var base = new THREE.Mesh(baseGeometry, baseMaterial);

    cena.add(base);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

}
/**
 function pausaTrocaDeAba() {
 auxPlay = play;
 play = false;
 //console.log(play);
 }
 
 function voltaTrocaDeAba() {
 
 //play = true;
 console.log(play);
 }
 **/
function continueInitilization() {
    if (!simulation.isBusy()) {
        adicionacd();
        inicializa();

        timming.start();
        timming.update();
        renderiza();
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

    simulation.bindCollisionData(cdMetal_Metal);
    simulation.bindCollisionData(cdMetal_Borracha);
    simulation.bindCollisionData(cdMetal_Plastico);

    simulation.bindCollisionData(cdBorracha_Borracha);
    simulation.bindCollisionData(cdBorracha_Plastico);

    simulation.bindCollisionData(cdPlastico_Plastico);
}

function renderiza() {
    requestAnimationFrame(renderiza);

    if (!simulation.isBusy()) {
        if (play === true) {
            simulation.integrate(timming.getLastFrameDuration() * 0.001);
            //console.log(listaCorposRigidos[0].position);
            //simulation.getRigidBodyData('all');
            //console.log(listaCorposRigidos[0].position.y);
        }
        controls.update();
        renderer.render(cena, camera);
        stats.update();
        timming.update();
    }
}


function Abrir() {
    Import(JSON.parse(strAquivo));
}

function playPausa(valor) {
    play = valor;
    console.log(play);
    if (play === true) {
        for (var i = primeiraPosicao; i < listaObjetosFis.length; i++) {
            var rigidbody = new corpoRigido(i);
            rigidbody.criarCorpoRigido();
            primeiraPosicao = listaObjetosFis.length;
            //console.log(primeiraPosicao);
        }
    }
}
//auxCenario:
function salvarCenario() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var blobObject = new Blob([preparaString()], {type: 'text/plain; charset=ISO-8859-1'});
    var url = window.URL.createObjectURL(blobObject);
    a.href = url;
    a.download = "Cena";
    a.click();
    window.URL.revokeObjectURL(url);
}
//auxCenario:
function preparaString() {
    var strSaida = JSON.stringify(exportarCena(), null, '\t');
    strSaida.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
    return strSaida;
}

function teste() {
    console.log("Função teste!!");
    //simulation.removeRigidBody(listaCorposRigidos[0]);
    cena.remove(listaDeObjetosGraficos[0]);
    listaDeObjetosGraficos = [];
    indice = 0;
    //document.getElementById("listaObjetos").innerHTML = "";
    /**
     var data = new XMLHttpRequest();
     
     data.onreadystatechange = function () {
     if (data.readyState == 4 && data.status == 200) {
     var texto = data.responseText;
     console.log(texto);
     }
     };
     
     //s var file = new File
     //console.log(exportarCena());
     
     /**
     var data = exportarCena();
     for (var id in data.Objetos) {
     var o = data.Objetos[id];
     console.log("id:" + id);
     console.log(o.posicao[0]+2);
     }
     /**
     $.each(data.Objetos, function (i, o) {
     console.log(o[i].position);
     });
     **/

    //console.log(exportObjetos(listaObjetosFis[listaObjetosFis.length-1]));
    //console.log(exportCamera(camera));
    //console.log(exportarCena());


    /**
     console.log("Posicao Inicial"+criaVetorPosicao(listaObjetosFis[0].getPosicaoInicial()));
     console.log("Velocidade"+criaVetorPosicao(listaObjetosFis[0].getVelocidade()));
     console.log("Rotacao"+criaVetorPosicao(listaObjetosFis[0].getRotacao()));
     console.log("Aceleracao"+criaVetorPosicao(listaObjetosFis[0].getAceleracao()));
     console.log("Orientacao"+criaVetorPosicao(listaObjetosFis[0].getOrientacao()));
     console.log("Velocidade "+criaVetorPosicao(listaObjetosFis[0].getVelocidade()));
     /**
     play = valor;
     if (play === true) {
     for (var i = primeiraPosicao; i < listaObjetosFis.length; i++) {
     var rigidbody = new corpoRigido(i);
     rigidbody.criarCorpoRigido();
     primeiraPosicao = listaObjetosFis.length;
     //console.log(primeiraPosicao);
     }
     /** for (var i = 0; i < listaCorposRigidos.length; i++) {
     if (cx <= 0) {
     console.log(cx);
     
     listaCorposRigidos[i].position.x = listaDeObjetosGraficos[i].position.x;
     console.log(listaCorposRigidos[i].position.x);
     console.log(listaDeObjetosGraficos[i].position.x);
     listaCorposRigidos[i].position.y = listaDeObjetosGraficos[i].position.y;
     listaCorposRigidos[i].position.z = listaDeObjetosGraficos[i].position.z;
     listaDeObjetosGraficos[i].matrixAutoUpdate = false;
     }
     }
     
     cx--;
     } else {
     for (var i = 0; i < listaDeObjetosGraficos.length; i++) {
     listaDeObjetosGraficos[i].position.x = listaCorposRigidos[i].position.x;
     //console.log(listaCorposRigidos[i].position.x);
     //console.log(listaDeObjetosGraficos[i].position.x);
     listaDeObjetosGraficos[i].position.y = parseFloat(listaCorposRigidos[i].position.y);
     listaDeObjetosGraficos[i].position.z = parseFloat(listaCorposRigidos[i].position.z);
     listaDeObjetosGraficos[i].matrixAutoUpdate = true;
     }
     
     }
     **/
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

//A definir o lugar dela.

function criarObjetoFis(_objeto) {
    var objeto = _objeto;
    switch (objeto) {
        case "Esfera":
        {
            try {
                if (document.getElementById("MassaEsfera").value === "" || document.getElementById("MassaEsfera").value <= 0) {
                    alert("O valor da da massa não pode ser vazio nem menor que zero!");
                } else {
                    objetoAtual = new ObjetoFisica(document.getElementById("NomeEsfera").value,
                            parseInt(document.getElementById("Raio").value),
                            "Esfera",
                            document.getElementById("MaterialEsfera").value,
                            indice,
                            getVector3("posEsfera"),
                            getVector3("vEsfera"),
                            document.getElementById("MassaEsfera").value,
                            document.getElementById("amortce_Linear_Esfera").value,
                            document.getElementById("amortce_Angular_Esfera").value,
                            getVector3("rotEsfera"),
                            getVector3("acEsfera"),
                            getQuaternion("oEsfera"),
                            colisao('esfera'),
                            true);
                    objetoAtual.CriaEsfera();//Colocar como parametro a cena.
                    listaObjetosFis.push(objetoAtual);
                    console.log(objetoAtual.getOrientacao());
                    //console.log(objetoAtual.teste());
                    document.getElementById("listaObjetos").appendChild(objetoAtual.getDiv());
                    document.getElementById("listaDeObjetos_Efera").appendChild(objetoAtual.addLista('esfera'));
                    document.getElementById("listaDeObjetos_Cubo").appendChild(objetoAtual.addLista('cubo'));
                    document.getElementById("listaDeObjetos_Alvo").appendChild(objetoAtual.addLista('alvo'));
                    indice++;
                }
            } catch (e) {
                alert(e);
            }
            break;
        }
        case "Cubo":
        {
            try {
                if (document.getElementById("MassaCubo").value === "" || document.getElementById("MassaCubo").value <= 0) {
                    alert("O valor da da massa não pode ser vazio nem menor que zero!");
                } else {
                    objetoAtual = new ObjetoFisica(document.getElementById("NomeCubo").value,
                            parseInt(document.getElementById("TamanhoCubo").value),
                            "Cubo",
                            document.getElementById("MaterialCubo").value,
                            indice,
                            getVector3("posCubo"),
                            getVector3("vCubo"),
                            document.getElementById("MassaCubo").value,
                            document.getElementById("amortce_Linear_Cubo").value,
                            document.getElementById("amortce_Angular_Cubo").value,
                            getVector3("rotCubo"),
                            getVector3("acCubo"),
                            getQuaternion("oCubo"),
                            colisao('cubo'),
                            true);
                    objetoAtual.CriaCubo();
                    listaObjetosFis.push(objetoAtual);
                    //alert(objetoAtual.teste());
                    document.getElementById("listaObjetos").appendChild(objetoAtual.getDiv());
                    document.getElementById("listaDeObjetos_Efera").appendChild(objetoAtual.addLista('esfera'));
                    document.getElementById("listaDeObjetos_Cubo").appendChild(objetoAtual.addLista('cubo'));
                    document.getElementById("listaDeObjetos_Alvo").appendChild(objetoAtual.addLista('alvo'));
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
                objetoAtual = new ObjetoFisica(document.getElementById("NomeAlvo").value,
                        parseInt(document.getElementById("TamanhoAlvo").value),
                        "Alvo",
                        null,
                        indice,
                        getVector3("posAlvo"),
                        getVector3("vAlvo"),
                        document.getElementById("MassaAlvo").value,
                        document.getElementById("amortce_Linear_Alvo").value,
                        document.getElementById("amortce_Angular_Alvo").value,
                        getVector3("rotAlvo"),
                        getVector3("acAlvo"),
                        getQuaternion("oAlvo"),
                        colisao('alvo'),
                        false);
                objetoAtual.CriaAlvo();
                listaObjetosFis.push(objetoAtual);
                //alert(objetoAtual.teste());
                document.getElementById("listaObjetos").appendChild(objetoAtual.getDiv());
                document.getElementById("listaDeObjetos_Efera").appendChild(objetoAtual.addLista('esfera'));
                document.getElementById("listaDeObjetos_Cubo").appendChild(objetoAtual.addLista('cubo'));
                document.getElementById("listaDeObjetos_Alvo").appendChild(objetoAtual.addLista('alvo'));
                indice++;
            } catch (e) {
                alert(e);
            }
            break;
        }
    }
}
//A definir:
function createCannon() {
    cannon = new GAMU.Cannon(cena);
    cannon.angle = 0;
    cannon.initialVelocity = 800;
    cannon.position = new THREE.Vector3(-100, 0, -100);
    cannon.build();
}

function onDocumentMouseDown(event) {
    event.preventDefault(); //Garante não ser interronpido por outro evento.
    //Problema da interação resolvido:	
    var vector = new THREE.Vector3(((event.clientX - container.offsetLeft) / container.clientWidth) * 2 - 1, -((event.clientY - container.offsetTop) / container.clientHeight) * 2 + 1, 0.5);
    projector.unprojectVector(vector, camera);
    //vector.unproject(camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(listaDeObjetosGraficos);
    if (intersects.length > 0) {
        controls.enabled = false;
        objetoSelecionado = intersects[0].object;
        //objetoSelecionado.matrixAutoUpdate = true;
        //intersects[0].object.material.color.setHex(Math.random() * 0xFFFFFF);
        setObjeto = intersects[0].object;
        PropriedadesObjeto(listaObjetosFis.length - 1);
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
    var intersects = raycaster.intersectObjects(listaDeObjetosGraficos);
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
    //objetoSelecionado.matrixAutoUpdate = false;
    objetoSelecionado = undefined;
    container.style.cursor = "auto";
}

function Posicoes() { //talvez colocar nomo parametro o objto.
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
    var objeto = new ObjetoFisica();
    objeto = listaObjetosFis[pos];
    //Propriedades do Objeto selecionado:
    str = "Tamanho: " + objeto.getTamanho() + "<br>  Material: " + objeto.getMaterial() + "<br> Massa: " + objeto.getMassa() + "<br> Velocidade: " + retornaInf(objeto.getVelocidade()) +
            "<br> Acelaracao: " + retornaInf(objeto.getAceleracao()) + "<br> Amortec. Angular: " + objeto.getAmortecAngular() + "<br> Amortec. Linear: " + objeto.getAmortecLinear() +
            "<br> Rotacao: " + retornaInf(objeto.getRotacao()) + "<br> Orientcao: " + retornaInf(objeto.getOrientacao());
    escrtica = document.getElementById("listaProriedades");
    escrtica.innerHTML = str;
    //document.getElementById("Propriedades").appendChild(escrtica);
}

function retornaInf(vetor) {
    var strSaida = "";
    strSaida = "<strong>x:</strong>" + vetor.x + " <strong>y:</strong>" + vetor.y + " <strong>z:</strong>" + vetor.z;
    return strSaida;
}

function selecionaObjetos(pos) {
    setObjeto = listaDeObjetosGraficos[pos];
    //var hex = 0x00ff00;
    //var bbox = new THREE.BoundingBoxHelper(setObjeto, hex);
    //bbox.update();
    //cena.add(bbox);
    Posicoes();
    PropriedadesObjeto(pos);
}
;
function mudaPosicao() {//tentar colocar a mesma função para alterar a camera e os objetos.
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
function limpaTexto() { //receber como parametro o campo mudar para limpar todos os campos de posições.
    var x, y, z;
    x = document.getElementById("pX");
    x.value = '';
    y = document.getElementById("pY");
    y.value = '';
    z = document.getElementById("pZ");
    z.value = '';
}
;
var geometryBall = new THREE.SphereGeometry(5, 32, 16);
function createBall(x, y, z) {
    var material = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff, shading: THREE.SmoothShading});
    var mesh = new THREE.Mesh(geometryBall, material);
    var position = new THREE.Vector3(100, 100, 1000000000000);
    //GAMU.positionMesh(mesh, position, new THREE.Vector3());
    mesh.position.y = 30;
    mesh.position.x = -30;
    cena.add(mesh);
    mesh.matrixAutoUpdate = false;
    var rb = new HEFESTO.RigidBody(mesh);
    rb.bindContactData = true;
    rb.canSleep = false;
    rb.mass = 200;
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
    rb.radius = 5;
    simulation.bindRigidBody(rb);
    //Adiciona Colisão   
    var collisionGround = new HEFESTO.Collision(HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE, cdGround, rb, null);
    simulation.bindCollision(collisionGround);
    /**
     for (var i = 0; i < listaObjetosFis.length; i++) {
     var rigidbody = new corpoRigido(i);
     rigidbody.criarCorpoRigido();
     }
     **/
    play = true;
}
;

//AuxCenario.
function getVector3(campo) {
    var x = document.getElementById(campo + 'X').value;
    var y = document.getElementById(campo + 'Y').value;
    var z = document.getElementById(campo + 'Z').value;
    return new THREE.Vector3(x, y, z);
}
;
function getQuaternion(campo) {
    var r = document.getElementById(campo + 'R').value;
    var i = document.getElementById(campo + 'I').value;
    var j = document.getElementById(campo + 'J').value;
    return new THREE.Quaternion(r, i, j);
}
;
function  colisao(tipo) {
    var colide = [];
    for (var i = 0; i < listaObjetosFis.length; i++) {
        if (document.getElementById('check_obj' + '_' + tipo + i).checked === true) {
            colide.push(i);
            //alert(i);
        }
    }
    return colide;
}

