/**
 * Definição para força.
 * 
 * @author teixeira
 */
H.Force = function () {
   // just define
};


H.Force.prototype = {
	construtor: H.Force,

	/**
     * Aplica força sobre o corpo.
     * 
     * @param body corpo sobre qual a força deve ser aplicada.
     * 
     * @param duration delta T.
     */
    updateForce: function (body, duration) {
    	throw "Must be implemented."
    }
};


H.Gravity = function (_gravity) {

	H.Force.call( this );

    var id = H.guid();

	var gravity = _gravity;

	Object.defineProperties( this, {
        id: {
            enumerable: true,
            value: id,
            writable: false
        },
		gravity: {
			enumerable: true,
			value: gravity,
			writable: false
		}
	});

};

H.Gravity.prototype = Object.create( H.Force.prototype );

H.Gravity.prototype.updateForce = function(body, duration) {
	// Check that we do not have infinite mass
    if (!body.hasFiniteMass()) {
        return;
    }

    // Apply the mass-scaled force to the body
    body.addForce(this.gravity.multNumber(body.mass));
}
