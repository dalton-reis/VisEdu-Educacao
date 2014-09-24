function PerceptionInfo(){}

JSUtils.addMethod(PerceptionInfo.prototype, "initialize", 
	function(gameObjectSensor, gameObjectPerceived){
		this.gameObjectSensor = gameObjectSensor;
		this.gameObjectPerceived = gameObjectPerceived;
		return this;
	}
);