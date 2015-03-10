/**
 *
 */

EIdsItens = {
	//ENUMERAÇÂO
	CAMERA: {
		descricao: "Câmera"
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
		descricao: "Polígono"
	},
	SPLINE: {
		descricao: "Spline"
	},
	ILUMINACAO: {
		descricao: "Iluminação"
	},
	OBJETOGRAFICO: {
		descricao: "Objeto Gráfico"
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
