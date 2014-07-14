
function PainelAbrir( ) {		

	UI.Panel.call( this ); 
	
	var scope = this;
		
	scope.setClass( 'afterPainelEscuro' );
	scope.setPosition( 'absolute' );	
	scope.setDisplay( 'broke' );

	
	scope.textoExportado = new UI.TextArea().setWidth( '95%' ).setHeight( '100%' ).setColor( '#444' ).setFontSize( '12px' );	
	
	var arquivoExportado = new UI.ArquivoTexto().setWidth( '380px' );		
	arquivoExportado.onChange( function () {
	
		scope.textoExportado.setValue( arquivoExportado.getValue() );
		
	}); 
	
	scope.listaExercicios = new UI.Select().setOptions( CG.listaDeExercicios ).setWidth( '150px' ).setColor( '#444' ).setFontSize( '12px' );			
	scope.listaExercicios.onChange( function () {
	
		if	( scope.listaExercicios.getValue() !== "nenhum" ) {
		
			var request = new XMLHttpRequest();		
			
			request.onreadystatechange = function () {		 	

				//Verifica o status do retorno do servidor web
				if(request.readyState == 4 && request.status == 200){			
					
					scope.textoExportado.setValue( request.responseText );
					
				}
				
			};	

			request.open( 'GET', scope.listaExercicios.getValue(), false );
			request.send( null );
			
		}
		
	});
	
	var linha;
	
	// titulo
	
	linha = new UI.Panel();
	linha.add( new UI.Text( 'Selecione um aquivo ou informe o texto exportado' ).setWidth( '500px' ).setColor( '#000' ) );
	scope.add( linha );
	
	// Arquivo e exemplos
	
	linha = new UI.Panel();
	linha.setPadding( '8px' );	
	linha.add( new UI.Text( 'Arquivo' ).setWidth( '25px' ).setColor( '#666' ) );
	linha.add( new UI.Text( '' ).setWidth( '400px' ) );
	linha.add( new UI.Text( 'Lista de Exemplos' ).setWidth( '120px' ).setColor( '#666' ) );
	scope.add( linha );
	
	linha = new UI.Panel();
	linha.setPadding( '8px' );
	linha.add( new UI.Text( '' ).setWidth( '20px' ) );		
	linha.add( arquivoExportado );	
	linha.add( new UI.Text( '' ).setWidth( '45px' ) );	
	linha.add( scope.listaExercicios );	
	scope.add( linha );
	
	
	// Texto
	
	linha = new UI.Panel();
	linha.setPadding( '8px' );
	linha.setTextContent( 'Texto Exportado' );
	scope.add( linha );	
	
	linha = new UI.Panel();
	linha.setHeight( 'calc(100% - 170px)' );
	linha.setPadding( '8px' );
	linha.add( new UI.Text( '' ).setWidth( '25px' ).setColor( '#666' ) );		
	linha.add( scope.textoExportado );
	scope.add( linha );	
	
	// Botoes
	
	linha = new UI.Panel();
	linha.setMargin( '0px auto 0px auto' ); /* centered */
	linha.setWidth(	'150px'	);
	
	scope.botaoAbrir = new UI.Text( 'Abrir' );
	scope.botaoAbrir.setCursor( 'pointer' );
	scope.botaoAbrir.setColor( '#fff' );
	scope.botaoAbrir.setClass( 'painelBotao' );
	scope.botaoAbrir.setWidth( '50px' );
	scope.botaoAbrir.setBackground( '0x000000' );
	scope.botaoAbrir.setPadding( '8px' );
	linha.add( scope.botaoAbrir );	
	
	linha.add( new UI.Text( '' ).setWidth( '5px' ) );	
	
	scope.botaoSair = new UI.Text( 'Sair' );
	scope.botaoSair.setCursor( 'pointer' );
	scope.botaoSair.setColor( '#fff' );
	scope.botaoSair.setClass( 'painelBotao' );
	scope.botaoSair.setWidth( '50px' );
	scope.botaoSair.setBackground( '0x000000' );
	scope.botaoSair.setPadding( '8px' );
	linha.add( scope.botaoSair );	

	scope.add( linha );		
	
	
}

PainelAbrir.prototype = Object.create( UI.Panel.prototype );

