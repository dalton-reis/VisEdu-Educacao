H.Contact = function () {

    var velocityLimit = 0.25;
    var angularLimit = 0.2;

    /** Holds the bodies that are involved in the contact. The second of these can be NULL, for contacts with the scenery. */
    var body = [];

    /** Holds the lateral friction coefficient at the contact. */
    var friction;

    /** Holds the normal restitution coefficient at the contact. */
    var restitution;

    /** Holds the position of the contact in world coordinates. */
    var contactPoint;

    /** Holds the direction of the contact in world coordinates. */
    var contactNormal = new H.Vector3();

    /** Holds the depth of penetration at the contact point. If both bodies are specified then the contact point should be midway between the inter-penetrating points. */
    var penetration;

    /** A transform matrix that converts co-ordinates in the contact's frame of reference to world co-ordinates. The columns of this matrix form an orthonormal set of vectors. */
    var contactToWorld = new H.Matrix3();

    /** Holds the closing velocity at the point of contact. This is set when the calculateInternals function is run. */
    var contactVelocity;

    /** Holds the required change in velocity for this contact to be resolved. */
    var desiredDeltaVelocity;

    /** Holds the world space position of the contact point relative to centre of each body. This is set when the calculateInternals function is run. */
    var relativeContactPosition = [];


    Object.defineProperties( this, {
        velocityLimit:           { enumerable: true, value: velocityLimit, writable: true },
        angularLimit:            { enumerable: true, value: angularLimit, writable: true },
        body:                    { enumerable: true, value: body, writable: true },
        friction:                { enumerable: true, value: friction, writable: true },
        restitution:             { enumerable: true, value: restitution, writable: true },
        contactPoint:            { enumerable: true, value: contactPoint, writable: true },
        contactNormal:           { enumerable: true, value: contactNormal, writable: true },
        penetration:             { enumerable: true, value: penetration, writable: true },
        contactToWorld:          { enumerable: true, value: contactToWorld, writable: true },
        contactVelocity:         { enumerable: true, value: contactVelocity, writable: true },
        desiredDeltaVelocity:    { enumerable: true, value: desiredDeltaVelocity, writable: true },
        relativeContactPosition: { enumerable: true, value: relativeContactPosition, writable: true }
    });
}


H.Contact.prototype = {
    construtor: H.Contact,

    teste : function() {
        console.log('memo');
    },

    setBodyData: function(one, two, friction, restitution) {
        this.body[0] = one;
        this.body[1] = two;
        this.friction = friction;
        this.restitution = restitution;
    },

    /** Calculates internal data from state data. This is called before the resolution algorithm tries to do any resolution. It should never need to be called manually. */
    calculateInternals: function( duration ) {
        // Check if the first object is NULL, and swap if it is.
        if (!this.body[0])  {
            this.swapBodies();
        }
        //assert (body[0] != null);

        // Calculate an set of axis at the contact point.
        this.calculateContactBasis();

        // Store the relative position of the contact relative to each body
        this.relativeContactPosition[0] = this.contactPoint.sub(this.body[0].position);
        if (this.body[1]) {
            this.relativeContactPosition[1] = this.contactPoint.sub(this.body[1].position);
        }

        // Find the relative velocity of the bodies at the contact point.
        this.contactVelocity = this.calculateLocalVelocity(0, duration);
        if (this.body[1]) {
            this.contactVelocity.subToMe(this.calculateLocalVelocity(1, duration));
        }

        // Calculate the desired change in velocity for resolution
        this.calculateDesiredDeltaVelocity(duration);
    },

    /**
     * Reverses the contact. This involves swapping the two rigid bodies and reversing the contact normal. The internal values should then be recalculated using calculateInternals (this is not done automatically).
     * Swaps the bodies in the current contact, so body 0 is at body 1 and vice versa. This also changes the direction of the contact normal, but doesn't update any calculated internal data. 
     * If you are calling this method manually, then call calculateInternals afterwards to make sure the internal data is up to date.
     */
    swapBodies: function() {
        this.contactNormal.multToMe(-1);

        var temp = this.body[0];
        this.body[0] = this.body[1];
        this.body[1] = temp;
    },

    /**
     * Updates the awake state of rigid bodies that are taking
     * place in the given contact. A body will be made awake if it
     * is in contact with a body that is awake.
     */
    matchAwakeState: function() {
        // Collisions with the world never cause a body to wake up.
        if (!this.body[1]) {
            return;
        }

        var body0awake = this.body[0].awake;
        var body1awake = this.body[1].awake;

        // Wake up only the sleeping one
        if (body0awake ^ body1awake) {
            if (body0awake) {
                this.body[1].setAwake();
            } else {
                this.body[0].setAwake();
            }
        }
    },

    /** Calculates and sets the internal value for the desired delta velocity. */
    calculateDesiredDeltaVelocity: function( duration ) {

        // Calculate the acceleration induced velocity accumulated this frame
        var velocityFromAcc = 0;

        if (this.body[0].awake) {
            velocityFromAcc += this.body[0].lastFrameAcceleration.multNumber(duration).multVector(this.contactNormal);
        }

        if (this.body[1] && this.body[1].awake) {
            velocityFromAcc -= this.body[1].lastFrameAcceleration.multNumber(duration).multVector(this.contactNormal);
        }

        // If the velocity is very slow, limit the restitution
        var thisRestitution = this.restitution + 0;
        if (Math.abs(this.contactVelocity.x) < this.velocityLimit) {
            thisRestitution = 0.0;
        }

        // Combine the bounce velocity with the removed
        // acceleration velocity.
        this.desiredDeltaVelocity = -this.contactVelocity.x - thisRestitution * (this.contactVelocity.x - velocityFromAcc);
    },

    /** Calculates and returns the velocity of the contact point on the given body. */
    calculateLocalVelocity: function( bodyIndex, duration ) {
        var thisBody = this.body[bodyIndex];

        // Work out the velocity of the contact point.
        var velocity = thisBody.rotation.rest(this.relativeContactPosition[bodyIndex]);
        velocity.sumToMe(thisBody.velocity);

        // Turn the velocity into contact-coordinates.
        var _contactVelocity = this.contactToWorld.transformTranspose(velocity);

        // Calculate the ammount of velocity that is due to forces without reactions.
        var accVelocity = thisBody.lastFrameAcceleration.multNumber(duration);

        // Calculate the velocity in contact-coordinates.
        accVelocity = this.contactToWorld.transformTranspose(accVelocity);

        // We ignore any component of acceleration in the contact normal direction, we are only interested in planar acceleration
        accVelocity.x = 0;

        // Add the planar velocities - if there's enough friction they will be removed during velocity resolution
        _contactVelocity.sumToMe(accVelocity);

        // And return it
        return _contactVelocity;
    },

    /**
     * Calculates an orthonormal basis for the contact point, based on
     * the primary friction direction (for anisotropic friction) or
     * a random orientation (for isotropic friction).
     * 
     * ructs an arbitrary orthonormal basis for the contact. This is
     * stored as a 3x3 matrix, where each vector is a column (in other
     * words the matrix transforms contact space into world space). The x
     * direction is generated from the contact normal, and the y and z
     * directionss are set so they are at right angles to it.
     */
    calculateContactBasis: function() {
        var contactTangent = [];
        contactTangent[0] = new H.Vector3();
        contactTangent[1] = new H.Vector3();

        // Check whether the Z-axis is nearer to the X or Y axis
        if (Math.abs(this.contactNormal.x) > Math.abs(this.contactNormal.y)) {
            // Scaling factor to ensure the results are normalised
            var s = 1.0 / Math.sqrt(this.contactNormal.z * this.contactNormal.z + this.contactNormal.x * this.contactNormal.x);

            // The new X-axis is at right angles to the world Y-axis
            contactTangent[0].x = contactNormal.z * s;
            contactTangent[0].y = 0;
            contactTangent[0].z = -this.contactNormal.x * s;

            // The new Y-axis is at right angles to the new X- and Z- axes
            this.contactTangent[1].x = this.contactNormal.y * this.contactTangent[0].x;
            this.contactTangent[1].y = this.contactNormal.z * this.contactTangent[0].x - this.contactNormal.x * this.contactTangent[0].z;
            this.contactTangent[1].z = -this.contactNormal.y * this.contactTangent[0].x;
        } else {
            // Scaling factor to ensure the results are normalised
            var s = 1.0 / Math.sqrt(this.contactNormal.z * this.contactNormal.z + this.contactNormal.y * this.contactNormal.y);

            // The new X-axis is at right angles to the world X-axis
            contactTangent[0].x = 0;
            contactTangent[0].y = -this.contactNormal.z * s;
            contactTangent[0].z = this.contactNormal.y * s;

            // The new Y-axis is at right angles to the new X- and Z- axes
            contactTangent[1].x = this.contactNormal.y * contactTangent[0].z - this.contactNormal.z * contactTangent[0].y;
            contactTangent[1].y = -this.contactNormal.x * contactTangent[0].z;
            contactTangent[1].z = this.contactNormal.x * contactTangent[0].y;
        }

        // Make a matrix from the three vectors.
        this.contactToWorld.setComponents(this.contactNormal, contactTangent[0], contactTangent[1]);
    },

    /** Performs an inertia-weighted impulse based resolution of this contact alone. */
    applyVelocityChange: function( velocityChange, rotationChange ) {
        // Get hold of the inverse mass and inverse inertia tensor, both in world coordinates.
        var inverseInertiaTensor = [];
        inverseInertiaTensor[0] = this.body[0].inverseInertiaTensorWorld;
        if (this.body[1]) {
            inverseInertiaTensor[1] = this.body[1].inverseInertiaTensorWorld;
        }

        // We will calculate the impulse for each contact axis
        var impulseContact;

        if (this.friction == 0.0) {
            // Use the short format for frictionless contacts
            impulseContact = this.calculateFrictionlessImpulse(this.inverseInertiaTensor);
        } else {
            // Otherwise we may have impulses that aren't in the direction of the contact, so we need the more complex version.
            impulseContact = this.calculateFrictionImpulse(inverseInertiaTensor);
        }

        // Convert impulse to world coordinates
        var impulse = this.contactToWorld.transform(impulseContact);

        // Split in the impulse into linear and rotational components
        var impulsiveTorque = this.relativeContactPosition[0].rest(impulse);
        rotationChange[0] = inverseInertiaTensor[0].transform(impulsiveTorque);
        velocityChange[0].clear();
        velocityChange[0].addScaledVector(impulse, this.body[0].inverseMass);

        // Apply the changes
        this.body[0].addVelocity(velocityChange[0]);
        this.body[0].addRotation(rotationChange[0]);

        if (this.body[1]) {
            // Work out body one's linear and angular changes
            impulsiveTorque = impulse.rest(this.relativeContactPosition[1]);
            rotationChange[1] = inverseInertiaTensor[1].transform(impulsiveTorque);
            velocityChange[1].clear();
            velocityChange[1].addScaledVector(impulse, -this.body[1].inverseMass);

            // And apply them.
            body[1].addVelocity(velocityChange[1]);
            body[1].addRotation(rotationChange[1]);
        }
    },

    /** Performs an inertia weighted penetration resolution of this contact alone. */
    applyPositionChange: function( linearChange, angularChange, penetration ) {

        var angularMove = [0, 0];
        var linearMove = [0, 0];

        var totalInertia = 0;
        var linearInertia = [0, 0];
        var angularInertia = [0, 0];

        // We need to work out the inertia of each object in the direction
        // of the contact normal, due to angular inertia only.
        for (var i = 0; i < 2; i++)
            if (this.body[i]) {
                var inverseInertiaTensor = this.body[i].inverseInertiaTensorWorld;

                // Use the same procedure as for calculating frictionless
                // velocity change to work out the angular inertia.
                var angularInertiaWorld = this.relativeContactPosition[i].rest(this.contactNormal);
                angularInertiaWorld = inverseInertiaTensor.transform(angularInertiaWorld);
                angularInertiaWorld = angularInertiaWorld.rest(this.relativeContactPosition[i]);
                angularInertia[i] = angularInertiaWorld.multVector(this.contactNormal);

                // The linear component is simply the inverse mass
                linearInertia[i] = this.body[i].inverseMass;

                // Keep track of the total inertia from all components
                totalInertia += linearInertia[i] + angularInertia[i];

                // We break the loop here so that the totalInertia value is
                // completely calculated (by both iterations) before
                // continuing.
            }

        // Loop through again calculating and applying the changes
        for (var i = 0; i < 2; i++)
            if (this.body[i]) {
                // The linear and angular movements required are in proportion to
                // the two inverse inertias.
                var sign = (i == 0) ? 1 : -1;
                angularMove[i] = sign * this.penetration * (angularInertia[i] / totalInertia);
                linearMove[i] = sign * this.penetration * (linearInertia[i] / totalInertia);

                // To avoid angular projections that are too great (when mass is large
                // but inertia tensor is small) limit the angular move.
                var projection = this.relativeContactPosition[i];
                projection.addScaledVector(this.contactNormal, -this.relativeContactPosition[i].scalarProduct(this.contactNormal));

                // Use the small angle approximation for the sine of the angle (i.e.
                // the magnitude would be sine(angularLimit) * projection.magnitude
                // but we approximate sine(angularLimit) to angularLimit).
                var maxMagnitude = this.angularLimit * projection.magnitude();

                if (angularMove[i] < -maxMagnitude) {
                    var totalMove = angularMove[i] + linearMove[i];
                    angularMove[i] = -maxMagnitude;
                    linearMove[i] = totalMove - angularMove[i];
                } else if (angularMove[i] > maxMagnitude) {
                    var totalMove = angularMove[i] + linearMove[i];
                    angularMove[i] = maxMagnitude;
                    linearMove[i] = totalMove - angularMove[i];
                }

                // We have the linear amount of movement required by turning
                // the rigid body (in angularMove[i]). We now need to
                // calculate the desired rotation to achieve that.
                if (angularMove[i] == 0) {
                    // Easy case - no angular movement means no rotation.
                    angularChange[i].clear();
                } else {
                    // Work out the direction we'd like to rotate in.
                    var targetAngularDirection = this.relativeContactPosition[i].vectorProduct(this.contactNormal);

                    var inverseInertiaTensor = this.body[i].inverseInertiaTensorWorld;

                    // Work out the direction we'd need to rotate to achieve that
                    angularChange[i] = inverseInertiaTensor.transform(targetAngularDirection).multNumber(angularMove[i] / angularInertia[i]);
                }

                // Velocity change is easier - it is just the linear movement
                // along the contact normal.
                linearChange[i] = this.contactNormal.multNumber(linearMove[i]);

                // Now we can start to apply the values we've calculated.
                // Apply the linear movement
                var pos = this.body[i].position;
                pos.addScaledVector(this.contactNormal, linearMove[i]);
                this.body[i].position = pos;

                // And the change in orientation
                var q = this.body[i].orientation;
                q.addScaledVector(angularChange[i], (1.0));
                this.body[i].orientation = q;

                // We need to calculate the derived data for any body that is
                // asleep, so that the changes are reflected in the object's
                // data. Otherwise the resolution will not change the position
                // of the object, and the next collision detection round will
                // have the same penetration.
                if (!this.body[i].awake) {
                    this.body[i].calculateDerivedData();
                }
            }
    },

    /** Calculates the impulse needed to resolve this contact, given that the contact has no friction. A pair of inertia
     * tensors - one for each contact object - is specified to save calculation time: the calling function has access to these anyway. */
    calculateFrictionlessImpulse: function( inverseInertiaTensor ) {

        // Build a vector that shows the change in velocity in
        // world space for a unit impulse in the direction of the contact
        // normal.
        var deltaVelWorld = this.relativeContactPosition[0].rest(this.contactNormal);
        deltaVelWorld = inverseInertiaTensor[0].transform(deltaVelWorld);
        deltaVelWorld = deltaVelWorld.rest(this.relativeContactPosition[0]);

        // Work out the change in velocity in contact coordiantes.
        var deltaVelocity = deltaVelWorld.mult(this.contactNormal);

        // Add the linear component of velocity change
        deltaVelocity += this.body[0].inverseMass;

        // Check if we need to the second body's data
        if (body[1]) {
            // Go through the same transformation sequence again
            deltaVelWorld = this.relativeContactPosition[1].rest(this.contactNormal);
            deltaVelWorld = inverseInertiaTensor[1].transform(deltaVelWorld);
            deltaVelWorld = deltaVelWorld.rest(this.relativeContactPosition[1]);

            // Add the change in velocity due to rotation
            deltaVelocity += deltaVelWorld.mult(this.contactNormal);

            // Add the change in velocity due to linear motion
            deltaVelocity += this.body[1].inverseMass;
        }

        var impulseContact = new H.Vector3();
        // Calculate the required size of the impulse
        impulseContact.setX(desiredDeltaVelocity / deltaVelocity);
        impulseContact.setY(0);
        impulseContact.setZ(0);
        return impulseContact;
    },

    /**
     * Calculates the impulse needed to resolve this contact,
     * given that the contact has a non-zero coefficient of
     * friction. A pair of inertia tensors - one for each contact
     * object - is specified to save calculation time: the calling
     * function has access to these anyway.
     */
    calculateFrictionImpulse: function( inverseInertiaTensor ) {
        var inverseMass = this.body[0].inverseMass;

        // The equivalent of a cross product in matrices is multiplication
        // by a skew symmetric matrix - we build the matrix for converting
        // between linear and angular quantities.
        var impulseToTorque = new H.Matrix3();
        impulseToTorque.setSkewSymmetric(this.relativeContactPosition[0]);

        // Build the matrix to convert contact impulse to change in velocity
        // in world coordinates.
        var deltaVelWorld = new H.Matrix3(impulseToTorque);
        deltaVelWorld.multToMeMatrix(inverseInertiaTensor[0]);
        deltaVelWorld.multToMeMatrix(impulseToTorque);
        deltaVelWorld.multToMeScalar(-1);

        // Check if we need to add body two's data
        if (this.body[1]) {
            // Set the cross product matrix
            impulseToTorque.setSkewSymmetric(this.relativeContactPosition[1]);

            // Calculate the velocity change matrix
            var deltaVelWorld2 = impulseToTorque;
            deltaVelWorld2.multToMe(inverseInertiaTensor[1]);
            deltaVelWorld2.multToMe(impulseToTorque);
            deltaVelWorld2.multToMe(-1);

            // Add to the total delta velocity.
            deltaVelWorld.sumToMe(deltaVelWorld2);

            // Add to the inverse mass
            inverseMass += body[1].inverseMass;
        }

        // Do a change of basis to convert into contact coordinates.
        var deltaVelocity = this.contactToWorld.transpose();
        deltaVelocity.multToMeMatrix(deltaVelWorld);
        deltaVelocity.multToMeMatrix(this.contactToWorld);

        // Add in the linear velocity change
        deltaVelocity.data[0] += inverseMass;
        deltaVelocity.data[4] += inverseMass;
        deltaVelocity.data[8] += inverseMass;

        // Invert to get the impulse needed per unit velocity
        var impulseMatrix = deltaVelocity.inverse();

        // Find the target velocities to kill
        var velKill = new H.Vector3().set(this.desiredDeltaVelocity, -this.contactVelocity.y, -this.contactVelocity.z);

        // Find the impulse to kill target velocities
        var impulseContact = impulseMatrix.transform(velKill);

        // Check for exceeding friction
        var planarImpulse = Math.sqrt(impulseContact.y * impulseContact.y + impulseContact.z * impulseContact.z);
        if (planarImpulse > impulseContact.x * this.friction) {
            // We need to use dynamic friction
            impulseContact.y = impulseContact.y / planarImpulse;
            impulseContact.z = impulseContact.z / planarImpulse;

            impulseContact.x = deltaVelocity.data[0] + deltaVelocity.data[1] * this.friction * impulseContact.y + deltaVelocity.data[2] * friction * impulseContact.z;
            impulseContact.x = desiredDeltaVelocity / impulseContact.x;
            impulseContact.y = impulseContact.y * friction * impulseContact.x;
            impulseContact.z = impulseContact.z * friction * impulseContact.x;
        }
        return impulseContact;
    }

};