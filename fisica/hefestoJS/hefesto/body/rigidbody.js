H.RigidBody = function (v) {

    var inverseMass = 0.0;

    var inverseInertiaTensor = new H.Matrix3();
    var inverseInertiaTensorWorld = new H.Matrix3();

    var linearDamping = 0.0;
    var angularDamping = 0.0;

    var position = new H.Vector3();
    var orientation = new H.Quaternion();
    var velocity = new H.Vector3();
    var rotation = new H.Vector3();
    var acceleration = new H.Vector3();

    var motion = 0.0;

    var isAwake = true;
    var canSleep = true;

    var transformMatrix = new H.Matrix4();

    var forceAccum = new H.Vector3();
    var torqueAccum = new H.Vector3();

    var lastFrameAcceleration = new H.Vector3();

    /** Utils */
    var useWorldForces = false;

    Object.defineProperties( this, {
        inverseMass:           { enumerable: true, value: inverseMass, writable: true },
        inverseInertiaTensor:  { enumerable: true, value: inverseInertiaTensor, writable: true },
        inverseInertiaTensorWorld: { enumerable: true, value: inverseInertiaTensorWorld, writable: false },
        linearDamping:         { enumerable: true, value: linearDamping, writable: true },
        angularDamping:        { enumerable: true, value: angularDamping, writable: true },
        position:              { enumerable: true, value: position, writable: true },
        orientation:           { enumerable: true, value: orientation, writable: true },
        velocity:              { enumerable: true, value: velocity, writable: true },
        rotation:              { enumerable: true, value: rotation, writable: true },
        acceleration:          { enumerable: true, value: acceleration, writable: true },
        motion:                { enumerable: true, value: motion, writable: true },
        isAwake:               { enumerable: true, value: isAwake, writable: true },
        canSleep:              { enumerable: true, value: canSleep, writable: true },
        transformMatrix:       { enumerable: true, value: transformMatrix, writable: true },
        forceAccum:            { enumerable: true, value: forceAccum, writable: true },
        torqueAccum:           { enumerable: true, value: torqueAccum, writable: true },
        lastFrameAcceleration: { enumerable: true, value: lastFrameAcceleration, writable: true },

        useWorldForces: { enumerable: true, value: useWorldForces, writable: true }
    });
};


H.RigidBody.prototype = {
    construtor: H.RigidBody,

    set mass (mass) {
        if (mass <= 0) {
            throw 'Mass equals zero.';
        }
        this.inverseMass = 1.0 / mass;
    },

    get mass () {
        if (this.inverseMass == 0) {
            return Double.MAX_VALUE;
        }
        return 1.0 / this.inverseMass;
    },

    calculateDerivedData: function() {
        this.orientation.normalise();

        // Calculate the transform matrix for the body.
        HUtils.calculateTransformMatrix(this.transformMatrix, this.position, this.orientation);

        // Calculate the inertiaTensor in world space.
        HUtils.transformInertiaTensor(this.inverseInertiaTensorWorld, this.orientation, this.inverseInertiaTensor, this.transformMatrix);
    },

    integrate: function(duration) {
        if (!this.isAwake) return;

        // Calculate linear acceleration from force inputs.
        this.lastFrameAcceleration = new H.Vector3(this.acceleration);
        this.lastFrameAcceleration.addScaledVector(this.forceAccum, this.inverseMass);

        // Calculate angular acceleration from torque inputs.
        var angularAcceleration = this.getInverseInertiaTensorWorld().transform(this.torqueAccum);

        // Adjust velocities
        // Update linear velocity from both acceleration and impulse.
        this.velocity.addScaledVector(this.lastFrameAcceleration, duration);

        // Update angular velocity from both acceleration and impulse.
        this.rotation.addScaledVector(angularAcceleration, duration);

        // Impose drag.
        this.velocity.multToMe(Math.pow(this.linearDamping, duration));
        this.rotation.multToMe(Math.pow(this.angularDamping, duration));

        // Adjust positions
        // Update linear position.
        this.position.addScaledVector(this.velocity, duration);

        // Update angular position.
        this.orientation.addScaledVector(this.rotation, duration);

        // Normalise the orientation, and update the matrices with the new
        // position and orientation
        this.calculateDerivedData();

        // Clear accumulators.
        this.clearAccumulators();

        // Update the kinetic energy store, and possibly put the body to
        // sleep.
        if (this.canSleep) {
            var currentMotion = this.velocity.scalarProduct(this.velocity) + this.rotation.scalarProduct(this.rotation);

            var bias = Math.pow(0.5, duration);
            this.motion = bias * this.motion + (1 - bias) * currentMotion;

            var sleepEpsilon = H.sleepEpsilon;
            if (this.motion < sleepEpsilon) this.setAwake(false);
            else if (this.motion > 10 * sleepEpsilon) this.motion = 10 * sleepEpsilon;
        }
    },

    hasFiniteMass: function() {
        return this.inverseMass >= 0.0;
    },

    setInertiaTensor: function(inertiaTensor) {
        this.inverseInertiaTensor.setInverse(inertiaTensor);
        HUtils.checkInverseInertiaTensor(this.inverseInertiaTensor);
    },

    getInertiaTensor: function() {
        var it = new H.Matrix3();
        it.setInverse(this.inverseInertiaTensor);
        return it;
    },

    setInverseInertiaTensor (inverseInertiaTensor) {
        HUtils.checkInverseInertiaTensor(inverseInertiaTensor);
        this.inverseInertiaTensor = inverseInertiaTensor;
    },

    getInverseInertiaTensorWorld() {
        var m = new H.Matrix3();
        this.fillMatrix3(this.inverseInertiaTensorWorld, m);
        return m;
    },

    get position() {
        return fillVector3(this.position);
    },

    set orientation(orientation) {
        this.orientation = orientation;
        this.orientation.normalise();
    },

    get orientation() {
        var o = new H.Quaternion();
        fillQuaternion(this.orientation, o);
        return o;
    },

    getGLTransform: function(matrix) {
        matrix[0] = this.transformMatrix.getData(0);
        matrix[1] = this.transformMatrix.getData(4);
        matrix[2] = this.transformMatrix.getData(8);
        matrix[3] = 0;

        matrix[4] = this.transformMatrix.getData(1);
        matrix[5] = this.transformMatrix.getData(5);
        matrix[6] = this.transformMatrix.getData(9);
        matrix[7] = 0;

        matrix[8] = this.transformMatrix.getData(2);
        matrix[9] = this.transformMatrix.getData(6);
        matrix[10] = this.transformMatrix.getData(10);
        matrix[11] = 0;

        matrix[12] = this.transformMatrix.getData(3);
        matrix[13] = this.transformMatrix.getData(7);
        matrix[14] = this.transformMatrix.getData(11);
        matrix[15] = 1;
    },

    getPointInWorldSpace: function(point) {
        return transformMatrix.transform(point);
    },

    addVelocity: function(deltaVelocity) {
        this.velocity.sumToMe(deltaVelocity);
    },

    addRotation: function(deltaRotation) {
        this.rotation.sumToMe(deltaRotation);
    },

    setAwake: function() {
        this.awake = true;
    },

    set isAwake(awake) {
        if (awake) {
            this.isAwake = true;

            // Add a bit of motion to avoid it falling asleep immediately.
            motion = H.sleepEpsilon * 2.0;
        } else {
            this.isAwake = false;
            this.velocity.clear();
            this.rotation.clear();
        }
    },

    set canSleep(canSleep) {
        this.canSleep = canSleep;

        if (!canSleep && !isAwake) this.setAwake();
    },

    clearAccumulators: function() {
        this.forceAccum.clear();
        this.torqueAccum.clear();
    },

    addForce: function(force) {
        this.forceAccum.sumToMe(force);
        this.isAwake = true;
    },

    addForceAtPoint: function(force, point) {
        // Convert to coordinates relative to center of mass.
        var pt = point;
        pt.subToMe(position);

        this.forceAccum.sumToMe(force);
        this.torqueAccum.sumToMe(pt.rest(force));

        isAwake = true;
    },

    addForceAtBodyPoint: function(force, point) {
        // Convert to coordinates relative to center of mass.
        var pt = getPointInWorldSpace(point);
        addForceAtPoint(force, pt);

    },

    addTorque: function(torque) {
        torqueAccum.sumToMe(torque);
        isAwake = true;
    },

    fillVector3: function(origin) {
        var destin = new Vector3();
        fillVector3(origin, destin);
        return destin;

    },

    fillVector3: function(origin, destin) {
        destin.setX(origin.getX());
        destin.setY(origin.getY());
        destin.setZ(origin.getZ());
    },

    fillMatrix3: function(origin, destin) {
        for (i = 0; i < 9; i++) {
            destin.setData(i, origin.getData(i));
        }
    },

    fillQuaternion: function(origin, destin) {
        destin.setR(origin.getR());
        destin.setI(origin.getI());
        destin.setJ(origin.getJ());
        destin.setK(origin.getK());
    },

    clone: function() {
        var rb = new H.RigidBody();

        rb.setInverseMass(inverseMass);
        rb.setInverseInertiaTensor(new H.Matrix3(inverseInertiaTensor));
        rb.setLinearDamping(linearDamping);
        rb.setAngularDamping(angularDamping);
        rb.setPosition(new H.Vector3(position));
        rb.setOrientation(new H.Quaternion(orientation));
        rb.setVelocity(new H.Vector3(velocity));
        rb.setRotation(new H.Vector3(rotation));
        rb.inverseInertiaTensorWorld = new H.Matrix3(inverseInertiaTensorWorld);

        rb.motion = motion;
        rb.setAwake(isAwake);
        rb.setCanSleep(canSleep);

        rb.transformMatrix = new H.Matrix4();
        rb.transformMatrix.setData(transformMatrix.getData());

        rb.forceAccum = new H.Vector3(forceAccum);
        rb.torqueAccum = new H.Vector3(torqueAccum);
        rb.setAcceleration(new H.Vector3(acceleration));

        rb.lastFrameAcceleration = new H.Vector3(lastFrameAcceleration);

        return rb;
    }
};

/** RB para o ThreeJS */
H.TRigidBody = function (mesh) {

    H.RigidBody.call( this );

    var id = H.guid();

    var mesh = mesh;

    if (mesh) {
        this.position.x = mesh.position.x;
        this.position.y = mesh.position.y;
        this.position.z = mesh.position.z;
    }

    Object.defineProperties( this, {
        id: {
            enumerable: true,
            value: id,
            writable: false
        },
        mesh: {
            enumerable: true,
            value: mesh,
            writable: false
        }
    });

};

H.TRigidBody.prototype = Object.create( H.RigidBody.prototype );

H.TRigidBody.prototype.applyIntegration = function (data) {
        
        // caso nao possua mesh, nao precisa ajustar valores de exibicao
        if (this.mesh == undefined) {
            return;
        }

        //rb._mesh.position.set(p);
        this.mesh.position.x = this.position.x;
        this.mesh.position.y = this.position.y;
        this.mesh.position.z = this.position.z;

        //tentar setar o orientacao e posicao
        this.mesh.matrix.identity();

        var m = [];
        this.getGLTransform(m);
        m.elements = m; //deixa asim memo
        this.mesh.applyMatrix(m);

        this.mesh.updateMatrix();
        this.mesh.matrix.setPosition(this.position);
}