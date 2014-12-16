function RotateRelativeComponent(){}

RotateRelativeComponent.prototype = new Component(); 

RotateRelativeComponent.prototype.customAngle = 0;
RotateRelativeComponent.prototype.otherObject = null;

JSUtils.addMethod(RotateRelativeComponent.prototype, "initialize", 
  function(left, right){
    this.initialize();
    this.left = left;
    this.right = right;
    return this;
  }
);


RotateRelativeComponent.prototype.onLoad = function(){
	this.otherObject = this.findParent();
}

RotateRelativeComponent.prototype.findParent = function(){
  var myToken = ComponentUtils.getComponent(this.owner, "TOKEN_COMPONENT");
  for(var i in Game.scene.listLayers){
    var layer = Game.scene.listLayers[i];
    if(layer instanceof Layer){
      for(var j in layer.listGameObjects){
        var gameObject = layer.listGameObjects[j];
        if(gameObject instanceof GameObject){
          var goToken = ComponentUtils.getComponent(gameObject, "TOKEN_COMPONENT");
          if ( myToken && goToken && goToken.getToken() != myToken.getToken() && StringUtils.startsWith(goToken.getToken(), myToken.getToken().split("_")[0])) {
            return gameObject;
          }
        }
      }
    }
  }
}

RotateRelativeComponent.prototype.onKeyDown = function(keyCode){
	if(keyCode == this.left){
		this.customAngle -= (10/60);
	}else if(keyCode == this.right){
		this.customAngle += (10/60);
	}
}

RotateRelativeComponent.prototype.onBeforeRender = function(context){
	if(this.otherObject != null){
		var tX = this.otherObject.getCenterX();
		var tY = this.otherObject.getCenterY();
		context.translate(tX, tY);
		context.rotate(this.customAngle);
		context.translate(-tX, -tY);
	}
}

RotateRelativeComponent.prototype.getSystems = function(){
    var systems = new Array();
    systems = ArrayUtils.addElement(systems, KeySystem.getTag());
    systems = ArrayUtils.addElement(systems, RenderSystem.getTag());
    return systems;
}

RotateRelativeComponent.prototype.getTag = function(){
 	   return "ROTATE_RELATIVE_COMPONENT";
}