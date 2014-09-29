var PerceptionSystem = new function(){

	this.listPerceived = new Array();

	this.isSensorialCollision = function(gameObject1, gameObject2){
		if ( gameObject1 instanceof GameObject && gameObject2 instanceof GameObject) {
			if ( gameObject1.isSensor || gameObject2.isSensor ) {
				if ( gameObject1.isSensor && !gameObject2.isSensor ) {
					this.putPerceiveInfo(gameObject1, gameObject2);
				} else if ( !gameObject1.isSensor && gameObject2.isSensor ) {
					this.putPerceiveInfo(gameObject2, gameObject1);
				}
				return true;	
			}			
		}
		return false;
	}

	this.firePerceptionListener = function(){
		for( var i in this.listPerceived ){
			var info = this.listPerceived[i];
			if( info instanceof PerceptionInfo ){
				for( var j in info.gameObjectSensor.listComponents ){
					var component = info.gameObjectSensor.listComponents[j];
					if( component instanceof Component ){
						component.onPercept( info.gameObjectPerceived )
					}
				}				
			}
		}
		this.clearSensorInfo();
	}

	this.putPerceiveInfo = function(gameObjectSensor, gameObjectPerceived){
		var perceptionKey = this.getPerceiveKey(gameObjectSensor, gameObjectPerceived);
		if( (!ArrayUtils.getElementByKey(this.listPerceived, perceptionKey) ||
		    ArrayUtils.getElementByKey(this.listPerceived, perceptionKey) == "undefined" ) && !this.isParent(gameObjectSensor, gameObjectPerceived)){
			var perceivedInfo = new PerceptionInfo().initialize(gameObjectSensor, gameObjectPerceived);
			this.listPerceived = ArrayUtils.putElement(this.listPerceived, perceptionKey, perceivedInfo);
		}
	}

	this.isParent = function(gameObjectSensor, gameObjectPerceived){
		var sensorToken = ComponentUtils.getComponent(gameObjectSensor, "TOKEN_COMPONENT");
		var perceivedToken = ComponentUtils.getComponent(gameObjectPerceived, "TOKEN_COMPONENT");
		if ( sensorToken && perceivedToken ) {
			return StringUtils.startsWith(perceivedToken.getToken(),
										  sensorToken.getToken().split("_")[0]);
		}
		return false;
	}

	this.getPerceiveKey = function(gameObjectSensor, gameObjectPerceived){
		return ("KEY_" + gameObjectSensor.id + "_" + gameObjectPerceived.id);
	}

	this.clearSensorInfo = function(){
		this.listPerceived = new Array();
	}

	this.getTag = function(){
		return "PERCEPTION_SYSTEM";
	}

}