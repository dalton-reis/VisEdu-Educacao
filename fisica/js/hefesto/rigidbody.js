HEFESTO.RigidBody = function (mesh) {


	this._id = HEFESTO.guid();
	this._mesh = mesh;
	this._binded = false;

	this._position = mesh != undefined ? mesh.position : new THREE.Vector3();
	this._orientation = new THREE.Quaternion();
	this._velocity = new THREE.Vector3();
	this._aceleration = new THREE.Vector3();
	this._rotation = new THREE.Vector3();

	this._mass = 0.0;
	this._inertiaTensor = new THREE.Matrix3();
	this._linearDamping = 0.0;
	this._angularDamping = 0.0;
	this._canSleep = true;

	this._matrix = new THREE.Matrix4();
	this._matrix.identity();

	this._radius = 0;
	this._halfSize = new THREE.Vector3();

	 var ignoreIntegration = false;
	 var bindContactData = false;

 	Object.defineProperties( this, {
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
	} );
}

HEFESTO.RigidBody.prototype = {
	construtor: HEFESTO.RigidBody,

	get position () {
		return this._position;
	},

	set position (value) {
		this._position = value;
	},

	get orientation () {
		return this._orientation;
	},

	set orientation (value) {
		this._orientation = value;
	},

	get velocity () {
		return this._velocity;
	},

	set velocity (value) {
		this._velocity = value;
	},

	get aceleration () {
		return this._aceleration;
	},

	set aceleration (value) {
		this._aceleration = value;
	},

	get rotation () {
		return this._rotation;
	},

	set rotation (value) {
		this._rotation = value;
	},

	get mass () {
		return this._mass;
	},

	set mass (value) {
		this._mass = value;
	},

	get inertiaTensor () {
		return this._inertiaTensor;
	},

	set inertiaTensor (value) {
		this._inertiaTensor = value;
	},

	get linearDamping () {
		return this._linearDamping;
	},

	set linearDamping (value) {
		this._linearDamping = value;
	},

	get angularDamping () {
		return this._angularDamping;
	},

	set angularDamping (value) {
		this._angularDamping = value;
	},

	get canSleep () {
		return this._canSleep;
	},

	set canSleep (value) {
		this._canSleep = value;
	},

	get matrix () {
		return this._matrix;
	},

	set matrix (value) {
		this._matrix = value;
	},

	get radius () {
		return this._radius;
	},

	set radius (value) {
		this._radius = value;
	},

	get halfSize () {
		return this._halfSize;
	},

	set halfSize (value) {
		this._halfSize = value;
	}

};