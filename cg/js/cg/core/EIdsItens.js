/**
 *
 */

EIdsItens = {
	//ENUMERA��O
	CAMERA: {
		descricao: "C�mera"
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
	POLIGONO: {
		descricao: "Pol�gono"
	},
	SPLINE: {
		descricao: "Spline"
	},
	ILUMINACAO: {
		descricao: "Ilumina��o"
	},
	OBJETOGRAFICO: {
		descricao: "Objeto Gr�fico"
	},
	RENDERIZADOR: {
		descricao: "Renderizador"
	},
	LIXEIRA: {
		descricao: "Lixeira"
	},
	DRONE: {
		descricao: "Drone"
	},
	TARGET: {
		descricao: "Target"
	},

	inicializar: function () {
		var idObj;
		var idCount = 0;

		for (var id in EIdsItens) {
			idObj = EIdsItens[ id ];

			idObj.seq   = idCount++;
			idObj.count = 0;
		}
	},

	zerarContadores: function () {
		for (var id in EIdsItens) {
			EIdsItens[ id ].count = 0;
		}
	},

	getENumById: function ( seq ) {
		var idObj;

		for (var id in EIdsItens) {
			idObj = EIdsItens[id];

			if	(idObj.seq == seq)
				return idObj;
		}
		return null;
	}
};

EIdsItens.inicializar();
