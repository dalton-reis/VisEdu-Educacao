
EIdsItens = {	

	/* ENUMERAÇÂO */

	CAMERA: { 
		descricao: "Camera" 
	},
	TRANSLADAR: { 	
		descricao: "Transladar" 
	},
	ROTACIONAR: { 
		descricao: "Rotacionar" 
	},
	REDIMENSIONAR: { 
		descricao: "Escalar" 
	},
	CUBO: { 		
		descricao: "Cubo"
	},
	OBJETOGRAFICO: { 
		descricao: "Objeto Grafico"	
	},
	PAINELMONTAGEMEDITOR: { 
		descricao: "Renderizador" 
	},
	LIXEIRA: { 
		descricao: "Lixeira"
	},
	
	
	inicializar: function () {
			
		var idObj;
		var idCount = 0;
		
		for ( var id in EIdsItens ) {
		
			idObj = EIdsItens[ id ];

			idObj.seq = idCount++;
			idObj.count = 0;
		
		}
		
	},
	
	zerarContadores: function () {
	
		for ( var id in EIdsItens ) {

			EIdsItens[ id ].count = 0;
		
		}
		
	},
	
	getENumById: function ( seq ) {
	
		var idObj;
		
		for ( var id in EIdsItens ) {
			
			idObj = EIdsItens[ id ];
			
			if	( idObj.seq == seq )			
				return idObj;			
		
		}
		
		return null;
		
	}
	
};	

EIdsItens.inicializar();

