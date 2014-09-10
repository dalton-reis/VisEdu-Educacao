function MovePredatorComponent(){}

MovePredatorComponent.prototype = new Component();

MovePredatorComponent.prototype.onKeyDown = function(keyCode){
  if(keyCode == 37){
     this.owner.setLinearVelocityX(-350); 
  }else if(keyCode == 39){
     this.owner.setLinearVelocityX(350);
  }else if(keyCode == 38){
     this.owner.setLinearVelocityY(-350);
  }else if(keyCode == 40){
     this.owner.setLinearVelocityY(350);
  }
}

MovePredatorComponent.prototype.onKeyUp = function(keyCode){
  if(keyCode == 37){
     this.owner.setLinearVelocityX(0); 
  }else if(keyCode == 38){
     this.owner.setLinearVelocityX(0);
  }else if(keyCode == 39){
     this.owner.setLinearVelocityY(0);
  }else if(keyCode == 40){
     this.owner.setLinearVelocityY(0);
  }
}

MovePredatorComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, KeySystem.getTag());
  return systems;
}

MovePredatorComponent.prototype.getTag = function(){
  return "MOVE_PREDATOR_COMPONENT";
}