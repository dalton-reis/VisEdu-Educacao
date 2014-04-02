function WalkComponent(){
	this.direction = "RIGHT";	
}

WalkComponent.prototype = new Component();

WalkComponent.prototype.getTag = function(){
	return "WALK_COMPONENT";
}

WalkComponent.prototype.onKeyDown = function(keyCode){
	var rbc = this.gameObject.getComponent("RIGID_BODY_COMPONENT");
	if(rbc != null){
		var lv = rbc.body.GetLinearVelocity();
		if(keyCode == 39){
			this.direction = "RIGHT";
			lv.x = 350
			rbc.body.SetLinearVelocity(lv);
		}else if(keyCode == 37){
			this.direction = "LEFT";
			lv.x = -350
			rbc.body.SetLinearVelocity(lv);
		}
	}
}

WalkComponent.prototype.onKeyUp = function(keyCode){
	var rbc = this.gameObject.getComponent("RIGID_BODY_COMPONENT");
	if(rbc != null){
		var lv = rbc.body.GetLinearVelocity();
		if(keyCode == 39){
			lv.x = 0;
			rbc.body.SetLinearVelocity(lv);
		}else if(keyCode == 37){
			lv.x = 0;
			rbc.body.SetLinearVelocity(lv);
		}
	}
}