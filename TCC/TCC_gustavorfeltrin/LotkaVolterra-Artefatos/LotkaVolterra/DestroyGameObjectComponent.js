function DestroyGameObjectComponent() {}

DestroyGameObjectComponent.prototype = new Component();

DestroyGameObjectComponent.prototype.currentColor = null;

JSUtils.addMethod(DestroyGameObjectComponent.prototype, "initialize", 
	function(targetToken, aggressiveColor){
		this.initialize();
		this.targetToken = targetToken;
		this.aggressiveColor = aggressiveColor;
		return this;
	}
);

DestroyGameObjectComponent.prototype.onUpdate = function(delta){
	var render = null;
	if ( this.owner instanceof BoxObject ) {
		render = ComponentUtils.getComponent(this.owner, "BOX_RENDER_COMPONENT");
	} else if ( this.owner instanceof CircleObject ) {
		render = ComponentUtils.getComponent(this.owner, "CIRCLE_RENDER_COMPONENT");
	} else if ( this.owner instanceof PolygonObject ) {
		render = ComponentUtils.getComponent(this.owner, "POLYGON_RENDER_COMPONENT");
	}	
	if (render) {
		this.currentColor = render.fillStyle;
	} else {
		this.currentColor = null;
	}
}

DestroyGameObjectComponent.prototype.onCollide = function(otherGameObject) {
	var token = ComponentUtils.getComponent(otherGameObject, "TOKEN_COMPONENT");
	if (token && token.getToken() == this.targetToken && this.currentColor && this.currentColor==this.aggressiveColor) {
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