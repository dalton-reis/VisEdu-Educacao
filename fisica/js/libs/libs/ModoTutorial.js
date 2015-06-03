function selecionaTutorial() {
	ativaTutorial();
	opcao = document.getElementById('tutoriais').value;
	console.log(opcao);

	switch (opcao) {
	case "1":
		criarObjeto();
		break;
	case "2":
		addForcaP1();
		desativaMenusF();
		break;
	case "3":
		SalvaArquivoP1();
		desativaMenusSalva();
		break;
	case "4":
		MudaPosicaoP1();
		desativaMenusMudaPosicaoObj();
		break;
	case "5":
		desativaMenusMudaPosicaoCam();
		MudaPosicaoCamP1();
		break;
	default:
		break;
	}
}

function desativaMenusMudaPosicaoCam() {
	$("#menuArquivo").prop('disabled', true);
	$("#addForca").prop('disabled', true);
	$("#configCanhao").prop('disabled', true);
	$("#nrDeBolas").prop('disabled', true);
	$("#btnPause").prop('disabled', true);
	$("#btnPlay").prop('disabled', true);
	$("#criarObjetos").prop('disabled', true);
	$("#btnMudarPosicao").prop('disabled', true);
	$("#btnResetCamera").prop('disabled', true);

	$("#addCanhao").removeAttr('onclick', true);
	$("#addAlvo").removeAttr('data-target', true);
	$("#addEsfera").removeAttr('data-target', true);

	$("#itemCanhao").toggleClass('disabled');
	$("#itemAlvo").toggleClass('disabled');
	$("#itemEsfera").toggleClass('disabled');
}

function MudaPosicaoCamP1() {

	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Para voc&ecirc; mudar a posi&ccedil;&atilde;o da c&acirc;mera use o menu inferior direito. Voc&ecirc; pode mudar um valor de cada vez ou os tr&ecirc;s juntos.</p>"
							+ "<img id='imageMenuMudaPosicaoCam' src='img/MenuMudaPosicaoCam.PNG' />";

					return master;
				},
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});
}

function MudaPosicaoCamP2() {
	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Agora voc&ecirc; acaba de aprender como mudar a posi&ccedil;&atilde;o da c&acirc;mera.</p>";

					return master;
				},
				buttons : [
						{
							// id: 'btn-add',
							label : ' Terminar',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {								
								ativa();
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});
}


function desativaMenusMudaPosicaoObj() {
	$("#menuArquivo").prop('disabled', true);
	$("#addForca").prop('disabled', true);
	$("#configCanhao").prop('disabled', true);
	$("#nrDeBolas").prop('disabled', true);
	$("#btnPause").prop('disabled', true);
	$("#btnPlay").prop('disabled', true);
	$("#criarObjetos").prop('disabled', true);
	$("#btnMudarCamera").prop('disabled', true);
	$("#btnResetCamera").prop('disabled', true);

	$("#addCanhao").removeAttr('onclick', true);
	$("#addAlvo").removeAttr('data-target', true);
	$("#addEsfera").removeAttr('data-target', true);

	$("#itemCanhao").toggleClass('disabled');
	$("#itemAlvo").toggleClass('disabled');
	$("#itemEsfera").toggleClass('disabled');
}

function MudaPosicaoP1() {

	var obj = new ObjetoFisica("Esfera", 3, "Esfera", "Madeira", 0,
			new THREE.Vector3(0, 10, 0), new THREE.Vector3(0, 0, 0), 3, 0.8,
			0.95, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -10, 0),
			new THREE.Quaternion(0, 0, 0), [], true, true);
	
	obj.CriaObjeto("Esfera", scene);
	
	listObjetcsPhys.push(obj);
	document.getElementById("listaObjetos").appendChild(
			obj.getDiv2());
	document.getElementById("listaDeObjetos_Esfera").appendChild(
			obj.addLista('Esfera')); 
	document.getElementById("listaDeObjetos_Cubo").appendChild(
			obj.addLista('Cubo')); 
	document.getElementById("listaDeObjetos_Alvo").appendChild(
			obj.addLista('Alvo'));
	indice++;
	
	selecionaObjetos(0);

	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Para voc&ecirc; mudar a posi&ccedil;&atilde;o do objeto use o menu inferior esquerdo. Voc&ecirc; pode mudar um valor de cada vez ou os tr&ecirc;s juntos. </p>"
							+ "<img id='imageMenuMudaPosicaoObj' src='img/MenuMudaPosicaoObj.PNG' />";

					return master;
				},
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});
}

function MudaPosicaoP2() {
	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Agora voc&ecirc; acaba de aprender como mudar a posi&ccedil;&atilde;o do objeto</p>";

					return master;
				},
				buttons : [
						{
							// id: 'btn-add',
							label : ' Terminar',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {								
								ativa();
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});
}



function ativaTutorial() {
	modoTutorial = true;
	// console.log(modoTutorial);
}

function saiDoTutorial() {
	modoTutorial = false;
	$("#menuArquivo").prop('disabled', false);
	$("#addForca").prop('disabled', false);
	$("#configCanhao").prop('disabled', false);
	$("#nrDeBolas").prop('disabled', false);
	$("#btnPause").prop('disabled', false);
	$("#btnPlay").prop('disabled', false);
	$("#btnMudarPosicao").prop('disabled', false);
	$("#btnMudarCamera").prop('disabled', false);
	$("#btnResetCamera").prop('disabled', false);

	$("#itemCanhao").toggleClass("disabled");
	$("#itemAlvo").toggleClass('disabled');
	$("#itemEsfera").toggleClass('disabled');

	$('#addCanhao').click(createCannon);

	$("#addAlvo").attr('data-target', '#modalAlvo');
	$("#addCubo").attr('data-target', '#modalCubo');
	$("#addEsfera").attr('data-target', '#modalEsfera');
}

function desativaMenus() {
	// document.getElementById('menuArquivo').disabled = 'disabled';
	$("#menuArquivo").prop('disabled', true);
	$("#addForca").prop('disabled', true);
	$("#configCanhao").prop('disabled', true);
	$("#nrDeBolas").prop('disabled', true);
	$("#btnPause").prop('disabled', true);
	$("#btnPlay").prop('disabled', true);
	$("#btnMudarPosicao").prop('disabled', true);
	$("#btnMudarCamera").prop('disabled', true);
	$("#btnResetCamera").prop('disabled', true);

	$("#addCanhao").removeAttr('onclick', true);
	$("#addAlvo").removeAttr('data-target', true);
	$("#addEsfera").removeAttr('data-target', true);

	$("#itemCanhao").toggleClass('disabled');
	$("#itemAlvo").toggleClass('disabled');
	$("#itemEsfera").toggleClass('disabled');
	// $("#addCanhao").removeAttr('onclick', true);
}

function desativaMenusF() {
	// document.getElementById('menuArquivo').disabled = 'disabled';
	$("#menuArquivo").prop('disabled', true);
	$("#criarObjetos").prop('disabled', true);
	// $("#addForca").prop('disabled', true);
	$("#configCanhao").prop('disabled', true);
	$("#nrDeBolas").prop('disabled', true);
	$("#btnPause").prop('disabled', true);
	$("#btnPlay").prop('disabled', true);
	$("#btnMudarPosicao").prop('disabled', true);
	$("#btnMudarCamera").prop('disabled', true);
	$("#btnResetCamera").prop('disabled', true);

	// $("#addCanhao").removeAttr('onclick', true);
}

function desativaMenusSalva() {
	// document.getElementById('menuArquivo').disabled = 'disabled';
	// $("#menuArquivo").prop('disabled', true);
	$("#criarObjetos").prop('disabled', true);
	$("#addForca").prop('disabled', true);
	$("#configCanhao").prop('disabled', true);
	$("#nrDeBolas").prop('disabled', true);
	$("#btnPause").prop('disabled', true);
	$("#btnPlay").prop('disabled', true);
	$("#btnMudarPosicao").prop('disabled', true);
	$("#btnMudarCamera").prop('disabled', true);
	$("#btnResetCamera").prop('disabled', true);
	$("#addCanhao").removeAttr('onclick', true);

	$("#itemAbrir").toggleClass("disabled");
	$("#itemExemplo").toggleClass('disabled');
	$("#itemTutorial").toggleClass('disabled');
	$("#itemSobre").toggleClass('disabled');
	$("#itemObjetosAprendizagem").toggleClass('disabled');
	// $("#itemObjetosAprendizagem").toggleClass('dropdown-submenu');

	// $("#btnObjetosApredizagem").removeAttr('data-toggle');
	$("#btnTutorial").removeAttr('data-target', true);
	$("#btnSobre").removeAttr('data-target', true);
	$("#btnAbrir").removeAttr('data-target', true);
	$("#btnExemplos").removeAttr('data-target', true);
}

function AtivaMenuAbrir() {
	// document.getElementById('menuArquivo').disabled = 'disabled';
	// $("#menuArquivo").prop('disabled', true);

	$("#itemSalvar").toggleClass("disabled");
	$("#itemAbrir").toggleClass('disabled');

	// $("#btnObjetosApredizagem").removeAttr('data-toggle');
	$("#btnSalvar").removeAttr('onclick', true);

	$("#btnAbrir").attr('data-target', '#modalAbrir');
}

function SalvaArquivoP1() {
	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Agora vou mostrar para voc&ecirc; a op&ccedil;&atilde;o de salvar a cena que voc&ecirc; criou.</p> \n\
			<p> \n\
				Abra o menu arquivo e selecione a op&ccedil;&atilde;o salvar."
							+ "<img id='imageMenuArquivoSalvar' src='img/MenuArquivoSalvar.PNG' /> \n\
			<p>Depois basta escolher o nome e local que deseja salvar.</p> \n\
			<img id='imageSalvarComo' src='img/SalvarComo.PNG' />";

					return master;
				},
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});
}

function AbreArquivoP1() {
	AtivaMenuAbrir()
	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Agora para abrir o que voc&ecirc; salvou e só ir no menu arquivo e selecionar a op&ccedil;&atilde;o abrir.</p>"
							+ "<img id='imageMenuArquivoAbrir' src='img/MenuArquivoAbrir.PNG' />"
							+ "<p>E depois indicar o caminho do arquivo.</p>"
							+ "<img id='imageCaminhoCena' src='img/CaminhoCena.PNG' />";

					return master;
				},
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});
}

function ativaBtnPlayAbrir() {
	$("#menuArquivo").prop('disabled', true);
	$("#btnPlay").prop('disabled', false);
}

function AbreArquivoP2() {
	ativaBtnPlayAbrir();
	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Por fim mande tocar a cena clicando nesse bot&atilde;o</p>"
							+ "<img id='imageBtnPlay' src='img/btnPlay.PNG' />";

					return master;
				},
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});
}

function criarObjeto() {
	tutorialCriaObjeto = true;
	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Agora deixe-me mostrar como voc&ecirc; far&aacute; isso.\n\
						Primeiro observe que temos um menu em cima da p&aacute;gina.</p> \n\
					<img id='imgMenu' class='imgTutorial' src='img/Menu.PNG' /> \n\
					<p> \n\
						Primeiramente vou explicar a voc&ecirc; como adicionar um objetos \n\
						na cena. Que tal agora voc&ecirc; mesmo colocar a m&atilde;o na \n\
						massa e criar um cubo? Para isso basta voc&ecirc; clicar no menu <strong>Criar \n\
							Objetos</strong> \n\
					</p> \n\
					<img id='imageBtnCriarObjetos' src='img/btnCriarObjetos.PNG' /> \n\
					<p>e escolher a op&ccedil;&atilde;o cubo.</p> \n\
					<img id='imageMenuObjetos' src='img/MenuObjetos.PNG' />";

					return master;
				},
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {
								desativaMenus();
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});
}

function aposCriacaoCubo() {

	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Agora repare no lado esquerdo da tela a&iacute; vai ficar a lista dos objetos da sua cena. Agora clique nele e veja o que acontece.</p>"
							+ "<img id='imageListaObjetos'  src='img/ListaObjetos.PNG'/>";

					return master;
				},
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {
								testeMensagem("Funcionou!!!");
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});
}

function testeMensagem(msg) {
	console.log(msg);
}

function ativa() {
	modoTutorial = false;
	$("#menuArquivo").prop('disabled', false);
	$("#criarObjetos").prop('disabled', false);
	$("#addForca").prop('disabled', false);
	$("#configCanhao").prop('disabled', false);
	$("#nrDeBolas").prop('disabled', false);
	$("#btnPause").prop('disabled', false);
	$("#btnPlay").prop('disabled', false);
	$("#btnMudarPosicao").prop('disabled', false);
	$("#btnMudarCamera").prop('disabled', false);
	$("#btnResetCamera").prop('disabled', false);

	$("#itemCanhao").removeClass("disabled");
	$("#itemAlvo").removeClass('disabled');
	$("#itemEsfera").removeClass('disabled');

	$('#addCanhao').click(createCannon);

	$("#addAlvo").attr('data-target', '#modalAlvo');
	$("#addCubo").attr('data-target', '#modalCubo');
	$("#addEsfera").attr('data-target', '#modalEsfera');
	
	tutorialCriaObjeto = false;
}

function aposDivObjetos() {
	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				draggable : true,
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>No lado direito &eacute; o lugar onde estar&atilde;o as propriedades do objeto selecionado, e observe tamb&eacute;m que na cena seu objeto ficou destacado com linhas em volta dele.</p>"
							+ "<img id='imageListaObjetos'  src='img/divPropriedades.PNG'/>";

					return master;
				},
				buttons : [
						{
							id : 'btn-add',
							label : ' Terminar',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});
}

function addForcaP1() {
	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				draggable : true,
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Agora vou mostrar a voc&ecirc; como adicionar uma for&ccedil;a na cena. Para isso basta clicar nesse bot&atilde;o no menu superior.</p>"
							+ "<img id='imageListaObjetos'  src='img/btnForca.PNG'/>";

					return master;
				},
				buttons : [
						{
							id : 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});

}

function addForcaP2() {
	BootstrapDialog
			.show({
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				draggable : true,
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				message : function(dialog) {

					var master = document.createElement('div');

					master.innerHTML = "<p>Repare que o nome e os valores aparecem no lado esquerdo.</p>"
							+ "<img id='imageListaObjetos'  src='img/ForcaAdd.PNG'/>"
							+ "<p>Pronto agora voc&ecirc; acaba de criar uma for&ccedil;a para cena.</p>";

					return master;
				},
				buttons : [
						{
							id : 'btn-add',
							label : ' Terminar',
							cssClass : 'btn btn-primary btn-sm',
							autospin : false,
							action : function(dialogRef) {
								ativa();
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-default btn-sm',
							autospin : false,
							action : function(dialogRef) {
								// testeMensagem("Funcionou!!!");
								ativa();
								dialogRef.close();
							}
						} ]
			});

}