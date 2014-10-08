function PerceptionVisionLotkaVolterraComponent(){}

PerceptionVisionLotkaVolterraComponent.prototype = new PerceptionVisionComponent();

PerceptionVisionLotkaVolterraComponent.prototype.createPerceptionMessage = function( gameObjectPerceived ) {
	return "onPercept(\"" + this.owner.id + "\",\"" + gameObjectPerceived.id + "\")";
}

PerceptionVisionLotkaVolterraComponent.prototype.processesMessagesReceived = function( message ) {
	var arrMsg = message.split("(");
	arrMsg = arrMsg[1].split(")");
	arrMsg = arrMsg[0].split(",");
	var objId = StringUtils.replaceAll(arrMsg[0], "\"", "");
	for(var i in layer.listGameObjects){
		var gameObject = layer.listGameObjects[i];
		if(gameObject instanceof BoxObject){
			if ( gameObject.id == objId) {
				var render = ComponentUtils.getComponent(gameObject, "BOX_RENDER_COMPONENT");
				if (render) {
					render.fillStyle = arrMsg[1];
					render.strokeStyle = arrMsg[2];
				}				
			}
		}
	}
}


PerceptionVisionLotkaVolterraComponent.prototype.getTag = function(){
  return "PERCEPTION_VISION_LOTKAVOLTERRA_COMPONENT";
}