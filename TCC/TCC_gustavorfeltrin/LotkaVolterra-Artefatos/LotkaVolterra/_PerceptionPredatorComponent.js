function PerceptionPredatorComponent(){}

PerceptionPredatorComponent.prototype = new Component();

PerceptionPredatorComponent.prototype.onPercept = function(webSocket){
  webSocket.send(this.owner.id + "#" + this.owner.origin.toString());
}

PerceptionPredatorComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, PerceptionSystem.getTag());
  return systems;
}

PerceptionPredatorComponent.prototype.getTag = function(){
  return "PERCEPTION_PREDATOR_COMPONENT";
}