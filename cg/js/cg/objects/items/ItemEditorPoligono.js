/**
 * 
 */

function ItemEditorPoligono() {		 
	AItemEditorEncaixeQuadrado.call( this ); 
	
	var scope = this;
	
	//eventos
	
	//@Override
	scope.onChange = function () {}; //evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	//@Override
	scope.onAddFilho = function ( item ) {};; //evento será executado quando um filho for adicionado
	//@Override
	scope.onRemoveFilho = function ( item ) {};; //evento será executado quando um filho for removido
	//@Override
	scope.onChangeFilhos = function ( filho ) {};; //evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	//@Override
	scope.afterChangeNome = function ( nomeAntigo ) {}; //evento será executado quando o nome do item for alterado
	
	//propriedades
	scope.id =  EIdsItens.POLIGONO;
	scope.valorXYZ = undefined; //NÃO DEVE TER ESTA PROPRIEDADE VISIVEL
	scope.posicao  = undefined; //NÃO DEVE TER ESTA PROPRIEDADE VISIVEL	
	
	scope.propriedadeCor.setHex(0x9900CC); 
	scope.qtdPontos = 2;
	scope.pontos = new THREE.Vector3();
	scope.pontos.set(-100, 100, 100);
	
	scope.primitiva = CG.listaDePrimitivas.Vertices;
	
	scope.listaPontos    = new Array();
	scope.listaPontos[0] = new THREE.Vector3(-100, 100, 100);
	scope.listaPontos[1] = new THREE.Vector3(100, -100, -100);
	
	scope.pontoSelecionado = 1;
		
	//POR ENQUANTO NÃO DEVERÁ USAR TEXTURA
	//scope.textura = null;
	//scope.usarTextura = false;
	
	scope.getListaPontos = function() {
		var listaStr = new Array();
		
		for (var i = 0; i < scope.listaPontos.length; i++) {			
			listaStr[i] = ['(' + scope.listaPontos[i].x + ', ' + scope.listaPontos[i].y + ', ' + scope.listaPontos[i].z + ')', i + 1];
		}
		
		return listaStr;
	};
}

ItemEditorPoligono.prototype = Object.create(AItemEditorEncaixeQuadrado.prototype);