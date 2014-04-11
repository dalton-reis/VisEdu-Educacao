function ApplyForcesComponent(){}

ApplyForcesComponent.prototype = new Component();

ApplyForcesComponent.prototype.getTag = function(){
	return "APPLY_FORCES_COMPONENT";
}

ApplyForcesComponent.prototype.update = function(deltaTime){
	var velocityDelta = new Vector2D().initialize(this.gameObject.velocity.x, this.gameObject.velocity.y);
	var acelerationDelta = new Vector2D().initialize(this.gameObject.aceleration.x, this.gameObject.aceleration.y);
	velocityDelta.scale(deltaTime);
	acelerationDelta.scale(deltaTime);
	
	this.gameObject.position.add(velocityDelta.x, velocityDelta.y);
	this.gameObject.velocity.add(acelerationDelta.x, acelerationDelta.y);
		
	this.gameObject.updateBBox();
}