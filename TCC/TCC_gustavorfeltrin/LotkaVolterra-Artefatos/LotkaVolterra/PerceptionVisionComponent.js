function PerceptionVisionComponent(){}

PerceptionVisionComponent.prototype = new Component();

JSUtils.addMethod(PerceptionVisionComponent.prototype, "initialize", 
	function(uri){
		this.initialize();
		if ('WebSocket' in window || 'MozWebSocket' in window) {
			this.webSocket = new WebSocket(uri);
		} else {
			alert("Browser não suporta WebSocket");
			return this;
		}
		this.webSocket.onmessage = function(data) { onMessage(data) };
		this.webSocket.onopen = function(evt) { onOpen(evt) };
		this.webSocket.onclose = function(evt) { onClose(evt) };
		this.webSocket.onerror = function(evt) { onError(evt) };
		return this;
	}
);


PerceptionVisionComponent.prototype.onCollide = function(otherGameObject){
	this.onPercept(this.owner.id + "#" + otherGameObject.id);	
}

PerceptionVisionComponent.prototype.onPercept = function(message){
	if (this.webSocket!=undefined) {
		this.webSocket.send(message);
	}
}

onClose = function(evt) {
	alert("onClose: " + evt.data);
}

onError = function(evt) {
	alert("onError" + evt.data);	
}

onOpen = function(evt) {
	
}

onMessage = function(evt){ 
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
	if (this.webSocket!=undefined) {
		this.webSocket.close();
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