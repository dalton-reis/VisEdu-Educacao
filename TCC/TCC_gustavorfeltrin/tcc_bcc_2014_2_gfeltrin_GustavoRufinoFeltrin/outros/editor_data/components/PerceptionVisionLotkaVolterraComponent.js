function PerceptionVisionLotkaVolterraComponent(){}

PerceptionVisionLotkaVolterraComponent.prototype = new PerceptionVisionComponent();

PerceptionVisionLotkaVolterraComponent.prototype.getPerceptions = function( gameObjectPerceived ) {
	gameObjectPerceived.lastPerceived = Date.now();
	var parent = null;
	if (Game.scene) {
		for (var i in Game.scene.listLayers) {
			var layer = Game.scene.listLayers[i];
			var foundInLayer = false;
			for (var j in layer.listGameObjects) {
				var go = layer.listGameObjects[j];
				if (TokenParentUtils.isParent(this.owner, go)) {
					parent = go;
					foundInLayer = true;
					break;
				}
			}
			if (foundInLayer) {
				break;
			}
		}
	}
	var perceptions = [];
	if (parent!=null) {
		perceptions.push( "onPercept(\"" + parent.id + "\",\"" + gameObjectPerceived.id + "\")" );
	}
	return perceptions;
}

PerceptionVisionLotkaVolterraComponent.prototype.executeAction = function( action ) {
	var arrAction = action.split("(");
	arrAction = arrAction[1].split(")");
	arrAction = arrAction[0].split(",");
	var objId = StringUtils.replaceAll(arrAction[1], "\"", "");
	/*for(var i in layer.listGameObjects){
		var gameObject = layer.listGameObjects[i];
		if(gameObject.id == objId && gameObject instanceof BoxObject){
			var render = ComponentUtils.getComponent(gameObject, "BOX_RENDER_COMPONENT");
			if (render) {
				render.fillStyle = arrAction[2];
				render.strokeStyle = arrAction[3];
			}
		}
	}*/

	var found = false;
	if (Game.scene) {
		for (var i in Game.scene.listLayers) {
			var layer = Game.scene.listLayers[i];
			var foundInLayer = false;
			for (var j in layer.listGameObjects) {
				var go = layer.listGameObjects[j];
				if(go.id == objId && go instanceof BoxObject){
					var render = ComponentUtils.getComponent(go, "BOX_RENDER_COMPONENT");
					if (render) {
						render.fillStyle = arrAction[2];
						render.strokeStyle = arrAction[3];
					}
					foundInLayer = true;
					break;
				}
			}
			if (foundInLayer) {
				break;
			}
		}
	}
}