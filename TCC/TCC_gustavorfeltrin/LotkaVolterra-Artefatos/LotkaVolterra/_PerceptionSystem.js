var PerceptionSystem = new function() {

	this.firePerceptListener = function(webSocket) {		
		for(var i in Game.listComponents){
			var component = Game.listComponents[i];
			if(component instanceof Component ){
				component.onPercept(webSocket);
			}
		}
		if(Game.scene){
			for(var i in Game.scene.listComponents){
				var component = Game.scene.listComponents[i];
				if(component instanceof Component ){
					component.onPercept(webSocket);
				}
			}
			for(var i in Game.scene.listLayers){
				var layer = Game.scene.listLayers[i];
				if(layer instanceof Layer){
					for(var j in layer.listComponents){
						var component = layer.listComponents[j];
						if(component instanceof Component ){
							component.onPercept(webSocket);
						}
					}
					for(var j in layer.listGameObjects){
						var gameObject = layer.listGameObjects[j];
						if(gameObject instanceof GameObject){
							for(var k in gameObject.listComponents){
								var component = gameObject.listComponents[k];
								if(component instanceof Component){
									component.onPercept(webSocket);
								}
							}
						}
					}
				}
			}
		}
	}

	this.getTag = function(){
		return "PERCEPTION_SYSTEM";
	}

}