/**
 * 
 */
function ThreeJSHandler() {}

ThreeJSHandler.prototype = new APIHandler();


ThreeJSHandler.prototype.setupCanvas = function (element) {
	this.renderer = new THREE.WebGLRenderer();
	element.append(this.renderer.domElement);
	this.renderer.setSize(element.width(), element.height());
	this.activeAnimations = [];
	return this.renderer.domElement;
}

ThreeJSHandler.prototype.addActiveAnimation = function (animation) {
	this.activeAnimations.push(animation);
}

ThreeJSHandler.prototype.stopAnimation = function (animation) {
	$.each(this.activeAnimations, function(index, item) {
		if (item == animation) {
			Game.apiHandler.activeAnimations.splice(index, 1);
			return false;
		}
	});
}

ThreeJSHandler.prototype.playAnimations = function () {
	$.each(this.activeAnimations, function(index, item) {
		item.update();
	});
}

ThreeJSHandler.prototype.getContext = function () {
	return this.renderer;
}

ThreeJSHandler.prototype.setupScene = function (scene) {
	scene.threeObject = new THREE.Scene();
}

ThreeJSHandler.prototype.setupCamera = function (angle, near, far) {
	var canvas = Game.canvas;
	return new Camera().initialize(0, 0, 0, canvas.width/canvas.height, angle, near, far);
}

ThreeJSHandler.prototype.gameLoop = function () {
	requestAnimationFrame(ThreeJSHandler.prototype.gameLoop);
	Game.gameLoop();
}

ThreeJSHandler.prototype.startGameLoop = function () {
	this.gameLoop();
}

ThreeJSHandler.prototype.onRender = function () {
	this.renderer.render(Game.scene.threeObject, Game.camera.threeObject);
	this.playAnimations();	
	var lookAt = Game.camera.v3LookAt;
	if (lookAt) {
		Game.camera.lookAt(lookAt);
	}
}

ThreeJSHandler.prototype.beforeRender = function () {}


ThreeJSHandler.prototype.addGameObject = function (object, parent) {
	var threeObject = object.threeObject;
	if (threeObject) {
		parent.threeObject.add(object.threeObject);		
	}
}

ThreeJSHandler.prototype.newGameElement = function (element, owner) {
	var threeObject = element.genThreeObject();
	if (threeObject) {
		owner.threeObject = threeObject;
	}
}

ThreeJSHandler.prototype.getComponentFactory = function () {
	return new ThreeJSComponentFactory();
}

ThreeJSHandler.prototype.getObjectFactory = function () {
	return new ThreeJSObjectFactory();
}

ThreeJSHandler.prototype.getBasicMaterial = function (fillStyle) {
	var material = new THREE.MeshBasicMaterial(
			{ color: ColorUtils.checkColor(fillStyle), side: THREE.DoubleSide});
	return material;
}

ThreeJSHandler.prototype.getWireframeMaterial = function (strokeStyle, strokeWidth) {
	var wireframeMaterial = new THREE.MeshBasicMaterial( 
			{ color: ColorUtils.checkColor(strokeStyle), wireframe: true} );

	return wireframeMaterial;
}

ThreeJSHandler.prototype.onAddMove = function (object) {
	var comp = ComponentUtils.getComponent(object, "TRANSLATE_COMPONENT");
	if (comp) {
		comp.doTranslate();
	}
}

ThreeJSHandler.prototype.changeColorObject = function(object, body, stroke) {
	var meshes = object.threeObject.children;
	if (body) {
		meshes[0].material.color.setHex(ColorUtils.checkColor(body));
	}
	
	if (stroke) {
		meshes[1].material.color.setHex(ColorUtils.checkColor(stroke));		
	}
}