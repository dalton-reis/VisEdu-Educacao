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
	corScroll          : 0x000000,
	corCurrentAnimation: 0xDBFFDF
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
	selecionarItem: "Selecione um item usando o editor ou a lista de pecas.",
	somenteUmaAnimacaoPorObjGrafico: "Não é permitido mais de um item de animação por objeto gráfico"
};


CG.objects = UtilCG;

/**
 * Objeto utilizado para carregar os arquivos .obj
 **/
CG.OBJLoader = new THREE.OBJLoader();
/**
 * Objeto utilizado para carregar images de textura
 **/
CG.ImageLoader = new THREE.ImageLoader();


/**
 * Lista com todas as possíveis funções de interpolação possíveis de
 * serem utilizadas nas animações
 */
CG.listaTiposEasing = {
	'Linear': 		0,
	'Quadratic.In': 	1,
	'Quadratic.Out': 	2,
	'Quadratic.InOut': 	3,
	'Cubic.In': 		4,
	'Cubic.Out': 		5,
	'Cubic.InOut': 		6,
	'Quartic.In': 		7,
	'Quartic.Out': 		8,
	'Quartic.InOut': 	9,
	'Quintic.In': 		10,
	'Quintic.Out':		11,
	'Quintic.InOut': 	12,
	'Sinusoidal.In': 	13,
	'Sinusoidal.Out': 	14,
	'Sinusoidal.InOut':	15,
	'Exponential.In':	16,
	'Exponential.Out': 	17,
	'Exponential.InOut':	18,
	'Circular.In':		19,
	'Circular.Out':		20,
	'Circular.InOut':	21,
	'Elastic.In':		22,
	'Elastic.Out':		23,
	'Elastic.InOut':	24,
	'Back.In':		25,
	'Back.Out':		26,
	'Back.InOut':		27,
	'Bounce.In':		28,
	'Bounce.Out': 		29,
	'Bounce.InOut':		30
}

/**
 * Função que retorna a função correspondente ao valor passado como parâmetro.
 * Esse valor deve ser um dos presentes na listTiposEasing
 */
CG.getEasingFunction = function (easing){
	if( easing == CG.listaTiposEasing['Linear'] ){
		return TWEEN.Easing.Linear.None;
	}
	if( easing == CG.listaTiposEasing['Quadratic.In'] ){
		return TWEEN.Easing.Quadratic.In;
	}
	if( easing == CG.listaTiposEasing['Quadratic.Out'] ){
		return TWEEN.Easing.Quadratic.Out;
	}
	if( easing == CG.listaTiposEasing['Quadratic.InOut'] ){
		return TWEEN.Easing.Quadratic.InOut;
	}
	if( easing == CG.listaTiposEasing['Cubic.In'] ){
		return TWEEN.Easing.Cubic.In;
	}
	if( easing == CG.listaTiposEasing['Cubic.Out'] ){
		return TWEEN.Easing.Cubic.Out;
	}
	if( easing == CG.listaTiposEasing['Cubic.InOut'] ){
		return TWEEN.Easing.Cubic.InOut;
	}
	if( easing == CG.listaTiposEasing['Quartic.In'] ){
		return TWEEN.Easing.Quartic.In;
	}
	if( easing == CG.listaTiposEasing['Quartic.Out'] ){
		return TWEEN.Easing.Quartic.Out;
	}
	if( easing == CG.listaTiposEasing['Quartic.InOut'] ){
		return TWEEN.Easing.Quartic.InOut;
	}
	if( easing == CG.listaTiposEasing['Quintic.In'] ){
		return TWEEN.Easing.Quintic.In;
	}
	if( easing == CG.listaTiposEasing['Quintic.Out'] ){
		return TWEEN.Easing.Quintic.Out;
	}
	if( easing == CG.listaTiposEasing['Quintic.InOut'] ){
		return TWEEN.Easing.Quintic.InOut;
	}
	if( easing == CG.listaTiposEasing['Sinusoidal.In'] ){
		return TWEEN.Easing.Sinusoidal.In;
	}
	if( easing == CG.listaTiposEasing['Sinusoidal.Out'] ){
		return TWEEN.Easing.Sinusoidal.Out;
	}
	if( easing == CG.listaTiposEasing['Sinusoidal.InOut'] ){
		return TWEEN.Easing.Sinusoidal.InOut;
	}
	if( easing == CG.listaTiposEasing['Exponential.In'] ){
		return TWEEN.Easing.Exponential.In;
	}
	if( easing == CG.listaTiposEasing['Exponential.Out'] ){
		return TWEEN.Easing.Exponential.Out;
	}
	if( easing == CG.listaTiposEasing['Exponential.InOut'] ){
		return TWEEN.Easing.Exponential.InOut;
	}
	if( easing == CG.listaTiposEasing['Elastic.In'] ){
		return TWEEN.Easing.Elastic.In;
	}
	if( easing == CG.listaTiposEasing['Elastic.Out'] ){
		return TWEEN.Easing.Elastic.Out;
	}
	if( easing == CG.listaTiposEasing['Elastic.InOut'] ){
		return TWEEN.Easing.Elastic.InOut;
	}
	if( easing == CG.listaTiposEasing['Circular.In'] ){
		return TWEEN.Easing.Circular.In;
	}
	if( easing == CG.listaTiposEasing['Circular.Out'] ){
		return TWEEN.Easing.Circular.Out;
	}
	if( easing == CG.listaTiposEasing['Circular.InOut'] ){
		return TWEEN.Easing.Circular.InOut;
	}
	if( easing == CG.listaTiposEasing['Back.In'] ){
		return TWEEN.Easing.Back.In;
	}
	if( easing == CG.listaTiposEasing['Back.Out'] ){
		return TWEEN.Easing.Back.Out;
	}
	if( easing == CG.listaTiposEasing['Back.InOut'] ){
		return TWEEN.Easing.Back.InOut;
	}
	if( easing == CG.listaTiposEasing['Bounce.In'] ){
		return TWEEN.Easing.Bounce.In;
	}
	if( easing == CG.listaTiposEasing['Bounce.Out'] ){
		return TWEEN.Easing.Bounce.Out;
	}
	if( easing == CG.listaTiposEasing['Bounce.InOut'] ){
		return TWEEN.Easing.Bounce.InOut;
	}
}
