
//modulo math - utilitarios para calculos matemáticos

var UtilMath = {
	
	percentualRadianosParaGraus: 360 / (Math.PI * 2),
	
	percentualGrausParaRadianos: (Math.PI * 2) / 360,
	
	converteGrausParaRadianos: function ( valor ) {
		return  Util.math.percentualGrausParaRadianos * valor;
	},
	
	converteRadianosParaGraus: function ( valor ) {
		return  Util.math.percentualRadianosParaGraus * valor;
	},
	
	espacoEntreObjetos: 3,
	
	precentPixelValue: 130 / 100, //a distancia gráfica de 100, com z = 2, representa 130 pixels na tela 
	
	precentGraphicValue: 100 / 130, //a distancia gráfica de 100, com z = 2, representa 130 pixels na tela

	getPixelValue: function ( graphicValue ) { //converte uma distacia grafica pra uma distancia em pixels

		return graphicValue * Util.math.precentPixelValue;
		
	},

	getGraphicValue: function ( pixelValue ) { //converte uma distancia em pixels para uma distancia grafica

		return pixelValue * Util.math.precentGraphicValue;
		
	}
		
};	