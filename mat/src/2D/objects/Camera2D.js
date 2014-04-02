/*
	Classe que representa a entidade 'Camera' na cena
*/
var Camera2D = function(){
	var camera2D;
	
	var cam_left = -20, 
		cam_right = 20, 
		cam_top = 20,
		cam_bottom = -20;
		
	/* new THREE.OrthographicCamera( left, right, top, bottom, near, far )
	
	left — Camera frustum left plane.
	right — Camera frustum right plane.
	top — Camera frustum top plane.
	bottom — Camera frustum bottom plane.
	near — Camera frustum near plane.
	far — Camera frustum far plane. */
	
	camera2D = new THREE.OrthographicCamera( cam_left, cam_right, cam_top, cam_bottom, 5, 1000 );
	camera2D.position.x = 0;
	camera2D.position.y = 0;
	camera2D.position.z = 100;
	
	this.getCamera2D = function(){
		return camera2D;
	};
	
	this.getDimensao = function(lado){	
		switch(lado){
			case "L":
				return camera2D.left;
				break;
			case "R":	
				return camera2D.right;
				break;
			case "T":	
				return camera2D.top;
				break;
			case "B":	
				return camera2D.bottom;
				break;	
			default:
				return null;
		}			
	};
	
	this.getPosicao = function(){
		return camera2D.position;
	};
	
}