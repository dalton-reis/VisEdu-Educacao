var HUtils = { REVISION: '1'};

HUtils.checkInverseInertiaTensor = function(it) {
    //
};

HUtils.transformInertiaTensor = function(iitWorld, q, iitBody, rotmat) {
    var t4 = rotmat.getData(0) * iitBody.getData(0) + rotmat.getData(1) * iitBody.getData(3) + rotmat.getData(2) * iitBody.getData(6);
    var t9 = rotmat.getData(0) * iitBody.getData(1) + rotmat.getData(1) * iitBody.getData(4) + rotmat.getData(2) * iitBody.getData(7);
    var t14 = rotmat.getData(0) * iitBody.getData(2) + rotmat.getData(1) * iitBody.getData(5) + rotmat.getData(2) * iitBody.getData(8);
    var t28 = rotmat.getData(4) * iitBody.getData(0) + rotmat.getData(5) * iitBody.getData(3) + rotmat.getData(6) * iitBody.getData(6);
    var t33 = rotmat.getData(4) * iitBody.getData(1) + rotmat.getData(5) * iitBody.getData(4) + rotmat.getData(6) * iitBody.getData(7);
    var t38 = rotmat.getData(4) * iitBody.getData(2) + rotmat.getData(5) * iitBody.getData(5) + rotmat.getData(6) * iitBody.getData(8);
    var t52 = rotmat.getData(8) * iitBody.getData(0) + rotmat.getData(9) * iitBody.getData(3) + rotmat.getData(10) * iitBody.getData(6);
    var t57 = rotmat.getData(8) * iitBody.getData(1) + rotmat.getData(9) * iitBody.getData(4) + rotmat.getData(10) * iitBody.getData(7);
    var t62 = rotmat.getData(8) * iitBody.getData(2) + rotmat.getData(9) * iitBody.getData(5) + rotmat.getData(10) * iitBody.getData(8);

    iitWorld.setData(0, t4 * rotmat.getData(0) + t9 * rotmat.getData(1) + t14 * rotmat.getData(2));
    iitWorld.setData(1, t4 * rotmat.getData(4) + t9 * rotmat.getData(5) + t14 * rotmat.getData(6));
    iitWorld.setData(2, t4 * rotmat.getData(8) + t9 * rotmat.getData(9) + t14 * rotmat.getData(10));
    iitWorld.setData(3, t28 * rotmat.getData(0) + t33 * rotmat.getData(1) + t38 * rotmat.getData(2));
    iitWorld.setData(4, t28 * rotmat.getData(4) + t33 * rotmat.getData(5) + t38 * rotmat.getData(6));
    iitWorld.setData(5, t28 * rotmat.getData(8) + t33 * rotmat.getData(9) + t38 * rotmat.getData(10));
    iitWorld.setData(6, t52 * rotmat.getData(0) + t57 * rotmat.getData(1) + t62 * rotmat.getData(2));
    iitWorld.setData(7, t52 * rotmat.getData(4) + t57 * rotmat.getData(5) + t62 * rotmat.getData(6));
    iitWorld.setData(8, t52 * rotmat.getData(8) + t57 * rotmat.getData(9) + t62 * rotmat.getData(10));
};

HUtils.calculateTransformMatrix = function(transformMatrix, position, orientation) {
    transformMatrix.setData(0, 1 - 2 * orientation.j * orientation.j - 2 * orientation.k * orientation.k);
    transformMatrix.setData(1, 2 * orientation.i * orientation.j - 2 * orientation.r * orientation.k);
    transformMatrix.setData(2, 2 * orientation.i * orientation.k + 2 * orientation.r * orientation.j);
    transformMatrix.setData(3, position.x);

    transformMatrix.setData(4, 2 * orientation.i * orientation.j + 2 * orientation.r * orientation.k);
    transformMatrix.setData(5, 1 - 2 * orientation.i * orientation.i - 2 * orientation.k * orientation.k);
    transformMatrix.setData(6, 2 * orientation.j * orientation.k - 2 * orientation.r * orientation.i);
    transformMatrix.setData(7, position.y);

    transformMatrix.setData(8, 2 * orientation.i * orientation.k - 2 * orientation.r * orientation.j);
    transformMatrix.setData(9, 2 * orientation.j * orientation.k + 2 * orientation.r * orientation.i);
    transformMatrix.setData(10, 1 - 2 * orientation.i * orientation.i - 2 * orientation.j * orientation.j);
    transformMatrix.setData(11, position.z);
};