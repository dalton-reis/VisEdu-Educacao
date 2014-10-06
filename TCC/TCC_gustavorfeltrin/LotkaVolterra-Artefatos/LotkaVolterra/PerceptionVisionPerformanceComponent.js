function PerceptionVisionPerformanceComponent(){}

PerceptionVisionPerformanceComponent.prototype = new PerceptionVisionComponent();

PerceptionVisionPerformanceComponent.prototype.queue = [];

JSUtils.addMethod(PerceptionVisionPerformanceComponent.prototype, "initialize", 
	function(uri, tmp){
		this.initialize(uri);
		return this;
	}
);

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
		var token = ComponentUtils.getComponent(this.owner, "TOKEN_COMPONENT").getToken();
		var now = new Date();
		var msg = "onPercept(" + render.fillStyle + ")";

		this.queue.push(now);
		console.log( "[" + token + ": send @ " + now.toLocaleString() + "] " + msg );
		return msg;
	}
	return null;
}

PerceptionVisionPerformanceComponent.prototype.processesMessagesReceived = function( message ) {
	var now = new Date();
	var sendDate = this.queue.shift();
	var token = ComponentUtils.getComponent(this.owner, "TOKEN_COMPONENT").getToken();
	console.log( "[" + token + ": recp @ " + now.toLocaleString() + "] " + message );
	console.log( "[" + token + ": reasoning time] " + Math.abs(now-sendDate)/1000 );


	/*if (Game.scene) {
		for(var i in Game.scene.listLayers){
			var layer = this.scene.listLayers[i];
			if(layer instanceof Layer){
				for(var j in layer.listGameObjects){
					var gameObject = layer.listGameObjects[j];
					if(gameObject instanceof GameObject){
						if ( TokenParentUtils.isParent(this.owner, go) ) {
							var parent = go;
						}
					}
				}
			}
		}
	}*/

	if ( this.owner.parent ) {
		var arrMsg = message.split("(");
		arrMsg = arrMsg[1].split(")");
		var render = null;
		if ( this.owner.parent instanceof BoxObject ) {
			render = ComponentUtils.getComponent(this.owner.parent, "BOX_RENDER_COMPONENT");	
		} else if ( this.owner.parent instanceof CircleObject ) {
			render = ComponentUtils.getComponent(this.owner.parent, "CIRCLE_RENDER_COMPONENT");		
		} else if ( this.owner.parent instanceof PolygonObject ) {
			render = ComponentUtils.getComponent(this.owner.parent, "POLYGON_RENDER_COMPONENT");		
		}	
		if (render) {
			console.log("old fillStyle: " + render.fillStyle);
			render.fillStyle = arrMsg;
			console.log("new fillStyle: " + render.fillStyle);
		}
	}

}

PerceptionVisionPerformanceComponent.prototype.getTag = function(){
  return "PERCEPTION_VISION_PERFORMANCE_COMPONENT";
}