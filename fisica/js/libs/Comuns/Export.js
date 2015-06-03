//var arquivo;

//function exportar() {
//arquivo = JSON.stringify(dados);
//
//  alert(dados);
//}
//;
//function dadosCamera() {
//  var dados = [];
//dados.push(" Camera: " + camera.position.x);
//var aux = dados;
//return aux;
//}
//var dados = [];

//dados.push(dadosCamera());
//dados.push('teste');
var arquivo;
function exportar() {
    var output = [
        '{',
        '	"metadata": {',
        '		"formatVersion" : 1.0,',
        '		"type"		: "VisEduCG",',
        '		"generatedBy"	: "ExportadorJSON",',
        '		"objects"       : ,',
        '		"textures"      : ',
        '	},',
        '',
        '	"urlBaseType": "relativeToVisEduCG",',
        '',
        '	"viewPos" : ,',
        '	"viewRot" :teste ,',
        '',
        '	"itens" :',
        '	{',
        dadosCamera(),
        objetos,
        '	},',
        '',
        '	"textures" :',
        '	{',
        '\t',
        '	}',
        '',
        '}'
    ].join('\n');
    var aux = JSON.stringify(output);
    arquivo = JSON.parse(aux);
    //teste(arquivo);
    return  aux;
    //alert(output);
}

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
    //return JSON.stringify(cameraValor, null, "\t");
    return cameraValor;
}

function dadosCamera() {
    var cameraValor = [];
    cameraValor.push('\t\t"nome": "Camera",');
    cameraValor.push('"valorXYZ": [' + camera.position.x.toFixed(2) + "," + camera.position.y.toFixed(2) + "," + camera.position.z.toFixed(2) + "],");
    cameraValor.push('"near": ' + camera.near + ",");
    cameraValor.push('"far": ' + camera.far + ",");
    cameraValor.push('"fov": ' + camera.fov);

    return cameraValor.join("\n\t\t");
}


var vetor = [];

function dadosObjetosCubo(cubo, i) {

    vetor.push(pegaDadosCubo(cubo, i));

}

var objetos = [];

function pegaDadosCubo(objeto, i) {
    var saida = [];
    saida.push('\t\t' + '"item_' + i + '": {');
    saida.push('"nome": "Objeto_' + i + '"');
    saida.push('"Posiçao:" [' + objeto.position.x.toFixed(2) + "," + objeto.position.y.toFixed(2) + "," + objeto.position.z.toFixed(2) + '],');
    saida.push('"Cor": ' + objeto.material.color.getHex(1));
    saida.push('"Tamanho: "' + listaDeTamanhos[i]);
    saida.push('\t\t},');
    return saida.join("\n\t\t");
}

function teste() {
    //alert(objetos);
    for (var i = 0; i < listaObjeto.length; i++) {
        dadosObjetosCubo(listaObjeto[i], i);
    }
    objetos = vetor.join("\n");

    var dados = dadosCameraJ();
    console.log(dados.valor);
    console.log(exportar().viewRot);

    vetor = [];
    //alert(objetos);
    alert(dadosCameraJ());

}