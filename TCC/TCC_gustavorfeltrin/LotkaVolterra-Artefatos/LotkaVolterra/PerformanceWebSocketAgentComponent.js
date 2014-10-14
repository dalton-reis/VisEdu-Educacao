function PerformanceWebSocketAgentComponent(){}

PerformanceWebSocketAgentComponent.prototype = new Component();
PerformanceWebSocketAgentComponent.prototype.direita = true;
PerformanceWebSocketAgentComponent.prototype.linearVelocityX = null;
PerformanceWebSocketAgentComponent.prototype.minX = -100;
PerformanceWebSocketAgentComponent.prototype.maxX = 1000;
PerformanceWebSocketAgentComponent.prototype.mudou = false;
PerformanceWebSocketAgentComponent.prototype.angle = Math.PI / 1;
PerformanceWebSocketAgentComponent.prototype.widthHeightAgent = 30;
PerformanceWebSocketAgentComponent.prototype.maisObstaculos = false;

JSUtils.addMethod(PerformanceWebSocketAgentComponent.prototype, "initialize", 
	function(y, uri, visionRange, mind){
		this.initialize();
		this.y = y;
		this.uri = uri;
		this.visionRange = visionRange;
		this.mind = mind;
		return this;
	}
);

PerformanceWebSocketAgentComponent.prototype.onLoad = function(){
	this.linearVelocityX = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
	var pwsc = this;
	/* Criação do objeto que representa o frustum de visão do agente */
	var boFrustum = new PolygonObject().initialize(this.minX - this.widthHeightAgent/2,  this.y,[
		new Point2D().initialize( 0, 0),
		new Point2D().initialize( this.visionRange, - 1 * (this.widthHeightAgent/2) ),
		new Point2D().initialize( this.visionRange, this.widthHeightAgent/2 )],
		"rgba(255, 255, 0, 0.3)","rgba(0, 0, 0, 0.3)");
	var boFrustumRbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
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
	layer.addGameObject(boFrustum);

	/* Criação do objeto que representa o agente */
	var bo = new BoxObject().initialize(this.minX, this.y, this.widthHeightAgent, this.widthHeightAgent, "green", "black");
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
	layer.addGameObject(bo);
	boFrustum.parent = bo;
	bo.frustum = boFrustum;
	pwsc.createObjects(this.y);
}

PerformanceWebSocketAgentComponent.prototype.createObjects = function(y){
	
	if ( this.maisObstaculos ) {
		var obj1Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
		var obj1 = new CircleObject().initialize(100, y, 10, ColorUtils.randomColor2(), "black");
		ComponentUtils.addComponent(obj1, obj1Rbc);
		layer.addGameObject(obj1);

		var obj3Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
		var obj3 = new PolygonObject().initialize(400,  y,[
			new Point2D().initialize(-10,  0),
			new Point2D().initialize(  0,-10),
			new Point2D().initialize( 10,  0),
			new Point2D().initialize(  0, 10)],
			ColorUtils.randomColor2(),"black");
		ComponentUtils.addComponent(obj3, obj3Rbc);
		layer.addGameObject(obj3);

		var obj5Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
		var obj5 = new BoxObject().initialize(700, y, 20, 20, ColorUtils.randomColor2(), "black");
		ComponentUtils.addComponent(obj5, obj5Rbc);
		layer.addGameObject(obj5);
	}

	var obj2Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj2 = new BoxObject().initialize(250, y, 20, 20, ColorUtils.randomColor2(), "black");
	ComponentUtils.addComponent(obj2, obj2Rbc);
	layer.addGameObject(obj2);

	var obj4Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj4 = new CircleObject().initialize(550, y, 10, ColorUtils.randomColor2(), "black");
	ComponentUtils.addComponent(obj4, obj4Rbc);
	layer.addGameObject(obj4);

	var obj6Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj6 = new PolygonObject().initialize(850,  y,[
		new Point2D().initialize(-10,  0),
		new Point2D().initialize(  0,-10),
		new Point2D().initialize( 10,  0),
		new Point2D().initialize(  0, 10)],
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