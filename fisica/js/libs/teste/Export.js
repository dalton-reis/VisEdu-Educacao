function Export() {
    var cameraValor = {
        nome: "Camera",
        valor: [1, 2, 3],
        near: 0.5,
        far: 10000,
        fov: 5
    };
    var aux = JSON.stringify(cameraValor);
    console.log(JSON.parse(aux));
    console.log(JSON.stringify(cameraValor));
    console.log(cameraValor.valor);

}
;

function Export2() {
    var strJson = ['{',
        '	"metadata" : {',
        '               "Version" : ' + 1.0,
        '                    },',
        '               "Camera" : {',
        '                       "nome" : "Camera",',
        '                       "posicao": [10,20,23],',
        '                       "near": ' + 0.5,
        '                          }',
        '                    }'].join('\n');

    console.log(strJson);
    console.log(JSON.parse(strJson));
    var aux = JSON.parse(strJson);
    console.log(aux.Camera.nome);
}
function salvar() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    var blobObject = new Blob(["Hello World"], {type: 'text/plain; charset=ISO-8859-1'});
    var url = window.URL.createObjectURL(blobObject);
    a.href = url;
    a.download = "Hello World";
    a.click();
    window.URL.revokeObjectURL(url);

}

