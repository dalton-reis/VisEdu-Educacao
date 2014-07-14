
// modulo file - utilitarios para manipular arquivos

var UtilFile = {
		
	stringToJSONOutput: function ( parseString ) {
	
		var output = JSON.stringify( parseString , null, '\t' );
		return output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
		
	},
	
	JSONOutputToBlobURL: function ( JSONOutput ) {
				
		var blob = new Blob( [ JSONOutput ], { type: 'text/plain; charset=ISO-8859-1' } );
		var objectURL = URL.createObjectURL( blob );

		return objectURL;
		
	}	
	

};




