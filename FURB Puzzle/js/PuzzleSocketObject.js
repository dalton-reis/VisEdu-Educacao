function PuzzleSocketObject(){}

PuzzleSocketObject.prototype = new GameObject();

JSUtils.addMethod(PuzzleSocketObject.prototype, "initialize", 
	function(x, y, parentPiece){
		this.initialize(x, y, 3, 3);
		//ComponentUtils.addComponent(this, new TranslateComponent().initialize(0, 0));
		//ComponentUtils.addComponent(this, new ScaleComponent().initialize(1, 1));
		//ComponentUtils.addComponent(this, new RotateComponent().initialize(0));
		ComponentUtils.addComponent(this, new BoxRenderComponent().initialize("red", "red"));
		ComponentUtils.addComponent(this, new RigidBodyComponent().initialize(0, 1, false, false, 0, false, false));
		this.slave = null;
		this.isJoined = false;
		this.parentPiece = parentPiece;
		return this;
	}
);

PuzzleSocketObject.prototype.isColliding = function(){
	var rect1 = {x: this.getCenterX() - (this.getWidth()/2), 
		         y: this.getCenterY() - (this.getHeight()/2), 
		         width: this.getWidth(), 
		         height: this.getHeight()}
	var rect2 = {x: this.slave.getCenterX() - (this.slave.getWidth()/2), 
		         y: this.slave.getCenterY() - (this.slave.getHeight()/2), 
		         width: this.slave.getWidth(), 
		         height: this.slave.getHeight()}

	if (rect1.x < rect2.x + rect2.width &&
	    rect1.x + rect1.width > rect2.x &&
	    rect1.y < rect2.y + rect2.height &&
	    rect1.height + rect1.y > rect2.y) {
    	return true;
	}

	return false;
}

PuzzleSocketObject.prototype.createBodyShape = function(){
	var shape = new b2BoxDef();
	var xb = this.getWidth();
	var yb = this.getHeight();
	var scale = ComponentUtils.getComponent(this, "SCALE_COMPONENT");
	if(scale){
		xb *= Math.abs(scale.scalePoint.x);
		yb *= Math.abs(scale.scalePoint.y);
	}
	shape.extents.Set(xb/2, yb/2);
	return shape;
}

PuzzleSocketObject.prototype.getTag = function(){
	return "PUZZLE_SOCKET_OBJECT";
}