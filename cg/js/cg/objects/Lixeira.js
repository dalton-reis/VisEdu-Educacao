
function Lixeira() {		

	AObjetoGrafico.call( this ); //herda atributos classe    
	
	var scope = this;
	
	scope.id = EIdsItens.LIXEIRA;	 
	scope.canMove = false;
	scope.changeCursor = false;
	scope.corHex = CG.colors.corLixeira;

	var squareShape, geometria, material;
	
	//OBJETOS CABEÇALHO
	
	
	//cria lixeira	
	
	squareShape = CG.objects.generateShapeLixeira();;	
	geometria = new THREE.ShapeGeometry( squareShape );
	material = CG.objects.generateMaterialItems( CG.colors.corLixeira );	
	scope.meshLixeira= new THREE.Mesh( geometria, material );
	var scale = 0.2;
	scope.meshLixeira.scale.set( scale, scale, scale );
	scope.objeto.add(scope.meshLixeira);
	scope.addIntersectableMesh(scope.meshLixeira, true, false);
	//contorno
	var lineLixeira = CG.objects.generateContorno( squareShape );
	lineLixeira.scale.set( scale, scale, scale );
	scope.objeto.add(lineLixeira);
	
	//cria tampa lixeira
	
	scope.objetoTampa = new THREE.Object3D();
	scope.objeto.add(scope.objetoTampa);
	scope.objetoTampa.position.set( -1, 25, 0 );
	scope.objetoTampa.rotation.set( 0, 0, -0.1 );
	//tampa
	var scale = 0.23;
	scope.objetoTampa.scale.set( scale, scale, scale );	
	squareShape = CG.objects.generateShapeTampaLixeira();;	
	geometria = new THREE.ShapeGeometry( squareShape );
	material = CG.objects.generateMaterialItems( CG.colors.corLixeira );	
	var meshTampaLixeira = new THREE.Mesh( geometria, material );	
	scope.objetoTampa.add(meshTampaLixeira);
	scope.addIntersectableMesh(meshTampaLixeira, true, false);
	//contorno
	var lineTampaLixeira = CG.objects.generateContorno( squareShape );
	scope.objetoTampa.add(lineTampaLixeira);
	
	
	//OBJETOS DETALHES	

	
}

Lixeira.prototype = Object.create( AObjetoGrafico.prototype );

