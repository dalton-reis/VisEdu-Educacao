function WebSocketComponent() {}

WebSocketComponent.prototype = new Component();

WebSocketComponent.prototype.webSocket = null;

JSUtils.addMethod(WebSocketComponent.prototype, "initialize", 
	function (agentName) {
		if ( ('WebSocket' in window) || ('MozWebSocket' in window) ) { 
			webSocket = new WebSocket("ws://" + document.location.host + "/lotkaVolterraWeb/websocket?agentName=" + agentName); 
		} else { 
			alert("Browser não suporta WebSocket!"); 
		}			
		return this;
	}
);

WebSocketComponent.prototype.onOpen = function(){
	if ( websocket !=undefined ) {
		alert(agentName + " conectou.");
	}
}

WebSocketComponent.prototype.onClose = function(){
	if ( websocket !=undefined ) {
		alert(agentName + " desconectou.");
	};
} 

WebSocketComponent.prototype.onError = function() {}

WebSocketComponent.prototype.onMessage = function(message){
	// FIXME o que faze quando receber uma mensagem ...
}

WebSocketComponent.prototype.sendMessageWS = function(message){
	if ( websocket !=undefined ) {
		websocket.send(message);
	};
}

WebSocketComponent.prototype.getTag = function(){
	return "WEBSOCKET_COMPONENTE";
}