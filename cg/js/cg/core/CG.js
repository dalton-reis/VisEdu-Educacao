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
	selecionarItem: "Selecione um item usando o editor ou a lista de pecas.",
	somenteUmaAnimacaoPorObjGrafico: "Não é permitido mais de um item de animação por objeto gráfico"
};


CG.objects = UtilCG;

/**
 * Objeto de cache para as referência aos arquivos obj carregados
 * pela aplicação*/
CG.ObjModels = {}

/**
 * Objeto utilizado para carregar os arquivos .obj
 **/
CG.OBJLoader = new THREE.OBJLoader();

/**
 * Função utilitária que carrega, se necessário, o arquivo obj passado
 * como parâmetro. Após carrega uma vez, o arquivo eh mantido em cache para
 * as próxima vezes que for solicitado
 */
CG.loadObjModel = function(modelName) {
	if( !(modelName in CG.ObjModels) ){
		CG.OBJLoader.load(modelName,
			function ( model ) {
				model.userData.nome = "drone";
				CG.ObjModels[modelName] = model;

			},
			function( progress ){
				//TODO
			},
			function( error ){
				//TODO
			});
	}
	return CG.ObjModels[modelName];
}

/**
 * Lista com todas as possíveis funções de interpolação possíveis de
 * serem utilizadas nas animações
 */
CG.listaTiposEasing = {
	'Linear': TWEEN.Easing.Linear.None,
	'Quadratic.In': TWEEN.Easing.Quadratic.In,
	'Quadratic.Out': TWEEN.Easing.Quadratic.Out,
	'Quadratic.InOut': TWEEN.Easing.Quadratic.InOut,
	'Cubic.In': TWEEN.Easing.Cubic.In,
	'Cubic.Out': TWEEN.Easing.Cubic.Out,
	'Cubic.InOut': TWEEN.Easing.Cubic.InOut,
	'Quartic.In': TWEEN.Easing.Quartic.In,
	'Quartic.Out': TWEEN.Easing.Quartic.Out,
	'Quartic.InOut': TWEEN.Easing.Quartic.InOut,
	'Quintic.In': TWEEN.Easing.Quintic.In,
	'Quintic.Out': TWEEN.Easing.Quintic.Out,
	'Quintic.InOut': TWEEN.Easing.Quintic.InOut,
	'Sinusoidal.In': TWEEN.Easing.Sinusoidal.In,
	'Sinusoidal.Out': TWEEN.Easing.Sinusoidal.Out,
	'Sinusoidal.InOut': TWEEN.Easing.Sinusoidal.InOut,
	'Exponential.In': TWEEN.Easing.Exponential.In,
	'Exponential.Out': TWEEN.Easing.Exponential.Out,
	'Exponential.InOut': TWEEN.Easing.Exponential.InOut,
	'Circular.In': TWEEN.Easing.Circular.In,
	'Circular.Out': TWEEN.Easing.Circular.Out,
	'Circular.InOut': TWEEN.Easing.Circular.InOut,
	'Elastic.In': TWEEN.Easing.Elastic.In,
	'Elastic.Out': TWEEN.Easing.Elastic.Out,
	'Elastic.InOut': TWEEN.Easing.Elastic.InOut,
	'Back.In': TWEEN.Easing.Back.In,
	'Back.Out': TWEEN.Easing.Back.Out,
	'Back.InOut': TWEEN.Easing.Back.InOut,
	'Bounce.In': TWEEN.Easing.Bounce.In,
	'Bounce.Out': TWEEN.Easing.Bounce.Out,
	'Bounce.InOut': TWEEN.Easing.Bounce.InOut
}
