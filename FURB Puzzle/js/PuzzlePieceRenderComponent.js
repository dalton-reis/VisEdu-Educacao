
function PuzzlePieceRenderComponent(){}

PuzzlePieceRenderComponent.prototype = new Component();

PuzzlePieceRenderComponent.prototype.onRender = function(context){
	var segX = ((this.owner.width / 5) * 1.1 * 5) / 2;
    var segY = ((this.owner.height / 5) * 1.1 * 5) / 2;

	this.owner.tileImage.position.x = this.owner.getCenterX() - segX;
	this.owner.tileImage.position.y = this.owner.getCenterY() - segY;
}

PuzzlePieceRenderComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

PuzzlePieceRenderComponent.prototype.getTag = function(){
	return "PUZZLE_PIECE_RENDER_COMPONENT";
}