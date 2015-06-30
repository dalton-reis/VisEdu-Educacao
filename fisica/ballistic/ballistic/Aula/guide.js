var option;

$(document).ready(function() {
	console.log("Funcionou");
	$(function() {
		$("[data-toggle='tooltip']").tooltip();
	});

	$(function() {
		$('[data-toggle="popover"]').popover();
		// Ativa com uma opção fixa:
		// $('[data-toggle="popover"]').popover({ trigger: "focus" });
	});

	$(function() {
		$('.modal-dialog').draggable({
			handle : ".modal-header"
		});
	});
	/*
	 * $(function() { $('#popoverOption').popover({ trigger: "focus" }); });
	 */
});

function selectTutorial() {
	option = document.getElementById('listTutorial').value;
	console.log(option);
	tutorialLigado = true;
	resetSimulation();
	switch (option) {
	case "1":
        $("#fieldAngulo").val(0);
        rotacionarCanhao(0);
		changeAngleS1();
        desativoAngulo();
		break;
	case "2":
		alterarMola();
		desativaMola();
		break;
	case "3":
		alterarMaterial();
        desativaMola();
		break;
	case "4":
		alteraGravidade();
		desativaMola();
		$("#altGravidade").prop('disabled', false);
		break;
	default:
		break;
	}
}

function desativaMola(){
    $("#fieldK").prop('disabled', true).val(50);
    $("#fieldX").prop('disabled', true).val(70);
	$("#altGravidade").prop('disabled', true);
	$("#btnTutorial").prop('disabled', true);
    $("#fieldAngulo").prop('disabled', true).val(0);
    rotacionarCanhao(0);
    desativaImagem();
}

function ativaMola(){
	$("#altGravidade").prop('disabled', false);
    $("#fieldAngulo").prop('disabled', false);
	$("#btnTutorial").prop('disabled', false);
    ativaImagens();
}

function desativoAngulo(){
    $("#fieldK").prop('disabled', true).val(75);
    $("#fieldX").prop('disabled', true).val(80);
	$("#altGravidade").prop('disabled', true);
	$("#btnTutorial").prop('disabled', true);
    desativaImagem();
}

function desativaImagem(){
    $("#silicone").removeAttr('onclick').addClass('item-Disebled');
    $("#aluminio").removeAttr('onclick').addClass('item-Disebled');
    $("#ferro").removeAttr('onclick').addClass('item-Disebled');
    $("#ouro").removeAttr('onclick').addClass('item-Disebled');
    $("#vidro").removeAttr('onclick').addClass('item-Disebled');
    $("#madeira-ipe").removeAttr('onclick').addClass('item-Disebled');
    $("#madeira-cedro").removeAttr('onclick').addClass('item-Disebled');
}

function ativaImagens(){
    $("#silicone").attr('onclick','atualizarMaterial(this, BD.MaterialProjetil.SILICONE)').removeClass('item-Disebled');
    $("#aluminio").attr('onclick','atualizarMaterial(this, BD.MaterialProjetil.ALUMINIO)').removeClass('item-Disebled');
    $("#ferro").attr('onclick','atualizarMaterial(this, BD.MaterialProjetil.FERRO)').removeClass('item-Disebled');
    $("#ouro").attr('onclick','atualizarMaterial(this, BD.MaterialProjetil.OURO)').removeClass('item-Disebled');
    $("#vidro").attr('onclick','atualizarMaterial(this, BD.MaterialProjetil.VIDRO)').removeClass('item-Disebled');
    $("#madeira-ipe").attr('onclick','atualizarMaterial(this, BD.MaterialProjetil.IPE)').removeClass('item-Disebled');
    $("#madeira-cedro").attr('onclick','atualizarMaterial(this, BD.MaterialProjetil.CEDRO)').removeClass('item-Disebled');
}

function ativaAngulo(){
    $("#fieldK").prop('disabled', false);
    $("#fieldX").prop('disabled', false);
	$("#altGravidade").prop('disabled', false);
	$("#btnTutorial").prop('disabled', false);
    ativaImagens();
}

function ativaImagamp(){
    $("#fieldK").prop('disabled', false);
    $("#fieldX").prop('disabled', false);
    $("#fieldAngulo").prop('disabled', false);
	$("#altGravidade").prop('disabled', false);
	$("#btnTutorial").prop('disabled', false);
}

function ativaTudo(){
    ativaImagamp();
    ativaImagens();
}

function actionUser() {

	BootstrapDialog.show({
		title : '<strong>Tutorial</strong>',
		size : 'size-small',
		closable : false,
		closeByBackdrop : false,
		closeByKeyboard : false,
		draggable : true,
		message : function(dialog) {

			var master = document.createElement('div');

			master.innerHTML = "<p>Espera Ac&atilde;o do Usu&aacute;rio.</p>";

			return master;
		},
		buttons : [ {
			// id: 'btn-add',
			label : ' Pr&oacute;ximo &rarr;',
			cssClass : 'btn btn-primary btn-sm',
			autospin : false,
			action : function(dialogRef) {
				nextStep();
				dialogRef.close();
			}
		} ]
	});
}

function nextStep() {
	switch (option) {
	case "1":
		changeAngleS2();
		break;
	case "2":
        ativaMola();
		doneStep("Agora voc&ecirc; viu o que aconte quando altera os valores da mola");
		//ativaImagens();
		break;
	case "3":
        ativaImagamp();
		doneStep("Voc&ecirc; viu o que aconte quando altera o material da bola?");
		break;
	case"4":
		alteraGravidade2();
		break;
	case "5":
		doneStep("Agora voc&ecirc; acabou de ver o que aconte quando altera a agravidade.");
		break;
	default:
		break;
	}
}

function doneStep(msg) {
	tutorialLigado = false;
	var dialog = new BootstrapDialog(
			{
				title : '<strong>Tutorial</strong>',
				size : 'size-small',
				message : function(dialogRef) {
					var $message = $('<div> <p class="text-modal">' + msg + '</p> </div>');
					return $message;
				},
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-aula btn-sm',
							autospin : false,
							action : function(dialogRef) {
								ativaTudo();
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-cancela btn-sm',
							autospin : false,
							action : function(dialogRef) {
								ativaTudo();
								dialogRef.close();
							}
						} ]
			});
	dialog.realize();
	dialog.getModalHeader().addClass("header-modal-aula");
	dialog.getModalFooter().addClass("footer-modal-aula");
	dialog.getModalBody().addClass("body-modal-aula");
	dialog.open();

}

function CriaComClasse() {
	var dialog = new BootstrapDialog(
			{
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				message : function(dialogRef) {
					/*
					 * var $message = $('<div><img alt=""
					 * src="Img/Formula.png" id="popoverOption" '+
					 * 'class="imgFormula" tabindex="0" data-container="body"'+
					 * 'data-toggle="popover" data-trigger="hover"
					 * data-placement="left"'+ 'data-original-title="<strong>For&ccedil;a
					 * El&aacute;stica (mola)</strong>"'+ 'data-content="<p>Onde:</p>'+ '<p><strong>x</strong>
					 * &eacute; a deforma&ccedil;&atilde;o da mola;</p>'+ '<p><strong>K</strong>
					 * &eacute; a constante el&aacute;stica da mola e</p>'+ '<p><strong>F<sub>el</sub></strong>
					 * &eacute; a for&ccedil;a el&aacute;stica. </p>"'+
					 * 'data-html="true"> </div>');
					 */
					var div = document.createElement('div');
					div.id = "Img";
					div.className = "divImagem";
					var img = document.createElement('img');
					img.alt = "Imagem";
					img.src = "img/Formula.png";
					img.className = "imgFormula";
					img.id="Formula";
					$(img).attr('rel', 'popover');
					$(img).popover({
					    title: '<strong>For&ccedil;a El&aacute;stica (mola)</strong>',
					    placement: 'left',
					    content:'<p>Onde:</p>'+ '<p><strong>x</strong> &eacute; a deforma&ccedil;&atilde;o da mola;</p>'
					    + '<p><strong>K</strong> &eacute; a constante el&aacute;stica da mola e</p>'
					    + '<p><strong>F<sub>el</sub></strong> &eacute; a for&ccedil;a el&aacute;stica. </p>',
					    trigger: 'hover',
					    html: true
					});

					div.appendChild(img);

					return div;
				},
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-aula btn-sm',
							autospin : false,
							action : function(dialogRef) {
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-cancela btn-sm',
							autospin : false,
							action : function(dialogRef) {
                                ativaTudo();
								dialogRef.close();
							}
						} ]
			});
	dialog.realize();
	dialog.getModalHeader().addClass("header-modal-aula");
	dialog.getModalFooter().addClass("footer-modal-aula");
	dialog.getModalBody().addClass("body-modal-aula");
	dialog.open();

}

function changeAngleS1() {
    colisions =-1;
	var dialog = new BootstrapDialog(
			{
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				message : function(dialogRef) {
					var $message = $('<div>'
							+ '<p class="text-modal">Ol&aacute; nesse tutorial vou ensinar-lhe como mudar o 	&acirc;ngulo do chanh&atilde;o e o que essa mudan&ccedil;a pode interferir.</p>'
							+ '<div class="media">'
							+ '<div class="media-left">'
							+ '<img alt="" src="img/AnguloCanhao.PNG" />'
							+ '</div>'
							+ '<div class="media-right">'
							+ '<p class="text-modal">Para come&ccedil;ar esse &eacute; o campo onde voc&ecirc; '
							+ 'vai colocar o valor do &acirc;ngulo.</p>'
							+ '</div>'
							+ '</div>'
							+ '<p class="text-modal">Seu objetivo nesse tutorial &eacute; acertar o alvo podendo apenas mudar o &acirc;ngulo do canh&atilde;o. Ent&atilde;o vamos tentar?</p>'
							+ '<p class="text-modal">Comece mudando o &acirc;ngulo do canh&atilde;o at&eacute; acertar o alvo.</p>'
							+'</div>');
					return $message;
				},
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-aula btn-sm',
							autospin : false,
							action : function(dialogRef) {
								//actionUser();
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-cancela btn-sm',
							autospin : false,
							action : function(dialogRef) {
                                ativaTudo();
								dialogRef.close();
							}
						} ]
			});
	dialog.realize();
	dialog.getModalHeader().addClass("header-modal-aula");
	dialog.getModalFooter().addClass("footer-modal-aula");
	dialog.getModalBody().addClass("body-modal-aula");
	dialog.open();

}

function changeAngleS2() {
	var dialog = new BootstrapDialog(
			{
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				message : function(dialogRef) {
					var div = document.createElement('div');

					var paragrafo = document.createElement('p');
					paragrafo.className = "text-modal";
					paragrafo.innerHTML = 'Como voc&ecirc; pode perceber a mudan&ccedil;a no &acirc;ngulo do canh&atilde;o causo diferen&ccedil;a tanto na dist&acirc;ncia, quanto na altura.';
					div.appendChild(paragrafo);
					var paragrafo2 = document.createElement('p');
					paragrafo2.className = "text-modal";
					paragrafo2.innerHTML ="Podem ser calculadas por: ";
					div.appendChild(paragrafo2);
					var divMidia = document.createElement('div');
					divMidia.className = 'media divImagem';
					div.appendChild(divMidia);
					var divMidiaLeft = document.createElement('div');
					divMidiaLeft.className = 'media-left';
					divMidia.appendChild(divMidiaLeft);
					var imgFormulaA = document.createElement('img');
					imgFormulaA.src = 'img/FormulaLancamentoAlcance2.png';
					imgFormulaA.className = 'imgFormula';
					divMidiaLeft.appendChild(imgFormulaA);
					var divMidiaRight = document.createElement('div');
					divMidiaRight.className = 'media-right';
					divMidia.appendChild(divMidiaRight);
					var imgFormulaAl = document.createElement('img');
					imgFormulaAl.src = 'img/FormulaLancamentoAltura2.png';
					imgFormulaAl.className = 'imgFormulaH';
					divMidiaRight.appendChild(imgFormulaAl);

					$(imgFormulaA).attr('rel', 'popover');
					$(imgFormulaA).popover({
					    title: '<strong>Lan&ccedil;amento obl&iacute;quo - Alcance (dist&acirc;ncia)</strong>',
					    placement: 'left',
					    content:'<p>Onde:</p>'+ '<p><strong>d</strong> &eacute; a dist&acirc;ncia horizontal;</p>'
					    + '<p><strong>V</strong> &eacute; a velocidade de lan&ccedilamento do proj&eacute;til;</p>'
					    + '<p><strong>&theta;</strong> &eacute; o &acirc;ngulo de inclina&ccedil;&atilde;o do canh&atilde;o e</p>'
					    + '<p><strong>t</strong> &eacute; o instante(tempo).</p>',
					    trigger: 'hover',
					    html: true
					});

					$(imgFormulaAl).attr('rel', 'popover');
					$(imgFormulaAl).popover({
					    title: '<strong>Lan&ccedil;amento obl&iacute;quo - Posi&ccedil;&atilde;o vertical (Altura)</strong>',
					    placement: 'left',
					    content:'<p>Onde:</p>'+ '<p><strong>h</strong> &eacute; a altura em qualquer instante;</p>'
					    + '<p><strong>h<sub>0</sub></strong> &eacute; a altura inicial;</p>'
					    + '<p><strong>V</strong> &eacute; a velocidade de lan&ccedil;amento do proj&eacute;til;</p>'
					    + '<p><strong>&theta;</strong> &eacute; o &acirc;ngulo de inclina&ccedil;&atilde;o do canh&atilde;o; </p>'
					    + '<p><strong>t</strong> &eacute; o instante(tempo) e </p>'
					    + '<p><strong>g</strong> &eacute; a gravidade.</p>',
					    trigger: 'hover',
					    html: true
					});

					return div;
				},
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-aula btn-sm',
							autospin : false,
							action : function(dialogRef) {
								doneStep('Parab&eacute;ns voc&ecirc; terminou o tutorial de como mudar o &acirc;ngulo do canh&atilde;o');
                                ativaAngulo();
                                dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-cancela btn-sm',
							autospin : false,
							action : function(dialogRef) {
                                ativaTudo();
								dialogRef.close();
							}
						} ]
			});
	dialog.realize();
	dialog.getModalHeader().addClass("header-modal-aula");
	dialog.getModalFooter().addClass("footer-modal-aula");
	dialog.getModalBody().addClass("body-modal-aula");
	dialog.open();

}

function alterarMola() {
	var dialog = new BootstrapDialog(
			{
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				message : function(dialogRef) {
					var $message = $('<div>'
							+ '<p class="text-modal">Dentro do canh&atilde;o que temos em cena'
							+ ' existe uma mola.</p>'
							+ '<img alt="Imagem Do Canh&atilde;o" src="img/desenhoCanhao.png">'
							+ '<p class="text-modal">'
							+ 'Essa mola &eacute; reponsavel por fazer a bola sair do '
							+ 'canh&atilde;o com mais ou menos for&ccedil;a. <br> Nesse '
							+ 'tutorial vamos explorar essa caracteristica.'
							+ '</p>'
							+ '<div class="media">'
							+ '<div class="media-left media-middle">'
							+ '<img class="media-object" src="img/MudaMola.PNG" alt="...">'
							+ '</div>'
							+ '<div class="media-body">'
							+ '<p class="text-modal">Para isso voc&ecirc; pode alterar o valor de <strong>x</strong> ou de <strong>K</strong> juntos ou n&atilde;o.</p>'
							+ '<p class="text-modal">Por&eacute;m primeiro dispare com os valores que j&aacute; est&atilde;o l&aacute; depois altere para ver a diferen&ccedil;a.</p>'
							+ '</div>' + '</div>' + '</div>');
					return $message;
				},
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-aula btn-sm',
							autospin : false,
							action : function(dialogRef) {
								//actionUser();
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-cancela btn-sm',
							autospin : false,
							action : function(dialogRef) {
                                ativaTudo();
								dialogRef.close();
							}
						} ]
			});
	dialog.realize();
	dialog.getModalHeader().addClass("header-modal-aula");
	dialog.getModalFooter().addClass("footer-modal-aula");
	dialog.getModalBody().addClass("body-modal-aula");
	dialog.open();

}

function alterarMaterial() {
	var dialog = new BootstrapDialog(
			{
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				message : function(dialogRef) {
					var message = document.createElement('div');
					message.id="tabela"
					message.innerHTML = '<p>Logo abaixo temos a densidade de alguns materiais.</p>'+
					'<div class="panel panel-default">'+
						'<!-- Default panel contents -->'+
						'<div class="panel-heading  title-Tabel">Materiais</div>'+
						'<!-- Table -->'+
						'<table class="table">'+
							'<thead>'+
								'<tr class="item-Table">'+
									'<th></th>'+
									'<th>Material</th>'+
									'<th>Densidade</th>'+
								'</tr>'+
							'</thead>'+
							'<tbody>'+
								'<tr class="item-Table">'+
									'<th scope="row">1.</th>'+
									'<td>Borracha Silicone</td>'+
									'<td>&mu; = 0,95 g/cm&sup3;</td>'+
								'</tr>'+
								'<tr class="item-Table">'+
									'<th scope="row">2.</th>'+
									'<td>Alum&iacute;nio</td>'+
									'<td>&mu; = 2,70 g/cm&sup3;</td>'+
								'</tr>'+
								'<tr class="item-Table">'+
									'<th scope="row">3.</th>'+
									'<td>Ferro</td>'+
									'<td>&mu; = 7,97 g/cm&sup3;</td>'+
								'</tr>'+
								'<tr class="item-Table">'+
									'<th scope="row">4.</th>'+
									'<td>Ouro</td>'+
									'<td>&mu; = 19,25 g/cm&sup3;</td>'+
								'</tr>'+
								'<tr class="item-Table">'+
									'<th scope="row">5.</th>'+
									'<td>Vidro Comum</td>'+
									'<td>&mu; = 2,60 g/cm&sup3;</td>'+
								'</tr>'+
								'<tr class="item-Table">'+
									'<th scope="row">6.</th>'+
									'<td>Madeira seca (cedro)</td>'+
									'<td>&mu; = 0.485 g/cm&sup3;</td>'+
									'</tr>'+
								'<tr class="item-Table">'+
									'<th scope="row">7.</th>'+
									'<td>Madeira seca (ip&ecirc;)</td>'+
									'<td>&mu; = 1,10 g/cm&sup3;</td>'+
								'</tr>'+
							'</tbody>'+
						'</table>'+
					'</div>';
					var paragrafoExp = document.createElement('p');
					paragrafoExp.className = "text-modal";
					paragrafoExp.innerHTML = "Nesse menu voc&ecirc; seleciona o material que vai quere na bola:";
					message.appendChild(paragrafoExp);

					var imgMate = document.createElement('img');
					imgMate.src = "img/MateriaisBola.PNG";

					message.appendChild(imgMate);
					var paragrafo = document.createElement('p');
					paragrafo.className = "text-modal";
					paragrafo.innerHTML = "Podemos mudar o material da bola e isso acabar&aacute; interferindo no comportameto dela." +
							"<br>" +
							"Vamos ver crie uma bola com o material já escolhido e depois crie outra com um material diferente." +
							"<br>"+
							"<br>"+
							"Com a formula a seguir voc&ecirc; pode calcular a massa do objeto.";
					message.appendChild(paragrafo);

					var divImg = document.createElement('div');
					divImg.className = "divImagem";
					var img = document.createElement('img');
					img.src="img/FormulaMassa2.png";
					img.className = "imgFormula";
					$(img).attr('rel', 'popover');
					$(img).popover({
					    title: '<strong>Densidade dos proj&eacute;teis</strong>',
					    placement: 'left',
					    content:'<p>Onde:</p>'+ '<p><strong>m</strong> &eacute; a massa do corpo;</p>'
					    + '<p><strong>v</strong> &eacute; o volume do corpo e</p>'
					    + '<p><strong>&mu;</strong> &eacute; a densidade dos proj&eacute;teis.</p>',
					    trigger: 'hover',
					    html: true
					});
					divImg.appendChild(img);
					message.appendChild(divImg);
					return message;
				},
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-aula btn-sm',
							autospin : false,
							action : function(dialogRef) {
								//actionUser();
                                desativaImagem();
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-cancela btn-sm',
							autospin : false,
							action : function(dialogRef) {
                                ativaTudo();
								dialogRef.close();
							}
						} ]
			});
	dialog.realize();
	dialog.getModal().css('overflow','auto');
	dialog.getModalHeader().addClass("header-modal-aula");
	dialog.getModalFooter().addClass("footer-modal-aula");
	dialog.getModalBody().addClass("body-modal-aula");
	dialog.open();
	//setTimeout(includeAbout("tabela","./table.html"),99999999999999999);
	//includeAbout("tabela","./table.html");
}

function alteraGravidade() {
	var dialog = new BootstrapDialog(
			{
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				message : function(dialogRef) {
					var $message = $('<div>'
							+ '<p class="text-modal">Uma das coisa que voc&ecirc; pode alterar no cen&aacute;rio &eacute; a graviade nele vamos tente'
							+ '.</p>'
							+ '<p class="text-modal">Para ver o que vai acontecer clique nesse botão <img src="img/btnAlteraGravidade.png" style="width: 130px"> e altere a gravidade e logo em seguida dispare uma bola'
							+ '.</p>'
							+ '</div>');
					return $message;
				},
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-aula btn-sm',
							autospin : false,
							action : function(dialogRef) {
								//actionUser();
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-cancela btn-sm',
							autospin : false,
							action : function(dialogRef) {
                                ativaTudo();
								dialogRef.close();
							}
						} ]
			});
	dialog.realize();
	dialog.getModalHeader().addClass("header-modal-aula");
	dialog.getModalFooter().addClass("footer-modal-aula");
	dialog.getModalBody().addClass("body-modal-aula");
	dialog.open();

}

function alteraGravidade2() {
	var dialog = new BootstrapDialog(
			{
				title : '<strong>Tutorial</strong>',
				size : 'size-normal',
				message : function(dialogRef) {
					var $message = $('<div>'
							+ '<p class="text-modal">Certo agora altere de novo e veja o que acontece.'
							+ '</p>'
							+ '</div>');
					return $message;
				},
				closable : false,
				closeByBackdrop : false,
				closeByKeyboard : false,
				draggable : true,
				buttons : [
						{
							// id: 'btn-add',
							label : ' Pr&oacute;ximo &rarr;',
							cssClass : 'btn btn-aula btn-sm',
							autospin : false,
							action : function(dialogRef) {
								//actionUser();
								//option = "5";
								dialogRef.close();
							}
						},
						{
							id : 'btn-close',
							label : ' Cancela <span class="glyphicon glyphicon-remove-circle"aria-hidden="true"></span>',
							cssClass : 'btn btn-cancela btn-sm',
							autospin : false,
							action : function(dialogRef) {
                                ativaTudo();
								dialogRef.close();
							}
						} ]
			});
	dialog.realize();
	dialog.getModalHeader().addClass("header-modal-aula");
	dialog.getModalFooter().addClass("footer-modal-aula");
	dialog.getModalBody().addClass("body-modal-aula");
	dialog.open();

}
