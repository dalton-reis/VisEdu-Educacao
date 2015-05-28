/**
* Component que aplica uma rotação no objeto associado.
*
* @author Marcos Harbs
* @class RotateComponent
* @constructor
*/
function RotateComponent(){}

RotateComponent.prototype = new Component();


/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
RotateComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem);
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onBeforeRender
* @param {Context} context
*/
RotateComponent.prototype.onBeforeRender = function(context){
	this.rotate(context);
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
RotateComponent.prototype.getTag = function(){
	return "ROTATE_COMPONENT";
}