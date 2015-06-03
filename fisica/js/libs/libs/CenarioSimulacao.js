var simulation;
var timming = new HEFESTO.Timming();

// Colisões:
// Base
var cdGround = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdGround.id = 'cdGround';
cdGround.maxCollision = 256 * 256;

// Alvo
var cdTarget = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdTarget.id = 'cdTarget';
cdTarget.maxCollision = 256 * 256;

// Madeira
var cdMadeira_Madeira = new HEFESTO.CollisionData(0.9, 1, 0.01);
cdMadeira_Madeira.id = 'cdMadeira_Madeira';
cdMadeira_Madeira.maxCollision = 256 * 256;

var cdMadeira_Metal = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdMadeira_Metal.id = 'cdMadeira_Metal';
cdMadeira_Metal.maxCollision = 256 * 256;

var cdMadeira_Borracha = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdMadeira_Borracha.id = 'cdMadeira_Borracha';
cdMadeira_Borracha.maxCollision = 256 * 256;

var cdMadeira_Plastico = new HEFESTO.CollisionData(0.9, 0.5, 0.01);
cdMadeira_Plastico.id = 'cdMadeira_Plastico';
cdMadeira_Plastico.maxCollision = 256 * 256;

// Metal
var cdMetal_Metal = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdMetal_Metal.id = 'cdMetal_Borracha';
cdMetal_Metal.maxCollision = 256 * 256;

var cdMetal_Borracha = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdMetal_Borracha.id = 'cdMetal_Borracha';
cdMetal_Borracha.maxCollision = 256 * 256;

var cdMetal_Plastico = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdMetal_Plastico.id = 'cdMetal_Borracha';
cdMetal_Plastico.maxCollision = 256 * 256;

// Borracha
var cdBorracha_Borracha = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdBorracha_Borracha.id = 'cdBorracha_Borracha';
cdBorracha_Borracha.maxCollision = 256 * 256;

var cdBorracha_Plastico = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdBorracha_Plastico.id = 'cdBorracha_Plastico';
cdBorracha_Plastico.maxCollision = 256 * 256;

// Plástico
var cdPlastico_Plastico = new HEFESTO.CollisionData(0.9, 0.9, 0.01);
cdPlastico_Plastico.id = 'cdPlastico_Plastico';
cdPlastico_Plastico.maxCollision = 256 * 256;

function inicializaSimualcao() {
	simulation = new HEFESTO.Simulation();
	simulation.init();

	continueInitilization();
}

function continueInitilization() {
	if (!simulation.isBusy()) {
		adicionacd();
		criaCena();
		adicionaEventos();
		var gravity = new HEFESTO.GravityForce(new THREE.Vector3(0, -16, 22, 0));
		// simulation.bindForce(gravity);
		timming.start();
		timming.update();
		renderiza();
	} else {
		requestAnimationFrame(continueInitilization);
	}
}

function adicionacd() {
	simulation.bindCollisionData(cdGround);
	simulation.bindCollisionData(cdTarget);

	simulation.bindCollisionData(cdMadeira_Madeira);
	simulation.bindCollisionData(cdMadeira_Metal);
	simulation.bindCollisionData(cdMadeira_Borracha);
	simulation.bindCollisionData(cdMadeira_Plastico);

	simulation.bindCollisionData(cdMetal_Metal);
	simulation.bindCollisionData(cdMetal_Borracha);
	simulation.bindCollisionData(cdMetal_Plastico);

	simulation.bindCollisionData(cdBorracha_Borracha);
	simulation.bindCollisionData(cdBorracha_Plastico);

	simulation.bindCollisionData(cdPlastico_Plastico);
}

function bindForce(force) {
	var forceH = new HEFESTO.GravityForce(force.values);
	console.log(forceH.id);
	//forceH.name = force.name;
	simulation.bindForce(forceH);
	console.log("Força Adicionada com Sucesso!");
	addLista("listForces", force.name + " x=" + force.values.x + "y="
			+ force.values.y + "z=" + force.values.z);
	forces.push(force);
}