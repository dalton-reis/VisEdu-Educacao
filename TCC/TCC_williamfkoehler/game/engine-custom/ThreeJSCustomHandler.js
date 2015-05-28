function ThreeJSCustomHandler() {}

ThreeJSCustomHandler.prototype = new ThreeJSHandler();

ThreeJSCustomHandler.prototype.setSecondCamera = function(camera) {
	this.auxCamera = camera;
}

ThreeJSCustomHandler.prototype.setupCamera = function (angle, near, far) {
	var canvas = Game.canvas;
	return new Camera().initialize(0, 0, 0, canvas.width/Math.round(canvas.height/2), angle, near, far);
}

ThreeJSCustomHandler.prototype.beforeRender = function() {
	var left   = 0;
	var bottom = Game.canvas.heigh;
	var width  = Game.canvas.width;
	var height = Math.floor(Game.canvas.height/2);
	if (this.auxCamera) {
		this.renderer.setViewport( left, bottom, width, height );
		this.renderer.setScissor( left, bottom, width, height );
		this.renderer.enableScissorTest ( true );
		this.renderer.setClearColor(0x000000);
		this.auxCamera.threeObject.aspect = width / height;
		var lookAt = this.auxCamera.v3LookAt;
		if (lookAt) {		
			this.auxCamera.threeObject.lookAt(lookAt);
		}
		this.renderer.render(Game.scene.threeObject, this.auxCamera.threeObject);
	}
	
	height = bottom = Math.round(Game.canvas.height/2);
	this.renderer.setViewport( left, bottom, width, height );
	this.renderer.setScissor( left, bottom, width, height );
	this.renderer.enableScissorTest ( true );
	this.renderer.setClearColor(0xFDFDFD);
	Game.camera.threeObject.aspect = width / height;
	Game.camera.threeObject.updateProjectionMatrix();
	
}

