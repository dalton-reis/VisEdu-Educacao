/**
* Component que renderiza um polígono.
*
* @author Marcos Harbs
* @class PolygonRenderComponent
* @constructor
*/
function PolygonRenderComponent(){}

PolygonRenderComponent.prototype = new RenderableComponent();

/**
* Método construtor da classe PolygonRenderComponent.
*
* @author Marcos Harbs
* @method initialize
* @param {Color} fillStyle
* @param {Color} strokeStyle
* @return {PolygonRenderComponent} object
*/
JSUtils.addMethod(PolygonRenderComponent.prototype, "initialize", 
	function(fillStyle, strokeStyle){
		this.initialize();
		this.fillStyle = fillStyle;
		this.strokeStyle = strokeStyle;
		return this;
	}
);

/**
* Retorna os sistemas que deverão gerenciar este component.
* (KEY_SYSTEM; LOGIC_SYSTEM; MOUSE_SYSTEM; RENDER_SYSTEM)
*
* @author Marcos Harbs
* @method getSystems
* @return {Array} systems
*/
PolygonRenderComponent.prototype.getSystems = function(){
	var systems = new Array();
	systems = ArrayUtils.addElement(systems, RenderSystem);
	return systems;
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method onRender
* @param {Context} context
*/
PolygonRenderComponent.prototype.onRender = function(context){
	context.save();
	if(this.fillStyle != null){
		context.fillStyle = this.fillStyle;
	}
	if(this.strokeStyle != null){
		context.strokeStyle = this.strokeStyle;
	}
	if(!this.owner.body){
		context.translate(this.owner.getCenterX(), this.owner.getCenterY());
	}
	var polygonPoints = this.owner.getPoints();
	context.beginPath();
	context.moveTo(polygonPoints[0].x, polygonPoints[0].y);
	for(var i=1; i<polygonPoints.length; i++){
		var point = polygonPoints[i];
		if(point instanceof Point2D){
			context.lineTo(point.x, point.y);
		}
	}
	context.closePath();
	if(this.fillStyle != null){
		context.fill();
	}
	if(this.strokeStyle != null){
		context.stroke();
	}
	context.restore();
}

/**
* Método sobrescrito da classe Component.
*
* @author Marcos Harbs
* @method getTag
* @return {String} tag
*/
PolygonRenderComponent.prototype.getTag = function(){
	return "POLYGON_RENDER_COMPONENT";
}

PolygonRenderComponent.prototype.genThreeObject = function(){
	var material;
	var textures = [];	
	
	if (this.fillStyle) {
		material = new THREE.MeshBasicMaterial({color:this.fillStyle, overdraw: true, side: THREE.FrontSide});
		//material.emissive = new THREE.Color( 0xFFFFFF );
		//material.morphNormals = true;
		textures.push(material);
	} 
	
	if (this.strokeStyle) {
		var wireFrameMaterial = Game.apiHandler.getWireframeMaterial(this.strokeStyle);
		textures.push(wireFrameMaterial);
	} 
	
	var geometry = new THREE.Geometry();
	var points = this.owner.getPoints();
	if (points)  {
		$.each(points, function(index, item) {
			geometry.vertices.push(new THREE.Vector3(item.x, item.y, item.z || 0));		
		});		
	}
	var faces = this.owner.faces;
	if (faces) {
		$.each(faces, function(index, item) {
			geometry.faces.push(new THREE.Face3(item.x, item.y, item.z)); 			
		});
	} else {
		for (i = 0; i < points.length-2; i++) {
			geometry.faces.push(new THREE.Face3(0, i+1, i+2));
		}
	}
	
	polygon = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial(textures));
	return polygon;
	
}