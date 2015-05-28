var ThreeUtils = new function() {
	
	this.updateMaterials = function() {
		var root = Game.scene.threeObject;
		ThreeUtils._updateMaterials(root);
	}
	
	this._updateMaterials = function (obj) {
		if (obj instanceof THREE.Object3D) {
			if (obj.material) {
				obj.material.needsUpdate = true;
			}
			if (obj.children) {
				$.each(obj.children, function(index, item) {
					ThreeUtils._updateMaterials(item);
				});
			}
		}
	}
}