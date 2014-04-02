/*
	Classe que representa a entidade 'Eixo' (x e y) na cena
	
	Descricao: Eixos de orientacao X e Y no plano cartesiano
*/
var Eixos2D = function(){
	var geometria_n, 
		material_n, 
		eixos_n,
		geometria_p,
		material_p,
		eixos_p,
		eixos;
		
	//Adiciona os eixos NEGATIVOS na cena
	geometria_n = new THREE.Geometry();
	
	geometria_n.vertices.push(new THREE.Vector3(), new THREE.Vector3( -300, 0, 0 ));
	geometria_n.vertices.push(new THREE.Vector3(), new THREE.Vector3( 0, -300, 0 ));
	
	geometria_n.colors.push(new THREE.Color( 0xff0000 ), new THREE.Color( 0xff0000 ));
	geometria_n.colors.push(new THREE.Color( 0x00cc00 ), new THREE.Color( 0x00cc00 ));
	geometria_n.colors.push(new THREE.Color( 0xff0000 ), new THREE.Color( 0xff0000 ));
	geometria_n.colors.push(new THREE.Color( 0x00cc00 ), new THREE.Color( 0x00cc00 ));
	
	geometria_n.computeLineDistances();
		
	material_n = new THREE.LineDashedMaterial( { vertexColors: THREE.VertexColors, dashSize: 0.3, gapSize: 0.2} );	
	
	eixos_n = new THREE.Line( geometria_n, material_n  );
	eixos_n.type = THREE.Line;
	
	//------------------------ x ---------------------------------//
	
	//Adiciona os eixos POSITIVOS na cena
	geometria_p = new THREE.Geometry();
	
	geometria_p.vertices.push(new THREE.Vector3(), new THREE.Vector3( 300, 0, 0 ));	
	geometria_p.vertices.push(new THREE.Vector3(), new THREE.Vector3( 0, 300, 0 ));
		
	geometria_p.computeLineDistances();
		
	material_p = new THREE.LineBasicMaterial( );	
	
	eixos_p = new THREE.Line( geometria_p, material_p  );
	eixos_p.type = THREE.Line;
	
	//Une os dois mantendo o array de cores dos vertices NEGATIVOS
	THREE.GeometryUtils.merge(eixos_n.geometry, eixos_p.geometry);	
	
		
	this.getEixos = function(){
		return eixos_n;
	};
}