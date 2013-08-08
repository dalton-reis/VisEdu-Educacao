
function ItemEditorCubo() {		 
	
	aItemEditorEncaixeQuadrado.call( this ); 
	
	var scope = this;
	
	//propriedades
	
	scope.id =  EIdsItens.CUBO;
	scope.valorXYZ.set( 100, 100, 100 );
	scope.posicao = new THREE.Vector3();
	scope.posicao.set( 0, 0, 0 );
	scope.propriedadeCor.setHex( 0xFFFFFF );
	scope.textura = null;
	scope.usarTextura = false;		
	
}

ItemEditorCubo.prototype = Object.create( aItemEditorEncaixeQuadrado.prototype );

