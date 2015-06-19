/**
 * Game Maker Utils
 **/
var GAMU = { REVISION: '1'};


GAMU._defaultCannonBallGeometry = new THREE.SphereGeometry(20, 32, 16);
GAMU._defaultCannonBallMaterial = new THREE.MeshLambertMaterial( { color: 0xdddddd, shading: THREE.SmoothShading } );

GAMU.materialBlack = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0x0000FF, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );
GAMU.materialRed = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xFF0000, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );
GAMU.materialBlue = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0x0000FF, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );

GAMU.positionMesh = function(mesh, position, rotation) {
	mesh.position.x = position.x;
	mesh.position.y = position.y;
	mesh.position.z = position.z;

	mesh.rotation.x = rotation.x;
	mesh.rotation.y = rotation.y;
	mesh.rotation.z = rotation.z;
}

GAMU.Positionable = function() {
	var position = new THREE.Vector3();
	var rotation = new THREE.Vector3();

	Object.defineProperties( this, {
		position: {
			enumerable: true,
			value: position,
			writable: true
		},
		rotation: {
			enumerable: true,
			value: rotation,
			writable: true
		},
	} );
};

GAMU.Positionable.prototype = {
	constructor: GAMU.Positionable,
};

GAMU.Target = function(scene, radius) {
	GAMU.Positionable.call( this );

	this._scene = scene,
	this._radius = radius,
	this._interval = 10;
	this.rotation = new THREE.Vector3(0, 0, -Math.PI/2);
};

GAMU.Target.prototype = Object.create( GAMU.Positionable.prototype );

GAMU.Target.prototype = {
	constructor: GAMU.Target,

	get scene () {
		return this._scene;
	},

	get radius () {
		return this._radius;
	},

	get interval () {
		return this._interval;
	},

	set interval (value) {
		this._interval = value;
	},

	build: function() {
		var count = this.radius / this.interval;
		var i = 0;
		for (i = 0; i < count; i++) {
			var material = i % 2 == 0 ? GAMU.materialBlue : GAMU.materialRed;

			var geometry = new THREE.SphereGeometry( (this.radius - (i * this.interval)), 32, 16, Math.PI, Math.PI, 3*Math.PI/2);
			var mesh = new THREE.Mesh( geometry, material);
			mesh.material.side = THREE.DoubleSide;

			GAMU.positionMesh(mesh, this.position, this.rotation);
			this.scene.add( mesh );


			var geometry2 = new THREE.CircleGeometry((this.radius - (i * this.interval)), 32);
			var mesh2 = new THREE.Mesh( geometry2, material);
			mesh2.material.side = THREE.DoubleSide;

			GAMU.positionMesh(mesh2, this.position, this.rotation);
			mesh2.position.x += (count - i) * 0.5;

			mesh2.rotation.y = 3*Math.PI/2;
			this.scene.add( mesh2 );
		}
		
		this.createLight();
	},

	createLight: function() {
		var particleLight = new THREE.Mesh( new THREE.SphereGeometry( 1, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
		this.scene.add( particleLight );

		var directionalLight = new THREE.DirectionalLight( 0x5f0f5f, 1 );
		directionalLight.position.set( 1, 1,  1).normalize();
		this.scene.add( directionalLight );

		var pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
		particleLight.add( pointLight );

		particleLight.position.x = this.position.x;
		particleLight.position.y = this.position.y;
		particleLight.position.z = this.position.z;	
	}
};


GAMU.getDefaultBaseTexture = function getDefaultBaseTexture() {
	if (GAMU._defaultBaseTexture == undefined) {
		GAMU._defaultBaseTexture = new THREE.ImageUtils.loadTexture( 'imgs/moon_1024.jpg' );
		//GAMU._defaultBaseTexture.anisotropy = DEMO._renderer.getMaxAnisotropy();
	}
	return GAMU._defaultBaseTexture;
}

GAMU.Base = function(_width, _height, _depth) {
	GAMU.Positionable.call( this );

	var width = _width;
	var height = _height;
	var depth = _depth;
	var material = undefined;
	var textureMap = GAMU.getDefaultBaseTexture();


	Object.defineProperties( this, {
		width: {
			enumerable: true,
			value: width,
			writable: true
		},
		height: {
			enumerable: true,
			value: height,
			writable: true
		},
		depth: {
			enumerable: true,
			value: depth,
			writable: true
		},
		material: {
			enumerable: true,
			value: material,
			writable: true
		},
		textureMap: {
			enumerable: true,
			value: textureMap,
			writable: true
		},
	} );

};

GAMU.Base.prototype = Object.create( GAMU.Positionable.prototype );

GAMU.Base.prototype = {
	constructor: GAMU.Base,

	build: function() {
		var geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
		var material = this.material == undefined ? new THREE.MeshBasicMaterial( { map: this.textureMap } ) : this.material;

		var mesh = new THREE.Mesh( geometry, material );
		GAMU.positionMesh(mesh, this.position, this.rotation);

		return mesh;
	}
};

GAMU.Cannon = function(_scene) {
	GAMU.Positionable.call( this );

	var pipeMesh = undefined;
	var scene = _scene;
	var radius = 50;
	var baseHeigth = 30;
	var initialVelocity = 100;
	var angle = 0;

	Object.defineProperties( this, {
		pipeMesh: {
			enumerable: true,
			value: pipeMesh
		},
		scene: {
			enumerable: true,
			value: scene
		},
		radius: {
			enumerable: true,
			value: radius
		},
		baseHeigth: {
			enumerable: true,
			value: baseHeigth,
			writable: true
		},
		initialVelocity: {
			enumerable: true,
			value: initialVelocity,
			writable: true
		},
		angle: {
			enumerable: true,
			value: angle,
			writable: true
		}
	} );
};

GAMU.Cannon.prototype = Object.create( GAMU.Positionable.prototype );

GAMU.Cannon.prototype = {
	constructor: GAMU.Cannon,

	build: function() {
		var baseMesh = new THREE.Mesh( new THREE.SphereGeometry( this.radius, 32, 16, Math.PI, Math.PI, 3*Math.PI/2), GAMU.materialBlack);
		baseMesh.material.side = THREE.DoubleSide;
		var cannonTopPos = new THREE.Vector3(this.position.x, this.position.y + this.baseHeigth, this.position.z);
		GAMU.positionMesh(baseMesh, cannonTopPos, this.rotation);
		this.scene.add( baseMesh );

		var cylinder = new THREE.Mesh( new THREE.CylinderGeometry( this.radius, this.radius, this.baseHeigth, 32 ), GAMU.materialBlack );
		var cannonBasePos = new THREE.Vector3(this.position.x, this.position.y + this.baseHeigth/2, this.position.z);
		GAMU.positionMesh(cylinder, cannonBasePos, this.rotation);
		this.scene.add( cylinder );

		this.generateCannonTube();
	},

	generateCannonTube: function() {
		var pts = [
            new THREE.Vector3(15,0,50),//top left
            new THREE.Vector3(20,0,50),//top right
            new THREE.Vector3(20,0,-50),//bottom right
            new THREE.Vector3(15,0,-50),//bottom left
            new THREE.Vector3(15,0,50)//back to top left - close square path
           ];
		var mesh = new THREE.Mesh( new THREE.LatheGeometry( pts, 64 ), GAMU.materialBlack);
		mesh.overdraw = true;
		mesh.doubleSided = true;
		var tubePos = new THREE.Vector3(this.position.x + this.radius, this.position.y + this.baseHeigth, this.position.z);
		GAMU.positionMesh(mesh, tubePos, new THREE.Vector3(45 *Math.PI/180, -90 *Math.PI/180, 0));

		//mesh.rotateX(this.angle);
		//mesh.rotateY(-2*Math.PI/180);
		
		this.scene.add( mesh );
	},

	determineVelocityVector: function() {
		var vel = new THREE.Vector3();

		//vx = v0 . cos?
		vel.x = this.initialVelocity * Math.cos(this.angle * Math.PI / 180);
		//v0y = v0 . sen?
		vel.y = this.initialVelocity * Math.sin(this.angle * Math.PI / 180);

		return vel;
	}

};


GAMU.CannonBall  = function(_cannon) {
	GAMU.Positionable.call( this );

	var ballGeometry = GAMU._defaultCannonBallGeometry;
	var ballMaterial = GAMU._defaultCannonBallMaterial;
	var cannon = _cannon;
	var mesh = undefined;
	var radius = 20;

	Object.defineProperties( this, {
		ballGeometry: {
			enumerable: true,
			value: ballGeometry
		},
		ballMaterial: {
			enumerable: true,
			value: ballMaterial,
			writable: true
		},
		cannon: {
			enumerable: true,
			value: cannon
		},
		mesh: {
			enumerable: true,
			value: mesh,
			writable: true
		},
		radius: {
			enumerable: true,
			value: radius
		}
	} );
};

GAMU.CannonBall.prototype = Object.create( GAMU.Positionable.prototype );

GAMU.CannonBall.prototype = {
	constructor: GAMU.CannonBall,

	build: function() {
		this.mesh = new THREE.Mesh( this.ballGeometry, this.ballMaterial );
		this.mesh.material.side = THREE.DoubleSide;

		this.position = new THREE.Vector3(this.cannon.position.x + 100, this.cannon.position.y + this.cannon.baseHeigth, this.cannon.position.z);
		GAMU.positionMesh(this.mesh, this.position, this.rotation);

		this.mesh.matrixAutoUpdate = false;
		this.mesh.updateMatrix();
    	this.mesh.matrix.setPosition(this.position);

		return this.mesh;
	}
};

