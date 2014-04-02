function Scene(){}

JSUtils.addMethod(Scene.prototype, "initialize", 
function(tag){
	this.tag = tag;
	this.gameObjects = new Array();
	return this;
}
);

Scene.prototype.addGameObject = function(gameObject){
	this.gameObjects = ArrayUtils.addElement(this.gameObjects, gameObject);
}

Scene.prototype.removeGameObject = function(gameObject){
	var index = ArrayUtils.getIndexOf(this.gameObjects, gameObject);
	if(index > -1){
		this.gameObjects = ArrayUtils.removeElement(this.gameObjects, index);
	}
}