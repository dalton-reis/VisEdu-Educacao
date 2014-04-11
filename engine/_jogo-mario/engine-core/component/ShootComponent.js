function ShootComponent(){}

ShootComponent.prototype = new Component();

ShootComponent.prototype.getTag = function(){
	return "SHOOT_COMPONENT";
}

ShootComponent.prototype.onKeyDown = function(keyCode){
	var rbc = this.gameObject.getComponent("RIGID_BODY_COMPONENT");
	var wc = this.gameObject.getComponent("WALK_COMPONENT");
	if(rbc != null){
		if(keyCode == 17){
			var image = new Image();
			image.src="./images/fireball.png";
			var position = rbc.body.m_position;
			var offset = 20;
			var vel = 1000;
			if(wc.direction == "LEFT"){
				offset = -20;
				vel = -1000;
			}
			var object = new GameObject().initialize(position.x + offset, 
			                                         position.y, 
			                                         image);
			var nrb = new RigidBodyComponent();
			nrb.allowSleep = false;
			object.addComponent(nrb);
			object.addComponent(new HTML5RenderComponent());
			
			var lv = nrb.body.GetLinearVelocity();
			lv.x = vel;
			lv.y = 20;
			
			game.currentScene.addGameObject(object);
		}
	}
}