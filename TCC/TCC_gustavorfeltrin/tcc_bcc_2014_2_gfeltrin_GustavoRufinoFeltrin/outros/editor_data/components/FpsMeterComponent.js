/**
* Componente usado para medir o frame rate do jogo.
*
* @author Marcos Harbs
* @class FpsMeterComponent
* @constructor
*/
function FpsMeterComponent(){}

FpsMeterComponent.prototype = new Component();

FpsMeterComponent.prototype.fpsCount = 0;
FpsMeterComponent.prototype.currentFps = 0;
FpsMeterComponent.prototype.lastUpdate = 0;
FpsMeterComponent.prototype.amountOfGameObjects = 0;

/**
* Retorna os sistemas que dever�o gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
FpsMeterComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

/**
* M�todo sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onBeforeRender
* @param {Context} context
*/
FpsMeterComponent.prototype.onBeforeRender = function(context){}

/**
* M�todo sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onRender
* @param {Context} context
*/
FpsMeterComponent.prototype.onRender = function(context){
	var now = Date.now();
	if((now - this.lastUpdate)/1000 >= 1){
		this.currentFps = this.fpsCount;
		this.fpsCount = 0;
		this.lastUpdate = now;
	}
	this.fpsCount++;
	var fillStyle = context.fillStyle;
	context.fillStyle = "red";
	context.font = "bold 20px Arial";
	context.fillText("FPS: "+this.currentFps + " Objs: " + this.amountOfGameObjects, 20, 30);
	context.fillStyle = fillStyle;
}

FpsMeterComponent.prototype.onUpdate = function(delta){
	this.amountOfGameObjects = Game.scene.getAmountOfGameObjects();	
}

/**
* M�todo sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
FpsMeterComponent.prototype.getTag = function(){
	return "FPS_METER_COMPONENT";
}