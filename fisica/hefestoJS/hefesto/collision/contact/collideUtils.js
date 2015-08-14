H.CollideUtils = {};

H.CollideUtils.transformToAxis = function( box,  axis) {
    return box.halfSize.x * Math.abs(axis.mult(box.getAxis(0))) //
           + box.halfSize.y * Math.abs(axis.mult(box.getAxis(1))) //
           + box.halfSize.z * Math.abs(axis.mult(box.getAxis(2)));
};

/**
 * This function checks if the two boxes overlap
 * along the given axis. The final parameter toCentre
 * is used to pass in the vector between the boxes centre
 * points, to avoid having to recalculate it each time.
 */
H.CollideUtils.overlapOnAxis = function( one, two, axis, toCentre ) {
    // Project the half-size of one onto axis
    var oneProject = H.CollideUtils.transformToAxis(one, axis);
    var twoProject = H.CollideUtils.transformToAxis(two, axis);

    // Project this onto the axis
    var distance = Math.abs(toCentre.mult(axis));

    // Check for overlap
    return (distance < oneProject + twoProject);
};

    /*
 * This function checks if the two boxes overlap
 * along the given axis, returning the ammount of overlap.
 * The final parameter toCentre
 * is used to pass in the vector between the boxes centre
 * points, to avoid having to recalculate it each time.
 */
H.CollideUtils.penetrationOnAxis = function( one, two, axis, toCentre ) {
    // Project the half-size of one onto axis
    var oneProject = H.CollideUtils.transformToAxis(one, axis);
    var twoProject = H.CollideUtils.transformToAxis(two, axis);

    // Project this onto the axis
    var distance = Math.abs(toCentre.mult(axis));

    // Return the overlap (i.e. positive indicates
    // overlap, negative indicates separation).
    return oneProject + twoProject - distance;
};

H.CollideUtils.tryAxis = function( one, two, axis, toCentre, index, /* These values may be updated */ smallestPenetration, smallestCase) {
    // Make sure we have a normalized axis, and don't check almost parallel axes
    if (axis.squareMagnitude() < 0.0001) return true;
    axis.normalise();

    var penetration = penetrationOnAxis(one, two, axis, toCentre);

    if (penetration < 0) return false;
    if (penetration < smallestPenetration.get()) {
        smallestPenetration.set(penetration);
        smallestCase.set(index);
    }
    return true;
};

H.CollideUtils.fillPointFaceBoxBox = function( one, two, toCentre, data, best, pen ) {
    // This method is called when we know that a vertex from
    // box two is in contact with box one.


    // We know which axis the collision is on (i.e. best),
    // but we need to work out which of the two faces on
    // this axis.
    var normal = one.getAxis(best);
    if (one.getAxis(best).mult(toCentre) > 0) {
        normal = normal.mult(-1.0);
    }

    // Work out which vertex of box two we're colliding with.
    // Using toCentre doesn't work!
    var vertex = new Vector3(two.getHalfSize());
    if (two.getAxis(0).mult(normal) < 0) vertex.x = -vertex.getX();
    if (two.getAxis(1).mult(normal) < 0) vertex.setY(-vertex.getY());
    if (two.getAxis(2).mult(normal) < 0) vertex.setZ(-vertex.getZ());

    // Create the contact data
    var contact = new H.Contact();

    contact.contactNormal = normal;
    contact.penetration = pen;
    contact.contactPoint = two.transform.mult(vertex);
    contact.setBodyData(one.getBody(), two.getBody(), data.getFriction(), data.getRestitution());
    return contact;
};

H.CollideUtils.contactPoint = function( pOne,  dOne, oneSize, pTwo, dTwo, twoSize, useOne) {
    // If this is true, and the contact point is outside
    // the edge (in the case of an edge-face contact) then
    // we use one's midpoint, otherwise we use two's.

    var toSt, cOne, cTwo;
    var dpStaOne, dpStaTwo, dpOneTwo, smOne, smTwo;
    var denom, mua, mub;

    smOne = dOne.squareMagnitude();
    smTwo = dTwo.squareMagnitude();
    dpOneTwo = dTwo.mult(dOne);

    toSt = pOne.sub(pTwo);
    dpStaOne = dOne.mult(toSt);
    dpStaTwo = dTwo.mult(toSt);

    denom = smOne * smTwo - dpOneTwo * dpOneTwo;

    // Zero denominator indicates parrallel lines
    if (Math.abs(denom) < 0.0001) {
        return useOne ? pOne : pTwo;
    }

    mua = (dpOneTwo * dpStaTwo - smTwo * dpStaOne) / denom;
    mub = (smOne * dpStaTwo - dpOneTwo * dpStaOne) / denom;

    // If either of the edges has the nearest point out
    // of bounds, then the edges aren't crossed, we have
    // an edge-face contact. Our point is on the edge, which
    // we know from the useOne parameter.
    if (mua > oneSize || mua < -oneSize || mub > twoSize || mub < -twoSize) {
        return useOne ? pOne : pTwo;
    }
    cOne = pOne.sum(dOne.mult(mua));
    cTwo = pTwo.sum(dTwo.mult(mub));

    return cOne.mult(0.5).sum(cTwo.mult(0.5));
};