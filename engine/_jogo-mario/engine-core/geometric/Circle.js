function Circle(){}

JSUtils.addMethod(Circle.prototype, "initialize", 
function(centerX, centerY, radius){
	this.centerX = centerX;
	this.centerY = centerY;
	this.radius = radius;
	return this;
}
);

Circle.prototype.intersects = function(otherCircle){
	var catethusOne = otherCircle.centerX - this.centerX;
	var catethusTwo = otherCircle.centerY - this.centerY;
	var distance = Math.sqrt(catethusOne * catethusOne + catethusTwo * catethusTwo);
	
	if(distance < (this.radius + otherCircle.radius)){
		return true;
	}
	
	return false;
}

Circle.prototype.toString = function(){
	return this.centerX + ', ' + this.centerY + ', ' + this.radius;
}
