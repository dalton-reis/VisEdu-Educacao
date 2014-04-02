// addMethod - By John Resig (MIT Licensed)
var JSUtils = new function(){
	
this.addMethod = function(object, name, fn){
	var old = object[ name ];
	if ( old )
		object[ name ] = function(){
			if ( fn.length == arguments.length )
				return fn.apply( this, arguments );
			else if ( typeof old == 'function' )
				return old.apply( this, arguments );
		};
	else
	object[ name ] = fn;
}

this.loadImage = function(src){
	var image = new Image();
	image.src = src;
	image.style.display = "none";
	window.document.body.appendChild(image);
}

}