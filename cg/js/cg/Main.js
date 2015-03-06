
var SIGNALS = signals;

var signals = {

	windowResize: new SIGNALS.Signal()

};

var Main =  {
	inicializar: function () {

		/* INICIA APLICACAO */

		document.body.removeChild( document.getElementById('divCarregando') );


		// verifica se á possível utilizar o HTML5
		if ( ! CGDetector.webgl )  {

			CGDetector.addGetWebGLMessage();

		} else {

			window.URL = window.URL || window.webkitURL;
			window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

			/* IMPLEMENTAÇÃO */

			var alturaTitulos = '14px';

			//LABELS PAINEIS

			var labels = { };

			labels.labelPainelArquivo = new UI.Panel();
			labels.labelPainelArquivo.setClass( 'titulo' );
			labels.labelPainelArquivo.setPosition( 'absolute' );
			labels.labelPainelArquivo.setDisplay( 'broke' );
			labels.labelPainelArquivo.setTop( '0px' );
			labels.labelPainelArquivo.setWidth( '56px' );
			labels.labelPainelArquivo.setHeight( alturaTitulos );
			labels.labelPainelArquivo.setTextContent( 'Arquivo' );
			document.body.appendChild( labels.labelPainelArquivo.dom );

			labels.labelPainelFabrica = new UI.Panel();
			labels.labelPainelFabrica.setClass( 'titulo' );
			labels.labelPainelFabrica.setPosition( 'absolute' );
			labels.labelPainelFabrica.setDisplay( 'broke' );
			labels.labelPainelFabrica.setTop( '0px' );
			labels.labelPainelFabrica.setLeft( '62px' );
			labels.labelPainelFabrica.setWidth( '116px' );
			labels.labelPainelFabrica.setHeight( alturaTitulos );
			labels.labelPainelFabrica.setTextContent( 'Fábrica de Peças' );
			document.body.appendChild( labels.labelPainelFabrica.dom );

			labels.labelPainelPropriedades = new UI.Panel();
			labels.labelPainelPropriedades.setClass( 'titulo' );
			labels.labelPainelPropriedades.setPosition( 'absolute' );
			labels.labelPainelPropriedades.setDisplay( 'broke' );
			labels.labelPainelPropriedades.setTop( '0px' );
			labels.labelPainelPropriedades.setLeft( '184px' );
			labels.labelPainelPropriedades.setWidth( '140px' );
			labels.labelPainelPropriedades.setHeight( alturaTitulos );
			labels.labelPainelPropriedades.setTextContent( 'Propriedades da Peça' );
			document.body.appendChild( labels.labelPainelPropriedades.dom );

			labels.labelPainelMenuAjuda = new UI.Panel();
			labels.labelPainelMenuAjuda.setClass( 'titulo' );
			labels.labelPainelMenuAjuda.setPosition( 'absolute' );
			labels.labelPainelMenuAjuda.setDisplay( 'broke' );
			labels.labelPainelMenuAjuda.setTop( '0px' );
			labels.labelPainelMenuAjuda.setLeft( '330px' );
			labels.labelPainelMenuAjuda.setRight( 'calc(60% + 1px)' );
			labels.labelPainelMenuAjuda.setHeight( alturaTitulos );
			labels.labelPainelMenuAjuda.setTextContent( 'Ajuda' );
			document.body.appendChild( labels.labelPainelMenuAjuda.dom );

			labels.labelCodigoFonte = new UI.Panel();
			labels.labelCodigoFonte.setClass( 'titulo' );
			labels.labelCodigoFonte.setPosition( 'absolute' );
			labels.labelCodigoFonte.setDisplay( 'broke' );
			labels.labelCodigoFonte.setTop( '0px' );
			labels.labelCodigoFonte.setLeft( '40%' );
			labels.labelCodigoFonte.setWidth( 'calc(30% - 7px)' );
			labels.labelCodigoFonte.setHeight( alturaTitulos );
			labels.labelCodigoFonte.setTextContent( 'Comandos em JOGL' );
			document.body.appendChild( labels.labelCodigoFonte.dom );

			labels.labelListaItems = new UI.Panel();
			labels.labelListaItems.setClass( 'titulo' );
			labels.labelListaItems.setPosition( 'absolute' );
			labels.labelListaItems.setDisplay( 'broke' );
			labels.labelListaItems.setTop( '0px' );
			labels.labelListaItems.setLeft( '70%' );
			labels.labelListaItems.setWidth( '30%' );
			labels.labelListaItems.setHeight( alturaTitulos );
			labels.labelListaItems.setTextContent( 'Lista de Peças' );
			document.body.appendChild( labels.labelListaItems.dom );

			labels.labelVisualizadorGrafico = new UI.Panel();
			labels.labelVisualizadorGrafico.setClass( 'titulo' );
			labels.labelVisualizadorGrafico.setPosition( 'absolute' );
			labels.labelVisualizadorGrafico.setDisplay( 'broke' );
			labels.labelVisualizadorGrafico.setTop( '50%' );
			labels.labelVisualizadorGrafico.setLeft( '40%' );
			labels.labelVisualizadorGrafico.setWidth( 'calc(30% - 7px)' );
			labels.labelVisualizadorGrafico.setHeight( alturaTitulos );
			labels.labelVisualizadorGrafico.setTextContent( 'Espaço Gráfico' );
			document.body.appendChild( labels.labelVisualizadorGrafico.dom );

			labels.labelVisaoCamera = new UI.Panel();
			labels.labelVisaoCamera.setClass( 'titulo' );
			labels.labelVisaoCamera.setPosition( 'absolute' );
			labels.labelVisaoCamera.setDisplay( 'broke' );
			labels.labelVisaoCamera.setTop( '50%' );
			labels.labelVisaoCamera.setLeft( '70%' );
			labels.labelVisaoCamera.setWidth( '30%' );
			labels.labelVisaoCamera.setHeight( alturaTitulos );
			labels.labelVisaoCamera.setTextContent( 'Visão da Câmera' );
			document.body.appendChild( labels.labelVisaoCamera.dom );


			//PAINEIS

			var paineis = { };

			//editor

			paineis.editor = new Editor( signals );
			paineis.editor.setTop( alturaTitulos );
			paineis.editor.setLeft( '0px' );
			paineis.editor.setWidth( '40%' );
			paineis.editor.setBottom( '0px' );
			document.body.appendChild( paineis.editor.dom );

			paineis.painelArquivo = new PainelArquivo( paineis.editor );
			paineis.painelArquivo.setTop( '23px' );
			paineis.painelArquivo.setLeft( '0px' );
			paineis.painelArquivo.setWidth( 'calc(40% - 30px)' );
			paineis.painelArquivo.setBottom( '0px' );
			document.body.appendChild( paineis.painelArquivo.dom );

			paineis.painelAbrir = new PainelAbrir( paineis.editor );
			paineis.painelAbrir.setTop( '10%' );
			paineis.painelAbrir.setLeft( '10%' );
			paineis.painelAbrir.setRight( '10%' );
			paineis.painelAbrir.setBottom( '10%' );
			document.body.appendChild( paineis.painelAbrir.dom );

			paineis.painelMenuAjuda = new PainelMenuAjuda( paineis.editor );
			paineis.painelMenuAjuda.setTop( '23px' );
			paineis.painelMenuAjuda.setLeft( '0px' );
			paineis.painelMenuAjuda.setWidth( 'calc(40% - 30px)' );
			paineis.painelMenuAjuda.setBottom( '0px' );
			document.body.appendChild( paineis.painelMenuAjuda.dom );

			paineis.painelAjuda = new PainelAjuda( paineis.editor );
			paineis.painelAjuda.setTop( '10%' );
			paineis.painelAjuda.setLeft( '10%' );
			paineis.painelAjuda.setRight( '10%' );
			paineis.painelAjuda.setBottom( '10%' );
			document.body.appendChild( paineis.painelAjuda.dom );

			paineis.containerPainelPropriedades = new UI.Panel();
			paineis.containerPainelPropriedades.setClass( 'painel' );
			paineis.containerPainelPropriedades.setPosition( 'absolute' );
			paineis.containerPainelPropriedades.setDisplay( 'broke' );
			paineis.containerPainelPropriedades.setTop( '23px' );
			paineis.containerPainelPropriedades.setLeft( '0px' );
			paineis.containerPainelPropriedades.setWidth( 'calc(40% - 30px)' );
			paineis.containerPainelPropriedades.setHeight( (Util.math.getPixelValue( paineis.editor.painelFabrica.painelHeight ) - 35) + 'px' );
			document.body.appendChild( paineis.containerPainelPropriedades.dom );

			//codigo fonte

			paineis.codigoFonte = new PainelCodigoFonte( paineis.editor );
			paineis.codigoFonte.setTop( alturaTitulos );
			paineis.codigoFonte.setLeft( '40%' );
			paineis.codigoFonte.setRight( 'calc(30% + 1px)' );
			paineis.codigoFonte.setBottom( '50%' );
			document.body.appendChild( paineis.codigoFonte.dom );

			//lista de itens

			paineis.listaItens = new PainelListaItens( paineis.editor );
			paineis.listaItens.setTop( alturaTitulos );
			paineis.listaItens.setLeft( '70%' );
			paineis.listaItens.setRight( '0px' );
			paineis.listaItens.setBottom( '50%' );
			document.body.appendChild( paineis.listaItens.dom );

			//visualizador

			paineis.visualizadorGrafico = new VisualizadorGrafico( paineis.editor, signals );
			paineis.visualizadorGrafico.setLeft( '40%' );
			paineis.visualizadorGrafico.setTop( 'calc(50% + ' + alturaTitulos +' + 6px)' );
			paineis.visualizadorGrafico.setRight( '0px' );
			paineis.visualizadorGrafico.setBottom( '0px' );
			document.body.appendChild( paineis.visualizadorGrafico.dom );


			//painel escuro

			paineis.painelEscuro = new UI.Panel();
			paineis.painelEscuro.setClass( 'painelEscuro' );
			paineis.painelEscuro.setPosition( 'absolute' );
			paineis.painelEscuro.setDisplay( 'broke' );
			paineis.painelEscuro.setLeft( '0px' );
			paineis.painelEscuro.setTop( '0px' );
			paineis.painelEscuro.setRight( '0px' );
			paineis.painelEscuro.setBottom( '0px' );
			document.body.appendChild( paineis.painelEscuro.dom );

			paineis.painelStats = new PainelStats(paineis.editor);
			//paineis.painelStats.setTop('calc(50% + ' + alturaTitulos +' + 50px)');
			paineis.painelStats.setLeft( '95%' );
			paineis.painelStats.setTop('95%');
			paineis.painelStats.setWidth( '30' );
			document.body.appendChild(paineis.painelStats.dom);

			//EVENTOS

			new ControladorPaineis( labels, paineis ); //controla exibição dos paineis



			function animador() {

				requestAnimationFrame( animador ); //funcao do Three JS que faz redesenho em loop

				TWEEN.update();
				paineis.painelStats.updateFPS();

				if (paineis.editor.editavel) {

					paineis.editor.renderizar();

				}

				if (paineis.visualizadorGrafico.editavel) {

					paineis.visualizadorGrafico.renderizar();

				}

			}

			animador();


			function onWindowResize( event ) {

				signals.windowResize.dispatch();

			}

			onWindowResize(null);

			window.addEventListener( 'resize', onWindowResize, false );
		}

	}

};



