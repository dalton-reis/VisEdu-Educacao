function PerceptionVisionPerformanceComponent(){}

PerceptionVisionPerformanceComponent.prototype = new PerceptionVisionComponent();

PerceptionVisionPerformanceComponent.prototype.queue = [];
PerceptionVisionPerformanceComponent.prototype.averageReasoningTime = null;

PerceptionVisionPerformanceComponent.prototype.createPerceptionMessage = function( gameObjectPerceived ) {
	var render = null;
	if ( gameObjectPerceived instanceof BoxObject ) {
		render = ComponentUtils.getComponent(gameObjectPerceived, "BOX_RENDER_COMPONENT");	
	} else if ( gameObjectPerceived instanceof CircleObject ) {
		render = ComponentUtils.getComponent(gameObjectPerceived, "CIRCLE_RENDER_COMPONENT");		
	} else if ( gameObjectPerceived instanceof PolygonObject ) {
		render = ComponentUtils.getComponent(gameObjectPerceived, "POLYGON_RENDER_COMPONENT");		
	}	
	if (render) {
		//var token = ComponentUtils.getComponent(this.owner, "TOKEN_COMPONENT").getToken();
		var perceptions = [];
		perceptions.push( {"perception": "onPercept(\"" + render.fillStyle + "\")"} );

		var obj = new Object();
		obj.origin = this.owner.id;
		obj.target = gameObjectPerceived.id;
		obj.perceptions = perceptions;
		obj.action = null;
		var msg = JSON.stringify(obj);
		var now = new Date();
		this.queue.push(now);
		//console.log( "[" + token + ": send @ " + now.toLocaleString() + "] " + msg );
		return msg;
	}
	return null;
}

PerceptionVisionPerformanceComponent.prototype.processesMessagesReceived = function( message ) {
	var now = new Date();
	var sendDate = this.queue.shift();
	//var token = ComponentUtils.getComponent(this.owner, "TOKEN_COMPONENT").getToken();
	//console.log( "[" + token + ": receive @ " + now.toLocaleString() + "] " + message );
	var reasoningTime = Math.abs(now-sendDate)/1000;
	//console.log( "[" + token + ": reasoning time] " + reasoningTime);
	if ( this.averageReasoningTime==null ) {
		this.averageReasoningTime = reasoningTime;
	} else {
		this.averageReasoningTime = (this.averageReasoningTime+reasoningTime)/2;
	}
	message = JSON.parse(message);
	message = message.action;	
	if ( this.owner.parent ) {
		var arrMsg = message.split("(");
		arrMsg = arrMsg[1].split(")")[0];
		arrMsg = StringUtils.replaceAll(arrMsg, "\"", "");
		var render = null;
		if ( this.owner.parent instanceof BoxObject ) {
			render = ComponentUtils.getComponent(this.owner.parent, "BOX_RENDER_COMPONENT");
		} else if ( this.owner.parent instanceof CircleObject ) {
			render = ComponentUtils.getComponent(this.owner.parent, "CIRCLE_RENDER_COMPONENT");
		} else if ( this.owner.parent instanceof PolygonObject ) {
			render = ComponentUtils.getComponent(this.owner.parent, "POLYGON_RENDER_COMPONENT");
		}	
		if (render) {
			render.fillStyle = 	arrMsg;
		}
	}

	/*if ( this.queue.length == 0 ) {
		console.log("[" + token + ": queue is empty] ");
	}*/

}

PerceptionVisionPerformanceComponent.prototype.getTag = function(){
  return "PERCEPTION_VISION_PERFORMANCE_COMPONENT";
}