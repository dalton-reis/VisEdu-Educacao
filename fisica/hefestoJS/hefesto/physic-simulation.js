H.PhysicSimulation = function () {

	// Map<String, RigidBody>
	var rigidBodys = [];

	// Map<String, Force>
	var forces = [];
	// Map<RigidBody, List<Force>>
	var forcesByBody = [];

	// Map<String, ContactLinker>
	var contactLinkers = [];
	// Map<String(RigidBody), List<Collision>> 
	var contactLinkerByBody = [];

	// Map<String, CollisionData> 
	var collisionDatas = [];

	// private final int maxContact = 256 * 256 * 256;
	// private final ContactResolver resolver = new ContactResolver(maxContact);

	// List<Contact> 
	var contacts = [];

	var afterIntegrate = undefined;

	var contactResolver = new H.ContactResolver(256 * 8, 256 * 8);

    Object.defineProperties( this, {
        rigidBodys: {
            enumerable: true,
            value: rigidBodys,
            writable: false
        },
        forces: {
            enumerable: true,
            value: forces,
            writable: false
        },
        forcesByBody: {
            enumerable: true,
            value: forcesByBody,
            writable: false
        },
        contactLinkers: {
            enumerable: true,
            value: contactLinkers,
            writable: false
        },
        contactLinkerByBody: {
            enumerable: true,
            value: contactLinkerByBody,
            writable: false
        },
        collisionDatas: {
            enumerable: true,
            value: collisionDatas,
            writable: false
        },
        contacts: {
            enumerable: true,
            value: contacts,
            writable: false
        },
        afterIntegrate: {
            enumerable: true,
            value: afterIntegrate,
            writable: true
        },
        contactResolver: {
            enumerable: true,
            value: contactResolver,
            writable: true
        }
    });
}

H.PhysicSimulation.prototype = {
	construtor: H.PhysicSimulation,

	getContacts: function() {
		var result = this.contacts;
		this.contacts = [];
		return result;
	},

	addRigidBody: function(body) {
		if (body.body.id in this.rigidBodys) {
			throw 'Body exists in simulation.'
		}
		this.rigidBodys[body.body.id] =  body;
	},

	getRigidBody: function(id) {
		return this.rigidBodys[id];
	},

	removeRigidBody: function(id) {
		var body = this.rigidBodys[id];
		this.rigidBodys[id];

		if (body) {
			var list = this.contactLinkerByBody[body];

			if (list) {
				for (var c in list) {
					this.contactLinkers.splice(c.id);
				}
				this.contactLinkerByBody.splice(body);
			}
			return true;
		}
		return false;
	},

	addForce: function(force) {
		if (this.forces[force.id]) {
			return false;
		}
		this.forces[force.id] = force;
		return true;
	},

	getForce: function(id) {
		return this.forces[id];
	},

	addForceToBody: function(force, body) {
		if (!this.forces[force.id]) {
			return false;
		}
		if (!this.rigidBodys[body.id]) {
			return false;
		}
		var list = this.forcesByBody[body];
		if (!list) {
			list = [];
			this.forcesByBody[body] = list;
		}
		list.push(force);
		return true;
	},

	removeForce: function( id ) {
		var force = forces.splice(id);

		if (force) {
			for (var list in forcesByBody) {
				if (list) {
					list.splice(force);
				}
			}
			return true;
		}
		return false;
	},

	addContactLinker: function( collision ) {
		if (this.contactLinkers[collision.id]) {
			return false;
		}
		this.contactLinkers[collision.id] = collision;

		this.setBodyCollision(collision, collision.rb1);

		if (collision.rb2) {
			this.setBodyCollision(collision, collision.rb2);
		}
		return true;
	},

	setBodyCollision: function( collision, rb ) {
		var list = this.contactLinkerByBody[rb];
		if (!list) {
			list = [];
			this.contactLinkerByBody[collision.rb1] = list;
		}
		list.push(collision);
	},

	getContactLinker: function ( id ) {
		return this.contactLinkers.get(id);
	},

	removeContactLinker: function( id ) {
		return !!this.contactLinkers.splice(id);
	},

	addCollisionData: function( collisionData ) {
		if (this.collisionDatas[collisionData.id]) {
			return false;
		}
		this.collisionDatas[collisionData.id] = collisionData;
		return true;
	},

	getCollisionData: function( id ) {
		return this.collisionDatas[id];
	},
	
	integrate: function(duration) {

		// Update the objects
		this.integrateObjects(duration);

		// Perform the contact generation
		this.generateContacts(duration);
	},

	integrateObjects: function(duration) {
		for (var rb in this.rigidBodys) {
			rb = this.rigidBodys[rb];
			var forces = this.forcesByBody[rb.body];
			if (rb.body.useWorldForces) {
				forces = this.forces;
			}
			if (forces) {
				for (var f in forces) {
					forces[f].updateForce(rb.body, duration);
				}
			}
			
			rb.body.integrate(duration);
			rb.calculateInternals();

			if (this.afterIntegrate) {
				this.afterIntegrate(rb);
			}
		}
	},

	generateContacts: function( duration ) {
		// Create the ground plane data
		var plane = new H.CollisionPlane();
		plane.direction = new H.Vector3().set(0, 1, 0);
		plane.offset = 0;

		for (var col in this.contactLinkers) {
			col = this.contactLinkers[col];
			switch (col.type) {
			case H.CollisionType.SPHERE_AND_TRUEPLANE:
				H.CollisionDetector.sphereAndTruePlane(col.body1, plane, col.data);
			}
		}

		for (var cd in this.collisionDatas) {
			cd = this.collisionDatas[cd];
			this.contactResolver.resolveContacts(cd.collectContacts(), duration);
			cd.reset(256 * 256 * 256);
		}

		/*
		for (Collision col : collisions.values()) {
			if (!col.getData().hasMoreContacts() || !col.isEnable()) {
				continue;
			}
			switch (col.getType()) {
			case BOX_AND_BOX:
				CollisionDetector.boxAndBox(col.getRb1(), col.getRb2(),
						col.getData());
				break;
			case BOX_AND_HALFSPACE:
				CollisionDetector.boxAndHalfSpace(col.getRb1(), plane,
						col.getData());
				break;
			case BOX_AND_POINT:
				// CollisionDetector.boxAndPoint(col.getRb1(), col.getRb2(),
				// col.getData());
				break;
			case BOX_AND_SPHERE:
				CollisionDetector.boxAndSphere(col.getRb1(), col.getRb2(),
						col.getData());
				break;
			case SPHERE_AND_HALFSPACE:
				CollisionDetector.sphereAndHalfSpace(col.getRb1(), plane,
						col.getData());
				break;
			case SPHERE_AND_SPHERE:
				CollisionDetector.sphereAndSphere(col.getRb1(), col.getRb2(),
						col.getData());
				break;
			case SPHERE_AND_TRUEPLANE:
				CollisionDetector.sphereAndTruePlane(col.getRb1(), plane,
						col.getData());
				break;
			default:
				System.err.println("Unkown collision type: " + col.getType());
			}
		}

		for (CollisionData cd : collisionDatas.values()) {
			resolver.resolveContacts(cd.collectContacts(), duration);
			cd.reset(maxContact);
		}*/
	}
}
