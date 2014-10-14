function PuzzlePieceObject(){}

PuzzlePieceObject.prototype = new GameObject();

JSUtils.addMethod(PuzzlePieceObject.prototype, "initialize", 
	function(x, y, width, height, imageObj, offsetLeft, offsetTop){
		this.initialize(x, y, width, height);
		this.leftSocket = null;
		this.rightSocket = null;
		this.topSocket = null;
		this.bottomSocket = null;
		//ComponentUtils.addComponent(this, new TranslateComponent().initialize(0, 0));
		//ComponentUtils.addComponent(this, new ScaleComponent().initialize(1, 1));
		//ComponentUtils.addComponent(this, new RotateComponent().initialize(0));
		ComponentUtils.addComponent(this, new DropPuzzlePieceComponent().initialize());
		ComponentUtils.addComponent(this, new DraggableComponent().initialize());
		ComponentUtils.addComponent(this, new PuzzlePieceRenderComponent().initialize(imageObj, width, height, offsetLeft, offsetTop));
		ComponentUtils.addComponent(this, new RigidBodyComponent().initialize(0, 1, false, false, 0, false, false));
		return this;
	}
);

PuzzlePieceObject.prototype.createBodyShape = function(){
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

PuzzlePieceObject.prototype.addMove = function(x, y){
	console.log(layer.movedObjects);
	if(ArrayUtils.contains(layer.movedObjects, this.id) == false){	
		layer.movedObjects = ArrayUtils.addElement(layer.movedObjects, this.id);
		if(this.body){
			if(this instanceof PolygonObject){
				this.body.m_shapeList.m_body.m_position.x += x;
				this.body.m_shapeList.m_body.m_position.y += y;
			}else{
				this.body.m_position.x += x;
				this.body.m_position.y += y;
			}
		}else{
			this.origin.x += x;
			this.origin.y += y;
		}
		if(this.leftSocket != null){
			this.leftSocket.addMove(x, y);
			if(this.leftSocket.isJoined){
				this.leftSocket.slave.parentPiece.addMove(x, y);
			}
		}
		if(this.rightSocket != null){
			this.rightSocket.addMove(x, y);
			if(this.rightSocket.isJoined){
				this.rightSocket.slave.parentPiece.addMove(x, y);
			}
		}
		if(this.topSocket != null){
			this.topSocket.addMove(x, y);
			if(this.topSocket.isJoined){
				this.topSocket.slave.parentPiece.addMove(x, y);
			}
		}
		if(this.bottomSocket != null){
			this.bottomSocket.addMove(x, y);
			if(this.bottomSocket.isJoined){
				this.bottomSocket.slave.parentPiece.addMove(x, y);
			}
		}
	}
}

PuzzlePieceObject.prototype.getTag = function(){
	return "PUZZLE_PIECE_OBJECT";
}