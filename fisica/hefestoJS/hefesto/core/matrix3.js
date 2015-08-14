H.Matrix3 = function (q) {

    var r = q ? q.r : 1;

    var data = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    Object.defineProperties( this, {
        data: {
            enumerable: true,
            value: data,
            writable: false
        }
    });
}

H.Matrix3.prototype = {
    construtor: H.Matrix3,

    set: function(compOne, compTwo, compThree) {
        setComponents(compOne, compTwo, compThree);
    },

    setValues: function(c0, c1, c2, c3, c4, c5, c6, c7, c8) {
        this.data[0] = c0;
        this.data[1] = c1;
        this.data[2] = c2;
        this.data[3] = c3;
        this.data[4] = c4;
        this.data[5] = c5;
        this.data[6] = c6;
        this.data[7] = c7;
        this.data[8] = c8;
    },

    setMatrix: function(m) {
        this.data[0] = m.getData(0);
        this.data[1] = m.getData(1);
        this.data[2] = m.getData(2);
        this.data[3] = m.getData(3);
        this.data[4] = m.getData(4);
        this.data[5] = m.getData(5);
        this.data[6] = m.getData(6);
        this.data[7] = m.getData(7);
        this.data[8] = m.getData(8);
    },
    
    getData: function(i) {
        return this.data[i];
    },
    
    setData: function(i, data) {
        this.data[i] = data;
    },

    setDiagonal: function(a, b, c) {
        setInertiaTensorCoeffs(a, b, c);
    },

    setInertiaTensorCoeffs: function(ix, iy, iz) {
        setInertiaTensorCoeffs(ix, iy, iz, 0, 0, 0);
    },

    setInertiaTensorCoeffs: function(ix, iy, iz, ixy, ixz, iyz) {
        data[0] = ix;
        data[1] = data[3] = -ixy;
        data[2] = data[6] = -ixz;
        data[4] = iy;
        data[5] = data[7] = -iyz;
        data[8] = iz;
    },

    setBlockInertiaTensor: function(halfSizes, mass) {
        var squares = halfSizes.componentProduct(halfSizes);
        setInertiaTensorCoeffs(0.3 * mass * (squares.y + squares.z), 
                               0.3 * mass * (squares.x + squares.z), 
                               0.3 * mass * (squares.x + squares.y));
    },

    setSkewSymmetric: function(vector) {
        this.data[0] = this.data[4] = this.data[8] = 0;
        this.data[1] = -vector.z;
        this.data[2] = vector.y;
        this.data[3] = vector.z;
        this.data[5] = -vector.x;
        this.data[6] = -vector.y;
        this.data[7] = vector.x;
    },

    setComponents: function(compOne, compTwo, compThree) {
        this.data[0] = compOne.x;
        this.data[1] = compTwo.x;
        this.data[2] = compThree.x;
        this.data[3] = compOne.y;
        this.data[4] = compTwo.y;
        this.data[5] = compThree.y;
        this.data[6] = compOne.z;
        this.data[7] = compTwo.z;
        this.data[8] = compThree.z;
    },

    multVector: function(vector) {
        var v = new H.Vector3();
        v.x = vector.x * this.data[0] + vector.y * this.data[1] + vector.z * this.data[2];
        v.y = vector.x * this.data[3] + vector.y * this.data[4] + vector.z * this.data[5];
        v.z = vector.x * this.data[6] + vector.y * this.data[7] + vector.z * this.data[8];
        return v;
    },

    transform: function(vector) {
        return this.multVector(vector);
    },

    transformTranspose: function(vector) {
        var v = new H.Vector3();
        v.x = vector.x * this.data[0] + vector.y * this.data[3] + vector.z * this.data[6];
        v.y = vector.x * this.data[1] + vector.y * this.data[4] + vector.z * this.data[7];
        v.z = vector.x * this.data[2] + vector.y * this.data[5] + vector.z * this.data[8];
        return v;
    },

    getRowVector: function(i) {
        return new H.Vector3(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]);
    },

    getAxisVector: function(i) {
        return new H.Vector3(data[i], data[i + 3], data[i + 6]);
    },

    setInverse: function(m) {
        var t4 = m.data[0] * m.data[4];
        var t6 = m.data[0] * m.data[5];
        var t8 = m.data[1] * m.data[3];
        var t10 = m.data[2] * m.data[3];
        var t12 = m.data[1] * m.data[6];
        var t14 = m.data[2] * m.data[6];

        // Calculate the determinant
        var t16 = (t4 * m.data[8] - t6 * m.data[7] - t8 * m.data[8] + t10 * m.data[7] + t12 * m.data[5] - t14 * m.data[4]);

        // Make sure the determinant is non-zero.
        if (t16 == 0.0) return;
        var t17 = 1 / t16;

        this.data[0] = (m.data[4] * m.data[8] - m.data[5] * m.data[7]) * t17;
        this.data[1] = -(m.data[1] * m.data[8] - m.data[2] * m.data[7]) * t17;
        this.data[2] = (m.data[1] * m.data[5] - m.data[2] * m.data[4]) * t17;
        this.data[3] = -(m.data[3] * m.data[8] - m.data[5] * m.data[6]) * t17;
        this.data[4] = (m.data[0] * m.data[8] - t14) * t17;
        this.data[5] = -(t6 - t10) * t17;
        this.data[6] = (m.data[3] * m.data[7] - m.data[4] * m.data[6]) * t17;
        this.data[7] = -(m.data[0] * m.data[7] - t12) * t17;
        this.data[8] = (t4 - t8) * t17;
    },

    inverse: function() {
        var result = new H.Matrix3();
        result.setInverse(this);
        return result;
    },

    invert: function() {
        setInverse(this);
    },

    setTranspose: function(m) {
        this.data[0] = m.data[0];
        this.data[1] = m.data[3];
        this.data[2] = m.data[6];
        this.data[3] = m.data[1];
        this.data[4] = m.data[4];
        this.data[5] = m.data[7];
        this.data[6] = m.data[2];
        this.data[7] = m.data[5];
        this.data[8] = m.data[8];
    },

    transpose: function() {
        var result = new H.Matrix3();
        result.setTranspose(this);
        return result;
    },

    multMatrix: function(o) {
        return new H.Matrix3(
                           this.data[0] * o.data[0] + this.data[1] * o.data[3] + this.data[2] * o.data[6], 
                           this.data[0] * o.data[1] + this.data[1] * o.data[4] + this.data[2] * o.data[7], 
                           this.data[0] * o.data[2] + this.data[1] * o.data[5] + this.data[2] * o.data[8],

                           this.data[3] * o.data[0] + this.data[4] * o.data[3] + this.data[5] * o.data[6],
                           this.data[3] * o.data[1] + this.data[4] * o.data[4] + this.data[5] * o.data[7],
                           this.data[3] * o.data[2] + this.data[4] * o.data[5] + this.data[5] * o.data[8],

                           this.data[6] * o.data[0] + this.data[7] * o.data[3] + this.data[8] * o.data[6],
                           this.data[6] * o.data[1] + this.data[7] * o.data[4] + this.data[8] * o.data[7],
                           this.data[6] * o.data[2] + this.data[7] * o.data[5] + this.data[8] * o.data[8]);
    },

    multToMeMatrix: function(o) {
        var t1;
        var t2;
        var t3;

        t1 = this.data[0] * o.data[0] + this.data[1] * o.data[3] + this.data[2] * o.data[6];
        t2 = this.data[0] * o.data[1] + this.data[1] * o.data[4] + this.data[2] * o.data[7];
        t3 = this.data[0] * o.data[2] + this.data[1] * o.data[5] + this.data[2] * o.data[8];
        this.data[0] = t1;
        this.data[1] = t2;
        this.data[2] = t3;

        t1 = this.data[3] * o.data[0] + this.data[4] * o.data[3] + this.data[5] * o.data[6];
        t2 = this.data[3] * o.data[1] + this.data[4] * o.data[4] + this.data[5] * o.data[7];
        t3 = this.data[3] * o.data[2] + this.data[4] * o.data[5] + this.data[5] * o.data[8];
        this.data[3] = t1;
        this.data[4] = t2;
        this.data[5] = t3;

        t1 = this.data[6] * o.data[0] + this.data[7] * o.data[3] + this.data[8] * o.data[6];
        t2 = this.data[6] * o.data[1] + this.data[7] * o.data[4] + this.data[8] * o.data[7];
        t3 = this.data[6] * o.data[2] + this.data[7] * o.data[5] + this.data[8] * o.data[8];
        this.data[6] = t1;
        this.data[7] = t2;
        this.data[8] = t3;
    },

    multToMeScalar: function(scalar) {
        this.data[0] *= scalar;
        this.data[1] *= scalar;
        this.data[2] *= scalar;
        this.data[3] *= scalar;
        this.data[4] *= scalar;
        this.data[5] *= scalar;
        this.data[6] *= scalar;
        this.data[7] *= scalar;
        this.data[8] *= scalar;
    },

    sumToMe: function(o) {
        data[0] += o.data[0];
        data[1] += o.data[1];
        data[2] += o.data[2];
        data[3] += o.data[3];
        data[4] += o.data[4];
        data[5] += o.data[5];
        data[6] += o.data[6];
        data[7] += o.data[7];
        data[8] += o.data[8];
    },

    setOrientation: function(q) {
        data[0] = 1 - (2 * q.getJ() * q.getJ() + 2 * q.getK() * q.getK());
        data[1] = 2 * q.getI() * q.getJ() + 2 * q.getK() * q.getR();
        data[2] = 2 * q.getI() * q.getK() - 2 * q.getJ() * q.getR();
        data[3] = 2 * q.getI() * q.getJ() - 2 * q.getK() * q.getR();
        data[4] = 1 - (2 * q.getI() * q.getI() + 2 * q.getK() * q.getK());
        data[5] = 2 * q.getJ() * q.getK() + 2 * q.getI() * q.getR();
        data[6] = 2 * q.getI() * q.getK() + 2 * q.getJ() * q.getR();
        data[7] = 2 * q.getJ() * q.getK() - 2 * q.getI() * q.getR();
        data[8] = 1 - (2 * q.getI() * q.getI() + 2 * q.getJ() * q.getJ());
    },

    linearInterpolate: function(a, b, prop) {
        var result = new H.Matrix3();
        for (i = 0; i < 9; i++) {
            result.data[i] = a.data[i] * (1 - prop) + b.data[i] * prop;
        }
        return result;
    }
};
