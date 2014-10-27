function AverageTimeReasoningComponent() {}

AverageTimeReasoningComponent.prototype = new Component();

AverageTimeReasoningComponent.prototype.sel = null;
AverageTimeReasoningComponent.prototype.selApproxOrigin = null;
AverageTimeReasoningComponent.prototype.selReasoningAverage = 0;
AverageTimeReasoningComponent.prototype.overallAverage = 0;
AverageTimeReasoningComponent.prototype.lastUpdate = 0;

JSUtils.addMethod(AverageTimeReasoningComponent.prototype, "initialize", 
	function(x, y){
		this.initialize();
		this.x = x; 
		this.y = y;
		return this;
	}
);

AverageTimeReasoningComponent.prototype.onMouseDown = function(x, y, wich) {
	var point = MouseSystem.getNormalizedCoordinate(x, y);
	var selected = layer.queryGameObjects(point.x, point.y, 5, 5, 20);
	selected = selected[0] || null;
	if ( selected != null && selected.frustum != null ) {
		var pvc = ComponentUtils.getComponent(selected.frustum, "PERCEPTION_VISION_COMPONENT");
		if (pvc) {
			this.sel = selected;
		}
	}
}

AverageTimeReasoningComponent.prototype.onUpdate = function(delta){
	var now = Date.now();
	if((now - this.lastUpdate)/1000 >= 1){
		this.lastUpdate = now;
		if (this.sel!=null) {
			var pvc = ComponentUtils.getComponent(this.sel.frustum, "PERCEPTION_VISION_COMPONENT");
			this.selReasoningAverage = Math.round(pvc.averageReasoningTime * 10000) / 10000;
			var aox = Math.round(this.sel.origin.x * 10000) / 10000;
			var aoy = Math.round(this.sel.origin.y * 10000) / 10000;
			if ( this.selApproxOrigin==null ) {
				this.selApproxOrigin = new Point2D().initialize(aox, aoy);
			} else {
				this.selApproxOrigin.x = aox;
				this.selApproxOrigin.y = aoy;
			}
		}		
		this.overallAverage = this.getOverallAverage();
	}	
}

AverageTimeReasoningComponent.prototype.onRender = function(context){
	var text = "Reasoning [OA: " + this.overallAverage;
	if ( this.selApproxOrigin!=null ) {
		text += ", @" + this.selApproxOrigin.origin.toString() + ": " + this.selReasoningAverage;
	}
	text += "]";
	var fillStyle = context.fillStyle;
	context.fillStyle = "blue";
	context.font = "bold 20px Arial";
	context.fillText(text, this.x, this.y);
	context.fillStyle = fillStyle;
}

AverageTimeReasoningComponent.prototype.getOverallAverage = function() {
	var agents = [];
	var overallAverage = 0;
	for (var i in Game.scene.listLayers) {
		var layer = Game.scene.listLayers[i];
		for(var j in layer.listGameObjects) {
			var go = layer.listGameObjects[j];
			if ( go != null && go.frustum != null && go instanceof GameObject ) {
				var pvc = ComponentUtils.getComponent(go.frustum, "PERCEPTION_VISION_COMPONENT");
				if ( pvc ) {
					overallAverage += pvc.averageReasoningTime;
					agents.push(go);
				}
			}
		}
	}
	overallAverage = overallAverage/agents.length;
	return Math.round(overallAverage * 10000) / 10000;
}

AverageTimeReasoningComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, MouseSystem.getTag());
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

AverageTimeReasoningComponent.prototype.getTag = function(){
	return "AVERAGE_TIME_REASONING_COMPONENT";
}