function PerformanceWebSocketComponent(){}

PerformanceWebSocketComponent.prototype = new Component();

PerformanceWebSocketComponent.prototype.canvasHeight = 790;

JSUtils.addMethod(PerformanceWebSocketComponent.prototype, "initialize", 
	function(uri){
		this.initialize();
		this.uri = uri;		
		return this;
	}
);

PerformanceWebSocketComponent.prototype.onLoad = function(){	
	var minValue = 1;
	var maxValue = 50;
	do {
		var qtd = prompt("Informe a quantidade de agentes (" + minValue + ".." + maxValue + ")", "50");
	}
	while ( isNaN(qtd) || qtd < minValue || qtd > maxValue ) 

	/*
	if (qtd > 6 && 
		((navigator.userAgent.indexOf('MSIE') !== -1) || 
		 (navigator.appVersion.indexOf('Trident/'))) > 0) {
 	  	var msg = "No Internet Explorer, o número máximo de conexões WebSocket simultâneas permitidas para um único host é apenas 6, para customizar a mesma basta adicionar o recurso \"FEATURE_WEBSOCKET_MAXCONNECTIONSPERSERVER\" ao registro do windows.";
 	  	if ( confirm(msg, "_self") ) {
 	  		window.open("http://msdn.microsoft.com/en-us/library/ee330736%28v=vs.85%29.aspx#websocket_maxconn");
 	  	} 	  	
	}
	*/

	var mind = confirm("Utilizar mente?");
	
	var ocupy = this.canvasHeight * 0.9 / qtd;
	var space = this.canvasHeight * 0.1 / qtd;
	var jumpY = (ocupy + space);
	var agentHeight = 30;
	if ( ((agentHeight+space) * qtd) > this.canvasHeight) {
		agentHeight = ocupy;
	}
	for (var i = 1; i <= qtd; i++) {
		var y = (jumpY * i) -90;
		var pwsac = new PerformanceWebSocketAgentComponent().initialize(agentHeight, y, this.uri, mind);
		pwsac.onLoad();
	}
}

PerformanceWebSocketComponent.prototype.getTag = function(){
	return "PERFORMANCE_WEBSOCKET_COMPONENT";
}