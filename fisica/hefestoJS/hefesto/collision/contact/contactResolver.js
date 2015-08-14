H.ContactResolver = function ( vi, pi, ve, pe ) {

    var velocityIterations = vi;
    var positionIterations = vi;

    var velocityEpsilon = ve ? ve : 0.1;
    var positionEpsilon = pe ? pe : 0.1;

    var velocityIterationsUsed;
    var positionIterationsUsed;

    Object.defineProperties( this, {
        velocityIterations:     { enumerable: true, value: velocityIterations, writable: true },
        positionIterations:     { enumerable: true, value: positionIterations, writable: true },
        velocityEpsilon:        { enumerable: true, value: velocityEpsilon, writable: true },
        positionEpsilon:        { enumerable: true, value: positionEpsilon, writable: true },
        velocityIterationsUsed: { enumerable: true, value: velocityIterationsUsed, writable: true },
        positionIterationsUsed: { enumerable: true, value: positionIterationsUsed, writable: true }
    });
}

H.ContactResolver.prototype = {
    construtor: H.ContactResolver,

    /**
     * Returns true if the resolver has valid settings and is ready to go.
     */
    isValid: function() {
        return (this.velocityIterations > 0) && (this.positionIterations > 0) && (this.positionEpsilon >= 0.0) && (this.positionEpsilon >= 0.0);
    },

    resolveContacts: function( contacts, duration ) {
        // Make sure we have something to do.
        if (contacts.length < 1) {
            return;
        }

        if (!this.isValid()) return;

        // Prepare the contacts for processing
        this.prepareContacts(contacts, duration);

        // Resolve the interpenetration problems with the contacts.
        this.adjustPositions(contacts, duration);

        // Resolve the velocity problems with the contacts.
        this.adjustVelocities(contacts, duration);
    },

    prepareContacts: function( contacts, duration ) {
        for (var contact in contacts) {
            contact = contacts[contact];
            contact.calculateInternals(duration);
        }
    },

    adjustVelocities: function( contacts, duration ) {
        var velocityChange = [ new H.Vector3(), new H.Vector3() ];
        var rotationChange = [ new H.Vector3(), new H.Vector3() ];
        var deltaVel = new H.Vector3();

        // iteratively handle impacts in order of severity.
        this.velocityIterationsUsed = 0;
        while (this.velocityIterationsUsed < this.velocityIterations) {
            // Find contact with maximum magnitude of probable velocity change.
            var max = this.velocityEpsilon;
            var index = contacts.length;
            for (var i = 0; i < contacts.length; i++) {
                var contact = contacts[i];
                if (contact.desiredDeltaVelocity > max) {
                    max = contact.desiredDeltaVelocity;
                    index = i;
                }
            }
            if (index == contacts.length) {
                break;
            }

            // Match the awake state at the contact
            var contact = contacts[index];
            contact.matchAwakeState();

            // Do the resolution on the contact that came out top.
            contact.applyVelocityChange(velocityChange, rotationChange);

            // With the change in velocity of the two bodies, the update of
            // contact velocities means that some of the relative closing
            // velocities need recomputing.
            for (var i = 0; i < contacts.length; i++) {
                // Check each body in the contact
                for (var b = 0; b < 2; b++) {
                    var contacti = contacts[i];
                    if (contacti.body[b] != null) {
                        // Check for a match with each body in the newly
                        // resolved contact
                        for (var d = 0; d < 2; d++) {
                            if (contacti.body[b] == contact.body[d]) {
                                deltaVel = velocityChange[d].sum(rotationChange[d].vectorProduct(contacti.relativeContactPosition[b]));

                                // The sign of the change is negative if we're dealing
                                // with the second body in a contact.
                                contacti.contactVelocity.sumToMe(contacti.contactToWorld.transformTranspose(deltaVel).multNumber(b == 1 ? -1 : 1));
                                contacti.calculateDesiredDeltaVelocity(duration);
                            }
                        }
                    }
                }
            }
            this.velocityIterationsUsed++;
        }
    },

    /** Resolves the positional issues with the given array of constraints, using the given number of iterations. */
    adjustPositions: function( contacts, duration ) {
        var i;
        var index;
        var linearChange = [];
        var angularChange = [ new H.Vector3(), new H.Vector3() ];
        var max;
        var deltaPosition;

        // iteratively resolve interpenetrations in order of severity.
        this.positionIterationsUsed = 0;
        while (this.positionIterationsUsed < this.positionIterations) {
            // Find biggest penetration
            max = this.positionEpsilon;
            index = contacts.length;
            for (i = 0; i < contacts.length; i++) {
                var contact = contacts[i];
                if (contact.penetration > max) {
                    max = contact.penetration;
                    index = i;
                }
            }
            if (index == contacts.length) {
                break;
            }

            // Match the awake state at the contact
            var contact = contacts[index];
            contact.matchAwakeState();

            // Resolve the penetration.
            contact.applyPositionChange(linearChange, angularChange, max);

            // Again this action may have changed the penetration of other
            // bodies, so we update contacts.
            for (i = 0; i < contacts.length; i++) {
                // Check each body in the contact
                for (var b = 0; b < 2; b++)
                    if (contacts[i].body[b] != null) {
                        // Check for a match with each body in the newly
                        // resolved contact
                        for (var d = 0; d < 2; d++) {
                            var contacti = contacts[i];
                            if (contacti.body[b] == contact.body[d]) {
                                deltaPosition = linearChange[d].sum(angularChange[d].vectorProduct(contacti.relativeContactPosition[b]));

                                // The sign of the change is positive if we're
                                // dealing with the second body in a contact
                                // and negative otherwise (because we're
                                // subtracting the resolution)..
                                contacti.penetration = contacti.penetration + deltaPosition.scalarProduct(contacti.contactNormal.multNumber(b == 1 ? 1 : -1));
                            }
                        }
                    }
            }
            this.positionIterationsUsed++;
        }
    }

};