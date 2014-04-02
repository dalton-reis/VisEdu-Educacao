function Camera(){}

JSUtils.addMethod(Camera.prototype, "initialize", 
function(){
	this.centerX = 0;
	this.centerY = 0;
	return this;
}
);

JSUtils.addMethod(Camera.prototype, "initialize", 
function(centerX, centerY){
	this.centerX = centerX;
	this.centerY = centerY;
	return this;
}
);