/*
	Classe que representa a entidade 'Eixo' (x e y) na cena
	
	Descricao: Eixos de orientacao X e Y no plano cartesiano
*/
var Eixos3D = function(){
	var geometria, material, eixos;
	
	//Adiciona os eixos negativos com linhas pontilhadas
	 geometria = new THREE.Geometry();
	
	geometria.vertices.push(
		new THREE.Vector3(), new THREE.Vector3( -17, 0, 0 ),		
		new THREE.Vector3(), new THREE.Vector3( 0, -17, 0 ),
		new THREE.Vector3(), new THREE.Vector3( 0, 0, -17 )		
	);
	
	geometria.colors.push(
		new THREE.Color( 0xff0000 ), new THREE.Color( 0xff0000 ),
		new THREE.Color( 0x00cc00 ), new THREE.Color( 0x00cc00 ),
		new THREE.Color( 0x0000ff ), new THREE.Color( 0x0000ff )
	);	
	geometria.computeLineDistances();
	material = new THREE.LineDashedMaterial( { vertexColors: THREE.VertexColors, dashSize: 0.3, gapSize: 0.2} );
	eixos = new THREE.Line( geometria, material  );
	eixos.name = "eixo_n";
	eixos.type = THREE.Line;
	
	this.getEixos = function(){
		return eixos;
	};
}
