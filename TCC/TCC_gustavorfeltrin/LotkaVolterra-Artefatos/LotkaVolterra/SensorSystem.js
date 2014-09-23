var SensorSystem = new function(){

	this.isSensorialCollision = function(gameObject1, gameObject2){
		if ( ( gameObject1 instanceof GameObject && gameObject2 instanceof GameObject) && 
			 ( gameObject1.isSensor || gameObject2.isSensor ) ) {
			return true;
		}
		return false;
	}

	this.getTag = function(){
		return "SENSOR_SYSTEM";
	}

}