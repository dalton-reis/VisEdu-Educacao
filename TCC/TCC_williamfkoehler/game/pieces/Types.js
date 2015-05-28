var Types = new function() {
	var specificDNDBehaviour = new SpecificDNDBehaviour();
	var specificPluralDNDBehaviour = new SpecificPluralDNDBehaviour();
	var objectDNDBehaviour =  new ObjectDNDBehaviour();

	var elementGraphicalBehaviour = new ElementGraphicalBehaviour(); 
	
	this.typeCamera = new Type().init('cross', 'camera', 'Câmera', specificDNDBehaviour);
	this.typeGraficObject = new Type().init('arrow', 'object', 'Objeto Gráfico', objectDNDBehaviour, elementGraphicalBehaviour);
	var connectorComponent = 'square';
	var classComponent = 'component';
	this.typeCube = new Type().init(connectorComponent, classComponent, 'Cubo', specificDNDBehaviour, elementGraphicalBehaviour);
	this.typePolygon = new Type().init(connectorComponent, classComponent, 'Polígono', specificDNDBehaviour, elementGraphicalBehaviour);
	this.typeSpline = new Type().init(connectorComponent, classComponent, 'Spline', specificDNDBehaviour, elementGraphicalBehaviour);
	
	var connectorTransform = 'diamond';
	var classTransform= 'transform';
	this.typeTranslate = new Type().init(connectorTransform, classTransform, 'Transladar', specificPluralDNDBehaviour);
	this.typeRotate = new Type().init(connectorTransform, classTransform, 'Rotacionar', specificPluralDNDBehaviour);
	this.typeScale = new Type().init(connectorTransform, classTransform, 'Escalar', specificPluralDNDBehaviour);

	this.typeLight = new Type().init('arrow', 'light', 'Iluminação', specificPluralDNDBehaviour);

	this.typeRenderer = new Type().init('', 'renderer', 'Renderer');

	this.typeConnectorCross = new Type().init('cross', 'connector');
	this.typeConnectorArrow = new Type().init('arrow', 'connector');
	this.typeConnectorSquare = new Type().init('square', 'connector');
	this.typeConnectorDiamond = new Type().init('diamond', 'connector');
	
}