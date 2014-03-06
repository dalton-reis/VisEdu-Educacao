/*
	Classe que representa a demarcacao dos 'Eixo' na cena
	
	Descricao: Eixos paralelos para demarcacao de valores
*/
var RotulosNumericos = function(t){
	var geometria, 
		material, 
		rotulos,
		tipo = t;	
		
	geometria = new THREE.Geometry();
	
	if(tipo == "2D"){
		for(var i = -300; i<300; i++){
			if(i != 0){
				geometria.vertices.push(new THREE.Vector3(i, 0.1, 0), new THREE.Vector3( i, -0.1, 0 ));
				geometria.vertices.push(new THREE.Vector3(-0.1, i, 0), new THREE.Vector3( 0.1, i, 0 ));
			}
		}
	}else{
		for(var i = -15; i<16; i++){
			if(i != 0){
				geometria.vertices.push(new THREE.Vector3(i, 0, 0.1), new THREE.Vector3( i, 0, -0.1 ));
				geometria.vertices.push(new THREE.Vector3(-0.1, i, 0), new THREE.Vector3( 0.1, i, 0 ));
				geometria.vertices.push(new THREE.Vector3(-0.1, 0, i), new THREE.Vector3( 0.1, 0, i ));				
			}
		}
	}
	
	if(tipo =="2D"){
		for(var i = -300; i<300; i++){
			if(i != 0){
				geometria.colors.push(new THREE.Color( 0xFF0000 ), new THREE.Color( 0xFF0000 ));
				geometria.colors.push(new THREE.Color( 0x00cc00 ), new THREE.Color( 0x00cc00 ));							
			}
		}
	}else{
		for(var i = -15; i<16; i++){
			if(i != 0){
				geometria.colors.push(new THREE.Color( 0xFF0000 ), new THREE.Color( 0xFF0000 ));
				geometria.colors.push(new THREE.Color( 0x00cc00 ), new THREE.Color( 0x00cc00 ));
				geometria.colors.push(new THREE.Color( 0x0000FF ), new THREE.Color( 0x0000FF ));
			}
		}
	
	}
	
	geometria.computeLineDistances();
		
	material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors} );
	
	rotulos = new THREE.Line( geometria, material  );
	rotulos.type = THREE.Line;
	rotulos.name = "rotulos";
		
	this.getRotulos = function(){
		return rotulos;
	};
}