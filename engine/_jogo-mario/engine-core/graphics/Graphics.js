function Graphics(){}

JSUtils.addMethod(Graphics.prototype, "initialize", 
function(context2D){
	this.context2D = context2D;
	return this;
}
);