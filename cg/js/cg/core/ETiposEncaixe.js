
ETiposEncaixe = {	

	/* ENUMERAÇÂO */
	
	CRUZ:  { 
		urlIcone: 'img/encaixeCruz.png'
	},
	DIAMANTE:  { 
		urlIcone: 'img/encaixeDiamante.png'
	},
	QUADRADO:  { 
		urlIcone: 'img/encaixeQuadrado.png'
	},	
	SETA: { 
		urlIcone: 'img/encaixeSeta.png'
	},
	ENCAIXE_LIXEIRA: { 
		//vazio
	},
	
	inicializar: function () {
			
		var idObj;
		var idCount = 0;
		
		for ( var id in ETiposEncaixe ) {
		
			idObj = ETiposEncaixe[ id ];

			idObj.seq = idCount++;
		
		}
		
	}
};	

ETiposEncaixe.inicializar();