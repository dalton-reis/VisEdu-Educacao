function PerformanceWebSocketAgentComponent(){}

PerformanceWebSocketAgentComponent.prototype = new Component();
PerformanceWebSocketAgentComponent.prototype.direita = true;
PerformanceWebSocketAgentComponent.prototype.linearVelocityX = null;
PerformanceWebSocketAgentComponent.prototype.minX = -100;
PerformanceWebSocketAgentComponent.prototype.maxX = 1000;
PerformanceWebSocketAgentComponent.prototype.mudou = false;
PerformanceWebSocketAgentComponent.prototype.angle = Math.PI / 1;
PerformanceWebSocketAgentComponent.prototype.maisObstaculos = false;
PerformanceWebSocketAgentComponent.prototype.visionRange = 100;

JSUtils.addMethod(PerformanceWebSocketAgentComponent.prototype, "initialize", 
	function(agentHeight, y, uri, mind){
		this.initialize();
		this.agentHeight = agentHeight;
		this.y = y;
		this.uri = uri;
		this.mind = mind;
		return this;
	}
);

PerformanceWebSocketAgentComponent.prototype.onLoad = function(){
	this.linearVelocityX = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
	var pwsc = this;

	/* Criação do objeto que representa o agente */
	var bo = new BoxObject().initialize(this.minX, this.y, this.agentHeight, this.agentHeight, "green", "black");
	var rbc = new RigidBodyComponent().initialize(0, 1, true, false, 0);
	rbc.onCollide = function(otherGameObject){
		otherGameObject.destroy();
	}
	rbc.onUpdate = function(deltaTime){
		if ( pwsc.direita ) {
			this.owner.setLinearVelocityX( pwsc.linearVelocityX );
		} else {
			this.owner.setLinearVelocityX( pwsc.linearVelocityX * -1 );
		}
		if (pwsc.direita && this.owner.getCenterX() > pwsc.maxX) {
			pwsc.direita = false;
			pwsc.createObjects(pwsc.y);
			pwsc.mudou = true;
			var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
			rotate.setRotate( rotate.getAngle() - pwsc.angle);
		}  else if (!pwsc.direita && this.owner.getCenterX() < pwsc.minX) {
			pwsc.direita = true;
			pwsc.createObjects(pwsc.y);
			pwsc.mudou = true;
			var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
			rotate.setRotate( rotate.getAngle() + pwsc.angle);
		}
	}
	ComponentUtils.addComponent(bo, rbc);
	var tc = new TokenComponent().initialize("PERFORMANCE" + this.y);
	ComponentUtils.addComponent(bo, tc);
	
	/* Criação do objeto que representa o frustum de visão do agente */
	var boFrustum = new PolygonObject().initialize(this.minX - this.agentHeight/2,  this.y,[
		new Point2D().initialize( 0, 0),
		new Point2D().initialize( this.visionRange, - 1 * (this.agentHeight/2) ),
		new Point2D().initialize( this.visionRange, this.agentHeight/2 )],
		"rgba(255, 255, 0, 0.3)","rgba(0, 0, 0, 0.3)");
	var boFrustumRbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	// FIXME trocar a cor do agente, vermelho quado a mente estiver OFF.
	boFrustumRbc.onUpdate = function(deltaTime){
		if ( pwsc.direita ) {
			this.owner.setLinearVelocityX( pwsc.linearVelocityX );
		} else {
			this.owner.setLinearVelocityX( pwsc.linearVelocityX * -1 );
		}
		if (pwsc.mudou) {
			if (pwsc.direita) {
				var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
				rotate.setRotate( rotate.getAngle() + pwsc.angle);
				var translate = ComponentUtils.getComponent(this.owner, "TRANSLATE_COMPONENT");
				translate.setTranslate( 1 * (this.owner.parent.getCenterX()-this.owner.getCenterX() + pwsc.visionRange/2 ), 0);
			} else {
				var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
				rotate.setRotate( rotate.getAngle() - pwsc.angle);
				var translate = ComponentUtils.getComponent(this.owner, "TRANSLATE_COMPONENT");
				translate.setTranslate( -1 * (this.owner.getCenterX()-this.owner.parent.getCenterX() + pwsc.visionRange/2 ), 0);
			}
			pwsc.mudou = false;
		}
	}
	ComponentUtils.addComponent(boFrustum, boFrustumRbc);	
	var boFrustumTc = new TokenComponent().initialize("PERFORMANCE" + this.y +"_VISION");
	ComponentUtils.addComponent(boFrustum, boFrustumTc);
	if ( this.mind ) {
		var boFrustumPvc = new PerceptionVisionPerformanceComponent().initialize(this.uri);
		ComponentUtils.addComponent(boFrustum, boFrustumPvc);
	} else {
		var boFrustumSc = new SensorComponent().initialize();
		ComponentUtils.addComponent(boFrustum, boFrustumSc);
	}
	boFrustum.parent = bo;
	bo.frustum = boFrustum;

	layer.addGameObject(boFrustum);
	layer.addGameObject(bo);	
	pwsc.createObjects(this.y);
}

PerformanceWebSocketAgentComponent.prototype.createObjects = function(y){

	var obstaclesSize = this.agentHeight/2;
	var radius = obstaclesSize/2;
	var edge = obstaclesSize/2;
	var edgeNeg = edge * -1;
	
	if ( this.maisObstaculos ) {
		var obj1Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
		var obj1 = new CircleObject().initialize(100, y, radius, ColorUtils.randomColor2(), "black");
		ComponentUtils.addComponent(obj1, obj1Rbc);
		layer.addGameObject(obj1);

		var obj3Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
		var obj3 = new PolygonObject().initialize(400,  y,[
			new Point2D().initialize(edgeNeg,  0),
			new Point2D().initialize(  0,edgeNeg),
			new Point2D().initialize( edge,  0),
			new Point2D().initialize(  0, edge)],
			ColorUtils.randomColor2(),"black");
		ComponentUtils.addComponent(obj3, obj3Rbc);
		layer.addGameObject(obj3);

		var obj5Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
		var obj5 = new BoxObject().initialize(700, y, obstaclesSize, obstaclesSize, ColorUtils.randomColor2(), "black");
		ComponentUtils.addComponent(obj5, obj5Rbc);
		layer.addGameObject(obj5);
	}

	var obj2Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj2 = new BoxObject().initialize(250, y, obstaclesSize, obstaclesSize, ColorUtils.randomColor2(), "black");
	ComponentUtils.addComponent(obj2, obj2Rbc);
	layer.addGameObject(obj2);

	var obj4Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj4 = new CircleObject().initialize(550, y, radius, ColorUtils.randomColor2(), "black");
	ComponentUtils.addComponent(obj4, obj4Rbc);
	layer.addGameObject(obj4);

	var obj6Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj6 = new PolygonObject().initialize(850,  y,[
		new Point2D().initialize(edgeNeg,  0),
		new Point2D().initialize(  0,edgeNeg),
		new Point2D().initialize( edge,  0),
		new Point2D().initialize(  0, edge)],
		ColorUtils.randomColor2(),"black");
	ComponentUtils.addComponent(obj6, obj6Rbc);
	layer.addGameObject(obj6);

}

PerformanceWebSocketAgentComponent.prototype.getSystems = function(){
    var systems = new Array();
    systems = ArrayUtils.addElement(systems, KeySystem.getTag());
    return systems;
  }

PerformanceWebSocketAgentComponent.prototype.getTag = function(){
	return "PERFORMANCE_WEBSOCKET_AGENT_COMPONENT";
}