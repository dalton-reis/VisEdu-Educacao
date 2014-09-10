function ActPreyComponent(){}

ActPreyComponent.prototype = new Component();

ActPreyComponent.prototype.onAct = function(message){
  var keyCode = parseInt(message);
  if(keyCode == 37){
     this.owner.addMove(-60, 0); 
  }else if(keyCode == 38){
     this.owner.addMove(0, -60); 
  }else if(keyCode == 39){
     this.owner.addMove(60, 0); 
  }else if(keyCode == 40){
     this.owner.addMove(0, 60); 
  }
}

ActPreyComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, ActionSystem.getTag());
  return systems;
}

ActPreyComponent.prototype.getTag = function(){
  return "ACT_PREY_COMPONENT";
}