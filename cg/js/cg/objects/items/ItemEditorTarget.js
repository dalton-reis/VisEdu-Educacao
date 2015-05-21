/**
 * Classe do item target da fábrica de peças
 */
function ItemEditorTarget() {
	AItemEditorEncaixeQuadrado.call( this );
	var scope = this;
	//eventos
	//evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	scope.onChange = function () {
		scope.object3D = createObject3D();
		scope.object3D.item = scope;
	}; 
	//evento será executado quando um filho for adicionado
	scope.onAddFilho = function ( item ) {}; 
	//evento será executado quando um filho for removido
	scope.onRemoveFilho = function ( item ) {};
	//evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	scope.onChangeFilhos = function ( filho ) {};
	//evento será executado quando o nome do item for alterado
	scope.afterChangeNome = function ( nomeAntigo ) {};
	//propriedades
	scope.id =  EIdsItens.TARGET
	scope.valorXYZ.set( 100, 100, 100 );
	scope.propriedadeCor.setHex( 0xFFFFFF );
	scope.object3D = createObject3D();

	function createObject3D() {
		var geometria = new THREE.PlaneGeometry( 10, 10);
		var material  = new THREE.MeshPhongMaterial({ color: scope.propriedadeCor.getHex(), ambient: scope.propriedadeCor.getHex(), overdraw: true });
		var target = new THREE.Mesh( geometria, material);
		if( scope.object3D != undefined ){
			target.position = scope.object3D.position;
		}
		target.rotateX(Util.math.converteGrausParaRadianos(-90));
		return target;
	}
}
ItemEditorTarget.prototype = Object.create( AItemEditorEncaixeQuadrado.prototype );