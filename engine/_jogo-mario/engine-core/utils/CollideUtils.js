var CollideUtils = new function(){
	
	this.raycast = function(position, width, height, scene){
		var raycastBBox = new BBox().initialize(position.x, 
		                                        position.y,
		                                        (position.x + width), 
		                                        (position.y + height));
												
		for(var i=0; i<scene.gameObjects.length; i++){
			var gameObject = scene.gameObjects[i];
			if(this.isColliding(raycastBBox, gameObject.bbox)){
				return true;
			}
		}
		return false;
	}
	
	this.getCollisions = function(gameObject, scene, objectArray){
		for(var i=0; i<scene.gameObjects.length; i++){
			var gameObjectOther = scene.gameObjects[i];
			if(gameObject.id != gameObjectOther.id && this.isColliding(gameObject.bbox, gameObjectOther.bbox)){
				objectArray = ArrayUtils.addElement(objectArray, gameObjectOther);
			}
		}
	}
	
	this.getCollides = function(scene){
		var collides = new Array();
		for(var i=0; i<scene.gameObjects.length; i++){
			var goOne = scene.gameObjects[i];
			if(goOne.movable == true){
				var bbOne = goOne.bbox;
				for(var j=0; j<scene.gameObjects.length; j++){
					var goTwo = scene.gameObjects[j];
					var bbTwo = goTwo.bbox;
					if(goOne.id != goTwo.id && this.isColliding(bbOne, bbTwo) && 
						ArrayUtils.getElementByTag(collides, (goOne.id + "_" + goTwo.id)) == null){
						console.log("colisao " + (goOne.id + "_" + goTwo.id));
						console.log("-------------------------------------------------------");
						var collideInfoOne = new CollideInfo().initialize(goOne.id + "_" + goTwo.id, 
						                                                  goOne, 
																		  goTwo,
																		  "undefined", 
																		  "undefined");
						var collideInfoTwo = new CollideInfo().initialize(goTwo.id + "_" + goOne.id, 
						                                                  goTwo, 
																		  goOne,
																		  "undefined", 
																		  "undefined");
						ArrayUtils.addElement(collides, collideInfoOne);
						ArrayUtils.addElement(collides, collideInfoTwo);
					}
				}
			}
		}
		return collides;
	}
	
	this.isColliding = function(bbOne, bbTwo){
		if(bbOne.minX > bbTwo.maxX || bbOne.maxX < bbTwo.minX ||
		   bbOne.minY > bbTwo.maxY || bbOne.maxY < bbTwo.minY){
			return false;
		}
		return true;
	}
	
	this.isUp = function(bbOne, bbTwo){
		if(bbTwo.maxY < bbOne.minY){
			return true;
		}
		return false;
	}
	
	this.isDown = function(bbOne, bbTwo){
		if(bbTwo.minY > bbOne.maxY){
			return true;
		}
		return false;
	}
	
	this.isLeft = function(bbOne, bbTwo){
		if(bbTwo.maxX < bbOne.minX){
			return true;
		}
		return false;
	}
	
	this.isRight = function(bbOne, bbTwo){
		if(bbTwo.minX > bbOne.maxX){
			return true;
		}
		return false;
	}
	
}
