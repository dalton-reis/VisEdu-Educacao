H.CollisionDetector = {};


    // Go through each combination of + and - for each half-size
H.CollisionDetector.mults = [ [ 1, 1, 1 ],   [ -1, 1, 1 ], [ 1, -1, 1 ], 
                              [ -1, -1, 1 ], [ 1, 1, -1 ], [ -1, 1, -1 ], 
                              [ 1, -1, -1 ], [ -1, -1, -1 ] ];

H.CollisionDetector.sphereAndHalfSpace = function( sphere, plane, data ) {
    // Make sure we have contacts
    if (!data.hasMoreContacts()) {
        return 0;
    }

    // Cache the sphere position
    var position = sphere.getAxis(3);

    // Find the distance from the plane
    var ballDistance = plane.getDirection().multVector(position) - sphere.radius - plane.offset;

    if (ballDistance >= 0) return 0;

    // Create the contact - it has a normal in the plane direction.
    var contact = new H.Contact();
    contact.setContactNormal(plane.direction);
    contact.setPenetration(-ballDistance);
    contact.setContactPoint(position.sub(plane.direction.mult(ballDistance + sphere.radius)));
    contact.setBodyData(sphere.body, null, data.friction, data.restitution);

    data.addContact(contact);
    sphere.bindContact(contact);
    return 1;
};


    H.CollisionDetector.sphereAndTruePlane = function( sphere, plane, data ) {
        // Make sure we have contacts
        if (!data.hasMoreContacts()) {
            return 0;
        }

        // Cache the sphere position
        var position = sphere.getAxis(3);

        // Find the distance from the plane
        var centreDistance = plane.direction.multVector(position) - plane.offset;

        // Check if we're within radius
        if (centreDistance * centreDistance > sphere.radius * sphere.radius) {
            return 0;
        }

        // Check which side of the plane we're on
        var normal = plane.direction;
        var penetration = -centreDistance;
        if (centreDistance < 0) {
            normal.multToMe(-1);
            penetration = -penetration;
        }
        penetration += sphere.radius;

        // Create the contact - it has a normal in the plane direction.
        var contact = new H.Contact();
        contact.contactNormal = normal;
        contact.penetration = penetration;
        contact.contactPoint = position.sub(plane.direction.multNumber(centreDistance));
        contact.setBodyData(sphere.body, null, data.friction, data.restitution);

        data.addContact(contact);
        sphere.bindContact(contact);
        return 1;
    }