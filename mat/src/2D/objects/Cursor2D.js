/*
	Classe que representa a entidade 'Cursor' na cena
	
	Descricao: Ao clicar no checkbox 'Cursor' duas linhas auxiliares (vertical e horizontal) sao exibidas no plano 
			   cartesiano que funcionam junto com o Ponteiro
*/
var Cursor2D = function(){

	var geometria, material, cursor;
	
	//Cria as duas linhas do cursor
	var geometria = new THREE.Geometry();
	geometria.vertices.push( 
		new THREE.Vector3(-400, 0, 0), 
		new THREE.Vector3( 400, 0, 0 ), 
		new THREE.Vector3(0, -400, 0), 
		new THREE.Vector3( 0, 400, 0 ) );
	
	geometria.computeLineDistances();
	
	material = new THREE.LineBasicMaterial( { color: 0x0099FF} );
	cursor = new THREE.Line( geometria, material  );
	cursor.name = "cursor";
	cursor.type = THREE.Line;
	cursor.material.visible = false;	
	
	this.getCursor = function(){
		return cursor;
	};
	
	this.getPosicao = function(pos){
		return pos == "x" ? cursor.position.x : cursor.position.y;
	};
	
	this.setPosicao = function(x, y){
		cursor.position.x = x;
		cursor.position.y = y;
	};
}