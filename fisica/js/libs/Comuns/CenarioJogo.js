window.onload = Carrega;

var cena;
var camera;
var renderer;
var container;
var Alvo;
var Esfera;
var moveX = 0;
var moveY = 0;
var cubo;
var listaObjeto = [];
var listaDeTamanhos = [];

function Carrega() {
    inicializa();
    renderiza();
    //criaTexto();
}

function  inicializa() {
    cena = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

    camera.position.z = 20;
    camera.position.y = 13;
    camera.position.x = 20;

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

    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(10, 10, 50);
    cena.add(pointLight);

    camera.position.z = 10;

    cena.add(new THREE.AxisHelper(150));
    var grade = new THREE.GridHelper(150, 3);
    cena.add(grade);
//
//Desenhando cubo:
    var geometria = new THREE.CubeGeometry(2, 2, 2);
    var material = new THREE.MeshLambertMaterial({color: 0x00FFFF});
    cubo = new THREE.Mesh(geometria, material);
    cubo.position.x = Math.random() * 5 - Math.random() * 3;
    cubo.position.y = Math.random() * 5 - Math.random() * 3;
    cubo.position.z = Math.random() * 5 - Math.random() * 3;
    listaDeTamanhos.push(2);
    listaObjeto.push(cubo);

    cena.add(cubo);

    var geometria2 = new THREE.CubeGeometry(1, 1, 1);
    var material2 = new THREE.MeshLambertMaterial({color: 0x0000FF});
    cubo = new THREE.Mesh(geometria2, material2);
    cubo.position.x = Math.random() * 5 - Math.random() * 3;
    cubo.position.y = Math.random() * 5 - Math.random() * 3;
    cubo.position.z = Math.random() * 5 - Math.random() * 3;
    listaDeTamanhos.push(1);
    listaObjeto.push(cubo);

    cena.add(cubo);
}

function renderiza() {
    controls.update();
    requestAnimationFrame(renderiza);
    renderer.render(cena, camera);
    if (Esfera !== undefined) {
        movimenta();
    }
}

function movimenta() {
    Esfera.position.x += moveX;
    Esfera.position.y += moveY;

}

function play(movX, movY) {
    moveX = movX;
    moveY = movY;
}

function pausa() {
    moveX = 0;
    moveY = 0;

}

//function criaTexto() {
//var geo =  new THREE.TextGeometry("Ola Mundo", {size: 10,
//height: 1,
//curveSegments: 10,
//font: "helvetiker"});

//var material = new THREE.MeshBasicMaterial({color:0xff0000});

//var texto = new THREE.Mesh(geo, material);
//texto.position.z=-30;
//texto.position.x=-15;

//cena.add(texto);
//}
function alteraTexto(pag) {
    switch (pag) {
        case 0:
            textoZero();
            break;
        case 1:
            textoUm();
            break;
        case 2:
            textoDois();
            break;

        case 3:
            textotres();
            break;

        case 4:
            textoQuatro();
            break;

        case 5:
            textoCinco();
            break;
    }
}

function textoZero() {
    var texto = document.getElementById("texto_explicacao");

    texto.innerHTML = '<h2 style="margin-top: -2px">Explica&ccedil;&atilde;o</h2>\n\
<img id="logo_webgl" src="img/teste.png">\n\
<b>a) primeira  lei:</b> todo corpo  permanece  em  seu  estado  de  repouso  ou  de  movimento\n\
uniforme em linha reta, a menos que seja forçado a mudar aquele estado por forças \n\
aplicadas sobre ele;<br>\n\
<b> b)  segunda  lei:</b> a  mudança  de  movimento  é  proporcional  à  força  imprimida,  e  é \n\
produzida na direção de linha reta na qual aquela força é exercida;<br>\n\
 <b> c)  terceira lei:</b> para toda ação  há sempre oposta uma reação de igual intensidade; ou \n\
as ações mútuas de dois corpos, um sobre o outro, são sempre iguais e dirigem-se \n\
para partes opostas.';

}

function textoUm() {
    var texto = document.getElementById("texto_explicacao");

    texto.innerHTML = '<h2 style="margin-top: -2px">Explica&ccedil;&atilde;o</h2>\n\
<img id="logo_webgl" src="img/teste.png">\n\
<b>a) primeira  lei:</b> todo corpo  permanece  em  seu  estado  de  repouso  ou  de  movimento\n\
uniforme em linha reta, a menos que seja forçado a mudar aquele estado por forças \n\
aplicadas sobre ele;<br>';

}

function textoDois() {
    var texto = document.getElementById("texto_explicacao");

    texto.innerHTML = '<h2 style="margin-top: -2px">Explica&ccedil;&atilde;o</h2>\n\
<img id="logo_webgl" src="img/teste.png">\n\
<b> b)  segunda  lei:</b> a  mudança  de  movimento  é  proporcional  à  força  imprimida,  e  é \n\
produzida na direção de linha reta na qual aquela força é exercida;<br>';
}


//FAZER TEXTO 3:
function textotres() {
    var texto = document.getElementById("texto_explicacao");

    texto.innerHTML = '<h2 style="margin-top: -2px">Explica&ccedil;&atilde;o</h2>\n\
 <b> c)  terceira lei:</b> para toda ação  há sempre oposta uma rea&ccedil;&atilde;o de igual intensidade; ou \n\
as ações mútuas de dois corpos, um sobre o outro, são sempre iguais e dirigem-se \n\
para partes opostas.';

}
//Conceitos Tirados do livro:

function textoQuatro() {
    var texto = document.getElementById("texto_explicacao");
    texto.innerHTML = '<b> In&eacute;rcia: </b> é a propriedade que os objetos têm de opor resitência à acelara&ccedil;&atilde;o.<br>\n\
    <b> Massa: </b> é uma medida da in&eacute;rcia, e mede a quantidade de mat&eacute;ria do objeto. \n\
    A massa &eacute; uma grandeza escalar, e sua unidade no Sistema Internacional &eacute; o quilograma(kg).<br>\n\
    <b>For&ccedil;a:</b> é o que causa a mudan&ccedil;a de velocidade ou deforma&ccedil;&atilde;o em um objeto.';
}

function textoCinco() {
    var texto = document.getElementById("texto_explicacao");
    texto.innerHTML = '<b> Grandeza Escalar:</b> Precisam apenas de um número para sua caracteriza&ccedil;&atilde;o(por exemplo o tempo).<br>\n\
    <b> Grandeza Vetorial:</b> Precisam de módulo(valor), dire&ccedil;&atilde;o e sentido.';
}

