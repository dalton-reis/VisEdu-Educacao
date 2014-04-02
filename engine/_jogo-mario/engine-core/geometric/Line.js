function Line(){}

JSUtils.addMethod(Line.prototype, "initialize", 
function(x1, y1, x2, y2){
	this.start = new Vector2D().initialize(x1, y1);
	this.end = new Vector2D().initialize(x2, y2);
	return this;
}
);

JSUtils.addMethod(Line.prototype, "initialize", 
function(start, end){
	this.start = start;
	this.end = end;
	return this;
}
);

Line.prototype.getLine = function(){
	var line = new Vector2D.initialize(this.end.x, this.end.y);
	line.sub(this.start.x, this.start.y);
	return line;
}

Line.prototype.length = function(){
	return this.getLine().length();
}

Line.prototype.lengthSquared = function(){
	return this.getLine().lengthSquared();
}
