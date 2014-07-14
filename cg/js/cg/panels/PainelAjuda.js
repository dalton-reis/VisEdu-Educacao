
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
	
	var paineis = new UI.Panel();
	paineis.setWidth( widthPanels );
	paineis.setHeight( heightPanels );
	var paineisTemp = new UI.Panel();
	paineis.add( paineisTemp );
	
	
	var labelIntroducao = new UI.Text( 'Introducao' );	
	labelIntroducao.setWidth( '70px' );
	labelIntroducao.setPadding( '8px' );	
	scope.add( labelIntroducao );
	
	var labeldicas = new UI.Text( 'Dicas' );	
	labeldicas.setWidth( '40px' );
	labeldicas.setPadding( '8px' );
	scope.add( labeldicas );
	
	var labelFabrica = new UI.Text( 'Fabrica' );	
	labelFabrica.setWidth( '50px' );
	labelFabrica.setPadding( '8px' );	
	scope.add( labelFabrica );
	
	var labelVisualizadorGrafico = new UI.Text( 'Espaco Grafico' );	
	labelVisualizadorGrafico.setWidth( '95px' );
	labelVisualizadorGrafico.setPadding( '8px' );	
	scope.add( labelVisualizadorGrafico );
	
	var labelVisaoCamera = new UI.Text( 'Visao da Camera' );	
	labelVisaoCamera.setWidth( '105px' );
	labelVisaoCamera.setPadding( '8px' );	
	scope.add( labelVisaoCamera );
	
	var labelPropriedades = new UI.Text( 'Propriedades da Peca' );	
	labelPropriedades.setWidth( '135px' );
	labelPropriedades.setPadding( '8px' );	
	scope.add( labelPropriedades );
	
	var labelListaPecas = new UI.Text( 'Lista de Pecas' );	
	labelListaPecas.setWidth( '95px' );
	labelListaPecas.setPadding( '8px' );	
	scope.add( labelListaPecas );
	
	var labelCodigoFonte = new UI.Text( 'Comandos JOGL' );	
	labelCodigoFonte.setWidth( '100px' );
	labelCodigoFonte.setPadding( '8px' );	
	scope.add( labelCodigoFonte );
	
	var labelArquivo = new UI.Text( 'Arquivo' );	
	labelArquivo.setWidth( '60px' );
	labelArquivo.setPadding( '8px' );	
	scope.add( labelArquivo );
	
	var labelAjuda = new UI.Text( 'Ajuda' );	
	labelAjuda.setWidth( '40px' );
	labelAjuda.setPadding( '8px' );	
	scope.add( labelAjuda );
	
	var labelSobre = new UI.Text( 'Sobre' );	
	labelSobre.setWidth( '40px' );
	labelSobre.setPadding( '8px' );	
	scope.add( labelSobre );
	
	scope.add( new UI.Panel().add( new UI.Text( ' ' ) ) );
	scope.add( paineis );
	
	
	var panelIntroducao = new UI.Panel();
	panelIntroducao.dom = document.getElementById('divIntroducao');	
	panelIntroducao.setClass( 'painelAjuda' );
	panelIntroducao.setWidth( '100%' );
	panelIntroducao.setHeight( '100%' );
	panelIntroducao.setPadding( paddingPanels );
	
	
	var panelDicas = new UI.Panel();
	panelDicas.dom = document.getElementById('divDicas');	
	panelDicas.setClass( 'painelAjuda' );
	panelDicas.setWidth( '100%' );
	panelDicas.setHeight( '100%' );
	panelDicas.setPadding( paddingPanels );
	
	var panelFabrica = new UI.Panel();
	panelFabrica.dom = document.getElementById('divFabrica');	
	panelFabrica.setClass( 'painelAjuda' );
	panelFabrica.setWidth( '100%' );
	panelFabrica.setHeight( '100%' );
	panelFabrica.setPadding( paddingPanels );
	
	var panelVisualizadorGrafico = new UI.Panel();
	panelVisualizadorGrafico.dom = document.getElementById('divVisualisadorGrafico');	
	panelVisualizadorGrafico.setClass( 'painelAjuda' );
	panelVisualizadorGrafico.setWidth( '100%' );
	panelVisualizadorGrafico.setHeight( '100%' );
	panelVisualizadorGrafico.setPadding( paddingPanels );
	
	var panelVisaoCamera = new UI.Panel();
	panelVisaoCamera.dom = document.getElementById('divVisaoCamera');	
	panelVisaoCamera.setClass( 'painelAjuda' );
	panelVisaoCamera.setWidth( '100%' );
	panelVisaoCamera.setHeight( '100%' );
	panelVisaoCamera.setPadding( paddingPanels );
	
	var panelPropriedades = new UI.Panel();
	panelPropriedades.dom = document.getElementById('divPropriedades');	
	panelPropriedades.setClass( 'painelAjuda' );
	panelPropriedades.setWidth( '100%' );
	panelPropriedades.setHeight( '100%' );
	panelPropriedades.setPadding( paddingPanels );
	
	var panelListaPecas = new UI.Panel();
	panelListaPecas.dom = document.getElementById('divListaPecas');	
	panelListaPecas.setClass( 'painelAjuda' );
	panelListaPecas.setWidth( '100%' );
	panelListaPecas.setHeight( '100%' );
	panelListaPecas.setPadding( paddingPanels );	
	
	var panelCodigoFonte = new UI.Panel();
	panelCodigoFonte.dom = document.getElementById('divCodigoFonte');	
	panelCodigoFonte.setClass( 'painelAjuda' );
	panelCodigoFonte.setWidth( '100%' );
	panelCodigoFonte.setHeight( '100%' );
	panelCodigoFonte.setPadding( paddingPanels );
	
	var panelArquivo = new UI.Panel();
	panelArquivo.dom = document.getElementById('divArquivo');	
	panelArquivo.setClass( 'painelAjuda' );
	panelArquivo.setWidth( '100%' );
	panelArquivo.setHeight( '100%' );
	panelArquivo.setPadding( paddingPanels );
	
	var panelAjuda = new UI.Panel();
	panelAjuda.dom = document.getElementById('divAjuda');	
	panelAjuda.setClass( 'painelAjuda' );
	panelAjuda.setWidth( '100%' );
	panelAjuda.setHeight( '100%' );
	panelAjuda.setPadding( paddingPanels );
	
	var panelSobre = new UI.Panel();
	panelSobre.dom = document.getElementById('divSobre');	
	panelSobre.setClass( 'painelAjuda' );
	panelSobre.setWidth( '100%' );
	panelSobre.setHeight( '100%' );
	panelSobre.setPadding( paddingPanels );
	
	var esconderPaineis = function () {
	
		labelIntroducao.setColor( '#AAA' );
		labelIntroducao.setCursor( 'pointer' );	
		
		labeldicas.setColor( '#AAA' );
		labeldicas.setCursor( 'pointer' );	
		
		labelFabrica.setColor( '#AAA' );
		labelFabrica.setCursor( 'pointer' );	
		
		labelVisualizadorGrafico.setColor( '#AAA' );
		labelVisualizadorGrafico.setCursor( 'pointer' );	
		
		labelVisaoCamera.setColor( '#AAA' );
		labelVisaoCamera.setCursor( 'pointer' );		
		
		labelPropriedades.setColor( '#AAA' );
		labelPropriedades.setCursor( 'pointer' );	
		
		labelListaPecas.setColor( '#AAA' );
		labelListaPecas.setCursor( 'pointer' );			
		
		labelCodigoFonte.setColor( '#AAA' );
		labelCodigoFonte.setCursor( 'pointer' );	
		
		labelArquivo.setColor( '#AAA' );
		labelArquivo.setCursor( 'pointer' );	
		
		labelAjuda.setColor( '#AAA' );
		labelAjuda.setCursor( 'pointer' );	
		
		labelSobre.setColor( '#AAA' );
		labelSobre.setCursor( 'pointer' );	
		
	};
	esconderPaineis();
	
	function mostrarPanel( panel ) {
	
		paineis.remove( paineisTemp );
		paineisTemp = new UI.Panel();
		paineisTemp.setWidth( '100%' );
		paineisTemp.setHeight( '100%' );
		paineisTemp.add( panel );		
		paineis.add( paineisTemp );
	
	};
	
	function mostrarIntroducao() {
	
		esconderPaineis();
		
		labelIntroducao.setColor( '#000' );
		labelIntroducao.setCursor( 'auto' );	
		
		mostrarPanel( panelIntroducao );
	
	};
	
	function mostrarDicas() {
	
		esconderPaineis();
	
		labeldicas.setColor( '#000' );
		labeldicas.setCursor( 'auto' );	
		
		mostrarPanel( panelDicas );
		
	};
	
	function mostrarFabrica() {
	
		esconderPaineis();
	
		labelFabrica.setColor( '#000' );
		labelFabrica.setCursor( 'auto' );	
		
		mostrarPanel( panelFabrica );
		
	};
	
	function mostrarVisualizadorGrafico() {
	
		esconderPaineis();
	
		labelVisualizadorGrafico.setColor( '#000' );
		labelVisualizadorGrafico.setCursor( 'auto' );	
		
		mostrarPanel( panelVisualizadorGrafico );
		
	}
	
	function mostrarVisaoCamera() {
	
		esconderPaineis();
	
		labelVisaoCamera.setColor( '#000' );
		labelVisaoCamera.setCursor( 'auto' );	
		
		mostrarPanel( panelVisaoCamera );
		
	};
	
	function mostrarPropriedades() {
	
		esconderPaineis();
	
		labelPropriedades.setColor( '#000' );
		labelPropriedades.setCursor( 'auto' );	
		
		mostrarPanel( panelPropriedades );
		
	};
	
	function mostrarListaPecas() {
	
		esconderPaineis();
	
		labelListaPecas.setColor( '#000' );
		labelListaPecas.setCursor( 'auto' );	
		
		mostrarPanel( panelListaPecas );
		
	};
	
	function mostrarCodigoFonte() {
	
		esconderPaineis();
	
		labelCodigoFonte.setColor( '#000' );
		labelCodigoFonte.setCursor( 'auto' );	
		
		mostrarPanel( panelCodigoFonte );
		
	};
	
	function mostrarArquivo() {
	
		esconderPaineis();
	
		labelArquivo.setColor( '#000' );
		labelArquivo.setCursor( 'auto' );	
		
		mostrarPanel( panelArquivo );
		
	};
	
	function mostrarAjuda() {
	
		esconderPaineis();
	
		labelAjuda.setColor( '#000' );
		labelAjuda.setCursor( 'auto' );	
		
		mostrarPanel( panelAjuda );
		
	};
	
	function mostrarSobre() {
	
		esconderPaineis();
	
		labelSobre.setColor( '#000' );
		labelSobre.setCursor( 'auto' );	
		
		mostrarPanel( panelSobre );
		
	};
	
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
		
	};
	
	labelIntroducao.onClick( mostrarIntroducao );
	labeldicas.onClick( mostrarDicas );
	labelFabrica.onClick( mostrarFabrica );
	labelVisualizadorGrafico.onClick( mostrarVisualizadorGrafico );
	labelVisaoCamera.onClick( mostrarVisaoCamera );
	labelPropriedades.onClick( mostrarPropriedades );
	labelListaPecas.onClick( mostrarListaPecas );
	labelCodigoFonte.onClick( mostrarCodigoFonte );
	labelArquivo.onClick( mostrarArquivo );
	labelAjuda.onClick( mostrarAjuda );
	labelSobre.onClick( mostrarSobre );
	
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

