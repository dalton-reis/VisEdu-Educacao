/*
	Classe que representa a entidade 'Grade' na cena
*/
var Grade2D = function(){
	var grade;
	
	grade = new THREE.GridHelper(295,1);
	grade.rotation.x = Math.PI/2;
	grade.name = "grade";
	grade.material.visible = true;
	
	
	this.getGrade = function(){
		return grade;
	};
	
	
}