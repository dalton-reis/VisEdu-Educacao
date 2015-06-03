var Canhao = function(_cena, _velocidadeInicial, _anguloXY, _anguloZ) {
	var cena = _cena;
	var velocidadeInicial = _velocidadeInicial;
	var anguloXY = parseFloat(0);
	var anguloZ = 0;
	
	this.setAnguloZ= function(angulo){		
		anguloZ = parseFloat(angulo);
	}
	
	this.setAnguloXY = function(angulo){
		console.log(isNaN(parseFloat(angulo)));
		anguloXY = angulo;
	}
	
	this.getAnguloXY=function(){
		return anguloXY;
	}
	
	this.determineVelocityVector= function() {
		var vel = new THREE.Vector3();

		//vx = v0 . cos?
		vel.x = velocidadeInicial * Math.cos(anguloXY * Math.PI / 180);
		//v0y = v0 . sen?
		vel.y = velocidadeInicial * Math.sin(anguloXY * Math.PI / 180);
		//Minha tentativa de fazer movimento no z:
		vel.z = velocidadeInicial * Math.sin(anguloZ * Math.PI / 180);
		console.log(velocidadeInicial * Math.cos(anguloZ * Math.PI / 180));
		
		return vel;
	};
}