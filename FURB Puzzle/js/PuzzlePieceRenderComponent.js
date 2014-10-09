
function PuzzlePieceRenderComponent(){}

PuzzlePieceRenderComponent.prototype = new Component();

JSUtils.addMethod(PuzzlePieceRenderComponent.prototype, "initialize", 
	function(image, imgWidth, imgHeight, offsetLeft, offsetTop){
		this.initialize();
		this.image      = image;
		this.imgWidth   = imgWidth;
		this.imgHeight  = imgHeight;
		this.offsetLeft = offsetLeft;
		this.offsetTop  = offsetTop;
		return this;
	}
);

PuzzlePieceRenderComponent.prototype.onRender = function(context){
	context.drawImage(this.image,
				      this.offsetLeft * this.imgWidth, 
				      this.offsetTop * this.imgHeight,
				      this.imgWidth, 
				      this.imgHeight,
				      this.owner.getCenterX()-(this.imgWidth/2), 
		              this.owner.getCenterY()-(this.imgHeight/2),
		              this.imgWidth, 
		              this.imgHeight);
}

PuzzlePieceRenderComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
	return systems;
}

PuzzlePieceRenderComponent.prototype.getTag = function(){
	return "PUZZLE_PIECE_RENDER_COMPONENT";
}