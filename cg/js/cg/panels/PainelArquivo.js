
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
		
		//Util.browser.openURL( blobURL );
		
		//FAZ DOWNLOAD AUTOMÁTICAMENTE DA EXPOTAÇÃO EM TXT
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
}

PainelArquivo.prototype = Object.create( UI.Panel.prototype );

