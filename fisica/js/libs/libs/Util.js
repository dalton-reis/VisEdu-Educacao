function clearField3(field) {
	document.getElementById(field + "X").value = "";
	document.getElementById(field + "Y").value = "";
	document.getElementById(field + "Z").value = "";
}

function getVector3(campo) {
	var x = document.getElementById(campo + 'X').value;
	var y = document.getElementById(campo + 'Y').value;
	var z = document.getElementById(campo + 'Z').value;

	if (isNaN(x) || isNaN(y) || isNaN(z)) {
		throw 'ERROR: valor inv&aacute;lido encrontrado!';
	}

	if (x === "" || y === "" || z === "") {
		throw 'ERROR: valor vazio encrontrado!';
	}

	return new THREE.Vector3(x, y, z);
};
function getQuaternion(campo) {
	var r = document.getElementById(campo + 'R').value;
	var i = document.getElementById(campo + 'I').value;
	var j = document.getElementById(campo + 'J').value;

	if (isNaN(r) || isNaN(i) || isNaN(j)) {
		throw 'ERROR: valor inv&aacute;lido encrontrado!';
	}
	
	if (r === "" || i === "" || j === "") {
		throw 'ERROR: valor vazio encrontrado!';
	}
	return new THREE.Quaternion(r, i, j);
};
function colisao(tipo) {
	var colide = [];
	for (var i = 0; i < listObjetcsPhys.length; i++) {
		if ((listObjetcsPhys[i] !== undefined)
				&& (document.getElementById('check_obj' + '_' + tipo + i).checked === true)) {
			colide.push(i);
			console.log(i);
		}
	}
	console.log(colide);
	return colide;
}

function check(campo) {
	return document.getElementById(campo).checked;
}

function returnInfVector3(vetor) {
	var strSaida = "";
	strSaida = "<strong>x:</strong>" + vetor.x + " <strong>y:</strong>"
			+ vetor.y + " <strong>z:</strong>" + vetor.z;
	return strSaida;
}

function Abrir() {
	Import(JSON.parse(strAquivo), scene);
	if(modoTutorial===true){
		AbreArquivoP2();
	}
}

// auxCenario:
function salvarCenario() {
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	var blobObject = new Blob([ preparaString() ], {
		type : 'text/plain; charset=ISO-8859-1'
	});
	var url = window.URL.createObjectURL(blobObject);
	a.href = url;
	a.download = "Cena";
	a.click();
	window.URL.revokeObjectURL(url);
	
	if(modoTutorial === true){
		AbreArquivoP1();
	}
}
// auxCenario:
function preparaString() {
	var strSaida = JSON.stringify(exportarCena(), null, '\t');
	strSaida.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
	return strSaida;
}

function addLista(lista, info) {

	$("#" + lista).append("<li>" + info + "</li>");

}

function restCamera(camera, pos) {
	camera.position.set(pos.x, pos.y, pos.z);
	Posicoes(camera, "camera", '');
}

function selecionaServidor() {
	var serv = prompt("Informe um numero:\n" + "1- FURB\n" + "2- OpenShift", 1);
	if (serv === '1') {
		HEFESTO._host = 'costao.inf.furb.br:8080';
	} else {
		if (serv === '2') {
			HEFESTO._host = 'hefesto-visedufisica.rhcloud.com:8000'
		}
	}
}

function about() {
	{
		var xmlhttp;
		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera,
			// Safari
			xmlhttp = new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("divAbout").innerHTML = xmlhttp.responseText;
			}
		}
		xmlhttp.open("GET", "./../sobreGrupo.html", true);
		xmlhttp.send();
	}
}