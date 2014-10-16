function PaperJsRenderComponent(){}

PaperJsRenderComponent.prototype = new Component();

PaperJsRenderComponent.prototype.onRender = function(context){
	paper.view.draw();
}

PaperJsRenderComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

PaperJsRenderComponent.prototype.getTag = function(){
	return "PAPER_JS_RENDER_COMPONENT";
}