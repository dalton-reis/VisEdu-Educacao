function DropPuzzlePieceComponent(){}

DropPuzzlePieceComponent.prototype = new Component();

DropPuzzlePieceComponent.prototype.onMouseUp = function(x, y, wich){
	var point = MouseSystem.getNormalizedCoordinate(x, y);
    x = point.x;
    y = point.y;
    var selected = layer.queryGameObjects(x, y, 2, 2, 20);
    var objectSelected = selected[0] || null;
    if(objectSelected != null &&
       objectSelected.id == this.owner.id){
    	if(this.owner.leftSocket != null
    	   && this.owner.leftSocket.isJoined == false 
    	   && this.owner.leftSocket.slave != null 
    	   && this.owner.leftSocket.isColliding()){
    		this.owner.leftSocket.isJoined = true;
    		this.owner.leftSocket.slave.isJoined = true;
    	}
    	if(this.owner.rightSocket != null 
    		     && this.owner.rightSocket.isJoined == false
    		     && this.owner.rightSocket.slave != null 
    		     && this.owner.rightSocket.isColliding()){
    		this.owner.rightSocket.isJoined = true;
    		this.owner.rightSocket.slave.isJoined = true;
    	}
    	if(this.owner.topSocket != null 
    		     && this.owner.topSocket.isJoined == false
    		     && this.owner.topSocket.slave != null 
    		     && this.owner.topSocket.isColliding()){
    		this.owner.topSocket.isJoined = true;
    		this.owner.topSocket.slave.isJoined = true;
    	}
    	if(this.owner.bottomSocket != null 
    		     && this.owner.bottomSocket.isJoined == false
    		     && this.owner.bottomSocket.slave != null 
    		     && this.owner.bottomSocket.isColliding()){
    		this.owner.bottomSocket.isJoined = true;
    		this.owner.bottomSocket.slave.isJoined = true;
    	}
    }
}

DropPuzzlePieceComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, MouseSystem.getTag());
	systems = ArrayUtils.addElement(systems, TouchSystem.getTag());
	return systems;
}

DropPuzzlePieceComponent.prototype.getTag = function(){
	return "DROP_PUZZLE_PIECE_COMPONENT";
}