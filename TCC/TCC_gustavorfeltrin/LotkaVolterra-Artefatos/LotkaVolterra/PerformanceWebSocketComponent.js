function PerformanceWebSocketComponent(){}

PerformanceWebSocketComponent.prototype = new Component();
PerformanceWebSocketComponent.prototype.direita = true;
PerformanceWebSocketComponent.prototype.linearVelocityX = 100;
PerformanceWebSocketComponent.prototype.minX = 0;
PerformanceWebSocketComponent.prototype.maxX = 800;
PerformanceWebSocketComponent.prototype.mudou = false;

JSUtils.addMethod(PerformanceWebSocketComponent.prototype, "initialize", 
	function(uri, qtd){
		this.initialize();
		this.uri = uri;
		this.qtd = qtd
		return this;
	}
);

PerformanceWebSocketComponent.prototype.onLoad = function(){
	var pwsc = this;
	var angle = Math.PI / 1;
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
				rotate.setRotate( rotate.getAngle() + angle);
				var translate = ComponentUtils.getComponent(this.owner, "TRANSLATE_COMPONENT");
			} else {
				var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
				rotate.setRotate( rotate.getAngle() - angle);
			}
			var translate = ComponentUtils.getComponent(this.owner, "TRANSLATE_COMPONENT");
			translate.setTranslate(this.owner.parent.getCenterX(), this.owner.parent.getCenterY());
			pwsc.mudou = false;
		}
	}
	var boFrustum = new PolygonObject().initialize(this.minX,  160,[
													new Point2D().initialize( 0, 0),
													new Point2D().initialize( 100, -15),
													new Point2D().initialize( 100, 15 )],
													"rgba(255, 255, 0, 0.3)","rgba(0, 0, 0, 0.3)");
	var boFrustumPvc = new PerceptionVisionPerformanceComponent().initialize(this.uri);
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
		if ( pwsc.direita ) {
			this.owner.setLinearVelocityX( pwsc.linearVelocityX );
		} else {
			this.owner.setLinearVelocityX( pwsc.linearVelocityX * -1 );			
		}
		if (pwsc.direita && this.owner.getCenterX() > pwsc.maxX) {
			pwsc.direita = false;
			pwsc.createObjects(160);
			pwsc.mudou = true;
			var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
			rotate.setRotate( rotate.getAngle() - angle);
		}  else if (!pwsc.direita && this.owner.getCenterX() < pwsc.minX) {
			pwsc.direita = true;
			pwsc.createObjects(160);
			pwsc.mudou = true;
			var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
			rotate.setRotate( rotate.getAngle() + angle);
		}
	}
	var tc = new TokenComponent().initialize("PERFORMANCEX");
	var bo = new BoxObject().initialize(this.minX, 160, 30, 30, "green", "black");
	ComponentUtils.addComponent(bo, rbc);
	ComponentUtils.addComponent(bo, tc);
	layer.addGameObject(bo);
	boFrustum.parent = bo;
	pwsc.createObjects(160);
}

PerformanceWebSocketComponent.prototype.createObjects = function(y){
	var obj1Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj1 = new BoxObject().initialize(300, y, 20, 20, ColorUtils.randomColor(), "black");
	ComponentUtils.addComponent(obj1, obj1Rbc);
	layer.addGameObject(obj1);

	var obj2Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj2 = new PolygonObject().initialize(500,  y,[
											new Point2D().initialize(-10,  0),
											new Point2D().initialize(  0,-10),
											new Point2D().initialize( 10,  0),
											new Point2D().initialize(  0, 10)],
											ColorUtils.randomColor(),"black");
	ComponentUtils.addComponent(obj2, obj2Rbc);
	layer.addGameObject(obj2);

	var obj3Rbc = new RigidBodyComponent().initialize(0, 1, false, false, 0.2);
	var obj3 = new CircleObject().initialize(700, y, 10, ColorUtils.randomColor(), "black");
	ComponentUtils.addComponent(obj3, obj3Rbc);
	layer.addGameObject(obj3);
}

PerformanceWebSocketComponent.prototype.getTag = function(){
  return "PERFORMANCE_WEBSOCKET_COMPONENT";
}