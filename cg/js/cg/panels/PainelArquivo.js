
function PainelArquivo( editor ) {

	UI.Panel.call( this );

	var scope = this;

	scope.setClass( 'painel' );
	scope.setPosition( 'absolute' );
	scope.setDisplay( 'broke' );

	scope.editor = editor;


	/*// Salvar

	var opcaoSalvar = new UI.Panel();
	opcaoSalvar.setPadding( '7px' );
	opcaoSalvar.setCursor( 'pointer' );
	opcaoSalvar.setTextContent( 'Salvar' );
	opcaoSalvar.onClick( function () {

		var parseString = new ExportadorJSON().parse( scope.editor.painelMontagem );

		var outputJSON = Util.file.stringToJSONOutput( parseString );

		var blobURL = Util.file.JSONOutputToBlobURL ( outputJSON );

		Util.file.saveBlobToDisk( blobURL, 'exercicio.txt' );

	} );
	scope.add( opcaoSalvar );	*/


	// Abrir

	scope.opcaoAbrir = new UI.Panel();
	scope.opcaoAbrir.setCursor( 'pointer' );
	scope.opcaoAbrir.setPadding( '8px' );
	scope.opcaoAbrir.setTextContent( 'Abrir' );
	scope.add( scope.opcaoAbrir );

	// Exportar

	//var exportarImagens =  new UI.Checkbox( false );

	var opcaoExportar = new UI.Panel();
	opcaoExportar.setPadding( '7px' );
	opcaoExportar.setCursor( 'pointer' );
	opcaoExportar.setTextContent( 'Exportar' );
	opcaoExportar.onClick( function () {

		var parseString = new ExportadorJSON().parse( scope.editor );

		var outputJSON = Util.file.stringToJSONOutput( parseString );

		var blobURL = Util.file.JSONOutputToBlobURL ( outputJSON );

		//FAZ DOWNLOAD AUTOM�TICAMENTE DA EXPOTA��O EM TXT
		var saveData = (function () {
		    var a = document.createElement("a");
		    document.body.appendChild(a);
		    a.style = "display: none";
		    return function (data, fileName) {
		        var blob = new Blob([data], {type: "text/plain; charset=ISO-8859-1"}),
		            url = window.URL.createObjectURL(blob);
		        a.href = url;
		        a.download = fileName;
		        a.click();
		        window.URL.revokeObjectURL(url);
		    };
		}());

		saveData(outputJSON, "Exportar.txt");

	} );
	scope.add( opcaoExportar );

	//TODO - esse op��o n�o deve ficar aqui. Precisa ser colocada em
	//um menu separado. VOu colocar aqui temporariamente para testes
	var opcaoPlay = new UI.Panel();
	opcaoPlay.setPadding( '7px' );
	opcaoPlay.setCursor( 'pointer' );
	opcaoPlay.setTextContent( 'Play' );
	opcaoPlay.onClick( function () {
		startAnimations(editor.painelMontagem);
	});
	scope.add(opcaoPlay);

	/**
	 * M�todo que vai percorrer todos os itens de objetos gr�ficos existentes
	 * e vai iniciar as anima��es
	 */
	function startAnimations(item){
		if (item.filhos.length > 0){
			//percorre os filhos procurando um objeto grafico que tenha anima��o
			for (var i = 0; i < item.filhos.length; i++) {
				var filho = item.filhos[i];
				if( filho.id == EIdsItens.OBJETOGRAFICO && filho.isAnimated ){
					//encontrou um filho animado \o/
					var animationChain = []
					var easing = undefined;
					var obj = undefined;
					//pega a fun��o de interpola��o da anima��o para esse filho
					for( var q = 0; q < filho.filhos.length; q++ ){
						if( filho.filhos[q].id == EIdsItens.ANIMACAO ){
							easing = filho.filhos[q].easing;
							break;
						}
					}
					//pega todas as anima��es para esse filho
					for( var q = 0; q < filho.filhos.length; q++ ){
						var animation = null;
						if( filho.filhos[q].tipoEncaixe == ETiposEncaixe.DIAMANTE ){
							var animationItem = filho.filhos[q];
							if( animationItem.id == EIdsItens.TRANSLADAR ){
								animation = new TWEEN.Tween(filho.objetoScene.position)
									.to({x: (animationItem.valorXYZ.x >= 0 ? "+" : "-") + Math.abs(animationItem.valorXYZ.x),
									     y: (animationItem.valorXYZ.y >= 0 ? "+" : "-") + Math.abs(animationItem.valorXYZ.y),
									     z: (animationItem.valorXYZ.z >= 0 ? "+" : "-") + Math.abs(animationItem.valorXYZ.z)}, 2000)
									.easing(CG.getEasingFunction(easing));
							} else if( animationItem.id == EIdsItens.ROTACIONAR ){
								animation = new TWEEN.Tween(filho.objetoScene.rotation)
									.to({x: (animationItem.valorXYZ.x >= 0 ? "+" : "-") + Util.math.converteGrausParaRadianos(Math.abs(animationItem.valorXYZ.x)),
									     y: (animationItem.valorXYZ.y >= 0 ? "+" : "-") + Util.math.converteGrausParaRadianos(Math.abs(animationItem.valorXYZ.y)),
									     z: (animationItem.valorXYZ.z >= 0 ? "+" : "-") + Util.math.converteGrausParaRadianos(Math.abs(animationItem.valorXYZ.z))}, 2000)
									.easing(CG.getEasingFunction(easing));
							}
							animationChain.push(animation);
						}
					}
					//monta o chain com todas as anima��es para esse obj gr�fico
					for( var ai = animationChain.length-1; ai > 0; ai-- ){
						animationChain[ai-1].chain(animationChain[ai]);
					}
					//iniciar!
					if( animationChain[0] != undefined ){
						animationChain[0].start();
					}
				}//if
			}//for
		}
	}
}

PainelArquivo.prototype = Object.create( UI.Panel.prototype );

