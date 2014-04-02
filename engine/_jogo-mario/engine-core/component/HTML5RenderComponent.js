function HTML5RenderComponent(){}

HTML5RenderComponent.prototype = new Component();

HTML5RenderComponent.prototype.getTag = function(){
	return "HTML5_RENDER_COMPONENT";
}

HTML5RenderComponent.prototype.onRender = function(context, camera){
	if(this.gameObject.img != null){
		var rbc = this.gameObject.getComponent("RIGID_BODY_COMPONENT");
		if(rbc != null){
			for (var s = rbc.body.GetShapeList(); s != null; s = s.GetNext()) {
				context.save();
				var tx = (rbc.body.m_position.x - camera.centerX);
				var ty = (rbc.body.m_position.y - camera.centerY);
				context.translate(tx, 
				                  ty);
				context.rotate(rbc.body.m_rotation);
				var wc = this.gameObject.getComponent("WALK_COMPONENT");
				if(wc != null){
					if(wc.direction == "LEFT"){
						context.scale(-1, 1);
					}
				}
				context.drawImage(this.gameObject.img, 
			                      -(this.gameObject.width/2), 
							      -(this.gameObject.height/2));
				context.restore();
			}
		}
	}
}