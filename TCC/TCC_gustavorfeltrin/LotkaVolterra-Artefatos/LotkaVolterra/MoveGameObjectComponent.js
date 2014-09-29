function MoveGameObjectComponent(){}

MoveGameObjectComponent.prototype = new Component();

JSUtils.addMethod(MoveGameObjectComponent.prototype, "initialize", 
  function(left, up, right, down, rotateLeft, rotateRight){
    this.initialize();
    this.left = left;
    this.up = up;
    this.right = right;
    this.down = down;
    this.rotateLeft = rotateLeft;
    this.rotateRight = rotateRight;
    return this;
  }
);

MoveGameObjectComponent.prototype.onKeyDown = function(keyCode){
  
}

MoveGameObjectComponent.prototype.onKeyUp = function(keyCode){
  if(keyCode == this.left){    
    this.owner.addMove(-60, 0); 
  }else if(keyCode == this.up){
    this.owner.addMove(0, -60); 
  }else if(keyCode == this.right){
    this.owner.addMove(60, 0); 
  }else if(keyCode == this.down){
    this.owner.addMove(0, 60); 
  }else if(keyCode == this.rotateLeft){
    var translate = ComponentUtils.getComponent(this.owner, "TRANSLATE_COMPONENT");
    translate.setTranslate(-1, 1);
    /*var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
    var angle = rotate.getAngle() - (60/60);
    rotate.setRotate(angle);*/
  }else if(keyCode == this.rotateRight){
    var translate = ComponentUtils.getComponent(this.owner, "TRANSLATE_COMPONENT");
    translate.setTranslate(1, -1);
    /*var rotate = ComponentUtils.getComponent(this.owner, "ROTATE_COMPONENT");
    var angle = rotate.getAngle() + (60/60);
    rotate.setRotate(angle); */
  }
}

MoveGameObjectComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, KeySystem.getTag());
  return systems;
}

MoveGameObjectComponent.prototype.getTag = function(){
  return "MOVE_GAME_OBJECT_COMPONENT";
}