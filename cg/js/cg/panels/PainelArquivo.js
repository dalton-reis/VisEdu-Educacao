function PainelArquivo( editor ) {
	UI.Panel.call( this );
	var scope = this;
	scope.setClass( 'painel' );
	scope.setPosition( 'absolute' );
	scope.setDisplay( 'broke' );
	scope.editor = editor;
	// Abrir
	scope.opcaoAbrir = new UI.Panel();
	scope.opcaoAbrir.setCursor( 'pointer' );
	scope.opcaoAbrir.setPadding( '8px' );
	scope.opcaoAbrir.setTextContent( 'Abrir' );
	scope.add( scope.opcaoAbrir );
	// Exportar
	var opcaoExportar = new UI.Panel();
	opcaoExportar.setPadding( '7px' );
	opcaoExportar.setCursor( 'pointer' );
	opcaoExportar.setTextContent( 'Exportar' );
	opcaoExportar.onClick( function () {
		var parseString = new ExportadorJSON().parse( scope.editor );
		var blob = new Blob([Util.file.stringToJSONOutput( parseString )], {type: "text/plain;charset=UTF-8"});
		saveAs(blob, "exportar.txt");
	} );
	scope.add( opcaoExportar );
}
PainelArquivo.prototype = Object.create( UI.Panel.prototype );
