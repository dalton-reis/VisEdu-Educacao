HEFESTO.CollisionType = {
	SPHERE_AND_HALFSPACE: "SPHERE_AND_HALFSPACE",
	SPHERE_AND_TRUEPLANE: "SPHERE_AND_TRUEPLANE",
	SPHERE_AND_SPHERE: "SPHERE_AND_SPHERE",
	BOX_AND_HALFSPACE: "BOX_AND_HALFSPACE",
	BOX_AND_BOX: "BOX_AND_BOX",
	BOX_AND_POINT: "BOX_AND_POINT",
	BOX_AND_SPHERE: "BOX_AND_SPHERE",
	ALL: "ALL"
};

HEFESTO.CollisionData = function(_friction, _restitution, _tolerance) {
	var id = HEFESTO.guid();
	var name = id;
	var friction = _friction;
	var restitution = _restitution;
	var tolerance = _tolerance;
	var maxContacts = 256 * 256;
	//console.log("Exececutou!!!");
	Object.defineProperties( this, {
		id: {
			enumerable: true,
			value: name,
			writable: true
		},
		name: {
			enumerable: true,
			value: id,
			writable: true
		},
		friction: {
			enumerable: true,
			value: friction
		},
		restitution: {
			enumerable: true,
			value: restitution
		},
		tolerance: {
			enumerable: true,
			value: tolerance
		},
		maxContacts: {
			enumerable: true,
			value: maxContacts,
			writable: true
		}
	});

};

HEFESTO.CollisionData.prototype = {
	construtor: HEFESTO.CollisionData,
};

HEFESTO.Collision = function(_type, _data, _body1, _body2) {
	var id = HEFESTO.guid();
	var type = _type;
	var data = _data.id;
	var body1 = _body1.id;
	var body2 = _body2 != null ? _body2.id : null;
	var enable = true;


	Object.defineProperties( this, {
		id: {
			enumerable: true,
			value: id,
			writable: true
		},
		type: {
			enumerable: true,
			value: type
		},
		data: {
			enumerable: true,
			value: data
		},
		body1: {
			enumerable: true,
			value: body1
		},
		body2: {
			enumerable: true,
			value: body2
		},
		enable: {
			enumerable: true,
			value: enable,
			writable: true
		}
	});
};

HEFESTO.Collision.prototype = {
	construtor: HEFESTO.Collision,
};