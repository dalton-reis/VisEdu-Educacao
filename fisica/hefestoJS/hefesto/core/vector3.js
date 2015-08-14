/**
 * Representation of 3D vector.
 */
H.Vector3 = function (v) {

	var x = v ? v.x : 0;
	var y = v ? v.y : 0;
	var z = v ? v.z : 0;

 	Object.defineProperties( this, {
 		x: {
			enumerable: true,
			value: x,
			writable: true
		},
		y: {
			enumerable: true,
			value: y,
			writable: true
		},
		z: {
			enumerable: true,
			value: z,
			writable: true
		}
	});
}


H.Vector3.prototype = {
	construtor: H.Vector3,

	set: function(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	},

	getData: function(i) {
		if (i == 0) return x;
		if (i == 1) return y;
		if (i == 2) return z;
		throw 'Invalid index';
	},

	sumToMe: function(v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
	},

	sum: function(v) {
		return new H.Vector3().set(this.x + v.x, this.y + v.y, this.z + v.z);
	},

	subToMe: function (v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
	},

	sub: function(v) {
		return new H.Vector3().set(this.x - v.x, this.y - v.y, this.z - v.z);
	},

	multToMe: function(value) {
		this.x *= value;
		this.y *= value;
		this.z *= value;
	},

	multNumber: function(value) {
		return new H.Vector3().set(this.x * value, this.y * value, this.z * value);
	},

	componentProduct: function(vector) {
		return new H.Vector3().set(this.x * vector.x, this.y * vector.y, this.z * vector.z);
	},

	componentProductUpdate: function(vector) {
		this.x *= vector.x;
		this.y *= vector.y;
		this.z *= vector.z;
	},

	vectorProduct: function(vector) {
		return new H.Vector3().set(this.y * vector.z - this.z * vector.y, this.z * vector.x - this.x * vector.z, this.x * vector.y - this.y * vector.x);
	},

	restToMe: function(vector) {
		var v = vectorProduct(vector);
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
	},

	rest: function(vector) {
		return new H.Vector3().set(this.y * vector.z - this.z * vector.y, this.z * vector.x - this.x * vector.z, this.x * vector.y - this.y * vector.x);
	},

	scalarProduct: function(vector) {
		return this.x * vector.x + this.y * vector.y + this.z * vector.z;
	},

	multVector: function(vector) {
		return this.x * vector.x + this.y * vector.y + this.z * vector.z;
	},

	addScaledVector: function(vector, scale) {
		this.x += vector.x * scale;
		this.y += vector.y * scale;
		this.z += vector.z * scale;
	},

	magnitude: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},

	squareMagnitude: function() {
		return x * x + y * y + z * z;
	},

	trim: function(size) {
		if (this.squareMagnitude() > size * size) {
			this.normalise();
			this.x *= size;
			this.y *= size;
			this.z *= size;
		}
	},

	normalise: function() {
		var l = this.magnitude();
		if (l > 0) {
			this.multToMe(1 / l); // TODO verificar
		}
	},

	unit: function() {
		var result = new H.Vector3(this);
		result.normalise();
		return result;
	},

	isEquals: function(other) {
		return this.x == other.x && this.y == other.y && this.z == other.z;
	},

	isNotEquals: function(other) {
		return !isEquals(other);
	},

	lessThan: function(other) {
		return this.x < other.x && this.y < other.y && this.z < other.z;
	},

	greaterThan: function(other) {
		return this.x > other.x && this.y > other.y && this.z > other.z;
	},

	lessEqualsThan: function(other) {
		return this.x <= other.x && this.y <= other.y && this.z <= other.z;
	},

	greaterEqualsThan: function(other) {
		return this.x >= other.x && this.y >= other.y && this.z >= other.z;
	},

	clear: function() {
		this.x = this.y = this.z = 0;
	},

	invert: function() {
		this.x = -x;
		this.y = -y;
		this.z = -z;
	}
};

