HEFESTO.SceneBuilder = function(_id) {
	var id = _id;
	var canvas = document.getElementById(id);
	var renderer;
	var camera; 
	var scene; 
	var controls;
	var stats;

	Object.defineProperties( this, {
		id: {
			enumerable: true,
			value: id,
			writable: false
		},
		canvas: {
			enumerable: true,
			value: canvas,
			writable: false
		},
		renderer: {
			enumerable: true,
			value: renderer,
			writable: true
		},
		camera: {
			enumerable: true,
			value: camera,
			writable: true
		},
		scene: {
			enumerable: true,
			value: scene,
			writable: true
		},
		controls: {
			enumerable: true,
			value: controls,
			writable: true
		},
		stats: {
			enumerable: true,
			value: stats,
			writable: true
		}
	});

};

HEFESTO.SceneBuilder.prototype = {
	construtor: HEFESTO.SceneBuilder,

	enable: (function enable() {
        try {
            var aCanvas = document.createElement('canvas');
            return !! window.WebGLRenderingContext && (aCanvas.getContext('webgl') || aCanvas.getContext('experimental-webgl'));
        }
        catch(e) {
            return false;
        }
    })(),
	
	init: function () {
		// Initialize Renderer, Camera and Scene
		this.renderer = this.enable? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		this.renderer.setClearColorHex( 0xffffff, 1 );
		this.canvas.appendChild(this.renderer.domElement);
		this.scene = new THREE.Scene();
		
		this.camera = new THREE.PerspectiveCamera(55.0, WINDOW.msWidth / WINDOW.msHeight, 0.5, 3000000);
		this.camera.position.set(2, 30, 80);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		
		// Initialize Orbit control		
		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
	
		// Add light
		var directionalLight = new THREE.DirectionalLight(0xffff55, 1);
		directionalLight.position.set(-600, 300, 600);
		this.scene.add(directionalLight);
		
		this.stats = new Stats();
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.top = '0px';
		this.canvas.appendChild( this.stats.domElement );
	},	

	display:  function() {
		this.renderer.render(this.scene, this.camera);
	},
		
	update: function () {
		this.controls.update();
		this.display();
	},
	
	resize: function (inWidth, inHeight) {
		this.camera.aspect =  inWidth / inHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(inWidth, inHeight);
		this.canvas.appendChild(this.renderer.domElement);
		this.display();
	}
};