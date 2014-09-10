function PredatorObject(){}

PredatorObject.prototype = new GameObject();

JSUtils.addMethod(PredatorObject.prototype, "initialize", 
	function(x, y, width, height, predatorImage){
		this.initialize(x, y, width, height);
		ComponentUtils.addComponent(this, new TranslateComponent().initialize(0, 0));
		ComponentUtils.addComponent(this, new ScaleComponent().initialize(1, 1));
		ComponentUtils.addComponent(this, new RotateComponent().initialize(0));
        ComponentUtils.addComponent(this, new ImageRenderComponent().initialize(predatorImage,false, "HORIZONTAL"));
        ComponentUtils.addComponent(this, new RigidBodyComponent().initialize(0, 1, true, false, 0));
        ComponentUtils.addComponent(this, new MovePredatorComponent().initialize());
		return this;
	}
);

PredatorObject.prototype.createBodyShape = function(){
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

PredatorObject.prototype.getTag = function(){
	return "PREDATOR_OBJECT";
}