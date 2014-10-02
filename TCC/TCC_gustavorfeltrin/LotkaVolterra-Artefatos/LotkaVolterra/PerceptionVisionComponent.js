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
		this.webSocket.onmessage = function(evt) { onMessage (evt) };
		this.webSocket.onopen    = function(evt) { onOpen    (evt) };
		this.webSocket.onclose   = function(evt) { onClose   (evt) };
		this.webSocket.onerror   = function(evt) { onError   (evt) };
		return this;
	}
);

PerceptionVisionComponent.prototype.onLoad = function(){
	this.owner.isSensor = true;
}

PerceptionVisionComponent.prototype.onPercept = function( gameObjectPerceived ) {
	if (this.webSocket!=undefined) {
		this.webSocket.send( this.owner.id + "#onPercept(\"" + gameObjectPerceived.id + "\")" );
	}
}

onClose = function(evt) {
	console.log( "onClose: " + evt.data );
	alert("onClose: " + evt.data);
}

onError = function(evt) {
	console.log("onError: " + evt.data);
	alert("onError: " + evt.data);	
}

onOpen = function(evt) {
	
}

onMessage = function(evt){ 
	var message = evt.data;	
	var arrMsg = message.split("(");
	arrMsg = arrMsg[1].split(")");
	arrMsg = arrMsg[0].split(",");
	var objId = StringUtils.replaceAll(arrMsg[0], "\"", "");
	for(var i in layer.listGameObjects){
		var gameObject = layer.listGameObjects[i];
		if(gameObject instanceof BoxObject){
			if ( gameObject.id == objId) {
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
  systems = ArrayUtils.addElement(systems, PerceptionSystem.getTag());
  return systems;	
}

PerceptionVisionComponent.prototype.getTag = function(){
  return "PERCEPTION_VISION_COMPONENT";
}