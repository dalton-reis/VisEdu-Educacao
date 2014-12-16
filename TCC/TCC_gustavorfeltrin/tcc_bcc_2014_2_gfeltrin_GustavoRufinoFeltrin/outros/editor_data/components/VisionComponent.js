/* Quando fizer isso funcionar deve ser criado um componente generico que defina o flush, 
e 2 implementações. Uma para o campo de visão relativo ao frustum... e outra para audição (circulo) */
function VisionComponent(){}

/* ********************************************* 
 *isso vai na classe PerceptionVisionComponent*/
PerceptionVisionComponent.prototype.agent = null;
/* ******************************************* */

VisionComponent.prototype = new Component();

JSUtils.addMethod(VisionComponent.prototype, "initialize", 
	function(range, width, orientation, uri){
		this.initialize();
		this.range = range;
		this.width = width;
		this.orientation = orientation;
		this.uri = uri;
		return this;
	}
);

VisionComponent.prototype.onLoad = function() {
	var vc = this;
	if ( this.orientation=="HORIZONTAL" ) {
		var x2 = this.range;
		var y2 = (this.width/2) * -1;
		var x3 = this.range;
		var y3 = this.width/2;
	} else if ( this.orientation=="VERTICAL" ) {
		var x2 = (this.width/2) * -1;
		var y2 = this.range;
		var x3 = this.width/2;
		var y3 = this.range;
	} else {
		alert("Invalid orientation!");
		return;
	}
	var pt1 = new Point2D().initialize(0, 0);
	var pt2 = new Point2D().initialize(x2, y2);
	var pt3 = new Point2D().initialize(x3, y3);
	var frustum = new PolygonObject().initialize(
		this.owner.origin.x,
		this.owner.origin.y,
		[pt1, pt2, pt3], 
		"rgba(255, 0, 0, 0.3)",
		"rgba(0, 0, 0, 0.3)");

	var rbc = new RigidBodyComponent().initialize(0, 1, true, false, 0.2);
	ComponentUtils.addComponent(frustum, rbc);
	rbc.onUpdate = function(deltaTime) {
		if(this.owner.recreateBody){
			this.createPhysicsBody();
			this.owner.recreateBody = false;
		}

		var render = ComponentUtils.getComponent(this.owner, "POLYGON_RENDER_COMPONENT");
		var pvc = ComponentUtils.getComponent(this.owner, "PERCEPTION_VISION_COMPONENT");
		if ( pvc && pvc.isOpen ) {
			render.fillStyle = "rgba(255, 255, 0, 0.3)";
		} else {
			render.fillStyle = "rgba(255, 0, 0, 0.5)";
		}
		this.owner.addMove(pvc.agent.getCenterX()-this.owner.origin.x, pvc.agent.getCenterY()-this.owner.origin.y);
		this.owner.setLinearVelocityX( pvc.agent.getLinearVelocityX() );
		this.owner.setLinearVelocityY( pvc.agent.getLinearVelocityY() );
	}

	var pvpc = new PerceptionVisionPerformanceComponent().initialize(this.uri);
	ComponentUtils.addComponent(frustum, pvpc);

	var ownerTc = ComponentUtils.getComponent(this.owner, "TOKEN_COMPONENT");
	if ( ownerTc ) {
		var tc = new TokenComponent().initialize(ownerTc.getToken() + "_VISION");
		ComponentUtils.addComponent(frustum, tc);
	}

	pvpc.agent = this.owner;
	this.owner.frustum = frustum;
	this.owner.layer.addGameObject(frustum);

	this.getLoadGameObject(this.owner.frustum);
}

VisionComponent.prototype.getTag = function(){
  return "VISION_COMPONENT";
}

VisionComponent.prototype.getLoadGameObject = function(gameObject){
	if(gameObject instanceof GameObject){
		gameObject.onLoad();
		for(var i in gameObject.listComponents){
			var component = gameObject.listComponents[i];
			if(component instanceof Component){
				component.onLoad();
			}
		}
	}  
}
