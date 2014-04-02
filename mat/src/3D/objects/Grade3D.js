/*
	Classe que representa a entidade 'Grade' na cena 3D
*/
var Grade3D = function(){
	var grade;
	
	grade = new THREE.GridHelper(15,1);
	grade.position.set(0,-0.001,0);
	//Tentativa de alterar a orientacao dos eixos
	//grade.position.set(0,0,-0.001);
	grade.name = "grade";
	
	this.getGrade = function(){
		return grade;
	};
	
	
}