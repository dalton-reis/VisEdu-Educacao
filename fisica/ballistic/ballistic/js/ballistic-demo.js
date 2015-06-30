var BD = { REVISION: '1'};
var matrizOrigem = new THREE.Matrix4();

BD.Material = function(id, densidade, img) {
	var id = id;
	var densidade = densidade;
	var cgMaterial = img;

 	Object.defineProperties( this, {
 		id: {
			enumerable: true,
			value: id,
			writable: false
		},
		densidade: {
			enumerable: true,
			value: densidade,
			writable: false
		},
		cgMaterial: {
			enumerable: true,
			value: cgMaterial,
			writable: false
		}
	});
}

BD.MaterialProjetil = {
	SILICONE: new BD.Material('silicone', 0.95, new THREE.MeshLambertMaterial( {color: 0xFFFF00,  transparent: true} )),
	ALUMINIO: new BD.Material('aluminio', 2.70, new THREE.MeshLambertMaterial( {color: 0xCCCCCC,  transparent: true} )),
	FERRO: new BD.Material('ferro', 7.87, new THREE.MeshLambertMaterial( {color: 0x888888,  transparent: true} )),
	OURO: new BD.Material('ouro', 19.28, new THREE.MeshLambertMaterial( {color: 0x7777FF,  transparent: true} )),
	VIDRO: new BD.Material('vidro', 2.60, new THREE.MeshLambertMaterial( {color: 0x0000FF,  transparent: true, opacity:0.9} )),
	IPE: new BD.Material('ipe', 0.485, new THREE.MeshLambertMaterial( {color: 0xCCFFCC,  transparent: true} )),
	CEDRO: new BD.Material('cedro', 1.10, new THREE.MeshLambertMaterial( {color: 0x88FF88,  transparent: true} ))
};

BD.Gravidade = function(id, _valor, _camiho) {
	var id = id;
	var valor = _valor;
	var caminho = _camiho;

	Object.defineProperties( this, {
		id: {
			enumerable: true,
			value: id,
			writable: false
		},
		valor: {
			enumerable: true,
			value: valor,
			writable: false
		},
		caminho: {
			enumerable: true,
			value: caminho,
			writable: false
		}
	});
};

BD.Gravidades = {
    MERCURIO: {id:'Merc&uacute;rio', valor: new HEFESTO.GravityForce(new THREE.Vector3(0, -3.7, 0)), caminho: 'img/icon/Mercury.png'},
    VENUS: {id:'V&eacute;nus', valor: new HEFESTO.GravityForce(new THREE.Vector3(0, -8.87, 0)), caminho: 'img/icon/Venus.png'},
	TERRA: {id:'Terra', valor: new HEFESTO.GravityForce(new THREE.Vector3(0, -10, 0)), caminho: 'img/icon/Earth.png'},
	LUA: {id:'Lua', valor: new HEFESTO.GravityForce(new THREE.Vector3(0, -1.622, 0)), caminho: 'img/icon/Moon.png'},
	MARTE: {id:'Marte', valor: new HEFESTO.GravityForce(new THREE.Vector3(0, -3.711, 0)), caminho: 'img/icon/Mars.png'},
	JUPITER: {id:'J&uacute;piter', valor: new HEFESTO.GravityForce(new THREE.Vector3(0, -24.79, 0)), caminho: 'img/icon/Jupiter.png'},
    SATURNO : {id:'Saturno', valor: new HEFESTO.GravityForce(new THREE.Vector3(0, -10.44, 0)), caminho: 'img/icon/Saturn.png'},
    URNANO: {id:'Urano', valor: new HEFESTO.GravityForce(new THREE.Vector3(0, -8.69 , 0)), caminho: 'img/icon/Uranus.png'},
    NETUNO: {id:'Netuno', valor: new HEFESTO.GravityForce(new THREE.Vector3(0, -11.15, 0)), caminho: 'img/icon/Neptune.png'},
    PLUTAO: {id:'Plut&atilde;o', valor: new HEFESTO.GravityForce(new THREE.Vector3(0, -0.658, 0)), caminho: 'img/icon/Pluto.png'}
};

BD.Positionable = function() {
	var position = new THREE.Vector3();
	var rotation = new THREE.Vector3();

	Object.defineProperties( this, {
		position: {
			enumerable: true,
			value: position,
			writable: true
		},
		rotation: {
			enumerable: true,
			value: rotation,
			writable: true
		},
	} );
};

BD.Positionable.prototype = {
	constructor: BD.Positionable,
};


BD.Cannon = function(scene, _position) {
	BD.Positionable.call( this );

	var scene = scene;
	var projetilRadius = 5;
	var angle = 90;

	var position = _position;
	var rotation = rotation;

	var baseMesh = undefined;
	var bodyMesh = undefined;
	var tubeMesh = undefined;

	Object.defineProperties( this, {
		scene: {
			enumerable: true,
			value: scene
		},
		projetilRadius: {
			enumerable: true,
			value: projetilRadius,
			writable: true
		},
		angle: {
			enumerable: true,
			value: angle,
			writable: true
		},
		tubeMesh: {
			enumerable: true,
			value: tubeMesh,
			writable: true
		},
		position: {
			enumerable: true,
			value: position,
			writable: true
		}
	} );
};

BD.Cannon.prototype = {
	constructor: BD.Cannon,

	draw: function() {

		this.generateBase();
		this.generateBody();
		this.generateTube();
	},

	generateBase: function() {
		var baseSize = this.projetilRadius * 4;

		var geometry = new THREE.BoxGeometry( baseSize*1.5, baseSize /2, baseSize*1.1 );
		var material = new THREE.MeshLambertMaterial( {color: 0x444444,  transparent: true} );
		this.baseMesh = new THREE.Mesh(geometry, material);
		this.baseMesh.position.x = this.position.x + this.projetilRadius/2;;
		this.baseMesh.position.y = this.position.y + (baseSize/4);
		this.baseMesh.position.z = this.position.z;
		this.scene.add(this.baseMesh);
	},

	generateBody: function() {
		var  material = new THREE.MeshLambertMaterial( { color: 0x444444, shading: THREE.SmoothShading } );
		var geometryBall = new THREE.SphereGeometry(this.projetilRadius * 2.1, 32, 16);
		this.BasetubeMesh = new THREE.Mesh(geometryBall, material);
		this.BasetubeMesh.position.x = this.position.x;
		this.BasetubeMesh.position.y = this.position.y + (this.projetilRadius * 2);
		this.BasetubeMesh.position.z = this.position.z;
		this.scene.add(this.BasetubeMesh);

	},

	generateTube: function() {
		var med = this.projetilRadius * 2.1;
		var pts = [
			new THREE.Vector3(med * 0.5,0, med),//top left
			new THREE.Vector3(med * 0.5,0,med),//top right
			new THREE.Vector3(med * 0.5,0,-med * 2),//bottom right
			new THREE.Vector3(med * 0.5,0,-med * 2),//bottom left
			new THREE.Vector3(med * 0.5,0,med)//back to top left - close square path
		];
		var  material = new THREE.MeshLambertMaterial( { color: 0x444444, shading: THREE.SmoothShading } );
		this.tubeMesh = new THREE.Mesh( new THREE.LatheGeometry( pts, 64 ), material);
		this.tubeMesh.overdraw = true;
		this.tubeMesh.doubleSided = true;
		var tubePos = new THREE.Vector3(this.position.x + med, this.position.y + (med * 1.5), this.position.z);
		GAMU.positionMesh(this.tubeMesh, tubePos, new THREE.Vector3(0, -90 *Math.PI/180, 0));
		matrizOrigem = this.tubeMesh.matrix;
		this.scene.add( this.tubeMesh );
	},

	rotateAround: function(axis, radians) {
		//console.log(this.tubeMesh.rotation);
		//console.log(this.tubeMesh.matrix);
		var rotObjectMatrix = new THREE.Matrix4();
		var matrizZerada = new THREE.Matrix4();
		//matrizZerada.identity();
		matrizZerada.set(-2.220446049250313e-16, 0, 1, 0, -0, 1, 0, 0, -1, -0, -2.220446049250313e-16, 0, -139.5, 15.75, -50, 1);
		rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);
		this.tubeMesh.matrix.copy(matrizOrigem);

		this.tubeMesh.matrix.multiply(rotObjectMatrix);
		//matrizZerada.multiply(rotObjectMatrix);
		this.tubeMesh.rotation.setFromRotationMatrix(this.tubeMesh.matrix);
		//this.tubeMesh.rotation.setFromRotationMatrix(matrizZerada);
	},

	determineAngleVelocityVector: function(V) {
		var vel = new THREE.Vector3();

		//vx = v0 . cos?
		//vel.x = Math.cos(this.angle * Math.PI / 180);
		//Minha Tentativa em arrumar a velocidade:
		vel.x = V * Math.cos(this.angle * Math.PI / 180);
		//v0y = v0 . sen?
		//vel.y = Math.sin(this.angle * Math.PI / 180);
		//Minha Tentativa em arrumar a velocidade:
		vel.y = V * Math.sin(this.angle * Math.PI / 180);

		//console.log(vel);

		return vel;
	},

	determineProjetilPosition: function() {
		var vector = new THREE.Vector3(this.tubeMesh.position.x, 0, this.tubeMesh.position.z);
		return this.tubeMesh.position;
        //return vector;
	}

};

BD.Target = function (_scene, _position, _tamnaho, type) {

	var tamanho = _tamnaho;
	var scene = _scene;
	var position = _position;

	var textura = new THREE.ImageUtils.loadTexture("textura/Alvo2.png");
	var geometry = type ==="Cubo" ? new THREE.BoxGeometry(tamanho*2, tamanho*2, tamanho*2): new THREE.SphereGeometry(tamanho ,16, 32);
	var material2 = new THREE.MeshBasicMaterial({
		color : 0x000000,
		transparent : true,
		opacity : 0.5
	});
	var texturaF = new THREE.MeshBasicMaterial({
		map : textura
	});
	var materials = [ texturaF, texturaF, material2, material2, material2,material2 ];

	var materialFinal = new THREE.MeshFaceMaterial(materials);
	var alvo = new THREE.Mesh(geometry, materialFinal);
	alvo.position.x = parseInt(position.x);
	alvo.position.y = parseInt(position.y);
	alvo.position.z = parseInt(position.z);

	scene.add(alvo);

	alvo.matrixAutoUpdate = false;
    Object.defineProperties( this, {
        scene: {
            enumerable: true,
            value: scene,
            writable: false
        },
        tamanho: {
            enumerable: true,
            value: tamanho,
            writable: false
        },
        alvo: {
            enumerable: true,
            value: alvo,
            writable: false
        }
    });

};
