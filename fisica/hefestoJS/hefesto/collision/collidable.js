/** Representation of a collidable body. */
H.ContactListener = function (b, o) {
}

H.ContactListener.prototype = {
    construtor: H.ContactListener,

    bindContact: function( contact ) {
    }
};

/** Representation of a collidable body. */
H.CollidableBody = function (b, o) {

    H.ContactListener.call( this );

    var body = b ? b : undefined;
    var offset = o ? o : new H.Matrix4();
    var transform = new H.Matrix4();

    Object.defineProperties( this, {
        body: {
            enumerable: true,
            value: body,
            writable: true
        },
        offset: {
            enumerable: true,
            value: offset,
            writable: true
        },
        transform: {
            enumerable: true,
            value: transform,
            writable: true
        }
    });
}

H.CollidableBody.prototype = Object.create( H.ContactListener.prototype );

H.CollidableBody.prototype.calculateInternals = function( ) {
    this.transform = this.body.transformMatrix.multMatrix4(this.offset);
};

H.CollidableBody.prototype.getAxis = function( i ) {
    return this.transform.getAxisVector(i);
};

H.CollisionBox = function ( b, hs, o ) {

    H.CollidableBody.call( this, b, o );

    var halfSize = hs ? hs : new H.Vector3();

    Object.defineProperties( this, {
        halfSize: {
            enumerable: true,
            value: halfSize,
            writable: true
        }
    });
};
H.CollisionBox.prototype = Object.create( H.CollidableBody.prototype );

H.CollisionSphere = function ( b, r, o ) {

    H.CollidableBody.call( this, b, o);

    var radius = r ? r : 0;

    Object.defineProperties( this, {
        radius: {
            enumerable: true,
            value: radius,
            writable: true
        }
    });
};
H.CollisionSphere.prototype = Object.create( H.CollidableBody.prototype );

H.CollisionPlane = function ( d, o ) {

    H.CollidableBody.call( this );

    var direction = d ? d : new H.Vector3();
    var offset = o ? o : 0;
    

    Object.defineProperties( this, {
        direction: {
            enumerable: true,
            value: direction,
            writable: true
        },
        offset: {
            enumerable: true,
            value: offset,
            writable: true
        }
    });
};
H.CollisionPlane.prototype = Object.create( H.CollidableBody.prototype );