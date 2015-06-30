HEFESTO.SMRigidBody = function (mesh) {

	HEFESTO.RigidBody.call( this , mesh);

	
	//variaveis para nivel de aplicação.
	var name = undefined;
	var bodyType = undefined;
	var materialType = undefined;

	Object.defineProperties( this, {
		name: {
			enumerable: true,
			value: name,
			writable: true
		},
		bodyType: {
			enumerable: true,
			value: bodyType,
			writable: true
		},
		materialType: {
			enumerable: true,
			value: materialType,
			writable: true
		},
	});

};

HEFESTO.SimulationManager = function(_canvas) {
	var canvas = _canvas;
	var sb = new HEFESTO.SceneBuilder(canvas);

	var simulation = new HEFESTO.Simulation();
	var timming = new HEFESTO.Timming();

	var bodies = [];
	var collisionDatas = [];
	var collisions = [];
	var forces = [];


	Object.defineProperties( this, {
		simulation: {
			enumerable: true,
			value: simulation,
			writable: false
		},
		timming: {
			enumerable: true,
			value: timming,
			writable: false
		},
		bodies: {
			enumerable: true,
			value: bodies,
			writable: false
		},
		sb: {
			enumerable: true,
			value: sb,
			writable: false
		},
		bodies: {
			enumerable: true,
			value: bodies,
			writable: false
		},
		collisionDatas: {
			enumerable: true,
			value: collisionDatas,
			writable: false
		},
		collisions: {
			enumerable: true,
			value: collisions,
			writable: false
		},
		forces: {
			enumerable: true,
			value: forces,
			writable: false
		}
	});

};

HEFESTO.SimulationManager.prototype = {
	construtor: HEFESTO.SimulationManager,

	initDrawableScene: function() {
		WINDOW.initialize();

		this.sb.init();

		//WINDOW.resizeCallback = function(inWidth, inHeight) { this.sb.resize(inWidth, inHeight); };
		this.sb.resize(WINDOW.ms_Width, WINDOW.ms_Height);
		this.drawableLoop();
	},

	drawableLoop: function() {
		if (this.simulation.isNotInitialized()) {
			var that = this;
			requestAnimationFrame(function () {that.drawableLoop(); });
			this.justDraw();
			this.sb.update();
			this.sb.stats.update();
		}
	},

	justDraw: function() {
		//nothing
	},

	initSimulation: function () {
		if (this.simulation && this.simulation.isNotInitialized()) {
			this.simulation.init();
			this.continueInitilization();
			console.log('asdada');
		}
	},

	continueInitilization: function() {
		if (!this.simulation.isBusy()) {
			this.onInitSimulation();

			this.timming.start();
			this.timming.update();
		    this.mainLoop();
		} else {
			var that = this;
			requestAnimationFrame(function () {that.continueInitilization(); });
		}
	},

	onInitSimulation: function() {
		// nothing
	},

	mainLoop: function() {
		var that = this;
		requestAnimationFrame(function () {that.mainLoop(); });
	    if (!this.simulation.isBusy()) {
			if(play) {
				this.simulation.integrate(this.timming.getLastFrameDuration() * 0.001);
				//this.onIntegrate(); //listener para fazer alguma ação
				if (rb !== undefined && isDesenhaTrajetoria) {
					desenhaTrajetoria(rb);
				}
				for (b in this.bodies){
					var body = this.bodies[b];
					if(body !== undefined) {
						if (body.position.x > 600  || body.position.y < 0 || body.position.x < -300) {
							this.sb.scene.remove(body.mesh);
							this.simulation.removeRigidBody(body);
							this.bodies[b] = undefined;
							//this.bodies.splice(b,1);
							//console.log( this.bodies.indexOf(body));
						}
					}
				}
			}
	    	this.sb.update();
			this.sb.stats.update();
			this.timming.update();
	    }
	},

	onIntegrate: function () {
		// nothing
	},

	addBody: function (body, bind) {
		this.bodies[body.id] = body;
		//console.log($.inArray(body, this.bodies));
		//this.sb.scene.add(body.mesh);
		if (bind) {
			this.simulation.bindRigidBody(body);
			//console.log("Bind Rigid Body");
		}
	},

	getBodyById: function (id) {
		return this.bodies[id];
	},

	addForce: function (force) {
		this.forces[this.forces.length] = force;
		this.simulation.bindForce(force);
	},

	addCollisionData: function (cd) {
		this.collisionDatas[this.collisionDatas.length] = cd;
		this.simulation.bindCollisionData(cd);
	},

	addCollision: function (collision, bind) {
		this.collisions[this.collisions.length] = collision;
		if (bind) {
			this.simulation.bindCollision(collision);
			//console.log("Bind Collision");
		}
	},

	bindAll: function () {
		for (b in this.bodies) {
			var b = this.bodies[b];
			var m = b.materialType;
			b.materialType = null;
			this.simulation.bindRigidBody(b);
			b.materialType = m;
		}
		for (cd in this.collisionDatas) {
			this.simulation.bindCollisionData(this.collisionDatas[cd]);
		}
		for (c in this.collisions) {
			this.simulation.bindCollision(this.collisions[c]);
		}
		for (f in this.forces) {
			this.simulation.bindForce(this.forces[f]);
		}
	}


};