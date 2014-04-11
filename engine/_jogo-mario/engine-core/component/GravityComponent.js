function GravityComponent(){}

GravityComponent.prototype = new Component();

GravityComponent.prototype.getTag = function(){
	return "GRAVITY_COMPONENT";
}

GravityComponent.prototype.update = function(deltaTime){
	if(this.gameObject.aceleration.y == 0){
		var raycastPosition = new Vector2D().initialize(this.gameObject.position.x,
		                                                this.gameObject.position.y);
		raycastPosition.y += this.gameObject.height + 2;
	
		if(CollideUtils.raycast(raycastPosition, this.gameObject.width, 2, game.currentScene) == false){
			this.gameObject.aceleration.y = 2000;
		}
	}
}