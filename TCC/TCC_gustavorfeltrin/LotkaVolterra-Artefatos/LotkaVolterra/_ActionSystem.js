var ActionSystem = new function() {

	this.fireActionListener = function(message) {
		var arrMessage = message.split("#");
		for(var i in Game.listComponents){
			var component = Game.listComponents[i];
			if(component instanceof Component && component.id == arrMessage[0]){
				component.onAct(message);
			}
		}
		if(Game.scene){
			for(var i in Game.scene.listComponents){
				var component = Game.scene.listComponents[i];
				if(component instanceof Component && component.id == arrMessage[0]){
					component.onAct(message);
				}
			}
			for(var i in Game.scene.listLayers){
				var layer = Game.scene.listLayers[i];
				if(layer instanceof Layer){
					for(var j in layer.listComponents){
						var component = layer.listComponents[j];
						if(component instanceof Component && component.id == arrMessage[0]){
							component.onAct(message);
						}
					}
					for(var j in layer.listGameObjects){
						var gameObject = layer.listGameObjects[j];
						if(gameObject instanceof GameObject){
							for(var k in gameObject.listComponents){
								var component = gameObject.listComponents[k];
								if(component instanceof Component && component.id == arrMessage[0]){
									component.onAct(message);
								}
							}
						}
					}
				}
			}
		}
	}

	this.getTag = function(){
		return "ACTION_SYSTEM";
	}

}