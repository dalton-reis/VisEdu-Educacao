
function ControladorPaineis ( labels, paineis ) {

	IEditorObserver.call( this ); //interface

	var scope = this;

	//propriedades
	scope.labels = labels;
	scope.paineis = paineis;

	//implementação


	var painelPropriedades = null;

	var mensagem = new UI.Panel();
	mensagem.setTextContent( CG.msgs.selecionarItem );

	scope.paineis.containerPainelPropriedades.dom.appendChild( mensagem.dom );
	scope.paineis.editor.editavel = true;
	scope.paineis.visualizadorGrafico.editavel = true;
	scope.paineis.painelEscuro.setVisibility( 'hidden' );
	scope.paineis.painelAbrir.setVisibility( 'hidden' );
	scope.paineis.painelAjuda.setVisibility( 'hidden' );

	scope.paineis.editor.observadores.push( scope );


	//@Override
	scope.onChangeItems = function() {
		//vazio
	};

	//@Override
	scope.onChangeItemEmEdicao = function ( item, tipoGrafico ) {

		if (painelPropriedades) {
			scope.paineis.containerPainelPropriedades.dom.removeChild( painelPropriedades.dom );
			scope.paineis.containerPainelPropriedades.dom.appendChild( mensagem.dom );
			painelPropriedades = null;

		}
		if (item) {
			painelPropriedades = new PainelPropriedades( item, tipoGrafico );

			scope.paineis.containerPainelPropriedades.dom.removeChild( mensagem.dom );
			scope.paineis.containerPainelPropriedades.dom.appendChild( painelPropriedades.dom );

			scope.mostrarPainelPropriedades();
		}
	};

	scope.mostrarArquivo  = function () {

		scope.labels.labelPainelArquivo.setColor( '#000000' );
		scope.labels.labelPainelArquivo.setCursor( 'auto' );
		scope.labels.labelPainelFabrica.setColor( '#888888' );
		scope.labels.labelPainelFabrica.setCursor( 'pointer' );
		scope.labels.labelPainelPropriedades.setColor( '#888888' );
		scope.labels.labelPainelPropriedades.setCursor( 'pointer' );
		scope.labels.labelPainelMenuAjuda.setColor( '#888888' );
		scope.labels.labelPainelMenuAjuda.setCursor( 'pointer' );

		scope.paineis.painelArquivo.setVisibility( 'visible' );
		scope.paineis.containerPainelPropriedades.setVisibility( 'hidden' );
		scope.paineis.painelMenuAjuda.setVisibility( 'hidden' );

		scope.paineis.editor.editavel = false;

	};

	scope.mostrarFabrica = function () {

		scope.labels.labelPainelArquivo.setColor( '#888888' );
		scope.labels.labelPainelArquivo.setCursor( 'pointer' );
		scope.labels.labelPainelFabrica.setColor( '#000000' );
		scope.labels.labelPainelFabrica.setCursor( 'auto' );
		scope.labels.labelPainelPropriedades.setColor( '#888888' );
		scope.labels.labelPainelPropriedades.setCursor( 'pointer' );
		scope.labels.labelPainelMenuAjuda.setColor( '#888888' );
		scope.labels.labelPainelMenuAjuda.setCursor( 'pointer' );

		scope.paineis.painelArquivo.setVisibility( 'hidden' );
		scope.paineis.containerPainelPropriedades.setVisibility( 'hidden' );
		scope.paineis.painelMenuAjuda.setVisibility( 'hidden' );

		scope.paineis.editor.editavel = true;

	};

	scope.mostrarPainelPropriedades = function () {

		scope.labels.labelPainelArquivo.setColor( '#888888' );
		scope.labels.labelPainelArquivo.setCursor( 'pointer' );
		scope.labels.labelPainelFabrica.setColor( '#888888' );
		scope.labels.labelPainelFabrica.setCursor( 'pointer' );
		scope.labels.labelPainelPropriedades.setColor( '#000000' );
		scope.labels.labelPainelPropriedades.setCursor( 'auto' );
		scope.labels.labelPainelMenuAjuda.setColor( '#888888' );
		scope.labels.labelPainelMenuAjuda.setCursor( 'pointer' );

		scope.paineis.painelArquivo.setVisibility( 'hidden' );
		scope.paineis.containerPainelPropriedades.setVisibility( 'visible' );
		scope.paineis.painelMenuAjuda.setVisibility( 'hidden' );
		//scope.containerJQuery.css("visibility", "visible"); //hidden -funciona tbm

		scope.paineis.editor.editavel = true;

	};

	scope.mostrarpainelMenuAjuda = function () {

		scope.labels.labelPainelArquivo.setColor( '#888888' );
		scope.labels.labelPainelArquivo.setCursor( 'pointer' );
		scope.labels.labelPainelFabrica.setColor( '#888888' );
		scope.labels.labelPainelFabrica.setCursor( 'pointer' );
		scope.labels.labelPainelPropriedades.setColor( '#888888' );
		scope.labels.labelPainelPropriedades.setCursor( 'pointer' );
		scope.labels.labelPainelMenuAjuda.setColor( '#000000' );
		scope.labels.labelPainelMenuAjuda.setCursor( 'auto' );

		scope.paineis.painelArquivo.setVisibility( 'hidden' );
		scope.paineis.containerPainelPropriedades.setVisibility( 'hidden' );
		scope.paineis.painelMenuAjuda.setVisibility( 'visible' );

		scope.paineis.editor.editavel = false;

	};

	scope.mostrarPainelAbrir = function () {

		scope.paineis.painelAbrir.textoExportado.setValue( '' );
		scope.paineis.painelAbrir.listaExercicios.setValue( 'nenhum' );

		scope.paineis.painelEscuro.setVisibility( 'visible' );
		scope.paineis.painelAbrir.setVisibility( 'visible' );

		scope.paineis.visualizadorGrafico.editavel = false;

	};

	scope.esconderPainelAbrir = function () {

		scope.paineis.painelEscuro.setVisibility( 'hidden' );
		scope.paineis.painelAbrir.setVisibility( 'hidden' );

		scope.paineis.visualizadorGrafico.editavel = true;

	};

	scope.abrirJSON = function () {
		try {
			textoExportado = scope.paineis.painelAbrir.textoExportado.getValue();
			if(textoExportado.trim() == "") {
				alert("O texto exportado esta vazio!");
				return;

			}
			data = JSON.parse( textoExportado );
			LeitorJSON.parse( data, scope.paineis.editor );
			scope.esconderPainelAbrir();
			scope.mostrarFabrica();
		} catch ( error ) {
			console.log(error.stack);
			alert( error );
		}
	};

	scope.mostrarPainelAjuda = function () {

		scope.paineis.painelEscuro.setVisibility( 'visible' );
		scope.paineis.painelAjuda.setVisibility( 'visible' );

		scope.paineis.visualizadorGrafico.editavel = false;

	};

	scope.mostrarPainelAjudaIntroducao = function () {

		scope.paineis.painelAjuda.mostrarPainel( "INTRODUCAO" );

		scope.mostrarPainelAjuda();

	};

	scope.mostrarPainelAjudaFabrica = function () {

		scope.paineis.painelAjuda.mostrarPainel( "FABRICA" );

		scope.mostrarPainelAjuda();

	};

	scope.mostrarPainelAjudaVisualisadorGrafico = function () {
//		scope.paineis.painelAjuda.mostrarPainel( "VISUALIZADORGRAFICO" );
//		scope.mostrarPainelAjuda();
	};

	scope.mostrarPainelAjudaCodigoFonte = function () {

		scope.paineis.painelAjuda.mostrarPainel( "CODIGOFONTE" );

		scope.mostrarPainelAjuda();

	};

	scope.mostrarPainelAjudaListaPecas = function () {

		scope.paineis.painelAjuda.mostrarPainel( "LISTAPECAS" );

		scope.mostrarPainelAjuda();

	};

	scope.mostrarPainelAjudaPropriedades = function () {

		scope.paineis.painelAjuda.mostrarPainel( "PROPRIEDADES" );

		scope.mostrarPainelAjuda();

	};

	scope.mostrarPainelAjudaAjuda= function () {

		scope.paineis.painelAjuda.mostrarPainel( "AJUDA" );

		scope.mostrarPainelAjuda();

	};

	scope.mostrarPainelAjudaArquivo = function () {

		scope.paineis.painelAjuda.mostrarPainel( "ARQUIVO" );

		scope.mostrarPainelAjuda();

	};

	scope.mostrarPainelAjudaSobre = function () {

		scope.paineis.painelAjuda.mostrarPainel( "SOBRE" );

		scope.mostrarPainelAjuda();

	};

	scope.mostrarPainelAjudaDicas = function () {

		scope.paineis.painelAjuda.mostrarPainel( "DICAS" );

		scope.mostrarPainelAjuda();

	};



	scope.esconderPainelAjuda = function () {

		scope.paineis.painelEscuro.setVisibility( 'hidden' );
		scope.paineis.painelAjuda.setVisibility( 'hidden' );

		scope.paineis.visualizadorGrafico.editavel = true;

	};

	scope.labels.labelPainelArquivo.onClick( scope.mostrarArquivo );
	scope.labels.labelPainelFabrica.onClick( scope.mostrarFabrica );
	scope.labels.labelPainelPropriedades.onClick( scope.mostrarPainelPropriedades );
	scope.labels.labelPainelMenuAjuda.onClick( scope.mostrarpainelMenuAjuda );
	scope.paineis.painelArquivo.opcaoAbrir.onClick( scope.mostrarPainelAbrir );
	scope.paineis.painelAbrir.botaoSair.onClick( scope.esconderPainelAbrir );
	scope.paineis.painelAbrir.botaoAbrir.onClick( scope.abrirJSON );
	scope.paineis.painelMenuAjuda.opcaoAjuda.onClick( scope.mostrarPainelAjudaIntroducao );
	scope.paineis.painelMenuAjuda.opcaoDicas.onClick( scope.mostrarPainelAjudaDicas );
	scope.paineis.painelMenuAjuda.opcaoSobre.onClick( scope.mostrarPainelAjudaSobre );
	scope.paineis.painelAjuda.botaoSair.onClick( scope.esconderPainelAjuda );
	scope.paineis.painelAjuda.botaoSair.onClick( scope.esconderPainelAjuda );

	scope.paineis.painelArquivo.dom.addEventListener( 'dblclick', scope.mostrarPainelAjudaArquivo, false);
	scope.paineis.editor.dom.addEventListener( 'dblclick', scope.mostrarPainelAjudaFabrica, false);
	scope.paineis.visualizadorGrafico.dom.addEventListener( 'dblclick', scope.mostrarPainelAjudaVisualisadorGrafico, false);
	scope.paineis.containerPainelPropriedades.dom.addEventListener( 'dblclick', scope.mostrarPainelAjudaPropriedades, false);
	scope.paineis.painelMenuAjuda.dom.addEventListener( 'dblclick', scope.mostrarPainelAjudaAjuda, false);
	scope.paineis.codigoFonte.dom.addEventListener( 'dblclick', scope.mostrarPainelAjudaCodigoFonte, false);
	//scope.paineis.listaItens.dom.addEventListener( 'dblclick', scope.mostrarPainelAjudaListaPecas, false);
	scope.mostrarFabrica();
}
