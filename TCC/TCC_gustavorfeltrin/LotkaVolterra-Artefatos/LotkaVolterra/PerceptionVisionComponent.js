function PerceptionVisionComponent(){}

PerceptionVisionComponent.prototype = new Component();

PerceptionVisionComponent.prototype.HAND_SHAKE = "HAND_SHAKE";

JSUtils.addMethod(PerceptionVisionComponent.prototype, "initialize", 
	function(uri){
		this.initialize();
		var pvc = this;
		if ('WebSocket' in window || 'MozWebSocket' in window) {
			this.webSocket = new WebSocket(uri);
		} else {
			alert("Browser não suporta WebSocket");
			return this;
		}
		this.webSocket.onmessage = function(evt) { 
			pvc.onMessage(evt)
		};
		this.webSocket.onopen    = function(evt) { 
			pvc.onOpen(evt)
		};
		this.webSocket.onclose   = function(evt) { 
			pvc.onClose(evt) 
		};
		this.webSocket.onerror   = function(evt) { 
			pvc.onError(evt)
		};
		return this;
	}
);

PerceptionVisionComponent.prototype.onLoad = function(){
	this.owner.isSensor = true;
}

PerceptionVisionComponent.prototype.onPercept = function( gameObjectPerceived ) {
	if (this.webSocket!=undefined) {
		var message = this.createPerceptionMessage(gameObjectPerceived);
		if ( message && !StringUtils.isEmpty(message) ) {
			this.webSocket.send( message );
		}
	}
}

PerceptionVisionComponent.prototype.createPerceptionMessage = function( gameObjectPerceived ) { return null; }

PerceptionVisionComponent.prototype.onClose = function(evt) {
	console.log( "onClose: " + evt.data );	
}

PerceptionVisionComponent.prototype.onError = function(evt) {
	console.log("onError: " + evt.data);
	alert("onError: " + evt.data);	
}

PerceptionVisionComponent.prototype.onOpen = function(evt) {
	this.webSocket.send( this.HAND_SHAKE );
}

PerceptionVisionComponent.prototype.onMessage = function(evt){ 
	if ( this.HAND_SHAKE != evt.data ) {
		this.processesMessagesReceived(evt.data);
	}
	//if (this.webSocket!=undefined) {
	//		this.webSocket.close();
	//}	
}

PerceptionVisionComponent.prototype.processesMessagesReceived = function( message ) { }

PerceptionVisionComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, PerceptionSystem.getTag());
  return systems;	
}

PerceptionVisionComponent.prototype.getTag = function(){
  return "PERCEPTION_VISION_COMPONENT";
}