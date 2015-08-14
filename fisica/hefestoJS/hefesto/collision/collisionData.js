H.CollisionData = function(_friction, _restitution, _tolerance) {
	var id = H.guid();
	var name = id;
	var friction = _friction;
	var restitution = _restitution;
	var tolerance = _tolerance;
	var maxContacts = 256 * 256 * 256;

	var contacts = [];
	var apllyedContacts = 0;

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
		},
		contacts: {
			enumerable: true,
			value: contacts,
			writable: true
		},
		apllyedContacts: {
			enumerable: true,
			value: apllyedContacts,
			writable: true
		}
	});

};

H.CollisionData.prototype = {
	construtor: H.CollisionData,

    collectContacts: function() {
        var a = this.contacts;
        this.contacts = [];
        return a;
    },

    hasMoreContacts: function() {
        return this.apllyedContacts < this.maxContacts;
    },

    addContact: function( c ) {
        this.contacts.push(c);
        this.apllyedContacts++;
    },

    reset: function( maxContact ) {
        this.maxContacts = maxContact;
        this.contacts = [];
        this.apllyedContacts = 0;
    }
};