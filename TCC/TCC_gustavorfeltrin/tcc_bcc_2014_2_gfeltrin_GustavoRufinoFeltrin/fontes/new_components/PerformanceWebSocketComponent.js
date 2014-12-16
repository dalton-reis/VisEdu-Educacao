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
	/* { 1 agente ~= 5 objetos gráficos }
	205 agentes lança "Uncaught TypeError: Cannot read property 'GetNext' of undefined [b2BroadPhase.js:157]"

	Com 204 agentes são gerados até 1020 objetos na tela, e a Box2dJS aparentemente 
	tem uma limitação em fazer proxy de até 1024 objetos.
	 */
	var maxValue = 204;
	do {
		var qtd = prompt("Informe a quantidade de agentes (" + minValue + ".." + maxValue + ")", "20");
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

	do {
		var done = false;
		var qtdObstaculos = prompt("Informe a quantidade de obst\u00E1culos (0, 1, 3)", "3");
		if ( qtdObstaculos && !isNaN(qtdObstaculos) ) {
			qtdObstaculos = parseInt(qtdObstaculos);
			if ( qtdObstaculos == 0 || qtdObstaculos == 3 || qtdObstaculos == 1) {
				done = true;
			}
		}
	}
	while ( !done )

	var mind = confirm("Utilizar mente?");
	var fixedSpeed = confirm("Velocidade fixa?");

	var ocupy = this.canvasHeight * 0.9 / qtd;
	var space = this.canvasHeight * 0.1 / qtd;
	var jumpY = (ocupy + space);
	var agentHeight = 30;
	var defaultAgentSize = true;
	if ( ((agentHeight+space) * qtd) > this.canvasHeight) {
		agentHeight = ocupy;
		defaultAgentSize = false;
	}
	for (var i = 1; i <= qtd; i++) {
		var y = (jumpY * i) -90;
		var velocity = 200;
		if ( !fixedSpeed ) {
			velocity = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
		}
		var pwsac = new PerformanceWebSocketAgentComponent().initialize(agentHeight, y, this.uri, mind, velocity, defaultAgentSize, qtdObstaculos);
		pwsac.onLoad();
	}
}

PerformanceWebSocketComponent.prototype.getTag = function(){
	return "PERFORMANCE_WEBSOCKET_COMPONENT";
}