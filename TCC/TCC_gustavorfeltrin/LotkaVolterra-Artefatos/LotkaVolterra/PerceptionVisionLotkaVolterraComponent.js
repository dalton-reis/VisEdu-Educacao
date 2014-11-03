function PerceptionVisionLotkaVolterraComponent(){}

PerceptionVisionLotkaVolterraComponent.prototype = new PerceptionVisionComponent();

PerceptionVisionLotkaVolterraComponent.prototype.getPerceptions = function( gameObjectPerceived ) {
	gameObjectPerceived.lastPerceived = Date.now();
	var perceptions = [];
	perceptions.push( "onPercept(\"" + this.owner.id + "\",\"" + gameObjectPerceived.id + "\")" );
	return perceptions;
}

PerceptionVisionLotkaVolterraComponent.prototype.executeAction = function( action ) {
	var arrAction = action.split("(");
	arrAction = arrAction[1].split(")");
	arrAction = arrAction[0].split(",");
	var objId = StringUtils.replaceAll(arrAction[1], "\"", "");
	for(var i in layer.listGameObjects){
		var gameObject = layer.listGameObjects[i];
		if(gameObject.id == objId && gameObject instanceof BoxObject){
			var render = ComponentUtils.getComponent(gameObject, "BOX_RENDER_COMPONENT");
			if (render) {
				render.fillStyle = arrAction[2];
				render.strokeStyle = arrAction[3];
			}
		}
	}
}