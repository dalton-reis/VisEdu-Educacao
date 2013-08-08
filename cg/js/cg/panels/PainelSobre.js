
function PainelSobre( editor ) {		

	UI.Panel.call( this ); 
	
	var scope = this;
	
	scope.setClass( 'painel' );
	scope.setPosition( 'absolute' );	
	scope.setDisplay( 'broke' );
	
	scope.editor = editor;	
	
	var option;
	
	
	// Ajuda
	
	scope.opcaoAjuda = new UI.Panel();
	scope.opcaoAjuda.setCursor( 'pointer' );
	scope.opcaoAjuda.setPadding( '8px' );
	scope.opcaoAjuda.setTextContent( 'Ajuda' );
	scope.add( scope.opcaoAjuda );	
	
	// Dicas
	
	scope.opcaoDicas = new UI.Panel();
	scope.opcaoDicas.setCursor( 'pointer' );
	scope.opcaoDicas.setPadding( '8px' );
	scope.opcaoDicas.setTextContent( 'Dicas' );
	scope.add( scope.opcaoDicas );	
	
	// Sobre
	
	scope.opcaoSobre = new UI.Panel();
	scope.opcaoSobre.setCursor( 'pointer' );
	scope.opcaoSobre.setPadding( '8px' );
	scope.opcaoSobre.setTextContent( 'Sobre' );
	scope.add( scope.opcaoSobre );
	

	
	
}

PainelSobre.prototype = Object.create( UI.Panel.prototype );

