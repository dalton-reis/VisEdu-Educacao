function CameraGraphicalBehaviour() {}

CameraGraphicalBehaviour.prototype = new GraphicalBehaviour();
CameraGraphicalBehaviour.constructor = CameraGraphicalBehaviour;

CameraGraphicalBehaviour.prototype.removePiece = function(piece, parentPiece) {
	VisEdu.scene.threeObject.remove(piece.gameObject.threeObject);
	var helper = piece.gameObject.component.helper;
	if (helper) {
		VisEdu.removeHelper(helper);
		//VisEdu.scene.threeObject.remove(helper);
	}
	Game.apiHandler.auxCamera = null;
}

CameraGraphicalBehaviour.prototype.reloadPiece = function(piece) {
	this.removePiece(piece);
	this.addPiece(piece);
	
}

CameraGraphicalBehaviour.prototype.addPiece = function(piece, parentPiece) {
	Game.apiHandler.auxCamera = piece.getGameObject(); 
	var helper = piece.gameObject.component.helper;
	if (helper) {
		VisEdu.addHelper(helper);
		//VisEdu.scene.threeObject.add(helper);
	}
}