
function Lixeira() {		

	aObjetoGrafico.call( this ); //herda atributos classe    
	
	this.id = EIdsItens.LIXEIRA;	 
	this.canMove = false;
	this.changeCursor = false;
	this.corHex = CG.colors.corLixeira;

	var squareShape, geometria, material, mesh, line;
	
	//OBJETOS CABEÇALHO
	
	
	//cria lixeira	
	
	squareShape = CG.objects.generateShapeLixeira();;	
	geometria = new THREE.ShapeGeometry( squareShape );
	material = CG.objects.generateMaterialItems( CG.colors.corLixeira );	
	this.meshLixeira= new THREE.Mesh( geometria, material );
	var scale = 0.2;
	this.meshLixeira.scale.set( scale, scale, scale );
	this.objeto.add(this.meshLixeira);
	this.addIntersectableMesh(this.meshLixeira, true, false);
	//contorno
	line = CG.objects.generateContorno( squareShape );
	line.scale.set( scale, scale, scale );
	this.objeto.add(line);
	
	//cria tampa lixeira
	
	this.objetoTampa = new THREE.Object3D();
	this.objeto.add(this.objetoTampa);
	this.objetoTampa.position.set( -1, 25, 0 );
	this.objetoTampa.rotation.set( 0, 0, -0.1 );
	//tampa
	var scale = 0.23;
	this.objetoTampa.scale.set( scale, scale, scale );	
	squareShape = CG.objects.generateShapeTampaLixeira();;	
	geometria = new THREE.ShapeGeometry( squareShape );
	material = CG.objects.generateMaterialItems( CG.colors.corLixeira );	
	this.meshTampaLixeira = new THREE.Mesh( geometria, material );	
	this.objetoTampa.add(this.meshTampaLixeira);
	this.addIntersectableMesh(this.meshTampaLixeira, true, false);
	//contorno
	line = CG.objects.generateContorno( squareShape );
	this.objetoTampa.add(line);
	
	
	//OBJETOS DETALHES	

	
}

Lixeira.prototype = Object.create( aObjetoGrafico.prototype );

