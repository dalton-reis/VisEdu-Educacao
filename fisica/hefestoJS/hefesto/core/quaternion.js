H.Quaternion = function (q) {

    var r = q != undefined ? q.r : 1;
    var i = q != undefined ? q.i : 0;
    var j = q != undefined ? q.j : 0;
    var k = q != undefined ? q.k : 0;

    Object.defineProperties( this, {
        r: {
            enumerable: true,
            value: r,
            writable: true
        },
        i: {
            enumerable: true,
            value: i,
            writable: true
        },
        j: {
            enumerable: true,
            value: j,
            writable: true
        },
        k: {
            enumerable: true,
            value: k,
            writable: true
        }
    });
}

H.Quaternion.prototype = {
    construtor: H.Quaternion,

    normalise: function() {
        var d = r * r + i * i + j * j + k * k;

        if (d < 0) {
            r = 1;
            return;
        }

        d = (1.0) / Math.sqrt(d);
        r *= d;
        i *= d;
        j *= d;
        k *= d;
    },

    multToMe: function(multiplier) {
        var q = new H.Quaternion(this);
        r = q.r * multiplier.r - q.i * multiplier.i - q.j * multiplier.j - q.k * multiplier.k;
        i = q.r * multiplier.i + q.i * multiplier.r + q.j * multiplier.k - q.k * multiplier.j;
        j = q.r * multiplier.j + q.j * multiplier.r + q.k * multiplier.i - q.i * multiplier.k;
        k = q.r * multiplier.k + q.k * multiplier.r + q.i * multiplier.j - q.j * multiplier.i;
    },

    addScaledVector: function(vector, scale) {
        var q = new H.Quaternion();
        q.r = 0;
        q.i = vector.x * scale;
        q.j = vector.x * scale;
        q.k = vector.z * scale;
        q.multToMe(this);
        this.r += q.r * (0.5);
        this.i += q.i * (0.5);
        this.j += q.j * (0.5);
        this.k += q.k * (0.5);
    },

    rotateByVector: function(vector) {
        var q = new H.Quaternion(0, vector.getX(), vector.getY(), vector.getZ());
        multToMe(q);
    }
};