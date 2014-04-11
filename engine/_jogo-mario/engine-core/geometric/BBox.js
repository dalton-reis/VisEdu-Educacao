function BBox(){}

JSUtils.addMethod(BBox.prototype, "initialize", 
function(){
	this.minX = 0;
	this.minY = 0;
	this.maxX = 0;
	this.maxY = 0;
	return this;
}
);

JSUtils.addMethod(BBox.prototype, "initialize", 
function(minX, minY, maxX, maxY){
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
	return this;
}
);

BBox.prototype.update = function(minX, minY, maxX, maxY){
	this.minX = minX;
	this.minY = minY;
	this.maxX = maxX;
	this.maxY = maxY;
}

BBox.prototype.isColliding = function(other){
	if(this.minX > other.maxX ||
	   this.maxX < other.minX ||
	   this.minY > other.maxY ||
	   this.maxY < other.minY){
	   	
		return false;
	}
	
	return true;
}
