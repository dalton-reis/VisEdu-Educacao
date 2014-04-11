function UpdateCameraComponent(){}

UpdateCameraComponent.prototype = new Component();

UpdateCameraComponent.prototype.onBeforeRender = function(){
	var rbc = this.gameObject.getComponent("RIGID_BODY_COMPONENT");
	if(rbc != null){
		game.camera.centerX = rbc.body.m_position.x - (game.canvas.width/2); 
		game.camera.centerY = rbc.body.m_position.y - (game.canvas.height/2);
	}
}