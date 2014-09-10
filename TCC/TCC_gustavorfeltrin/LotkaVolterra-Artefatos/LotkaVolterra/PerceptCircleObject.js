function PerceptCircleObject(){}

PerceptCircleObject.prototype = new CircleObject();

JSUtils.addMethod(PerceptCircleObject.prototype, "initialize", 
	function(x, y, radius, fillStyle, fillStroke, wsUri){
		this.initialize(x, y, radius, fillStyle, fillStroke);
		this.webSocket = new WebSocket(wsUri);
		this.webSocket.onopen = function(evt) { onOpen(evt) };
		this.webSocket.onclose = function(evt) { onClose(evt) };
		this.webSocket.onmessage = function(evt) { onMessage(evt) };
		this.webSocket.onerror = function(evt) { onError(evt) }
		return this;
	}
);

PerceptCircleObject.prototype.function = onOpen(evt) { 
	//writeToScreen("CONNECTED");
	//doSend("WebSocket rocks");
	this.webSocket.send("CON" + this.owner.id); 	
}  

PerceptCircleObject.prototype.function = onClose(evt) { 
	//writeToScreen("DISCONNECTED");
	alert("WebSocket disconnected!");
}  

PerceptCircleObject.prototype.function = onMessage(evt) { 
	//writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
	// FIXME o que faze quando receber uma mensagem ...
	this.webSocket.close(); // ???
}

PerceptCircleObject.prototype.function = onError(evt) { 
	//writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data); 
	alert("WebSocket error:\n" + evt.data);
}  

PerceptCircleObject.prototype.function = doSend(message) { 
	//writeToScreen("SENT: " + message);  
	this.webSocket.send("SND" + message); 
}

PerceptCircleObject.prototype.getTag = function(){
	return "PERCEPT_CIRCLE_OBJECT";
}