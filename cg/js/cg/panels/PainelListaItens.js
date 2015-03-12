/**
 * Parece que esse fonte eh o painel "lista de peças" existente no VisEdu-CG
 */
function PainelListaItens( editor ) {

	UI.Panel.call( this );
	IEditorObserver.call( this ); //interface

	var scope = this;

	scope.setClass( 'painelEstreito' );
	scope.dom.id = 'painelListaItens';
	scope.setPosition( 'absolute' );
	scope.setDisplay( 'broke' );

	if	( !(editor instanceof Editor) ) {
		throw new Error ( "argumento deve ser da classe Editor !" );
	}
	scope.editor = editor;


	//implementacao

	var treeviewPrincipal= null;

	regerarTreeView();


	//@Override
	scope.onChangeItems = function ( ) {
		regerarTreeView();
	};

	//@Override
	scope.onChangeItemEmEdicao =  function ( item ) {
		//vazio
	};

	scope.editor.observadores.push( scope ); //adicona esta classo como observador do editor


	function regerarTreeView() {

		if	( treeviewPrincipal ) {
			scope.remove( treeviewPrincipal );
		}

		nome = 'treeviewListaItens' + PainelListaItensTreeViewCount++;

		treeviewPrincipal = new UI.TreeView();
		treeviewPrincipal.setId();
		scope.add( treeviewPrincipal );

		gerarItensTreeView(scope.editor.painelMontagem, treeviewPrincipal);

		DDTreeMenu.createTreeFromElement( treeviewPrincipal.dom, false );

	}


	function gerarItensTreeView ( item, treeViewPai ) {

		var itemTreeView = new  UI.ItemTreeView( treeViewPai );

		var treeviewFilhos = null;

		if	(item.filhos.length > 0 ) {

			treeviewFilhos = new UI.TreeView();

		}

		var panel = new UI.Panel();

		var nome;
		if ( item.id == EIdsItens.RENDERIZADOR ) {
			nome = item.nome.toUpperCase();
		} else {
			nome = item.nome;
			panel.add( new UI.Imagem().setSrc( item.tipoEncaixe.urlIcone ) );
		}


		panel.setWidth( (nome.getWidth() + 70) + 'px').setHeight( '23px' );//.setBackground( '#DDDDFF' );
		panel.dom.verticalAlign = 'center';
		panel.add( new UI.Text( "" ).setWidth( '5px' ).setHeight( '16px' ) );

		var text = new UI.Text( nome ).setColor( '#666' ).setCursor( 'pointer' ).setHeight( '16px' );//.setBackground( '#DDFFDD' );
		text.onClick( function () {

			scope.editor.selecionarItem( item );

			if	(treeviewFilhos) {
				treeviewFilhos.dom.onclick(); //chama o evento onclick pela segunda vez para desfaze-lo, pois
			}

		} );
		panel.add( text );

		itemTreeView.add( panel );

		if	(item.filhos.length > 0 ) {

			itemTreeView.add( treeviewFilhos );

			for (var i = 0; i < item.filhos.length; i++) {

				gerarItensTreeView( item.filhos[i], treeviewFilhos );

			}
		}

	}


}

PainelListaItens.prototype = Object.create( UI.Panel.prototype );

PainelListaItensTreeViewCount = 0;
