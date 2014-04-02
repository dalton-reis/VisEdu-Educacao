function Component(){}

JSUtils.addMethod(Component.prototype, "initialize", 
function(gameObject){
	this.gameObject = gameObject;
	this.posConstruct();
	return this;
}
);

Component.prototype.getTag = function(){
	return null;
}

Component.prototype.posConstruct = function(){}

Component.prototype.update = function(deltaTime){}

Component.prototype.onKeyDown = function(keyCode){}

Component.prototype.onKeyUp = function(keyCode){}

Component.prototype.onClick = function(x, y, which){}

Component.prototype.onMouseDown = function(x, y, which){}

Component.prototype.onMouseUp = function(x, y, which){}

Component.prototype.onMouseMove = function(x, y){}

Component.prototype.onCollide = function(collideInfo){}

Component.prototype.onBeforeRender = function(){}

Component.prototype.onRender = function(context){}

Component.prototype.isPointInside = function(x, y){
	if(x >= this.gameObject.minX && x <= this.gameObject.maxX &&
	   y >= this.gameObject.minY && y <= this.gameObject.maxY){
	   	
	   	return true;
	}
	return false;
}