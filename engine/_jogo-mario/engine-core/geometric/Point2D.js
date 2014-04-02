function Point2D(){}

JSUtils.addMethod(Point2D.prototype, "initialize", 
function(x, y){
	this.x = x;
	this.y = y;
	return this;
}
);

Point2D.prototype.toString = function(){
	return this.x + ', ' + this.y;
}
