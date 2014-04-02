/*
	Classe que representa a entidade 'Camera' na cena 3D
*/
var Camera3D = function(){
	var camera3D;		
	
	camera3D = new THREE.PerspectiveCamera(100, 900/700, 1, 1000); 
	camera3D.position.y = 13; 
	camera3D.position.x = 0; 
	camera3D.position.z = 18;
	/*Tentativa de alterar a orientacao dos eixos
	camera3D.position.y = -14; 
	camera3D.position.x = 0; 
	camera3D.position.z = 11;*/
	
	this.getCamera3D = function(){
		return camera3D;
	};
	
	this.getPosicao = function(){
		return camera3D.position;
	};
	
};