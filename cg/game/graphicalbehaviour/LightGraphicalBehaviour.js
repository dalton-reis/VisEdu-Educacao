function LightGraphicalBehaviour() {
}

LightGraphicalBehaviour.prototype = new ElementGraphicalBehaviour();
LightGraphicalBehaviour.constructor = LightGraphicalBehaviour;
LightGraphicalBehaviour.prototype.$_removePiece = LightGraphicalBehaviour.prototype.removePiece;
LightGraphicalBehaviour.prototype.$_reloadPiece = LightGraphicalBehaviour.prototype.reloadPiece;
LightGraphicalBehaviour.prototype.$_addPiece = LightGraphicalBehaviour.prototype.addPiece;

LightGraphicalBehaviour.prototype.removePiece = function(piece, parentPiece) {
	VisEdu.scene.threeObject.remove(piece.gameObject.threeObject);
	var helper = piece.gameObject.component.helper;
	if (helper) {
		VisEdu.removeHelper(helper);
		//VisEdu.scene.threeObject.remove(helper);
	}
	ThreeUtils.updateMaterials();
}

LightGraphicalBehaviour.prototype.reloadPiece = function(piece) {
	this.$_reloadPiece(piece);

}

LightGraphicalBehaviour.prototype.addPiece = function(piece, parentPiece) {
	if (piece.properties['active']) {
		VisEdu.scene.threeObject.add(piece.getGameObject().threeObject);
		var helper = piece.gameObject.component.helper;
		if (helper) {
			VisEdu.addHelper(helper);
			//VisEdu.scene.threeObject.add(helper);
		}
	}
	ThreeUtils.updateMaterials();
}