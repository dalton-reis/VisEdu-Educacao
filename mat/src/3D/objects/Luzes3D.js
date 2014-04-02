/*

	Classe que representa o 'Controle' na cena (Zoom, Rotacao, Tralacao etc).
	
*/
var Luzes3D = function(){
	var alvo, luzX, luzY, luzZ;
	
	
	//Adiciona luz vertical na cena3D (X)
	luzX = new THREE.DirectionalLight(0xffffff, 1.0);
	luzX.position.set(32,0,0);
	luzX.name = "luzX";
	
	
	//Adiciona luz horizontal na cena3D (Y)
	luzY = new THREE.DirectionalLight(0xffffff, 1.0);
	luzY.position.set(0,32,0);
	luzY.name = "luzY";
	
	
	//Adiciona luz frontal na cena3D (Z)
	luzZ = new THREE.DirectionalLight(0xffffff, 1.0);
	luzZ.position.set(0,0,32);
	luzZ.name = "luzZ";
	
		
	alvo = new THREE.Object3D();
	alvo.position.set(0,0,0);
	alvo.name = "alvo";
	luzX.target = alvo;
	luzY.target = alvo;
	luzZ.target = alvo;
	
	this.getLuz = function(direcao){
		if(direcao == "x"){
			return luzX;
		}else if(direcao == "y"){
			return luzY;
		}else if(direcao == "z"){
			return luzZ;
		}
	};	
	
}	