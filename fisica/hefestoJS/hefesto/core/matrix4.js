H.Matrix4 = function () {

    var data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0];

    Object.defineProperties( this, {
        data: {
            enumerable: true,
            value: data,
            writable: true
        }
    });
}

H.Matrix4.prototype = {
    construtor: H.Matrix4,
    
    getData: function(i) {
        return this.data[i];
    },
    
    setData: function(i, data) {
        this.data[i] = data;
    },

    setDiagonal: function(a, b, c) {
        data[0] = a;
        data[5] = b;
        data[10] = c;
    },

    multMatrix4: function(o) {
        var result = new H.Matrix4();
        result.data[0] = (o.data[0] * this.data[0]) + (o.data[4] * this.data[1]) + (o.data[8] * this.data[2]);
        result.data[4] = (o.data[0] * this.data[4]) + (o.data[4] * this.data[5]) + (o.data[8] * this.data[6]);
        result.data[8] = (o.data[0] * this.data[8]) + (o.data[4] * this.data[9]) + (o.data[8] * this.data[10]);

        result.data[1] = (o.data[1] * this.data[0]) + (o.data[5] * this.data[1]) + (o.data[9] * this.data[2]);
        result.data[5] = (o.data[1] * this.data[4]) + (o.data[5] * this.data[5]) + (o.data[9] * this.data[6]);
        result.data[9] = (o.data[1] * this.data[8]) + (o.data[5] * this.data[9]) + (o.data[9] * this.data[10]);

        result.data[2] = (o.data[2] * this.data[0]) + (o.data[6] * this.data[1]) + (o.data[10] * this.data[2]);
        result.data[6] = (o.data[2] * this.data[4]) + (o.data[6] * this.data[5]) + (o.data[10] * this.data[6]);
        result.data[10] = (o.data[2] * this.data[8]) + (o.data[6] * this.data[9]) + (o.data[10] * this.data[10]);

        result.data[3] = (o.data[3] * this.data[0]) + (o.data[7] * this.data[1]) + (o.data[11] * this.data[2]) + this.data[3];
        result.data[7] = (o.data[3] * this.data[4]) + (o.data[7] * this.data[5]) + (o.data[11] * this.data[6]) + this.data[7];
        result.data[11] = (o.data[3] * this.data[8]) + (o.data[7] * this.data[9]) + (o.data[11] * this.data[10]) + this.data[11];

        return result;
    },

    multVector3: function(vector) {
        return new H.Vector3(
                           vector.getX() * data[0] + 
                           vector.getY() * data[1] + 
                           vector.getZ() * data[2] + data[3],

                           vector.getX() * data[4] + 
                           vector.getY() * data[5] + 
                           vector.getZ() * data[6] + data[7],

                           vector.getX() * data[8] + 
                           vector.getY() * data[9] + 
                           vector.getZ() * data[10] + data[11]);
    },

    transform: function(vector) {
        return multVector3(vector);
    },

    getDeterminant: function() {
        return -data[8] * data[5] * data[2] + data[4] * data[9] * data[2] + data[8] * data[1] * data[6] - data[0] * data[9] * data[6] - data[4] * data[1] * data[10] + data[0] * data[5] * data[10];
    },

    setInverse: function(m) {
        // Make sure the determinant is non-zero.
        var det = getDeterminant();
        if (det == 0) return;
        det = (1.0) / det;

        data[0] = (-m.data[9] * m.data[6] + m.data[5] * m.data[10]) * det;
        data[4] = (m.data[8] * m.data[6] - m.data[4] * m.data[10]) * det;
        data[8] = (-m.data[8] * m.data[5] + m.data[4] * m.data[9]) * det;

        data[1] = (m.data[9] * m.data[2] - m.data[1] * m.data[10]) * det;
        data[5] = (-m.data[8] * m.data[2] + m.data[0] * m.data[10]) * det;
        data[9] = (m.data[8] * m.data[1] - m.data[0] * m.data[9]) * det;

        data[2] = (-m.data[5] * m.data[2] + m.data[1] * m.data[6]) * det;
        data[6] = (+m.data[4] * m.data[2] - m.data[0] * m.data[6]) * det;
        data[10] = (-m.data[4] * m.data[1] + m.data[0] * m.data[5]) * det;

        data[3] = (m.data[9] * m.data[6] * m.data[3] - m.data[5] * m.data[10] * m.data[3] - m.data[9] * m.data[2] * m.data[7] + m.data[1] * m.data[10] * m.data[7] + m.data[5] * m.data[2] * m.data[11] - m.data[1] * m.data[6] * m.data[11]) * det;
        data[7] = (-m.data[8] * m.data[6] * m.data[3] + m.data[4] * m.data[10] * m.data[3] + m.data[8] * m.data[2] * m.data[7] - m.data[0] * m.data[10] * m.data[7] - m.data[4] * m.data[2] * m.data[11] + m.data[0] * m.data[6] * m.data[11]) * det;
        data[11] = (m.data[8] * m.data[5] * m.data[3] - m.data[4] * m.data[9] * m.data[3] - m.data[8] * m.data[1] * m.data[7] + m.data[0] * m.data[9] * m.data[7] + m.data[4] * m.data[1] * m.data[11] - m.data[0] * m.data[5] * m.data[11]) * det;
    },

    inverse: function() {
        var result = new H.Matrix4();
        result.setInverse(this);
        return result;
    },

    invert: function() {
        setInverse(this);
    },

    transformDirection: function(vector) {
        return new H.Vector3(vector.getX() * data[0] + vector.getY() * data[1] + vector.getZ() * data[2],

        vector.getX() * data[4] + vector.getY() * data[5] + vector.getZ() * data[6],

        vector.getX() * data[8] + vector.getY() * data[9] + vector.getZ() * data[10]);
    },

    transformInverseDirection: function(vector) {
        return new H.Vector3(vector.getX() * data[0] + vector.getY() * data[4] + vector.getZ() * data[8],

        vector.getX() * data[1] + vector.getY() * data[5] + vector.getZ() * data[9],

        vector.getX() * data[2] + vector.getY() * data[6] + vector.getZ() * data[10]);
    },

    transformInverse: function(vector) {
        var tmp = vector; //TODO make a copy?
        tmp.setX(tmp.getX() - data[3]);
        tmp.setY(tmp.getY() - data[7]);
        tmp.setZ(tmp.getZ() - data[11]);
        return new H.Vector3(tmp.getX() * data[0] + tmp.getY() * data[4] + tmp.getZ() * data[8],

        tmp.getX() * data[1] + tmp.getY() * data[5] + tmp.getZ() * data[9],

        tmp.getX() * data[2] + tmp.getY() * data[6] + tmp.getZ() * data[10]);
    },

    getAxisVector: function(i) {
        return new H.Vector3().set(this.data[i], this.data[i + 4], this.data[i + 8]);
    },

    setOrientationAndPos: function(q, pos) {
        data[0] = 1 - (2 * q.getJ() * q.getJ() + 2 * q.getK() * q.getK());
        data[1] = 2 * q.getI() * q.getJ() + 2 * q.getK() * q.getR();
        data[2] = 2 * q.getI() * q.getK() - 2 * q.getJ() * q.getR();
        data[3] = pos.getX();

        data[4] = 2 * q.getI() * q.getJ() - 2 * q.getK() * q.getR();
        data[5] = 1 - (2 * q.getI() * q.getI() + 2 * q.getK() * q.getK());
        data[6] = 2 * q.getJ() * q.getK() + 2 * q.getI() * q.getR();
        data[7] = pos.getY();

        data[8] = 2 * q.getI() * q.getK() + 2 * q.getJ() * q.getR();
        data[9] = 2 * q.getJ() * q.getK() - 2 * q.getI() * q.getR();
        data[10] = 1 - (2 * q.getI() * q.getI() + 2 * q.getJ() * q.getJ());
        data[11] = pos.getZ();
    },

    fillGLArray: function(array) {
        array[0] = data[0];
        array[1] = data[4];
        array[2] = data[8];
        array[3] = 0;

        array[4] = data[1];
        array[5] = data[5];
        array[6] = data[9];
        array[7] = 0;

        array[8] = data[2];
        array[9] = data[6];
        array[10] = data[10];
        array[11] = 0;

        array[12] = data[3];
        array[13] = data[7];
        array[14] = data[11];
        array[15] = 1;
    }
}
