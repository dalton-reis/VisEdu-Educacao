function dadosCameraJ() {
    var pos = [];
    pos[0] = camera.position.x;
    pos[1] = camera.position.y;
    pos[2] = camera.position.z;

    var cameraValor = {
        nome: "Camera",
        valor: pos,
        near: camera.near,
        far: camera.far,
        fov: camera.fov
    };
    return cameraValor;
}

function dadosObjetoJ(obj, i) {
    var pos = [];
    pos[0] = obj.position.x;
    pos[1] = obj.position.y;
    pos[2] = obj.position.z;

    var objValor = {
        nome: "Objeto" + i,
        posicao: pos,
        cor: obj.material.color.getHex()
    };
    return objValor;

}

function objetos() {
    var Dadosobjetos;

    for (var i = 0; i < listaObjeto.length; i++) {
        Dadosobjetos = {objetos: [dadosObjetoJ(listaObjeto[i], i)].join("\n")};
    }

    return Dadosobjetos;
}

function dadosCena() {
    var dadosCena;

    dadosCena = {
        Camera: dadosCameraJ(),
        Objetos: objetos()
    };
    
    return dadosCena;

}

function teste() {
    alert(JSON.stringify(objetos()));

}