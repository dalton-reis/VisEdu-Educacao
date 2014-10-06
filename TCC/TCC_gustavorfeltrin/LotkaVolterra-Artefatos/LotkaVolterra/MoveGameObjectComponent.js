function MoveGameObjectComponent(){}

MoveGameObjectComponent.prototype = new Component();

JSUtils.addMethod(MoveGameObjectComponent.prototype, "initialize", 
  function(left, up, right, down){
    this.initialize();
    this.left = left;
    this.up = up;
    this.right = right;
    this.down = down;
    return this;
  }
);

MoveGameObjectComponent.prototype.onKeyDown = function(keyCode){
  
}

MoveGameObjectComponent.prototype.onKeyUp = function(keyCode){
  if(keyCode == this.left){    
    this.owner.addMove(-30, 0); 
  }else if(keyCode == this.up){
    this.owner.addMove(0, -30); 
  }else if(keyCode == this.right){
    this.owner.addMove(30, 0); 
  }else if(keyCode == this.down){
    this.owner.addMove(0, 30); 
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