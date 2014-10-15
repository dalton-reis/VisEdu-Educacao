function DropPieceLayerComponent(){}

DropPieceLayerComponent.prototype = new Component();

DropPieceLayerComponent.prototype.onMouseMove = function(x, y){
	this.resetMovedObject();
}

DropPieceLayerComponent.prototype.onTouchMove = function(touchList){
	this.resetMovedObject();
}

DropPieceLayerComponent.prototype.resetMovedObject = function(){
	this.owner.movedObjects = new Array();	
}

DropPieceLayerComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, MouseSystem.getTag());
	systems = ArrayUtils.addElement(systems, TouchSystem.getTag());
	return systems;
}

DropPieceLayerComponent.prototype.getTag = function(){
	return "DROP_PUZZLE_PIECE_COMPONENT";
}