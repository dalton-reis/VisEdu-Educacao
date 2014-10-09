function PuzzleSocketObject(){}

PuzzleSocketObject.prototype = new GameObject();

JSUtils.addMethod(PuzzleSocketObject.prototype, "initialize", 
	function(x, y){
		this.initialize(x, y, 6, 6);
		ComponentUtils.addComponent(this, new TranslateComponent().initialize(0, 0));
		ComponentUtils.addComponent(this, new ScaleComponent().initialize(1, 1));
		ComponentUtils.addComponent(this, new RotateComponent().initialize(0));
		ComponentUtils.addComponent(this, new BoxRenderComponent().initialize("red", "red"));
		ComponentUtils.addComponent(this, new RigidBodyComponent().initialize(0, 1, false, false, 0, true));
		return this;
	}
);

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