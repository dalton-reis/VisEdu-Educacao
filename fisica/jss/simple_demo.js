var DEMO = {
	_canvas: null,
	_renderer: null,
	_camera: null, 
	_scene: null, 
	_controls: null,
	_stats: undefined,

    enable: (function enable() {
        try {
            var aCanvas = document.createElement('canvas');
            return !! window.WebGLRenderingContext && (aCanvas.getContext('webgl') || aCanvas.getContext('experimental-webgl'));
        }
        catch(e) {
            return false;
        }
    })(),
	
	initialize: function initialize(inIdCanvas) {
		this._canvas = document.getElementById(inIdCanvas);
		
		// Initialize Renderer, Camera and Scene
		this._renderer = this.enable? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		this._renderer.setClearColorHex( 0xffffff, 1 );
		this._canvas.appendChild(this._renderer.domElement);
		this._scene = new THREE.Scene();
		
		this._camera = new THREE.PerspectiveCamera(55.0, WINDOW.ms_Width / WINDOW.ms_Height, 0.5, 3000000);
		this._camera.position.set(-500, 250, 10);
		this._camera.lookAt(new THREE.Vector3(0, 0, 0));
		
		// Initialize Orbit control		
		this._controls = new THREE.OrbitControls(this._camera, this._renderer.domElement);
	
		// Add light
		var directionalLight = new THREE.DirectionalLight(0xffff55, 1);
		directionalLight.position.set(-600, 300, 600);
		this._scene.add(directionalLight);
		
		this._stats = new Stats();
		this._stats.domElement.style.position = 'absolute';
		this._stats.domElement.style.top = '0px';
		DEMO._canvas.appendChild( this._stats.domElement );
	},	
	
    display: function display() {
		this._renderer.render(this._scene, this._camera);
	},
	
	update: function update() {
		this._controls.update();
		this.display();
	},
	
	resize: function resize(inWidth, inHeight) {
		this._camera.aspect =  inWidth / inHeight;
		this._camera.updateProjectionMatrix();
		this._renderer.setSize(inWidth, inHeight);
		this._canvas.appendChild(this._renderer.domElement);
		this.display();
	}
};