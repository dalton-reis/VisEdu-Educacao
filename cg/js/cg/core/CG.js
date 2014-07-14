/**
 * 
 */

CG = { };

CG.colors = {
	corPecasSeta       : 0x32CD32,	
	corPecasQuadrado   : 0x1C86EE,	
	corPecasDiamante   : 0xEE5555,	
	corPecasCruz       : 0xFFA500,
	corPecaIluminacao  : 0xFFFF00,
	corFundo           : 0xFFFFFF,
	corPainel          : 0xEEEEEE,
	corSelecao         : 0xFF1493,
	corContorno        : 0xAAAAAA,
	corEncaixes        : 0x555555,
	corTexto           : 0x222222,
	corLixeira         : 0xAAAAAA,
	corEmissive        : 0x555555,
	corEmissiveEncaixe : 0xFF1493,
	corEmissiveLixeira : 0xFF1493,
	corObjetoEmEdicao  : 0xFF1493,
	corScroll          : 0x000000
	
};

CG.listaDeTexturas = {

	'Nao usar'         : 'nenhum',
	'Logo Grupo CG'    : 'img/texturas/logoGCG.png',
	'Caixa de Madeira' : 'img/texturas/caixaMadeira.jpg',
	'Caixa de Metal'   : 'img/texturas/caixaMetal.jpg',
	'Cubo Magico'      : 'img/texturas/cuboMagico.jpg',
	'Piso Marfim'      : 'img/texturas/marfim.jpg',
	'Olho'             : 'img/texturas/olho.jpg',
	'Piso Metal 1'     : 'img/texturas/pisoMetal1.jpg',
	'Piso Metal 2'     : 'img/texturas/pisoMetal2.jpg'
	
};

CG.getIdListaDeTexturas = function( valor ) {

	for (var id in CG.listaDeTexturas) {
		if	(CG.listaDeTexturas[id] == valor) {
			return id;
		}
	}
	
	return null;
};

CG.listaDePrimitivas = {
		'Vertices'   : 'GL_POINTS',
		'Aberto'     : 'GL_LINE_STRIP',
		'Fechado'    : 'GL_LINE_LOOP',
		'Preenchido' : 'GL_POLYGON'
};

CG.listaTipoGraficos = {
		'2D' : 2,		
		'3D' : 3
};

CG.listaItensGraficos = {
		'Grade' : 0,		
		'EixoX' : 1,
		'EixoY' : 2,
		'EixoZ' : 3
};

CG.listaTipoSpline = {
		'Bezier' : 0
};

CG.listaTipoLuz = {
		'Ambient'     : 0,		
		'Hemisphere'  : 1,
		'Directional' : 2,
		'PointLight'  : 3,
		'SpotLight'   : 4		
};

CG.listaDeExercicios = {
	''              : 'nenhum',
	//'CG-04_exer_02' : 'exercicios/CG-04_exer_02.txt',
	//'CG-04_exer_04' : 'exercicios/CG-04_exer_04.txt'	
};

CG.msgs = {
	selecionarItem: "Selecione um item usando o editor ou a lista de pecas."
};

CG.objects = UtilCG;