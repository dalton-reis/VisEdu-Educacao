HEFESTO.ForceType = {
	GRAVITY: "GRAVITY"
};

HEFESTO.Force = function(_type) {
	var id = HEFESTO.guid();
	var name = 'Force';
	var type = _type;

	Object.defineProperties( this, {
		id: {
			enumerable: true,
			value: id,
			writable: true
		},
		name: {
			enumerable: true,
			value: name,
			writable: true
		},
		type: {
			enumerable: true,
			value: type,
			writable: false
		}
	});

};

HEFESTO.Force.prototype = {
	construtor: HEFESTO.CollisionData,
};


HEFESTO.GravityForce = function (_gravity) {

	HEFESTO.Force.call( this , HEFESTO.ForceType.GRAVITY);

	var gravity = _gravity;

	Object.defineProperties( this, {
		gravity: {
			enumerable: true,
			value: gravity,
			writable: false
		}
	});

};

HEFESTO.GravityForce.prototype = Object.create( HEFESTO.Force.prototype );