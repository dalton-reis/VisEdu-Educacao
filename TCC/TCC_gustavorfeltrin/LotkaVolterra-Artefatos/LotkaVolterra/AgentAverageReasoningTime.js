function AgentAverageReasoningTimeComponent(){}

AgentAverageReasoningTimeComponent.prototype = new Component();

AgentAverageReasoningTimeComponent.prototype.currentAgent = null;
AgentAverageReasoningTimeComponent.prototype.lastUpdate = 0;
AgentAverageReasoningTimeComponent.prototype.reasoningAverage = 0;
AgentAverageReasoningTimeComponent.prototype.agentY = 0;

AgentAverageReasoningTimeComponent.prototype.onMouseDown = function(x, y, wich) {
	var point = MouseSystem.getNormalizedCoordinate(x, y);
	var selected = layer.queryGameObjects(point.x, point.y, 5, 5, 20);
	this.currentAgent = selected[0] || null;
	if ( this.currentAgent==null || this.currentAgent.frustum==null ) {
		this.currentAgent = null;
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
	context.fillText("Reasoning: "+ this.reasoningAverage + "s ("+ this.agentY +")" , -35, -25);
}

AgentAverageReasoningTimeComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, MouseSystem.getTag());
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

AgentAverageReasoningTimeComponent.prototype.getTag = function(){
	return "AGENT_AVERAGE_REASONING_TIME_COMPONENT";
}