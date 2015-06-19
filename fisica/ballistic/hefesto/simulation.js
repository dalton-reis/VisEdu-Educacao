/** 

 * Tipos de comandos para o servidor.
 */
HEFESTO.CommandType = {
	/** Gera um novo corpo rigido */
	NEW_SIMULATION: "NEW_SIMULATION",

    /** Gera um novo corpo rigido */
    BIND_RIGID_BODY: "BIND_RIGID_BODY",
    /** Remove um novo corpo rigido */
    REMOVE_RIGID_BODY: "REMOVE_RIGID_BODY",
    /** Adiciona força para em um corpo rigido */
    ADD_FORCE_TO_RIGID_BODY: "ADD_FORCE_TO_RIGID_BODY",

    /** Gera uma nova particula */
    BIND_PARTICLE: "BIND_PARTICLE",

    	/** Gera uma nova força */
	BIND_FORCE: "BIND_FORCE",
	/** Adiciona uma força a um corpo */
	ADD_FORCE_TO_BODY: "ADD_FORCE_TO_BODY",
	/** REmove uma forca */
	REMOVE_FORCE: "REMOVE_FORCE",

    /** Gera uma nova collisao */
    BIND_COLLISION: "BIND_COLLISION",
    /** Remove uma nova collisao */
    REMOVE_COLLISION: "REMOVE_COLLISION",
    /** Gera novos dados de collisao */
    BIND_COLLISION_DATA: "BIND_COLLISION_DATA",

    /** Altera o status da collisao */
    CHANGE_COLLISION_STATE: "CHANGE_COLLISION_STATE",

    /** Integrate */
    INTEGRATE: "INTEGRATE",
    /** Obtem as informacoes de um corpo rigido */
    GET_RIGID_BODY_DATA: "GET_RIGID_BODY_DATA"
};

/**
 * Objeto de simulação de física newtoniana em 3D.
 */
HEFESTO.Simulation = function () {

	this._simulationId = -1;
	this._active = false;
	this._simulationWS = new HEFESTO.SimulationWS(this);

	// array de corpos rígidos
	this._rigidBodys = [];
	this.rigidBodyCount = 0;
	// array de partículas
	this.particles = [];
	// array de forcas
	this._forces = [];
	// array de colisões
	this._collisions = [];
	// array de dados de colisão
	this._collisionDatas = [];

	// flag to bind contacts
	this._contactListener = undefined;
	// flag to bind rigid body data
	this._rigidBodyDataListener = undefined;
};

/**
 * Definições do objeto de simulação.
 */
HEFESTO.Simulation.prototype = {
	constructor : HEFESTO.Simulation,

	get contactListener () {
		return this._contactListener;
	},

	set contactListener (value) {
		this._contactListener = value;
	},

	get rigidBodyDataListener () {
		return this._rigidBodyDataListener;
	},

	set rigidBodyDataListener (value) {
		this._rigidBodyDataListener = value;
	},

	/**
	 * Faz o 'bind' do corpo rídido no servidor.
	 */
	init: function () {
		this._simulationWS.init();
		this._simulationId = 0;
	},

	/** 
	* Verifica se a inicialização da simulação não foi executada.
	*/
	isNotInitialized: function() {
		return this._simulationId == -1;
	},

	/**
	 * Faz o 'bind' do corpo rídido no servidor.
	 */
	bindRigidBody: function (body) {
		var mesh = body.mesh;
		body.mesh = undefined;
		try {
			this._simulationWS.sendMessage(HEFESTO.CommandType.BIND_RIGID_BODY, body);
		} finally {
			body.mesh = mesh;
		}

		this._rigidBodys[body.id] = body;	
		this.rigidBodyCount++;
	},

	/**
	 * Faz o 'bind' da partícula no servidor.
	 */
	bindParticle: function (particle) {
		this._simulationWS.sendMessage(HEFESTO.CommandType.BIND_PARTICLE, particle);

		this._particles[particle.id] = particle;
	},

	/**
	 * Faz o 'bind' da força no servidor.
	 */
	bindForce: function (force) {
		this._simulationWS.sendMessage(HEFESTO.CommandType.BIND_FORCE, force);
		
		this._forces[force.id] = force;
	},

	/**
	 * Faz o 'bind' da força para um corpo no servidor.
	 */
	addForceToBody: function (force, body) {
		var data = {};
		data['force'] = force.id;
		data['body'] = body.id;

		this._simulationWS.sendMessage(HEFESTO.CommandType.ADD_FORCE_TO_BODY, data);
	},

	/**
	 * Faz o 'bind' da colisão no servidor.
	 */
	bindCollision: function (collision) {
		this._simulationWS.sendMessage(HEFESTO.CommandType.BIND_COLLISION, collision);
		
		this._collisions[collision.id] = collision;
	},

	/**
	 * Faz o 'bind' dos dados de colisão no servidor.
	 */
	bindCollisionData: function (data) {
		this._simulationWS.sendMessage(HEFESTO.CommandType.BIND_COLLISION_DATA, data);
		
		this._collisionDatas[data.id] = data;
	},
	
	/**
	 * Remove o corpo no servidor.
	 */
	removeRigidBody:  function (body) {
		var data = {};
		data['id'] = body.id;

		this._simulationWS.sendMessage(HEFESTO.CommandType.REMOVE_RIGID_BODY, data);
	},

	addForceToRigidBody: function(body, force) {
		var data = {};
		data['body'] = body.id;
		data['force'] = force;

		this._simulationWS.sendMessage(HEFESTO.CommandType.ADD_FORCE_TO_RIGID_BODY, data);
	},

	removeParticle:  function (particle) {

	},

	/**
	 * Remove a colisão no servidor.
	 */
	removeForce:  function (force) {
		var data = {};
		data['force'] = force.id;

		this._simulationWS.sendMessage(HEFESTO.CommandType.REMOVE_FORCE, data);
		
		this._forces[force.id] = undefined;	
	},
	/**
	 * Remove a colisão no servidor.
	 */
	removeCollision:  function (collision) {
		var data = {};
		msg['id'] = collision.id;

		this._simulationWS.sendMessage(HEFESTO.CommandType.REMOVE_COLLISION, data);
		
		this._collisions[collision.id] = undefined;	
	},

	/**
	 * Faz a integração com os objetos físicos.
	 */
	integrate: function (duration) {
		if (this.rigidBodyCount > 0) {
			var data = {
				'duration' : duration
			};
			this._simulationWS.sendMessage(HEFESTO.CommandType.INTEGRATE, data);
		}
	},

	/**
	 * Obtem as informacoes de um corpo rigido.
	 */
	getRigidBodyData: function (body) {
		var data = {
			'body' : body
		};
		this._simulationWS.sendMessage(HEFESTO.CommandType.GET_RIGID_BODY_DATA, data);
	},

	/**
	 * Altera o status da colisão.
	 */
	changeCollisionState: function (collision, state) {
		var data = {
			'id' : collision.id,
			'state' : state
		};
		this._simulationWS.sendMessage(HEFESTO.CommandType.CHANGE_COLLISION_STATE, data);
	},

	/**
	 * Verifica se está aguardando alguma mensagem ser processada.
	 */
	isBusy: function () {
		return !this._active | (this._active & this._simulationWS.isWaitingMessage());
	},

	/**
	 * Processa retorna de mensagem do servidor.
	 */
	onmessage: function (type, data) {
		if (type == HEFESTO.CommandType.NEW_SIMULATION) {
			this._simulationId = data.id;
			this._active = true;
		} else if (type == HEFESTO.CommandType.BIND_RIGID_BODY) {
			log('RigidBody successfully added.');
		} else if(type == HEFESTO.CommandType.REMOVE_RIGID_BODY) {
			this._rigidBodys[data.id] = undefined;	
			this.rigidBodyCount--;
			log('RigidBody successfully removed.');
		} else if (type == HEFESTO.CommandType.BIND_PARTICLE) {
			log('Particle successfully added.');
		} else if (type == HEFESTO.CommandType.BIND_COLLISION) {
			log('Collision successfully added.');
		} else if (type == HEFESTO.CommandType.REMOVE_COLLISION) {
			log('Collision successfully removed.');
		} else if (type == HEFESTO.CommandType.BIND_COLLISION_DATA) {
			log('CollisionData successfully added.');
		} else if (type == HEFESTO.CommandType.CHANGE_COLLISION_STATE) {
			log('Collision state successfully changed.');
		} else if (type == HEFESTO.CommandType.INTEGRATE) {
			var t = new HEFESTO.Timming();
			t.start();
			t.update();
			this.onintegrate(data);
			log4(t.getLastFrameDuration());
		} else if (type == HEFESTO.CommandType.GET_RIGID_BODY_DATA) {
			this.onRigidBodyData(data);
		} else {
			log('Unknow message type: ' + type);
		}
	},

	/**
	 * Processa o resultado da integração.
	 */
	onintegrate: function (data) {
		
		for (i = 0; i < data._rigidBodys.length; i++) { 
		    var _rb = data._rigidBodys[i];

		    var rb = this._rigidBodys[_rb.id];

		    var p = new THREE.Vector3();
		    p.x =  _rb.position.x;
		    p.y =  _rb.position.y;
		    p.z =  _rb.position.z;
		    
		    rb.position = p;

		    // caso nao possua mesh, nao precisa ajustar valores de exibicao
		    if (rb.mesh == undefined) {
		    	continue;
		    }

		    //rb._mesh.position.set(p);
		    rb.mesh.position.x = p.x;
		    rb.mesh.position.y = p.y;
		    rb.mesh.position.z = p.z;

		    //tentar setar o orientacao e posicao
		    rb.mesh.matrix.identity();


		    var a = _rb.transform;
		    var m = new THREE.Matrix4();
		    m.set(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);

		    rb.mesh.applyMatrix(m);

		    rb.mesh.updateMatrix();
		    rb.mesh.matrix.setPosition(p);
		}

	    if (this.contactListener != undefined && this.contactListener != null) {
	    	var contacts = data._contacts;
	    	for (j = 0; j < contacts.length; j++) { 
	    		this.contactListener(contacts[0]);
	    	}	    	
	    }

		log('Integrate simulation: ' + this._simulationId);
	},

	onRigidBodyData: function (data) {

		if (this.rigidBodyDataListener != undefined && this.rigidBodyDataListener != null) {
			for (i = 0; i < data.bodys.length; i++) { 
			    var rb = data.bodys[i];
			    this.rigidBodyDataListener(rb);
			}
		}
	}
};
