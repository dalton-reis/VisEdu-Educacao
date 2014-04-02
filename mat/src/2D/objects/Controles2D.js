/*
	Classe que representa o 'Controle' na cena (Zoom, Rotacao, Tralacao etc).
*/
var Controles2D = function(camera, render){
	var controles2D;
	
	//Adiciona os controle do mouse na camera
	controles2D = new THREE.TrackballControls( camera, render );	
	controles2D.rotateSpeed = 1.0;
	controles2D.panSpeed = 1.0;
	controles2D.zoomSpeed = 1.0;
	controles2D.noZoom = false;
	controles2D.noRotate = true;
	controles2D.noPan = true;
	controles2D.staticMoving = false;
	controles2D.dynamicDampingFactor = 0.4;
	
	this.updateControles = function(){
		controles2D.update();
	};
	
	this.getLargura = function(){
		return controles2D.screen.width;
	};
	
	this.getAltura = function(){
		return controles2D.screen.height;
	};
	
	this.getPosicao = function(lado){	
		switch(lado){
			case "L":
				return controles2D.screen.left;
				break;             
			case "R":	           
				return controles2D.screen.right;
				break;             
			case "T":	           
				return controles2D.screen.top;
				break;             
			case "B":	           
				return controles2D.screen.bottom;
				break;	
			default:
				return null;
		}			
	};
}