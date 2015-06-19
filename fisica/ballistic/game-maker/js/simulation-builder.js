var SB = { REVISION: '1'};

/** Funções de criação de tela */

SB.createTreeItem = function(leafId, description) {
	var leaf = document.getElementById(leafId);
	//var ul = document.createElement('ul');
	//leaf.appendChild(ul);

	var li = document.createElement('li');
	//ul.appendChild(li);
	leaf.appendChild(li);
	
	var span = document.createElement('span');
	span.textContent = description;
	li.appendChild(span);
}

SB.createVector3 = function(parent, id, labelText) {
	var div = document.createElement('div');
	div.className = "form-group";
	parent.appendChild(div);

	SB.createLabel(div, labelText);

	var fieldDiv = document.createElement('div');
	div.appendChild(fieldDiv);

	var x = document.createElement('input');
	x.id = id + '_x';
	x.className = 'form-control p';
	x.value = 0;
	x.placeholder = 'x';
	fieldDiv.appendChild(x);

	var y = document.createElement('input');
	y.id = id + '_y';
	y.className = 'form-control p';
	y.value = 0;
	y.placeholder = 'y';
	fieldDiv.appendChild(y);

	var z = document.createElement('input');
	z.id = id + '_z';
	z.className = 'form-control p';
	z.value = 0;
	z.placeholder = 'z';
	fieldDiv.appendChild(z);

	var clearDiv = document.createElement('div');
	clearDiv.style.clear = 'both';
	fieldDiv.appendChild(clearDiv);
};

SB.createQuaternion = function(parent, id, labelText) {
	var div = document.createElement('div');
	div.className = "form-group";
	parent.appendChild(div);

	SB.createLabel(div, labelText);

	var fieldDiv = document.createElement('div');
	div.appendChild(fieldDiv);

	var r = document.createElement('input');
	r.id = id + '_r';
	r.className = 'form-control p';
	r.value = 0;
	r.placeholder = 'r';
	fieldDiv.appendChild(r);

	var i = document.createElement('input');
	i.id = id + '_i';
	i.className = 'form-control p';
	i.value = 0;
	i.placeholder = 'i';
	fieldDiv.appendChild(i);

	var j = document.createElement('input');
	j.id = id + '_j';
	j.className = 'form-control p';
	j.value = 0;
	j.placeholder = 'j';
	fieldDiv.appendChild(j);

	var clearDiv = document.createElement('div');
	clearDiv.style.clear = 'both';
	fieldDiv.appendChild(clearDiv);
};

SB.createBoolean = function(parent, id, labelText, value) {
	var div = document.createElement('div');
	div.className = "form-group";
	parent.appendChild(div);

	var x = document.createElement('input');
	x.id = id;
	x.type = 'checkbox';
	if (value == null || value == undefined) {
		value = 'true';
	}
	x.value = value;
	x.checked = "checked";
	x.className = 'form-control p bol';
	div.appendChild(x);


	var label = SB.createLabel(div, labelText, '200px');
	label.style.paddingLeft = "10px";

	SB.createFloatCleaner(div);
}

SB.createInput = function(parent, id, labelText, v, w) {
	var div = document.createElement('div');
	div.className = "form-group";
	parent.appendChild(div);

	SB.createLabel(div, labelText);

	var x = document.createElement('input');
	x.id = id;
	if (v != null & v != undefined) {
		x.value = v;
	}
	if (w != null & w != undefined) {
		x.style.cssText = 'width: ' + w;
	}
	x.className = 'form-control p';
	div.appendChild(x);

	SB.createFloatCleaner(div);
};

SB.createSelect = function(parent, id, labelText, values) {
	var div = document.createElement('div');
	div.className = "form-group";
	parent.appendChild(div);

	SB.createLabel(div, labelText);

	var tipo = document.createElement('select');
	tipo.id = id;
	tipo.className = 'form-control p pi';
	div.appendChild(tipo);
	for (var mt in values) {
		var option = document.createElement('option');
		option.value = values[mt].value;
		option.text = values[mt].description;
		tipo.appendChild(option);
	}

	SB.createFloatCleaner(div);
};

SB.createLabel = function(parent, labelText, w) {
	var label = document.createElement('label');
	label.className = "l";

	if (w != null & w != undefined) {
		label.style.cssText = 'width: ' + w;
	}
	label.textContent = labelText;
	parent.appendChild(label);
	return label;
}

SB.createFloatCleaner = function(parent) {
	var clearDiv = document.createElement('div');
	clearDiv.style.clear = 'both';
	parent.appendChild(clearDiv);
};

/** Funções de valores utilitários */

SB.BodyType = {
	BALL: {value : "BALL", description : 'Bola' },
	BOX: {value : "BOX", description : 'Caixa' }
};

SB.getBodyTypeByValue = function(value) {
	for (var b in SB.BodyType) {
		b = SB.BodyType[b];
		if (b.value == value) {
			return b;
		}
	}
	return undefined;
}

SB.getCollisionTypeByTypes = function(tp1, tp2) {
	if (tp1 == SB.BodyType.BALL & tp2 == SB.BodyType.BALL) {
		return HEFESTO.CollisionType.SPHERE_AND_SPHERE;
	} else if (tp1 == SB.BodyType.BOX & tp2 == SB.BodyType.BOX) {
		return HEFESTO.CollisionType.BOX_AND_BOX;
	} else if ((tp1 == SB.BodyType.BALL & tp2 == SB.BodyType.BOX) | (tp1 == SB.BodyType.BOX & tp2 == SB.BodyType.BALL)) {
		return HEFESTO.CollisionType.BOX_AND_SPHERE;
	}
	return undefined;
}

SB.MaterialType = {
	CONCRETO: {value : "CONCRETO", description : 'Concreto', material : new THREE.MeshLambertMaterial( { color: 0x5F5F5F, shading: THREE.SmoothShading } ) },
	MADEIRA: {value : "MADEIRA", description : 'Madeira', material : new THREE.MeshLambertMaterial( { color: 0x6F5C2A, shading: THREE.SmoothShading } ) },
	FERRO: {value : "FERRO", description : 'Ferro', material : new THREE.MeshLambertMaterial( { color: 0x206461, shading: THREE.SmoothShading } ) },
	PLASTICO: {value : "PLASTICO", description : 'Plastico', material : new THREE.MeshLambertMaterial( { color: 0xD30F3C, shading: THREE.SmoothShading } ) },
};

SB.getMaterialTypeByValue = function(value) {
	for (var m in SB.MaterialType) {
		m = SB.MaterialType[m];
		if (m.value == value) {
			return m;
		}
	}
	return undefined;
}

SB.MaterialCollisionData = {
	CONCRETO_CONCRETO: {tp1 : SB.MaterialType.CONCRETO, tp2 : SB.MaterialType.CONCRETO, obj : new HEFESTO.CollisionData(0.8, 0.2, 0.1) },
	CONCRETO_MADEIRA: {tp1 : SB.MaterialType.CONCRETO, tp2 : SB.MaterialType.MADEIRA, obj : new HEFESTO.CollisionData(0.8, 0.3, 0.1) },
	CONCRETO_FERRO: {tp1 : SB.MaterialType.CONCRETO, tp2 : SB.MaterialType.FERRO, obj : new HEFESTO.CollisionData(0.8, 0.1, 0.1) },
	CONCRETO_PLASTICO: {tp1 : SB.MaterialType.CONCRETO, tp2 : SB.MaterialType.PLASTICO, obj : new HEFESTO.CollisionData(0.8, 0.7, 0.1) },

	MADEIRA_MADEIRA: {tp1 : SB.MaterialType.MADEIRA, tp2 : SB.MaterialType.MADEIRA, obj : new HEFESTO.CollisionData(0.6, 0.3, 0.1) },
	MADEIRA_FERRO: {tp1 : SB.MaterialType.MADEIRA, tp2 : SB.MaterialType.FERRO, obj : new HEFESTO.CollisionData(0.6, 0.2, 0.1) },
	MADEIRA_PLASTICO: {tp1 : SB.MaterialType.MADEIRA, tp2 : SB.MaterialType.PLASTICO, obj : new HEFESTO.CollisionData(0.6, 0.7, 0.1) },

	FERRO_FERRO: {tp1 : SB.MaterialType.FERRO, tp2 : SB.MaterialType.FERRO, obj : new HEFESTO.CollisionData(0.5, 0.2, 0.1) },
	FERRO_PLASTICO: {tp1 : SB.MaterialType.FERRO, tp2 : SB.MaterialType.PLASTICO, obj : new HEFESTO.CollisionData(0.5, 0.7, 0.1) },

	PLASTICO_PLASTICO: {tp1 : SB.MaterialType.PLASTICO, tp2 : SB.MaterialType.PLASTICO, obj : new HEFESTO.CollisionData(0.9, 0.7, 0.1) }
};

SB.getMaterialCollisionDataByTypes = function(tp1, tp2) {
	for (var m in SB.MaterialCollisionData) {
		m = SB.MaterialCollisionData[m];
		if ((m.tp1.value == tp1.value && m.tp2.value == tp2.value) || (m.tp1.value == tp2.value &&  m.tp2.value == tp1.value)) {
			return m.obj;
		}
	}
	return undefined;
}

/** Funções de bind com Simulation */

SB.createMeshAndAddToScene = function(rb) {
	var geometry = rb.bodyType == SB.BodyType.BALL ? new THREE.SphereGeometry(rb.radius, 32, 16) : new THREE.BoxGeometry(rb.halfSize.x*2, rb.halfSize.y*2, rb.halfSize.z*2);
	var mesh = new THREE.Mesh(geometry, rb.materialType.material);
	mesh.matrixAutoUpdate = false;

	SB.positionateMesh(mesh, rb.position, rb.rotation);
	sm.sb.scene.add(mesh);
    mesh.updateMatrix();
    mesh.matrix.setPosition(rb.position);
	sm.sb.update();
	return mesh;
}

SB.createBody = function(sm) {
	var bodyName = SB.getValue('bodyName');
	var bodyType = SB.BodyType[SB.getValue('bodyType')];
	var materialType = SB.MaterialType[SB.getValue('materialType')];

	var radius = SB.getValue('radius');
	var halfSize = SB.getVector3('halfSize');

	var position = SB.getVector3('position');
	var orientation = SB.getQuaternion('orientation');
	var velocity = SB.getVector3('velocity');
	var acceleration = SB.getVector3('acceleration');
	var rotation = SB.getVector3('rotation');

	var mass = SB.getValue('mass');
	var linearDamping = SB.getValue('linearDamping');
	var angularDamping = SB.getValue('angularDamping');
	var radius = SB.getValue('radius');
	var halfSize = SB.getVector3('halfSize');
	var useWorldForces = SB.getCheckValue('useWorldForces');
	var collideAll = SB.getCheckValue('collideAll');


	var rb = new HEFESTO.SMRigidBody(undefined);
	rb.radius = radius;
	rb.halfSize = halfSize;
	rb.canSleep = false;
	rb.acceleration = acceleration;
	rb.velocity = velocity;
	rb.position = position;
	rb.rotation = rotation;
	rb.orientation = orientation;
	rb.linearDamping = linearDamping;
	rb.angularDamping = angularDamping;
	rb.mass = mass;
	rb.useWorldForces = useWorldForces;
	//exclusivo SM
	rb.name = bodyName;
	rb.bodyType = bodyType;
	rb.materialType = materialType;

	var tensor = undefined;
	var ctype = HEFESTO.CollisionType.SPHERE_AND_TRUEPLANE;
	if (bodyType == SB.BodyType.BALL) {
		tensor = SB.getInertiaTensorCoeffs(mass);
	} else {
		tensor = SB.getBlockInertiaTensor(mass, halfSize);
		ctype = HEFESTO.CollisionType.BOX_AND_HALFSPACE;
	}
	rb.inertiaTensor.set(tensor.elements[0], tensor.elements[1], tensor.elements[2], tensor.elements[3], tensor.elements[4], tensor.elements[5], tensor.elements[6], tensor.elements[7], tensor.elements[8]);

	sm.addBody(rb);
	//alert('Corpo Rígido criado com sucesso!')

	var collisionGround = new HEFESTO.Collision(ctype, SB.getMaterialCollisionDataByTypes(SB.MaterialType.MADEIRA, materialType), rb, null);
	sm.addCollision(collisionGround);

	if (collideAll) {
		for (b in sm.bodies) {
			b = sm.bodies[b];
			if (b.id != rb.id) {
				var col = new HEFESTO.Collision(SB.getCollisionTypeByTypes(b.bodyType, rb.bodyType), 
															SB.getMaterialCollisionDataByTypes(b.materialType, rb.materialType), 
															rb, b);
				sm.addCollision(col);			
			}
		}
	}

	var mesh = SB.createMeshAndAddToScene(rb);
	rb.mesh = mesh;
	SB.createTreeItem('tree-rigid-bodies', rb.name);
};

/** Funções de bind com Força */

SB.createForce = function(sm) {
	var forceName = SB.getValue('forceName');
	var forceValue = SB.getVector3('forceValue');

	var force = new HEFESTO.GravityForce(forceValue);
	force.name = forceName;

	sm.addForce(force);
	SB.createTreeItem('tree-forces', forceName);
};

SB.positionateMesh = function(mesh, position, rotation) {
	mesh.position.x = position.x;
	mesh.position.y = position.y;
	mesh.position.z = position.z;

	mesh.rotation.x = rotation.x;
	mesh.rotation.y = rotation.y;
	mesh.rotation.z = rotation.z;
}

SB.getInertiaTensorCoeffs = function(mass) {
	var random = Math.random() + 0.5;
	var coeff = 0.4 * mass * random * random;
	var m = new THREE.Matrix3();

	m.elements[0] = coeff;
    m.elements[4] = coeff;
    m.elements[8] = coeff;
    return m;
}

SB.getBlockInertiaTensor = function(mass, halfSize) {
	var m = new THREE.Matrix3();
	var squares = new THREE.Vector3(halfSize.x * halfSize.x, halfSize.y * halfSize.y, halfSize.z * halfSize.z);

	m.elements[0] = 0.3 * mass * (squares.y + squares.z);
    m.elements[4] = 0.3 * mass * (squares.x + squares.z);
    m.elements[8] = 0.3 * mass * (squares.x + squares.y);
    return m;
}

SB.getVector3 = function(field) {
	var x = document.getElementById(field + '_x').value;
	var y = document.getElementById(field + '_y').value;
	var z = document.getElementById(field + '_z').value;

	return new THREE.Vector3(x, y, z);
};

SB.getQuaternion = function(field) {
	var r = document.getElementById(field + '_r').value;
	var i = document.getElementById(field + '_i').value;
	var j = document.getElementById(field + '_j').value;

	return new THREE.Quaternion(r, i, j);
};

SB.getValue = function(field) {
	return document.getElementById(field).value;
}

SB.getCheckValue = function(field) {
	return document.getElementById(field).checked;
}


/** Funções para salvar e carregar simulação em arquivo */

SB.saveSimulation = function(sm) {
	var simulation = {};

	var bodies = [];
	for (i in sm.bodies) {
		var b = sm.bodies[i];
		var mesh = b.mesh;
		b.mesh = null;
		var n = {};
		n['id'] = i;
		n['body'] = JSON.prune(b);
		b.mesh = mesh;
		bodies[bodies.length] = n;
	}

	simulation['bodies'] = bodies;
	simulation['collisionDatas'] = sm.collisionDatas;
	simulation['collisions'] = sm.collisions;
	simulation['forces'] = sm.forces;

	var simulation = JSON.prune(simulation);
	
	saveAs(
		  new Blob(
			  [simulation]
			, {type: "text/plain;charset=" + document.characterSet}
		)
		, "simulation.nwt"
	);
}

SB.loadSimulation = function(sm, evt) {
	var files = evt.target.files;

	if (files.length > 0) {
		var file = files[0];
		var reader = new FileReader();
		reader.onload = function (evt) {
	        var simulation = JSON.parse(evt.target.result);

	        var bodies = simulation['bodies'];
	        for (var b in bodies) {
	        	b = bodies[b];
	        	b = JSON.parse(b.body);
	        	b.bodyType = SB.getBodyTypeByValue(b.bodyType.value);
	        	b.materialType = SB.getMaterialTypeByValue(b.materialType.value);
	        	b.mesh = SB.createMeshAndAddToScene(b);
	        	sm.addBody(b);
	        }
	        var collisionDatas = simulation['collisionDatas'];
	        for (var cd in collisionDatas) {
	        	cd = collisionDatas[cd];
	        	sm.addCollisionData(cd);
	        }
	        var collisions = simulation['collisions'];
	        for (var c in collisions) {
	        	c = collisions[c];
	        	var rb1 = sm.getBodyById(c.body1);
	        	var rb2 = sm.getBodyById(c.body2);
	        	c.data = SB.getMaterialCollisionDataByTypes(rb1.materialType, (rb2 != null & rb2 != undefined) ? rb2.materialType : SB.MaterialType.MADEIRA);
	        	c.data = c.data.id;
	        	sm.addCollision(c);
	        }
	        var forces = simulation['forces'];
	        for (var f in forces) {
	        	f = forces[f];
	        	sm.addForce(f);
	        }
	        log3('Carregou simulação...');
	    }
		reader.readAsText(file);
	}
}

SB.clone = function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}