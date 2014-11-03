function PerceptionVisionComponent(){}

PerceptionVisionComponent.prototype = new Component();

PerceptionVisionComponent.prototype.HAND_SHAKE = "HAND_SHAKE";
PerceptionVisionComponent.prototype.isOpen = false;
PerceptionVisionComponent.prototype.timeOfInstantiation = null;
PerceptionVisionComponent.prototype.queue = [];
PerceptionVisionComponent.prototype.averageReasoningTime = 0;

PerceptionVisionComponent.prototype.agent = null;

JSUtils.addMethod(PerceptionVisionComponent.prototype, "initialize", 
	function(uri){
		this.initialize();
		var pvc = this;
		if ('WebSocket' in window || 'MozWebSocket' in window) {
			this.webSocket = new WebSocket(uri);
			this.timeOfInstantiation = Date.now();
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
	var sc = new SensorComponent().initialize();
	ComponentUtils.addComponent(this.owner, sc);
	sc.onLoad();
	//this.owner.isSensor = true;
}

PerceptionVisionComponent.prototype.onPercept = function( gameObjectPerceived ) {
	if (this.webSocket!=undefined && this.isOpen) {
		var perceps = this.getPerceptions(gameObjectPerceived);
		if ( perceps.length > 0 ) {

			var perceptions = [];
			for (var i = 0; i < perceps.length; i++) {
				//perceptions.push( {"perception": perceps[i]} );
				perceptions.push( perceps[i] );
			}

			var obj = new Object();
			obj.origin = this.owner.id;
			obj.target = gameObjectPerceived.id;
			obj.perceptions = perceptions;
			var message = JSON.stringify(obj);

			//var token = ComponentUtils.getComponent(this.owner, "TOKEN_COMPONENT").getToken();
			var now = new Date();
			this.queue.push(now);
			//console.log( "[" + token + ": send @ " + now.toLocaleString() + "] " + message );
			this.webSocket.send( message );
		} else {
			console.warn("Mensagem não enviada: Nenhuma percepção identificada!");
		}
	} else {
		console.warn("Mensagem não enviada: Socket não está definida/aberta!");
	}
}

PerceptionVisionComponent.prototype.getPerceptions = function( gameObjectPerceived ) { return []; }

PerceptionVisionComponent.prototype.onClose = function(evt) {
	this.isOpen = false;
	console.log( "onClose: " + evt.data );	
}

PerceptionVisionComponent.prototype.onError = function(evt) {
	console.log("onError: " + evt.data);
	//alert("onError: " + evt.data);	
}

PerceptionVisionComponent.prototype.onOpen = function(evt) {
	if ( this.timeOfInstantiation !=null ) {
		var now = Date.now();
		console.log("time to establish connection: " + Math.abs(now-this.timeOfInstantiation)/1000);	
		this.timeOfInstantiation = null;
	}
	this.webSocket.send( this.HAND_SHAKE );
}

PerceptionVisionComponent.prototype.onMessage = function(evt){ 
	if ( this.HAND_SHAKE == evt.data ) { // TESTAR
		this.isOpen = true;
	} else {
		var now = new Date();
		var sendDate = this.queue.shift();
		//var token = ComponentUtils.getComponent(this.owner, "TOKEN_COMPONENT").getToken();
		//console.log( "[" + token + ": receive @ " + now.toLocaleString() + "] " + evt.data );
		var reasoningTime = Math.abs(now-sendDate)/1000;
		//console.log( "[" + token + ": reasoning time] " + reasoningTime);
		if ( this.averageReasoningTime==0 ) {
			this.averageReasoningTime = reasoningTime;
		} else {
			this.averageReasoningTime = (this.averageReasoningTime+reasoningTime)/2;
		}
		var action = JSON.parse(evt.data).action;
		this.executeAction( action );
	}
	//if (this.webSocket!=undefined) {
	//		this.webSocket.close();
	//}	
}

PerceptionVisionComponent.prototype.executeAction = function( action ) { }

PerceptionVisionComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, PerceptionSystem.getTag());
  return systems;	
}

PerceptionVisionComponent.prototype.getTag = function(){
  return "PERCEPTION_VISION_COMPONENT";
}