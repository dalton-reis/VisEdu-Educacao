var VisEdu = new function() {
	
	this.handler = null;
	this.root = null;
	this.factory = null;
	this.factory3D = new Factory3D();
	this.factory2D = new Factory2D();
	
	this.setupFactory = function(mode) {
		if (mode == '3D') {
			this.factory = this.factory3D;
		} else if (mode == '2D') {
			this.factory = this.factory2D;			
		} else {
			console.log('[VisEdu] no factory for mode: '+mode);
		}
	}
	
	this.setup = function() {
		this.scene = new Scene().initialize(-1000, -1000, 1000, 1000);
		this.root = new Layer().initialize();
		this.scene.addLayer(this.root);
	}
	
	this.afterLoad = function() {		
		this.grid = ThreeJSBuilder.createGridObject(0, 0, 0, 400, 20);
		this.axis = ThreeJSBuilder.createAxisObject(0, 0, 0, 450);
		Game.apiHandler.addGameObject(this.grid, this.scene);
		Game.apiHandler.addGameObject(this.axis, this.scene);
		Game.camera.translate.setTranslate(0, 500, 900);
		Game.camera.threeObject.lookAt(new THREE.Vector3(0, 0 ,0));
	}
	
	this.create = function (world, handler) {
		this.handler =  handler;
		this.setupFactory('3D');
		this.setup();
		Game.init(world, this.scene);
		this.afterLoad();
	}
}