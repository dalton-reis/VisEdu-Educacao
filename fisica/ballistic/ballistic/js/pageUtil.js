function loadAbout() {
	console.log("Executou About")
	includeAbout('Dev','./../aboutDev.html');
	includeAbout('Grupo','./../aboutGrupo.html');
}


function includeAbout(div, file) {
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
				document.getElementById(div).innerHTML = xmlhttp.responseText;
			}
		}
		xmlhttp.open("GET", file, true);
		xmlhttp.send();
	}
}