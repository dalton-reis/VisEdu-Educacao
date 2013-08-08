
function PainelAjuda( ) {		

	UI.Panel.call( this ); 
	
	var scope = this;
		
	scope.setClass( 'afterPainelEscuro' );
	scope.setPosition( 'absolute' );	
	scope.setDisplay( 'broke' );	
		

	
	
	
	var linha = new UI.Panel();
	linha.add( new UI.Text( 'Tutoriais de Ajuda' ).setWidth( '500px' ).setColor( '#000' ) );
	scope.add( linha );
	
		
	
	var widthPanels = '99%',
		heightPanels = 'calc(100% - 140px)', 
		paddingPanels = '8px';
	
	scope.paineis = new UI.Panel();
	scope.paineis.setWidth( widthPanels );
	scope.paineis.setHeight( heightPanels );
	scope.paineisTemp = new UI.Panel();
	scope.paineis.add( scope.paineisTemp );
	
	
	scope.labelIntroducao = new UI.Text( 'Introducao' );	
	scope.labelIntroducao.setWidth( '70px' );
	scope.labelIntroducao.setPadding( '8px' );	
	scope.add( scope.labelIntroducao );
	
	scope.labelDicas = new UI.Text( 'Dicas' );	
	scope.labelDicas.setWidth( '40px' );
	scope.labelDicas.setPadding( '8px' );
	scope.add( scope.labelDicas );
	
	scope.labelFabrica = new UI.Text( 'Fabrica' );	
	scope.labelFabrica.setWidth( '50px' );
	scope.labelFabrica.setPadding( '8px' );	
	scope.add( scope.labelFabrica );
	
	scope.labelVisualizadorGrafico = new UI.Text( 'Espaco Grafico' );	
	scope.labelVisualizadorGrafico.setWidth( '95px' );
	scope.labelVisualizadorGrafico.setPadding( '8px' );	
	scope.add( scope.labelVisualizadorGrafico );
	
	scope.labelVisaoCamera = new UI.Text( 'Visao da Camera' );	
	scope.labelVisaoCamera.setWidth( '105px' );
	scope.labelVisaoCamera.setPadding( '8px' );	
	scope.add( scope.labelVisaoCamera );
	
	scope.labelPropriedades = new UI.Text( 'Propriedades da Peca' );	
	scope.labelPropriedades.setWidth( '135px' );
	scope.labelPropriedades.setPadding( '8px' );	
	scope.add( scope.labelPropriedades );
	
	scope.labelListaPecas = new UI.Text( 'Lista de Pecas' );	
	scope.labelListaPecas.setWidth( '95px' );
	scope.labelListaPecas.setPadding( '8px' );	
	scope.add( scope.labelListaPecas );
	
	scope.labelCodigoFonte = new UI.Text( 'Comandos JOGL' );	
	scope.labelCodigoFonte.setWidth( '100px' );
	scope.labelCodigoFonte.setPadding( '8px' );	
	scope.add( scope.labelCodigoFonte );
	
	scope.labelArquivo = new UI.Text( 'Arquivo' );	
	scope.labelArquivo.setWidth( '60px' );
	scope.labelArquivo.setPadding( '8px' );	
	scope.add( scope.labelArquivo );
	
	scope.labelAjuda = new UI.Text( 'Ajuda' );	
	scope.labelAjuda.setWidth( '40px' );
	scope.labelAjuda.setPadding( '8px' );	
	scope.add( scope.labelAjuda );
	
	scope.labelSobre = new UI.Text( 'Sobre' );	
	scope.labelSobre.setWidth( '40px' );
	scope.labelSobre.setPadding( '8px' );	
	scope.add( scope.labelSobre );
	
	scope.add( new UI.Panel().add( new UI.Text( ' ' ) ) );
	scope.add( scope.paineis );
	
	
	scope.panelIntroducao = new UI.Panel();
	scope.panelIntroducao.dom = document.getElementById('divIntroducao');	
	scope.panelIntroducao.setClass( 'painelAjuda' );
	scope.panelIntroducao.setWidth( '100%' );
	scope.panelIntroducao.setHeight( '100%' );
	scope.panelIntroducao.setPadding( paddingPanels );
		
	
	scope.panelDicas = new UI.Panel();
	scope.panelDicas.dom = document.getElementById('divDicas');	
	scope.panelDicas.setClass( 'painelAjuda' );
	scope.panelDicas.setWidth( '100%' );
	scope.panelDicas.setHeight( '100%' );
	scope.panelDicas.setPadding( paddingPanels );
	
	scope.panelFabrica = new UI.Panel();
	scope.panelFabrica.dom = document.getElementById('divFabrica');	
	scope.panelFabrica.setClass( 'painelAjuda' );
	scope.panelFabrica.setWidth( '100%' );
	scope.panelFabrica.setHeight( '100%' );
	scope.panelFabrica.setPadding( paddingPanels );
	
	scope.panelVisualizadorGrafico = new UI.Panel();
	scope.panelVisualizadorGrafico.dom = document.getElementById('divVisualisadorGrafico');	
	scope.panelVisualizadorGrafico.setClass( 'painelAjuda' );
	scope.panelVisualizadorGrafico.setWidth( '100%' );
	scope.panelVisualizadorGrafico.setHeight( '100%' );
	scope.panelVisualizadorGrafico.setPadding( paddingPanels );
	
	scope.panelVisaoCamera = new UI.Panel();
	scope.panelVisaoCamera.dom = document.getElementById('divVisaoCamera');	
	scope.panelVisaoCamera.setClass( 'painelAjuda' );
	scope.panelVisaoCamera.setWidth( '100%' );
	scope.panelVisaoCamera.setHeight( '100%' );
	scope.panelVisaoCamera.setPadding( paddingPanels );
	
	scope.panelPropriedades = new UI.Panel();
	scope.panelPropriedades.dom = document.getElementById('divPropriedades');	
	scope.panelPropriedades.setClass( 'painelAjuda' );
	scope.panelPropriedades.setWidth( '100%' );
	scope.panelPropriedades.setHeight( '100%' );
	scope.panelPropriedades.setPadding( paddingPanels );
	
	scope.panelListaPecas = new UI.Panel();
	scope.panelListaPecas.dom = document.getElementById('divListaPecas');	
	scope.panelListaPecas.setClass( 'painelAjuda' );
	scope.panelListaPecas.setWidth( '100%' );
	scope.panelListaPecas.setHeight( '100%' );
	scope.panelListaPecas.setPadding( paddingPanels );	
	
	scope.panelCodigoFonte = new UI.Panel();
	scope.panelCodigoFonte.dom = document.getElementById('divCodigoFonte');	
	scope.panelCodigoFonte.setClass( 'painelAjuda' );
	scope.panelCodigoFonte.setWidth( '100%' );
	scope.panelCodigoFonte.setHeight( '100%' );
	scope.panelCodigoFonte.setPadding( paddingPanels );
	
	scope.panelArquivo = new UI.Panel();
	scope.panelArquivo.dom = document.getElementById('divArquivo');	
	scope.panelArquivo.setClass( 'painelAjuda' );
	scope.panelArquivo.setWidth( '100%' );
	scope.panelArquivo.setHeight( '100%' );
	scope.panelArquivo.setPadding( paddingPanels );
	
	scope.panelAjuda = new UI.Panel();
	scope.panelAjuda.dom = document.getElementById('divAjuda');	
	scope.panelAjuda.setClass( 'painelAjuda' );
	scope.panelAjuda.setWidth( '100%' );
	scope.panelAjuda.setHeight( '100%' );
	scope.panelAjuda.setPadding( paddingPanels );
	
	scope.panelSobre = new UI.Panel();
	scope.panelSobre.dom = document.getElementById('divSobre');	
	scope.panelSobre.setClass( 'painelAjuda' );
	scope.panelSobre.setWidth( '100%' );
	scope.panelSobre.setHeight( '100%' );
	scope.panelSobre.setPadding( paddingPanels );
	
	scope.esconderPaineis = function () {
	
		scope.labelIntroducao.setColor( '#AAA' );
		scope.labelIntroducao.setCursor( 'pointer' );	
		
		scope.labelDicas.setColor( '#AAA' );
		scope.labelDicas.setCursor( 'pointer' );	
		
		scope.labelFabrica.setColor( '#AAA' );
		scope.labelFabrica.setCursor( 'pointer' );	
		
		scope.labelVisualizadorGrafico.setColor( '#AAA' );
		scope.labelVisualizadorGrafico.setCursor( 'pointer' );	
		
		scope.labelVisaoCamera.setColor( '#AAA' );
		scope.labelVisaoCamera.setCursor( 'pointer' );		
		
		scope.labelPropriedades.setColor( '#AAA' );
		scope.labelPropriedades.setCursor( 'pointer' );	
		
		scope.labelListaPecas.setColor( '#AAA' );
		scope.labelListaPecas.setCursor( 'pointer' );			
		
		scope.labelCodigoFonte.setColor( '#AAA' );
		scope.labelCodigoFonte.setCursor( 'pointer' );	
		
		scope.labelArquivo.setColor( '#AAA' );
		scope.labelArquivo.setCursor( 'pointer' );	
		
		scope.labelAjuda.setColor( '#AAA' );
		scope.labelAjuda.setCursor( 'pointer' );	
		
		scope.labelSobre.setColor( '#AAA' );
		scope.labelSobre.setCursor( 'pointer' );	
		
	}
	scope.esconderPaineis();
	
	function mostrarPanel( panel ) {
	
		scope.paineis.remove( scope.paineisTemp );
		scope.paineisTemp = new UI.Panel();
		scope.paineisTemp.setWidth( '100%' );
		scope.paineisTemp.setHeight( '100%' );
		scope.paineisTemp.add( panel );		
		scope.paineis.add( scope.paineisTemp );
	
	}
	
	function mostrarIntroducao() {
	
		scope.esconderPaineis();
		
		scope.labelIntroducao.setColor( '#000' );
		scope.labelIntroducao.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelIntroducao );
	
	}
	
	function mostrarDicas() {
	
		scope.esconderPaineis();
	
		scope.labelDicas.setColor( '#000' );
		scope.labelDicas.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelDicas );
		
	}
	
	function mostrarFabrica() {
	
		scope.esconderPaineis();
	
		scope.labelFabrica.setColor( '#000' );
		scope.labelFabrica.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelFabrica );
		
	}
	
	function mostrarVisualizadorGrafico() {
	
		scope.esconderPaineis();
	
		scope.labelVisualizadorGrafico.setColor( '#000' );
		scope.labelVisualizadorGrafico.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelVisualizadorGrafico );
		
	}
	
	function mostrarVisaoCamera() {
	
		scope.esconderPaineis();
	
		scope.labelVisaoCamera.setColor( '#000' );
		scope.labelVisaoCamera.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelVisaoCamera );
		
	}
	
	function mostrarPropriedades() {
	
		scope.esconderPaineis();
	
		scope.labelPropriedades.setColor( '#000' );
		scope.labelPropriedades.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelPropriedades );
		
	}
	
	function mostrarListaPecas() {
	
		scope.esconderPaineis();
	
		scope.labelListaPecas.setColor( '#000' );
		scope.labelListaPecas.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelListaPecas );
		
	}
	
	function mostrarCodigoFonte() {
	
		scope.esconderPaineis();
	
		scope.labelCodigoFonte.setColor( '#000' );
		scope.labelCodigoFonte.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelCodigoFonte );
		
	}
	
	function mostrarArquivo() {
	
		scope.esconderPaineis();
	
		scope.labelArquivo.setColor( '#000' );
		scope.labelArquivo.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelArquivo );
		
	}
	
	function mostrarAjuda() {
	
		scope.esconderPaineis();
	
		scope.labelAjuda.setColor( '#000' );
		scope.labelAjuda.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelAjuda );
		
	}
	
	function mostrarSobre() {
	
		scope.esconderPaineis();
	
		scope.labelSobre.setColor( '#000' );
		scope.labelSobre.setCursor( 'auto' );	
		
		mostrarPanel( scope.panelSobre );
		
	}
	
	scope.mostrarPainel = function( nomePainel ) {		
		
		if ( nomePainel == 'INTRODUCAO' ) {
		
			mostrarIntroducao();
		
		} else if ( nomePainel == 'DICAS' ) {
		
			mostrarDicas();
		
		} else if ( nomePainel == 'FABRICA' ) {
		
			mostrarFabrica();
		
		} else if ( nomePainel == 'VISUALIZADORGRAFICO' ) {
		
			mostrarVisualizadorGrafico();
		
		} else if ( nomePainel == 'VISAOCAMERA' ) {
		
			mostrarVisaoCamera();
		
		} else if ( nomePainel == 'PROPRIEDADES' ) {
		
			mostrarPropriedades();
		
		} else if ( nomePainel == 'LISTAPECAS' ) {
		
			mostrarListaPecas();
		
		} else if ( nomePainel == 'CODIGOFONTE' ) {
		
			mostrarCodigoFonte();
		
		} else if ( nomePainel == 'ARQUIVO' ) {
		
			mostrarArquivo();
		
		} else if ( nomePainel == 'AJUDA' ) {
		
			mostrarAjuda();
		
		} else if ( nomePainel == 'SOBRE' ) {
		
			mostrarSobre();
		
		}
		
	}
	
	scope.labelIntroducao.onClick( mostrarIntroducao );
	scope.labelDicas.onClick( mostrarDicas );
	scope.labelFabrica.onClick( mostrarFabrica );
	scope.labelVisualizadorGrafico.onClick( mostrarVisualizadorGrafico );
	scope.labelVisaoCamera.onClick( mostrarVisaoCamera );
	scope.labelPropriedades.onClick( mostrarPropriedades );
	scope.labelListaPecas.onClick( mostrarListaPecas );
	scope.labelCodigoFonte.onClick( mostrarCodigoFonte );
	scope.labelArquivo.onClick( mostrarArquivo );
	scope.labelAjuda.onClick( mostrarAjuda );
	scope.labelSobre.onClick( mostrarSobre );
	
	scope.add( new UI.Panel().add( new UI.Text( ' ' ) ) );	
	
	// Botoes
	
	linha = new UI.Panel();
	linha.setMargin( '0px auto 0px auto' ); /* centered */
	linha.setWidth(	'50px'	);
	
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

PainelAjuda.prototype = Object.create( UI.Panel.prototype );

