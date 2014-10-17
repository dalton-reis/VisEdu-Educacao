function PerformanceWebSocketComponent(){}

PerformanceWebSocketComponent.prototype = new Component();

PerformanceWebSocketComponent.prototype.canvasHeight = 800;

JSUtils.addMethod(PerformanceWebSocketComponent.prototype, "initialize", 
	function(uri, qtd, mind){
		this.initialize();
		this.uri = uri;
		this.qtd = qtd
		this.mind = mind;
		return this;
	}
);

PerformanceWebSocketComponent.prototype.onLoad = function(){
	/*if ( IE and this.qtd > 128  ) { // http://www.pontikis.net/tip/?id=27
		this.qtd = 128;
	}*/
	
	var ocupy = this.canvasHeight * 0.9 / this.qtd;
	var space = this.canvasHeight * 0.1 / this.qtd;
	var jumpY = (ocupy + space);
	var agentHeight = 30;
	if ( ((agentHeight+space) * this.qtd) > this.canvasHeight) {
		agentHeight = ocupy;
	}
	for (var i = 1; i <= this.qtd; i++) {
		var y = jumpY * i;
		var pwsac = new PerformanceWebSocketAgentComponent().initialize(agentHeight, y, this.uri, this.mind);
		pwsac.onLoad();
	}
}

PerformanceWebSocketComponent.prototype.getTag = function(){
	return "PERFORMANCE_WEBSOCKET_COMPONENT";
}