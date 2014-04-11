function RigidBodyComponent(){
	this.preventRotation = false;
	this.allowSleep = true;
	this.restitution = 0.0;
}

RigidBodyComponent.prototype = new Component();

RigidBodyComponent.prototype.getTag = function(){
	return "RIGID_BODY_COMPONENT";
}

RigidBodyComponent.prototype.posConstruct = function(){
	this.createBox();
}

RigidBodyComponent.prototype.onCollide = function(collideInfo){
	this.process(collideInfo.gameObjectTwo);
}

RigidBodyComponent.prototype.createBox = function() {
	var boxSd = new b2BoxDef();
	boxSd.restitution = this.restitution;
	if(!this.gameObject.staticObject)boxSd.density = 1.0;
	boxSd.extents.Set(this.gameObject.width/2, this.gameObject.height/2);
	var boxBd = new b2BodyDef();
	boxBd.preventRotation = this.preventRotation;
	boxBd.allowSleep = this.allowSleep;
	boxBd.AddShape(boxSd);
	boxBd.position.Set(this.gameObject.position.x,this.gameObject.position.y);
	this.body = game.b2World.CreateBody(boxBd);
}