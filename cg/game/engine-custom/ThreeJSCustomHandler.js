function ThreeJSCustomHandler() {}

ThreeJSCustomHandler.prototype = new ThreeJSHandler();
ThreeJSCustomHandler.prototype.$onRender = ThreeJSCustomHandler.prototype.onRender;
ThreeJSCustomHandler.prototype.$startGameLoop = ThreeJSCustomHandler.prototype.startGameLoop;
ThreeJSCustomHandler.prototype.properties;

ThreeJSCustomHandler.prototype.controls;

ThreeJSCustomHandler.prototype.setSecondCamera = function(camera) {
	this.auxCamera = camera;
}

ThreeJSCustomHandler.prototype.setupCamera = function (angle, near, far) {
	var canvas = Game.canvas;
	var camera = new Camera().initialize(0, 0, 0, canvas.width/Math.round(canvas.height/2), angle, near, far);
	this.setupOrbitControl(camera.threeObject);
	return camera;
}

ThreeJSCustomHandler.prototype.setupOrbitControl = function(camera) {
	this.controls = new THREE.OrbitControls( camera, Game.canvas );
	this.controls.damping = 0.2;
	this.touchControls = new TouchControls();
	this.touchControls.setup();
}

ThreeJSCustomHandler.prototype.startGameLoop = function() {
	VisEdu.loadStats();
	this.$startGameLoop();	
}
ThreeJSCustomHandler.prototype.onUpdate = function() {
	Game.apiHandler.onRender();
}

ThreeJSCustomHandler.prototype.onRender = function() {
	this.$onRender();
	this.controls.update();
	VisEdu.stats.update();
}

ThreeJSCustomHandler.prototype.beforeRender = function() {
	var left   = 0;
	var bottom = Game.canvas.heigh;
	var width  = Game.canvas.width;
	var height = Math.floor(Game.canvas.height/2);
	
	this.renderer.setClearColor(0);
	if (this.auxCamera) {		
		VisEdu.defLight.threeObject.visible = false;
		VisEdu.hideURS();
		VisEdu.hideHelpers();
		this.renderer.setViewport( left, bottom, width, height );
		this.renderer.setScissor( left, bottom, width, height );
		this.renderer.enableScissorTest ( true );
		this.renderer.setClearColor(VisEdu.backgroundColor);
		this.renderer.render(Game.scene.threeObject, this.auxCamera.threeObject);
		VisEdu.defLight.threeObject.visible = true;
		VisEdu.showHelpers();
	}
	VisEdu.checkURS();
	height = bottom = Math.round(Game.canvas.height/2);
	this.renderer.setViewport( left, bottom, width, height );
	this.renderer.setScissor( left, bottom, width, height );
	this.renderer.enableScissorTest ( true );
	this.renderer.setClearColor(VisEdu.clearColor);
	Game.camera.threeObject.aspect = width / height;
	Game.camera.threeObject.updateProjectionMatrix();
	
}

