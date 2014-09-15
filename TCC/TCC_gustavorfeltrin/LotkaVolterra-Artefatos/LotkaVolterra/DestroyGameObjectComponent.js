function DestroyGameObjectComponent() {}

DestroyGameObjectComponent.prototype = new Component();

DestroyGameObjectComponent.prototype.onCollide = function(otherGameObject) {
	var token = ComponentUtils.getComponent(otherGameObject, "TOKEN_COMPONENT");
	if (token && token.getToken() == "PREY_TOKEN") {
		otherGameObject.destroy();		
	} 
	
}

DestroyGameObjectComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, LogicSystem.getTag());
  return systems;	
}

DestroyGameObjectComponent.prototype.getTag = function(){
  return "DESTROY_GAME_OBJECT_COMPONENT";
}