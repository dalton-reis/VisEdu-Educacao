function DestroyWhenTokenParentNotFoundComponent() {}

DestroyWhenTokenParentNotFoundComponent.prototype = new Component();

JSUtils.addMethod(DestroyWhenTokenParentNotFoundComponent.prototype, "initialize", 
	function(parentToken){
		this.initialize();
		this.parentToken = parentToken;
		return this;
	}
);

DestroyWhenTokenParentNotFoundComponent.prototype.onUpdate = function(delta){
	var found = false;
	if (Game.scene) {
		for (var i in Game.scene.listLayers) {
			var layer = Game.scene.listLayers[i];
			var foundInLayer = false;
			for (var j in layer.listGameObjects) {
				var go = layer.listGameObjects[j];
				if (TokenParentUtils.isParent(this.owner, go)) {
					found = true;
					foundInLayer = true;
					break;
				}
			}
			if (foundInLayer) {
				break;
			}
		}
	}
	if (!found) {
		this.owner.destroy();
	}
}

DestroyWhenTokenParentNotFoundComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, LogicSystem.getTag());
  return systems;	
}

DestroyWhenTokenParentNotFoundComponent.prototype.getTag = function(){
  return "DESTROY_WHEN_TOKEN_PARENT_NOT_FOUND_COMPONENT";
}