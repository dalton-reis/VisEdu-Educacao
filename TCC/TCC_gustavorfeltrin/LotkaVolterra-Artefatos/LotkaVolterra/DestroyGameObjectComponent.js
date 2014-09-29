function DestroyGameObjectComponent() {}

DestroyGameObjectComponent.prototype = new Component();

JSUtils.addMethod(DestroyGameObjectComponent.prototype, "initialize", 
	function(preyToken){
		this.initialize();
		this.preyToken = preyToken;
		return this;
	}
);

DestroyGameObjectComponent.prototype.onCollide = function(otherGameObject) {
	var token = ComponentUtils.getComponent(otherGameObject, "TOKEN_COMPONENT");
	if (token && token.getToken() == this.preyToken ) {
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