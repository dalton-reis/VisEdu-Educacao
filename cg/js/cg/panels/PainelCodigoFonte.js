
function PainelCodigoFonte( editor ) {

	UI.Panel.call( this );
	IEditorObserver.call( this ); //interface

	var scope = this;

	scope.setClass( 'painelEstreito' );
	scope.dom.id = 'painelCodigoFonte';
	scope.setPosition( 'absolute' );
	scope.setDisplay( 'broke' );

	if	( !(editor instanceof Editor) ) {
		throw new Error ( 'argumento deve ser da classe Editor !' );
	}
	scope.editor = editor;


	//implementacao
    	var geradorCodigoFonte = new GeradorCodigoFonteJOGL();

	var areaTexto = new UI.TextArea().setColor( '#444' ).setFontSize( '12px' ).setBackground( 'transparent' );
	scope.add( areaTexto );

	//@Override
	scope.onChangeItems = function ( ) {
		scope.onChangeItemEmEdicao( scope.editor.getItemSelecionado() );
	};

	//@Override
	scope.onChangeItemEmEdicao = function( item ) {

		var maxWidth = scope.dom.offsetWidth - 113;
		areaTexto.setWidth( maxWidth + 100 + 'px' );
		areaTexto.setValue( '' );

		if (!item) {
			areaTexto.setValue( CG.msgs.selecionarItem );
		} else {
			geradorCodigoFonte.gerarCodigoFonteItem( item );
			areaTexto.setValue( geradorCodigoFonte.getCodigoFonte() );
			if (geradorCodigoFonte.getLarguraMaximaCodigoFonte() > maxWidth) {
				maxWidth = geradorCodigoFonte.getLarguraMaximaCodigoFonte();
			}
			areaTexto.setWidth( maxWidth + 100 + 'px' );
			var height = geradorCodigoFonte.getQtdeLinhasCodigoFonte() * 17;
			if (height < scope.dom.offsetHeight - 13) {
				height = scope.dom.offsetHeight - 13;
			}
			areaTexto.setHeight( height + 'px' );
		}
	};
	scope.onChangeItemEmEdicao( null );
	scope.editor.observadores.push( scope ); //adicona esta classe como observador do editor
}

PainelCodigoFonte.prototype = Object.create( UI.Panel.prototype );

