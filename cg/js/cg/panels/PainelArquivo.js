
function PainelArquivo( editor ) {		

	UI.Panel.call( this ); 
	
	var scope = this;
	
	scope.setClass( 'painel' );
	scope.setPosition( 'absolute' );	
	scope.setDisplay( 'broke' );
	
	scope.editor = editor;	
	
	var option;
	
	/*// Salvar
	
	option = new UI.Panel();
	option.setPadding( '7px' );
	option.setCursor( 'pointer' );
	option.setTextContent( 'Salvar' );
	option.onClick( function () {
		
		var parseString = new ExportadorJSON().parse( scope.editor.painelMontagem );
		
		var outputJSON = Util.file.stringToJSONOutput( parseString );
		
		var blobURL = Util.file.JSONOutputToBlobURL ( outputJSON );
		
		Util.file.saveBlobToDisk( blobURL, 'exercicio.txt' );

	} );
	scope.add( option );	*/
	
	
	// Abrir
	
	scope.opcaoAbrir = new UI.Panel();
	scope.opcaoAbrir.setCursor( 'pointer' );
	scope.opcaoAbrir.setPadding( '8px' );
	scope.opcaoAbrir.setTextContent( 'Abrir' );
	scope.add( scope.opcaoAbrir );	
	
	// Exportar
	
	//var exportarImagens =  new UI.Checkbox( false );
	
	option = new UI.Panel();
	option.setPadding( '7px' );
	option.setCursor( 'pointer' );
	option.setTextContent( 'Exportar' );
	option.onClick( function () {
		
		var parseString = new ExportadorJSON().parse( scope.editor );
		
		var outputJSON = Util.file.stringToJSONOutput( parseString );
		
		var blobURL = Util.file.JSONOutputToBlobURL ( outputJSON );
		
		Util.file.openURL( blobURL );

	} );
	scope.add( option );
	

	
	
}

PainelArquivo.prototype = Object.create( UI.Panel.prototype );

