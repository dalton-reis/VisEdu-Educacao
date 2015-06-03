function criaVetor3(objt) {
	console.log(objt);
    var str = "";
    str = "[" + objt.x + "," + objt.y + "," + objt.z + "]";
    
    return str;
}
;

function criaVetor(vetor) {
    var strSaida = "[";

    for (var i = 0; i < vetor.length; i++) {
        if (i === vetor.length - 1) {
            strSaida += vetor[i];
        } else {
            strSaida += vetor[i] + ",";
        }
    }
    return  strSaida + "]";
}
;

function exportObjeto(o, i) {
	var tamanho = o.getTamanho().x !== undefined ?criaVetor3(o.getTamanho()) : o.getTamanho()
    var strJson = [
        '               "Objeto' + o.getID() + '" : {',
        '                       "nome" : "' + o.getNome() + '",',
        '                       "tamanho" : ' + tamanho + ',',
        '                       "tipo" : "' + o.getTipo() + '",',
        '                       "material" : "' + o.getMaterial() + '",',
        '                       "posicao" :' + criaVetor3(o.getPosicaoInicial()) + ',',
        '                       "velocidade" :' + criaVetor3(o.getVelocidade()) + ',',
        '                       "rotacao" : ' + criaVetor3(o.getRotacao()) + ',',
        '                       "aceleracao" : ' + criaVetor3(o.getAceleracao()) + ',',
        '                       "massa" : ' + o.getMassa() + ',',
        '                       "amortecedorAngular" : ' + o.getAmortecAngular() + ',',
        '                       "amortecedorLinear" : ' + o.getAmortecLinear() + ',',
        '                       "orientacao" : ' + criaVetor3(o.getOrientacao()) + ',',
        '                       "colideCom" : ' + criaVetor(o.getColisaoCom()) + ',',
        '                       "interagem" : ' + o.isInteragem()+',',
        '						"usaForcas" : ' + o.isUsaForcas(),	
        '                          }'].join('\n');
    console.log(strJson);
    //return JSON.parse(strJson).Objeto0.tamanho;
    return strJson;
}
;

function exportForces(f, i) {
    var strSaida = [
        '\t\t\t"Force' + i + '" :  {',
        '\t\t\t\t\t\t"name" : ' + '"'+f.name+'"' + ',',
		 '\t\t\t\t\t\t"values" : ' + criaVetor3(f.values), '\t\t\t\t\t\t}' ]
			.join('\n');
    console.log(strSaida);
	return strSaida;

}
function exportCamera(camera) {
	//tirara a primeria { e ultima } pra que funcinem todas juntas pq esse duas estarão no principal:
	var saida = [
			'               "Camera" : {',
			'                       "posicao" : ' + criaVetor3(camera.position),
			'                          },' ].join('\n');

	return saida;
	//return JSON.parse(saida);
};

function exportTodosObjetos() {
	var strSaida = "";
	//return   exportCamera(camera);
	if (listObjetcsPhys.length > 0) {
		for (var i = 0; i < listObjetcsPhys.length; i++) {
			if (listObjetcsPhys[i] !== undefined) {
				//console.log(listObjetcsGraphics[i].position);
				if (i < listObjetcsPhys.length - 1) {
					strSaida += exportObjeto(listObjetcsPhys[i], i) + ",\n";
				} else {
					strSaida += exportObjeto(listObjetcsPhys[i], i) + "\n";
				}
			}
		}
	}
	return strSaida;
};

function exportAllForces() {
	var strSaida = "";

	for (var i = 0; i < forces.length; i++) {
		if (i < forces.length - 1) {
			strSaida += exportForces(forces[i], i) + ",\n";
		} else {
			strSaida += exportForces(forces[i], i) + "\n";
		}
	}
	//console.log(strSaida);
	return strSaida;
}

function exportarCena() {
	var saida = [ '{', '	"metadata" : {', '               "Version" : ' + 1.1,
			'                    },', '', exportCamera(camera), '',
			/**
			 '       "Objetos" : ['+
			 exportTodosObjetos()
			 +']',
			 **/
			'       "Objetos" : {', exportTodosObjetos(),
			'                   },', '       "Forces" : {', exportAllForces(),
			'                   }', '}' ].join('\n');

	return JSON.parse(saida);
	//return saida;
}
