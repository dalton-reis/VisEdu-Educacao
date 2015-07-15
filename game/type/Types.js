var Types = new function() {
	var treeDNDBehaviour = new TreeDNDBehaviour();
	var treePluralDNDBehaviour = new TreePluralDNDBehaviour();
	var treeObjectDNDBehaviour =  new TreeObjectDNDBehaviour();
	var treeRenderDNDBehaviour =  new TreeRenderDNDBehaviour();

	var elementGraphicalBehaviour = new ElementGraphicalBehaviour(); 
	var groupGraphicalBehaviour = new GroupGraphicalBehaviour(); 
	var transformationGraphicalBehaviour = new TransformationGraphicalBehaviour(); 
	var cameraGraphicalBehaviour = new CameraGraphicalBehaviour(); 
	var lightGraphicalBehaviour = new LightGraphicalBehaviour(); 
	
	this.typeCamera = new Type().init('cross', 'camera', 'camera', 'Câmera', treeDNDBehaviour, cameraGraphicalBehaviour);
	this.typeGraphicObject = new Type().init('arrow', 'object', 'object', 'Objeto Gráfico', treeObjectDNDBehaviour, groupGraphicalBehaviour);
	var connectorComponent = 'square';
	var classComponent = 'component';
	this.typeCube = new Type().init(connectorComponent, classComponent, 'cube', 'Cubo', treeDNDBehaviour, elementGraphicalBehaviour);
	this.typePolygon = new Type().init(connectorComponent, classComponent, 'polygon', 'Polígono', treeDNDBehaviour, elementGraphicalBehaviour);
	this.typeSpline = new Type().init(connectorComponent, classComponent, 'spline', 'Spline', treeDNDBehaviour, elementGraphicalBehaviour);
	
	var connectorTransform = 'diamond';
	var classTransform= 'transform';
	this.typeTranslate = new Type().init(connectorTransform, classTransform, 'translate', 'Transladar', treePluralDNDBehaviour, transformationGraphicalBehaviour);
	this.typeRotate = new Type().init(connectorTransform, classTransform, 'rotate', 'Rotacionar', treePluralDNDBehaviour, transformationGraphicalBehaviour);
	this.typeScale = new Type().init(connectorTransform, classTransform, 'scale', 'Escalar', treePluralDNDBehaviour, transformationGraphicalBehaviour);

	this.typeLight = new Type().init('arrow', 'light', 'light', 'Iluminação', treePluralDNDBehaviour, lightGraphicalBehaviour);

	this.typeRenderer = new Type().init('', 'renderer', 'renderer', 'Renderer', treeRenderDNDBehaviour);

	this.typeConnectorCross = new Type().init('cross', 'connector');
	this.typeConnectorArrow = new Type().init('arrow', 'connector');
	this.typeConnectorSquare = new Type().init('square', 'connector');
	this.typeConnectorDiamond = new Type().init('diamond', 'connector');
	
}