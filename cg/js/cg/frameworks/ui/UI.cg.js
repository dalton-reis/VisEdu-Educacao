/* VisEdu-CG */

// ArquivoTexto

UI.ArquivoTexto = function ( position ) {

    UI.Element.call( this );

	var scope = this;
	
	this.textoArquivo = '';

	this.dom = document.createElement( 'input' );
	this.dom.type = 'file';
	this.dom.style.position = position || 'relative';

	this.onChangeCallback = null;
	
	this.dom.addEventListener( 'change', function ( event ) {
		
		var file = event.target.files[ 0 ];	
		
		var reader = new FileReader();
		reader.addEventListener( 'load', function ( event ) {	
			
			scope.textoArquivo = event.target.result;
			
			if ( scope.onChangeCallback ) scope.onChangeCallback();

		}, false );

		reader.readAsBinaryString( file );

	

	}, false );

	return this;

};

UI.ArquivoTexto.prototype = Object.create( UI.Element.prototype );

UI.ArquivoTexto.prototype.textureNameMap = {};

UI.ArquivoTexto.prototype.getValue = function () {

	return this.textoArquivo;

};

UI.ArquivoTexto.prototype.setValue = function ( value ) {

	this.textoArquivo = value;

};

UI.ArquivoTexto.prototype.onChange = function ( callback ) {

	this.onChangeCallback = callback;

	return this;

};



// TreeView

UI.TreeView = function () {

	UI.Element.call( this );

	var scope = this;

	var dom = document.createElement( 'ul' );
	dom.className = 'treeview';	
	dom.setAttribute( 'rel', 'open' );
	this.dom = dom;

	/*this.mouseClickCallback = null;
	
	this.dom.addEventListener( 'click', function ( event ) {

		if ( scope.mouseClickCallback ) scope.mouseClickCallback();

	}, false );*/

	return this;

};

UI.TreeView.prototype = Object.create( UI.Element.prototype );


/*UI.TreeView.prototype.onClick = function ( callback ) {

	this.mouseClickCallback = callback;

	return this;

};*/


UI.TreeView.prototype.getRel = function () {

	return this.dom.getAttribute( 'rel' );

};

UI.TreeView.prototype.setRel = function ( value ) {

	this.dom.setAttribute( 'rel', value );;

	return this;

};

UI.TreeView.prototype.add = function () {

	for ( var i = 0; i < arguments.length; i ++ ) {

		this.dom.appendChild( arguments[ i ].dom );

	}

	return this;

};

UI.TreeView.prototype.remove = function () {

	for ( var i = 0; i < arguments.length; i ++ ) {

		this.dom.removeChild( arguments[ i ].dom );

	}

	return this;

};



// ItemTreeView

UI.ItemTreeView = function ( treeView ) {

	UI.Element.call( this );

	var scope = this;
	
	if	( !(treeView instanceof UI.TreeView) ) {
		throw new Error ( "argumento deve ser da classe UI.TreeView !" );	
	}
	this.treeView = treeView;

	var dom = document.createElement( 'li' );	
	this.dom = dom;
	
	this.treeView.add( this );

	/*this.mouseClickCallback = null;
	
	this.dom.addEventListener( 'click', function ( event ) {

		if ( scope.mouseClickCallback ) scope.mouseClickCallback();

	}, false );*/

	return this;

};

UI.ItemTreeView.prototype = Object.create( UI.Element.prototype );


/*UI.ItemTreeView.prototype.onClick = function ( callback ) {

	this.mouseClickCallback = callback;

	return this;

};*/

UI.ItemTreeView.prototype.add = function () {

	for ( var i = 0; i < arguments.length; i ++ ) {

		this.dom.appendChild( arguments[ i ].dom );

	}

	return this;

};

UI.ItemTreeView.prototype.remove = function () {

	for ( var i = 0; i < arguments.length; i ++ ) {

		this.dom.removeChild( arguments[ i ].dom );

	}

	return this;

};



// Imagem

UI.Imagem = function ( ) {

	UI.Element.call( this );

	var scope = this;	

	var dom = document.createElement( 'img' );	
	this.dom = dom;

	/*this.mouseClickCallback = null;
	
	this.dom.addEventListener( 'click', function ( event ) {

		if ( scope.mouseClickCallback ) scope.mouseClickCallback();

	}, false );*/

	return this;

};

UI.Imagem.prototype = Object.create( UI.Element.prototype );


/*UI.Imagem.prototype.onClick = function ( callback ) {

	this.mouseClickCallback = callback;

	return this;

};*/

UI.Imagem.prototype.setSrc = function ( src ) {

	this.dom.src = src;

	return this;

};

UI.Imagem.prototype.getSrc = function ( ) {

	return this.dom.src;

};




