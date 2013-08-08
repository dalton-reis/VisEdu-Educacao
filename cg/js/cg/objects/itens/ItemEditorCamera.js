
function ItemEditorCamera() {		
  
	aItemEditorEncaixeCruz.call( this ); 
	
	var scope = this;
	
	//propriedades
	
	scope.id =  EIdsItens.CAMERA;
	scope.changeVisibility = false;
	scope.valorXYZ.set( 300, 300, 300 );
	scope.lookAt = new THREE.Vector3();
	scope.lookAt.set( 0, 0, 0 );
	scope.near = 100;
	scope.far = 500;
	scope.fov = 45;
	
}

ItemEditorCamera.prototype = Object.create( aItemEditorEncaixeCruz.prototype );

