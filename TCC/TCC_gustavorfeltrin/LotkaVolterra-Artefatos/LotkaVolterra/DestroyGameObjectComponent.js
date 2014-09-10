function DestroyGameObjectComponent() {}

DestroyGameObjectComponent.prototype = new Component();

DestroyGameObjectComponent.prototype.onCollide = function(otherGameObject) {
	otherGameObject.destroy();
}

DestroyGameObjectComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, LogicSystem.getTag());
  return systems;	
}

DestroyGameObjectComponent.prototype.getTag = function(){
  return "DESTROY_GAME_OBJECT_COMPONENT";
}