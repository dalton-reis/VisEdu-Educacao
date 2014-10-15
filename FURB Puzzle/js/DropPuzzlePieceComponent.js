function DropPuzzlePieceComponent(){}

DropPuzzlePieceComponent.prototype = new Component();

DropPuzzlePieceComponent.prototype.testSocketColision = function(socket){
    if(socket != null && socket.isJoined == false && socket.isColliding()){
        this.fitSocket(socket);
        socket.isJoined = true;
        socket.slave.isJoined = true;
    }
}

DropPuzzlePieceComponent.prototype.fitSocket = function(socket){
    var diffX = socket.slave.getCenterX() - socket.getCenterX();
    var diffY = socket.slave.getCenterY() - socket.getCenterY();
    var dropLayer = ComponentUtils.getComponent(layer, "DROP_PUZZLE_PIECE_COMPONENT");
    dropLayer.resetMovedObject();
    socket.parentPiece.addMoveAll(diffX, diffY, true);
}

DropPuzzlePieceComponent.prototype.onDropSockets = function(){
    this.testSocketColision(this.owner.leftSocket);
    this.testSocketColision(this.owner.rightSocket);
    this.testSocketColision(this.owner.topSocket);
    this.testSocketColision(this.owner.bottomSocket);
}

DropPuzzlePieceComponent.prototype.onDropSocketsJoined = function(socket){
    if(socket != null && socket.isJoined == true){
        var dropComponent = ComponentUtils.getComponent(socket.slave.parentPiece, "DROP_PUZZLE_PIECE_COMPONENT");
        dropComponent.onDropSockets();
    }
}

DropPuzzlePieceComponent.prototype.onDropPuzzlePiece = function(){
    var dragComponent = ComponentUtils.getComponent(this.owner, "DRAGGABLE_COMPONENT");
    if(dragComponent.dragging == true){
        this.onDropSockets();
    }
    this.onDropSocketsJoined(this.owner.leftSocket);
    this.onDropSocketsJoined(this.owner.rightSocket);
    this.onDropSocketsJoined(this.owner.topSocket);
    this.onDropSocketsJoined(this.owner.bottomSocket);
}

DropPuzzlePieceComponent.prototype.onMouseUp = function(x, y, wich){
    this.onDropPuzzlePiece();
}

DropPuzzlePieceComponent.prototype.onTouchEnd = function(touchList){
    this.onDropPuzzlePiece();
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