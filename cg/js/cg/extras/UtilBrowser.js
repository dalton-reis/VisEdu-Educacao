



// modulo browser - utilitarios para o sistema em geral
	
var UtilBrowser = {
	
	isChrome: navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
	
	isPortugues: navigator.language == "pt-BR",
	
	openURL: function ( linkURL ) {

		window.open( linkURL, '_blank' );
		window.focus();
		
	}

};	


