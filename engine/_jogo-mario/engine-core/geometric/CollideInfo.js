function CollideInfo(){}

JSUtils.addMethod(CollideInfo.prototype, "initialize", 
function(tag, gameObjectOne, gameObjectTwo, sideOne, sideTwo){
	this.tag = tag;
	this.gameObjectOne = gameObjectOne;
	this.gameObjectTwo = gameObjectTwo;
	this.sideOne = sideOne;
	this.sideTwo = sideTwo;
	return this;
}
);
