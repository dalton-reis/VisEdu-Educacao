function PerceptionVisionComponent(){}

PerceptionVisionComponent.prototype = new Component();

JSUtils.addMethod(PerceptionVisionComponent.prototype, "initialize", 
	function(uri){
		this.initialize();
		this.webSocket = new WebSocket(uri);
		this.webSocket.onmessage = function(data) { onAction(data) };
		return this;
	}
);


PerceptionVisionComponent.prototype.onCollide = function(otherGameObject){
	this.onPercept(this.owner.id + "#" + otherGameObject.id);	
}

PerceptionVisionComponent.prototype.onPercept = function(message){
	this.webSocket.send(message);
}

onAction = function(evt){ 
	var message = evt.data;
	var arrMsg = message.split("#");
	for(var i in layer.listGameObjects){
		var gameObject = layer.listGameObjects[i];
		if(gameObject instanceof BoxObject){
			if ( gameObject.id == arrMsg[0] ) {
				var render = ComponentUtils.getComponent(gameObject, "BOX_RENDER_COMPONENT");
				if (render) {
					render.fillStyle = arrMsg[1];
					render.strokeStyle = arrMsg[2];
				}				
			}
		}
	}
}

PerceptionVisionComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, LogicSystem.getTag());
  return systems;	
}

PerceptionVisionComponent.prototype.getTag = function(){
  return "PERCEPTION_VISION_COMPONENT";
}