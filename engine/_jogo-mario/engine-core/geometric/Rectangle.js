function Rectangle(){}

JSUtils.addMethod(Rectangle.prototype, "initialize", 
function(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	return this;
}
);

Rectangle.prototype.intersects = function(otherRectangle){
	var leftOne = this.x;
	var topOne = this.y;
	var rightOne = this.x + this.width;
	var bottomOne = this.y + this.height;
	
	var leftTwo = otherRectangle.x;
	var topTwo = otherRectangle.y;
	var rightTwo = otherRectangle.x + otherRectangle.width;
	var bottomTwo = otherRectangle.y + otherRectangle.height;
	
	if(leftOne > rightTwo){
		return false;
	}
	if(rightOne < leftTwo){
		return false;
	}
	if(topOne > bottomTwo){
		return false;
	}
	if(bottomOne < topTwo){
		return false;
	}
	
	return true;
}

Rectangle.prototype.toString = function(){
	return this.x + ', ' + this.y + ', ' + this.width + ', ' + this.height;
}