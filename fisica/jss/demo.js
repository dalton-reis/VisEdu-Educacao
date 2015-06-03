var DEMO = {
	_canvas: null,
	_renderer: null,
	_camera: null, 
	_scene: null, 
	_controls: null,
	_water: null,
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
		
		// Load textures		
		var waterNormals = new THREE.ImageUtils.loadTexture('imgs/waternormals.jpg');
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping; 
		
		// Create the water effect
		this._water = new THREE.Water(this._renderer, this._camera, this._scene, {
			textureWidth: 256,
			textureHeight: 256,
			waterNormals: waterNormals,
			alpha: 	1.0,
			sunDirection: directionalLight.position.normalize(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			betaVersion: 0,
			side: THREE.DoubleSide
		});
		var aMeshMirror = new THREE.Mesh(
			new THREE.PlaneGeometry(6000, 6000, 100, 100), 
			this._water.material
		);
		aMeshMirror.add(this._water);
		aMeshMirror.rotation.x = - Math.PI * 0.5;
		
		this._scene.add(aMeshMirror);
	
		this.loadSkyBox();


		this._stats = new Stats();
		this._stats.domElement.style.position = 'absolute';
		this._stats.domElement.style.top = '0px';
		DEMO._canvas.appendChild( this._stats.domElement );
	},	
	
	loadSkyBox: function loadSkyBox() {
		var aCubeMap = THREE.ImageUtils.loadTextureCube([
		  'imgs/sky/px.jpg',
		  'imgs/sky/nx.jpg',
		  'imgs/sky/py.jpg',
		  'imgs/sky/ny.jpg',
		  'imgs/sky/pz.jpg',
		  'imgs/sky/nz.jpg'
		]);
		aCubeMap.format = THREE.RGBFormat;

		var aShader = THREE.ShaderLib['cube'];
		aShader.uniforms['tCube'].value = aCubeMap;

		var aSkyBoxMaterial = new THREE.ShaderMaterial({
		  fragmentShader: aShader.fragmentShader,
		  vertexShader: aShader.vertexShader,
		  uniforms: aShader.uniforms,
		  depthWrite: false,
		  side: THREE.BackSide
		});

		var aSkybox = new THREE.Mesh(
		  new THREE.CubeGeometry(1000000, 1000000, 1000000),
		  aSkyBoxMaterial
		);
		
		this._scene.add(aSkybox);
	},

    display: function display() {
		this._water.render();
		this._renderer.render(this._scene, this._camera);
	},
	
	update: function update() {
		this._water.material.uniforms.time.value += 1.0 / 60.0;
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