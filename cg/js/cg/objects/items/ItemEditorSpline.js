/**
 * 
 */

function ItemEditorSpline() {		 
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
	scope.id =  EIdsItens.SPLINE;
	scope.valorXYZ = undefined; //NÃO DEVE TER ESTA PROPRIEDADE VISIVEL
	scope.posicao  = undefined; //NÃO DEVE TER ESTA PROPRIEDADE VISIVEL
	
	scope.tipoSpline = CG.listaTipoSpline.Bezier;

	scope.listaPontos    = new Array();
	scope.listaPontos[0] = new THREE.Vector3(-200, -200, 0);
	scope.listaPontos[1] = new THREE.Vector3(-200, 200, 0);	
	scope.listaPontos[2] = new THREE.Vector3(200, 200, 0);
	scope.listaPontos[3] = new THREE.Vector3(200, -200, 0);
	
	scope.qtdPontos = 20;	
	scope.poliedro = true;
	
	scope.propriedadeCor.setHex(0x098011);
	
	scope.corPoliedro = new THREE.Color();
	scope.corPoliedro.setHex(0x9EA8B0);
	
	//POR ENQUANTO NÃO DEVERÁ USAR TEXTURA
	//scope.textura = null;
	//scope.usarTextura = false;			
}

ItemEditorSpline.prototype = Object.create(AItemEditorEncaixeQuadrado.prototype);