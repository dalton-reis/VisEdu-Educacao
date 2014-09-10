function RemoveGravityComponent(){}

RemoveGravityComponent.prototype = new Component();

RemoveGravityComponent.prototype.onRender = function(context){
	layer.setGravity(0);
}

RemoveGravityComponent.prototype.getSystems = function(){
    var systems = new Array();
    systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
    return systems;
}

RemoveGravityComponent.prototype.getTag = function(){
    return "GRAVITY_COMPONENT";
}