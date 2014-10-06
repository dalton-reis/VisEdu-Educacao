function PerformanceWebSocketComponent(){}

PerformanceWebSocketComponent.prototype = new Component();

JSUtils.addMethod(PerformanceWebSocketComponent.prototype, "initialize", 
	function(uri, qtd){
		this.initialize();
		this.uri = uri;
		this.qtd = qtd
		return this;
	}
);

PerformanceWebSocketComponent.prototype.onLoad = function(){
	var boFrustumRbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	boFrustumRbc.onUpdate = function(deltaTime){
		this.owner.setLinearVelocityX(100);
	}
	var boFrustum = new PolygonObject().initialize(85,  160,[
													new Point2D().initialize( 0, 0),
													new Point2D().initialize( 150, -15),
													new Point2D().initialize( 150, 15 )],
													"rgba(255, 255, 0, 0.3)","rgba(0, 0, 0, 0.3)");
	var boFrustumPvc = new PerceptionVisionPerformanceComponent().initialize(this.uri, 0);
	var boFrustumTc = new TokenComponent().initialize("PERFORMANCEX_VISION");
	ComponentUtils.addComponent(boFrustum, boFrustumRbc);
	ComponentUtils.addComponent(boFrustum, boFrustumPvc);
	ComponentUtils.addComponent(boFrustum, boFrustumTc);
	layer.addGameObject(boFrustum);
	
	var rbc = new RigidBodyComponent().initialize(0, 1, true, false, 0);
	rbc.onCollide = function(otherGameObject){
		otherGameObject.destroy();
	}
	rbc.onUpdate = function(deltaTime){
			this.owner.setLinearVelocityX(100);
	}
	var tc = new TokenComponent().initialize("PERFORMANCEX");
	var bo = new BoxObject().initialize(100, 160, 30, 30, "green", "black");
	bo.setLinearVelocityX(200);
	ComponentUtils.addComponent(bo, rbc);
	ComponentUtils.addComponent(bo, tc);
	layer.addGameObject(bo);
	boFrustum.parent = bo;

	this.createObjects(160);
}

PerformanceWebSocketComponent.prototype.createObjects = function(y){
	var obj1Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj1 = new BoxObject().initialize(350, y, 20, 20, "blue", "black");
	ComponentUtils.addComponent(obj1, obj1Rbc);
	layer.addGameObject(obj1);

	var obj2Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj2 = new PolygonObject().initialize(550,  y,[
											new Point2D().initialize(-10,  0),
											new Point2D().initialize(  0,-10),
											new Point2D().initialize( 10,  0),
											new Point2D().initialize(  0, 10)],
											"purple","black");
	ComponentUtils.addComponent(obj2, obj2Rbc);
	layer.addGameObject(obj2);

	var obj3Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj3 = new CircleObject().initialize(750, y, 10, "gray", "black");
	ComponentUtils.addComponent(obj3, obj3Rbc);
	layer.addGameObject(obj3);
}

PerformanceWebSocketComponent.prototype.getTag = function(){
  return "PERFORMANCE_WEBSOCKET_COMPONENT";
}