
function ItemEditorCubo() {

	AItemEditorEncaixeQuadrado.call( this );

	var scope = this;

	//eventos

	//@Override
	scope.onChange = function () {
		scope.object3D = createObject3D();
	}; //evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	//@Override
	scope.onAddFilho = function ( item ) {};; //evento será executado quando um filho for adicionado
	//@Override
	scope.onRemoveFilho = function ( item ) {};; //evento será executado quando um filho for removido
	//@Override
	scope.onChangeFilhos = function ( filho ) {};; //evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	//@Override
	scope.afterChangeNome = function ( nomeAntigo ) {}; //evento será executado quando o nome do item for alterado

	//propriedades

	scope.id =  EIdsItens.CUBO;
	scope.valorXYZ.set( 100, 100, 100 );
	scope.propriedadeCor.setHex( 0xFFFFFF );
	scope.textura = null;
	scope.usarTextura = false;
	scope.listaPontos = undefined;
	scope.object3D = createObject3D();

	function createObject3D() {
		var geometria = new THREE.BoxGeometry( scope.valorXYZ.x, scope.valorXYZ.y, scope.valorXYZ.z );
		var material  = new THREE.MeshPhongMaterial({ color: scope.propriedadeCor.getHex(), ambient: scope.propriedadeCor.getHex(), overdraw: true });
		var cubo = new THREE.Mesh( geometria, material);
		if( scope.object3D != undefined ){
			cubo.position = scope.object3D.position;
		}
		return cubo
	}
}

ItemEditorCubo.prototype = Object.create( AItemEditorEncaixeQuadrado.prototype );

