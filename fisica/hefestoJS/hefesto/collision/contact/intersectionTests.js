H.IntersectionTests = {};

H.IntersectionTests.sphereAndHalfSpace = function( sphere, plane ) {
    // Find the distance from the origin
    var ballDistance = plane.direction.mult(sphere.getAxis(3)) - sphere.radius;

    // Check for the intersection
    return ballDistance <= plane.offset;
};

H.IntersectionTests.sphereAndSphere = function( one, two ) {
    // Find the vector between the objects
    var midline = one.getAxis(3).sub(two.getAxis(3));

    // See if it is large enough.
    return midline.squareMagnitude() < (one.radius + two.radius) * (one.radius + two.radius);
};

H.IntersectionTests.boxAndBox = function( one, two ) {
    // Find the vector between the two centres
    var toCentre = two.getAxis(3).sub(one.getAxis(3));
    return (
    // Check on box one's axes first
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(0), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(1), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(2), toCentre) && //

    // And on two's
    H.CollideUtils.overlapOnAxis(one, two, two.getAxis(0), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, two.getAxis(1), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, two.getAxis(2), toCentre) && //

    // Now on the cross products
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(0).rest(two.getAxis(0)), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(0).rest(two.getAxis(1)), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(0).rest(two.getAxis(2)), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(1).rest(two.getAxis(0)), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(1).rest(two.getAxis(1)), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(1).rest(two.getAxis(2)), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(2).rest(two.getAxis(0)), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(2).rest(two.getAxis(1)), toCentre) && //
    H.CollideUtils.overlapOnAxis(one, two, one.getAxis(2).rest(two.getAxis(2)), toCentre));
};

/**
 * Does an intersection test on an arbitrarily aligned box and a
 * half-space.
 * 
 * The box is given as a transform matrix, including
 * position, and a vector of half-sizes for the extend of the
 * box along each local axis.
 * 
 * The half-space is given as a direction (i.e. unit) vector and the
 * offset of the limiting plane from the origin, along the given
 * direction.
 */
H.IntersectionTests.boxAndHalfSpace = function( box, plane ) {
    // Work out the projected radius of the box onto the plane direction
    var projectedRadius = H.CollideUtils.transformToAxis(box, plane.direction);

    // Work out how far the box is from the origin
    var boxDistance = plane.direction.mult(box.getAxis(3)) - projectedRadius;

    // Check for the intersection
    return boxDistance <= plane.offset;
};