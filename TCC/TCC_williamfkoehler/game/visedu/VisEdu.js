var VisEdu = new function() {
	
	this.root = null;
	this.factory = null;
	this.factory3D = new Factory3D();
	this.factory2D = new Factory2D();
	this.aspect = 0;
	this.clearColor = 0;
	this.backgroundColor = 0;
	this.properties = null;
	this.mode = '';
	this.helpers = [];
	this.stats = null;
	
	this.setupFactory = function(mode) {
		var current = this.factory;
		if (mode == '3D') {
			this.factory = this.factory3D;
			this.setup3D();
		} else if (mode == '2D') {
			this.factory = this.factory2D;
			this.setup2D();
			
		} else {
			console.log('[VisEdu] no factory for mode: '+mode);
		}
		this.mode = mode;
		PropertiesController.check3DProperties();
		if (current && this.factory != current) {
			this.reloadScene();
		}
	}
	
	this.setup = function() {
		this.scene = new Scene().initialize(-1000, -1000, 1000, 1000);
		this.defLight = ThreeJSBuilder.createAmbientLightObject(0xFFFFFF);
		this.scene.addLight(this.defLight);
		this.root = new Layer().initialize();
		this.scene.addLayer(this.root);
	}
	
	this.loadStats = function() {
		this.stats = new Stats();
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.bottom = '50%';
		this.stats.domElement.style.right = '0';
		this.stats.domElement.style.zIndex = 100;
		$(Game.apiHandler.getContext()).parent().append( this.stats.domElement );
	}
	
	this.afterLoad = function() {		
		VisEdu.axis = ThreeJSBuilder.createAxisObject(0, 0.1, 0, 450);
		VisEdu.grid = ThreeJSBuilder.createGridObject(0, 0, 0, 400, 20);
		Game.apiHandler.addGameObject(VisEdu.axis, this.scene);
		Game.apiHandler.addGameObject(VisEdu.grid, this.scene);
	}
	

	this.setup2D = function(camera) {
		Game.apiHandler.controls.reset();
		Game.camera.threeObject.position.set(0, 0, 1200);
		Game.camera.threeObject.lookAt(new THREE.Vector3(0, 0 ,0));
		Game.apiHandler.controls.noRotate=true;
	}

	this.setup3D = function(camera) {
		Game.apiHandler.controls.reset();
		Game.camera.threeObject.position.set(0, 500, 1200);
		Game.camera.threeObject.lookAt(new THREE.Vector3(0, 0 ,0));	
		Game.apiHandler.controls.noRotate=false;
	}
	
	this.create = function (world) {
		Game.loadAPI(new ThreeJSCustomHandler());
		window.addEventListener( 'resize', this.onResize, false );
		VisEdu.aspect = world.width() / (world.height()/2);
		this.setup();
		Game.init(world, this.scene);
		this.setupFactory('3D');
		this.afterLoad();
	}
	
	this.onResize = function (){
		var target = $('.world');
		VisEdu.aspect = target.width() / (target.height()/2);
		VisEdu.setupCamera(Game.camera.threeObject, target);
		var auxCam = Game.apiHandler.auxCamera;
		if (auxCam) {
			VisEdu.setupCamera(auxCam.threeObject, target);	
			var camPiece = $('.piece.camera.element').data('piece');
			camPiece.type.graphicalBehaviour.reloadPiece(camPiece);
		}
	    Game.apiHandler.renderer.setSize( target.width(), target.height() );
	}
	
	this.reloadProperties = function (properties) {
		this.properties = properties;
		this.checkURS();
		this.backgroundColor = properties['background'];
		this.clearColor = properties['clear'];
		this.setupFactory(properties['mode']);
	}
	
	this.hideURS = function() {
		if (VisEdu.axis && VisEdu.grid) {
			VisEdu.axis.threeObject.visible = false;
			VisEdu.grid.threeObject.visible = false;	
		}
	}
	
	this.checkURS = function() {
		if (this.properties) {
			VisEdu.axis.threeObject.visible = this.properties['axis'];
			VisEdu.grid.threeObject.visible = this.mode === '3D' && this.properties['grid'];
		} else {
			VisEdu.hideURS();
		}
	}
	
	this.setupCamera = function (camera, target) {
		camera.aspect = VisEdu.aspect;
	    camera.updateProjectionMatrix();
	    
	}
	
	this.addHelper = function(helper) {
		VisEdu.scene.threeObject.add(helper);
		this.helpers.push(helper);
	}
	
	this.removeHelper = function(helper) {
		VisEdu.scene.threeObject.remove(helper);
		$.each(this.helpers, function(index, item) {
			if (item === helper) {
				delete VisEdu.helpers[index];
			}
		});
	}
	
	this.hideHelpers = function() {
		$.each(this.helpers, function(index, item) {
			if (item) {
				item.visible = false;
			}
		});
	}
	
	this.showHelpers = function() {
		$.each(this.helpers, function(index, item) {
			if (item) {
				item.visible = true;
			}
		});
	}
	
	this.reloadScene = function() {
		var renderer = $('.piece.renderer');
		var json = PiecesUtils.genJSON(renderer);
		
		var node = $('.renderer + .object-node')
		$.each(node.find('> .connector.busy'), function(index, item) {
			var piece = $(item).find('> .piece.element').data('piece');
			piece.type.treeBehaviour.removePiece(piece);
		});
		
		PiecesUtils.readJSON(renderer, json);
	}
}