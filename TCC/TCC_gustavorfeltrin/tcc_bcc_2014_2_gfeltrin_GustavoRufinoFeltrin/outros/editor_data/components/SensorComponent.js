function SensorComponent(){}

SensorComponent.prototype = new Component();

SensorComponent.prototype.onLoad = function(){
	this.owner.isSensor = true;
}

SensorComponent.prototype.getTag = function(){
	return "SENSOR_COMPONENT";
}