HEFESTO.RigidBody = function (mesh) {


	var id = HEFESTO.guid();
	var mesh = mesh;
	var binded = false;

	var position = mesh != undefined ? mesh.position : new THREE.Vector3();
	var orientation = new THREE.Quaternion();
	var velocity = new THREE.Vector3();
	var acceleration = new THREE.Vector3();
	var rotation = new THREE.Vector3();

	var mass = 0.0;
	var inertiaTensor = new THREE.Matrix3();
	var linearDamping = 0.0;
	var angularDamping = 0.0;
	var canSleep = true;

	var matrix = new THREE.Matrix4();
	matrix.identity();

	var radius = 0;
	var halfSize = new THREE.Vector3();

	var ignoreIntegration = false;
	var bindContactData = false;
	var useWorldForces = false;

 	Object.defineProperties( this, {
 		id: {
			enumerable: true,
			value: id,
			writable: false
		},
		mesh: {
			enumerable: true,
			value: mesh,
			writable: true
		},
		binded: {
			enumerable: true,
			value: binded,
			writable: true
		},
		position: {
			enumerable: true,
			value: position,
			writable: true
		},
		orientation: {
			enumerable: true,
			value: orientation,
			writable: true
		},
		velocity: {
			enumerable: true,
			value: velocity,
			writable: true
		},
		acceleration: {
			enumerable: true,
			value: acceleration,
			writable: true
		},
		rotation: {
			enumerable: true,
			value: rotation,
			writable: true
		},
		mass: {
			enumerable: true,
			value: mass,
			writable: true
		},
		inertiaTensor: {
			enumerable: true,
			value: inertiaTensor,
			writable: true
		},
		linearDamping: {
			enumerable: true,
			value: linearDamping,
			writable: true
		},
		angularDamping: {
			enumerable: true,
			value: angularDamping,
			writable: true
		},
		canSleep: {
			enumerable: true,
			value: canSleep,
			writable: true
		},
		matrix: {
			enumerable: true,
			value: matrix,
			writable: true
		},
		radius: {
			enumerable: true,
			value: radius,
			writable: true
		},
		halfSize: {
			enumerable: true,
			value: halfSize,
			writable: true
		},
		ignoreIntegration: {
			enumerable: true,
			value: ignoreIntegration,
			writable: true
		},
		bindContactData: {
			enumerable: true,
			value: bindContactData,
			writable: true
		},
		useWorldForces: {
			enumerable: true,
			value: useWorldForces,
			writable: true
		},
	} );
}

HEFESTO.RigidBody.prototype = {
	construtor: HEFESTO.RigidBody
};