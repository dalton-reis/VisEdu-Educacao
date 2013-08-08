

var Util = { };
	

// modulo browser - utilitarios para o sistema em geral
	
Util.browser = {
	
	isChrome: navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
	
	isPortugues: navigator.language == "pt-BR"

};	

	
//modulo math - utilitarios para calculos matemáticos
	
Util.math = {
	
	percentualRadianosParaGraus: 360 / (Math.PI * 2),
	
	percentualGrausParaRadianos: (Math.PI * 2) / 360,
	
	converteGrausParaRadianos: function ( valor ) {
		return  Util.math.percentualGrausParaRadianos * valor;
	},
	
	converteRadianosParaGraus: function ( valor ) {
		return  Util.math.percentualRadianosParaGraus * valor;
	},
	
	espacoEntreObjetos: 3,
	
	precentPixelValue: 130/*127*/ / 100, //a distancia gráfica de 100, com z = 2, representa 119 pixels na tela 
	
	precentGraphicValue: 100 / 130, //a distancia gráfica de 100, com z = 2, representa 119 pixels na tela

	getPixelValue: function ( graphicValue ) { //converte uma distacia grafica pra uma distancia em pixels

		return graphicValue * Util.math.precentPixelValue;
		
	},

	getGraphicValue: function ( pixelValue ) { //converte uma distancia em pixels para uma distancia grafica

		return pixelValue * Util.math.precentGraphicValue;
		
	}
		
};	
	
// modulo file - utilitarios para manipular arquivos

Util.file = {
		
	stringToJSONOutput: function ( parseString ) {
	
		var output = JSON.stringify( parseString , null, '\t' );
		return output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
		
	},
	
	JSONOutputToBlobURL: function ( JSONOutput ) {
				
		var blob = new Blob( [ JSONOutput ], { type: 'text/plain' } );
		var objectURL = URL.createObjectURL( blob );

		return objectURL;
		
	},
		
	openURL: function ( linkURL ) {

		window.open( linkURL, '_blank' );
		window.focus();
		
	},

	saveBlobToDisk: function (blobURL, fileName ) {
	
		var reader = new FileReader();
		reader.readAsDataURL( blobURL );
		
		reader.onload = function (event) {			
			
			var save = document.createElement( 'a' );
			save.href = event.target.result;
			save.target = '_blank';
			save.download = fileName || 'unknown file';

			var event = document.createEvent( 'Event' );
			event.initEvent( 'click' , true, true);
			save.dispatchEvent(event);
			(window.URL || window.webkitURL).revokeObjectURL( save.href );
			
		};
		
	},

	openBinaryStringFile: function ( urlFile ) {
		
		/*
		var retorno; 
		
		var reader = new FileReader();
		
		reader.onload = function (event) {	
			alert( event.target.result);
			retorno = event.target.result;
			
		};
		
		reader.readAsBinaryString( urlFile );
		
		
		
		return retorno;*/
		 
		
		
	}	
	
};




String.prototype.getWidth = function( font ) {
  var f = font || '12px arial',
      o = $('<div>' + this + '</div>')
            .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
            .appendTo($('body')),
      w = o.width();

  o.remove();

  return w;
}

