function AgentAverageReasoningTimeComponent(){}

AgentAverageReasoningTimeComponent.prototype = new Component();

AgentAverageReasoningTimeComponent.prototype.currentAgent = null;
AgentAverageReasoningTimeComponent.prototype.lastUpdate = 0;
AgentAverageReasoningTimeComponent.prototype.reasoningAverage = 0;
AgentAverageReasoningTimeComponent.prototype.agentY = 0;
AgentAverageReasoningTimeComponent.prototype.levelLayer = 0;

AgentAverageReasoningTimeComponent.prototype.onMouseDown = function(x, y, wich) {
	var point = MouseSystem.getNormalizedCoordinate(x, y);
	var selected = layer.queryGameObjects(point.x, point.y, 5, 5, 20);
	selected = selected[0] || null;
	if ( selected!=null && selected.frustum!=null ) {
		this.currentAgent = selected;
	}

}

AgentAverageReasoningTimeComponent.prototype.onRender = function(context){
	if (this.currentAgent!=null) {
		var now = Date.now();
		if((now - this.lastUpdate)/1000 >= 1){
			this.lastUpdate = now;
			var pvpc = ComponentUtils.getComponent(this.currentAgent.frustum, "PERCEPTION_VISION_PERFORMANCE_COMPONENT");
			this.reasoningAverage = Math.round(pvpc.averageReasoningTime * 10000) / 10000;
			this.agentY = this.currentAgent.origin.y;
		}		
	}
	context.fillStyle = "blue";
	context.font = "bold 20px Arial";
	context.fillText("Reasoning: "+ this.reasoningAverage + "s ("+ this.agentY +")" , 20, 50);
}

AgentAverageReasoningTimeComponent.prototype.onKeyUp = function(keyCode){
	if(keyCode == 65) {
		var layer = Game.scene.listLayers[this.levelLayer];
		var agents = [];

		for(var i in layer.listGameObjects) {
			var go = layer.listGameObjects[i];
			if ( go!=null && go.frustum!=null ) {
				agents.push(go);
			}
		}
		var newAgent = null;
		for(var i in agents) {
			var agent = agents[i];
			if ( this.currentAgent==null ) {
				newAgent = agent;
				break;
			} else {
				var tc = ComponentUtils.getComponent(agent, "TOKEN_COMPONENT");
				if (tc) {
					var token = tc.getToken(); // e.g. PERFORMANCEX
					token = token.split("PERFORMANCE")[1];
					if ( this.agentY < token ) {
						newAgent = agent;
						break;
					}
				}
			}
		}
		if ( newAgent==null ) {
			newAgent = agents[0];
		}
		this.currentAgent = newAgent;
	}
}

AgentAverageReasoningTimeComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, MouseSystem.getTag());
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	systems = ArrayUtils.addElement(systems, KeySystem.getTag());
	return systems;
}

AgentAverageReasoningTimeComponent.prototype.getTag = function(){
	return "AGENT_AVERAGE_REASONING_TIME_COMPONENT";
}