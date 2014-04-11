/*

	Classe que representa o 'Controle' na cena (Zoom, Rotacao, Tralacao etc).
	
*/
var Controles3D = function(camera, render){
	var controles3D;
	
	//Adiciona os controle do mouse na camera
	controles3D = new THREE.TrackballControls( camera, render );	
	controles3D.rotateSpeed = 1.0;
	controles3D.zoomSpeed = 1.0;
	controles3D.panSpeed = 1.0;
	controles3D.noZoom = false;
	controles3D.noRotate = false;
	controles3D.noPan = false;
	controles3D.staticMoving = false;
	controles3D.dynamicDampingFactor = 0.3;
	
	this.updateControles = function(){
		controles3D.update();
	};
	
	this.getLargura = function(){
		return controles3D.screen.width;
	};
	
	this.getAltura = function(){
		return controles3D.screen.height;
	};
	
	this.resetControle = function(){
		controles3D.reset();
	};
	
	this.getPosicao = function(lado){	
		switch(lado){
			case "L":
				return controles3D.screen.left;
				break;             
			case "R":	           
				return controles3D.screen.right;
				break;             
			case "T":	           
				return controles3D.screen.top;
				break;             
			case "B":	           
				return controles3D.screen.bottom;
				break;	
			default:
				return null;
		}			
	};
}