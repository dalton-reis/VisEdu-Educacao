function RotateAtOriginComponent(){}

RotateAtOriginComponent.prototype = new Component();

RotateAtOriginComponent.prototype.onLoad = function(){
	this.owner.rotateAtOrigin = true;
}

RotateAtOriginComponent.prototype.getOrigemToRotate = function(){
	var myToken = ComponentUtils.getComponent(this.owner, "TOKEN_COMPONENT");
	for(var i in Game.scene.listLayers){
		var layer = Game.scene.listLayers[i];
		if(layer instanceof Layer){
			for(var j in layer.listGameObjects){
				var gameObject = layer.listGameObjects[j];
				if(gameObject instanceof GameObject){
					var goToken = ComponentUtils.getComponent(gameObject, "TOKEN_COMPONENT");
					if ( myToken && goToken && goToken.getToken() != myToken.getToken() && StringUtils.startsWith(goToken.getToken(), myToken.getToken().split("_")[0])) {
						return new Point2D().initialize(gameObject.getCenterX(), gameObject.getCenterY());
					}
				}
			}
		}
	}
}

RotateAtOriginComponent.prototype.getTag = function(){
	return "ROTATE_AT_ORIGIN_COMPONENT";
}