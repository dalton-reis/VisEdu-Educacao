function RemoveGravityComponent(){}

RemoveGravityComponent.prototype = new Component();

RemoveGravityComponent.prototype.onLoad = function(){
	layer.setGravity(0);
}

RemoveGravityComponent.prototype.getTag = function(){
    return "REMOVE_GRAVITY_COMPONENT";
}