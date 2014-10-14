function PerformanceWebSocketComponent(){}

PerformanceWebSocketComponent.prototype = new Component();

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
	// FIXME ver caso da proporção quanto a qtd de agentes, para caber todos na tela...

	for (var i = 1; i <= this.qtd; i++) {
		var y = 40 * i;
		var pwsac = new PerformanceWebSocketAgentComponent().initialize(y, this.uri, 100, this.mind);
		pwsac.onLoad();
	}
}

PerformanceWebSocketComponent.prototype.getTag = function(){
	return "PERFORMANCE_WEBSOCKET_COMPONENT";
}