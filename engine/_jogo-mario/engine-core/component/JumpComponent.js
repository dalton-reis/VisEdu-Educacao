function JumpComponent(){
	this.isJumping = false;
}

JumpComponent.prototype = new Component();

JumpComponent.prototype.getTag = function(){
	return "JUMP_COMPONENT";
}

JumpComponent.prototype.onBeforeRender = function(){
	if(this.isJumping == true){
		var rbc = this.gameObject.getComponent("RIGID_BODY_COMPONENT");
		if(rbc != null){
			var lv = rbc.body.GetLinearVelocity();
			//alert("sds" + lv.y);
			if(lv.y >= 0){
				this.isJumping = false;
			}
		}
	}
}

JumpComponent.prototype.onKeyDown = function(keyCode){
	var rbc = this.gameObject.getComponent("RIGID_BODY_COMPONENT");
	if(rbc != null){
		//if(this.isJumping == false){
			if(keyCode == 32){
				var lv = rbc.body.GetLinearVelocity();
				lv.y = -500;
				rbc.body.SetLinearVelocity(lv);
				this.isJumping = true;
			}
		//}
	}
}