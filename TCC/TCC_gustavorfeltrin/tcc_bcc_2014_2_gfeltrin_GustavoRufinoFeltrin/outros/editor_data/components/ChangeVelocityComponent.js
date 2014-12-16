function ChangeVelocityComponent(){}

ChangeVelocityComponent.prototype = new Component();

JSUtils.addMethod(ChangeVelocityComponent.prototype, "initialize", 
  function(upX, downX, upY, downY, value, initialVelocityX, initialVelocityY){
    this.initialize();
    this.upX = upX;
    this.downX = downX;
    this.upY = upY;
    this.downY = downY; 
    this.value = value;
    this.initialVelocityX = initialVelocityX;
    this.initialVelocityY = initialVelocityY;
    return this;
  }
);

ChangeVelocityComponent.prototype.onLoad = function(){
  this.owner.setLinearVelocityX( this.initialVelocityX ? this.initialVelocityX : 0 );
  this.owner.setLinearVelocityY( this.initialVelocityY ? this.initialVelocityY : 0 );
}

ChangeVelocityComponent.prototype.onKeyUp = function(keyCode){
  if (keyCode == this.upX) {
    this.owner.setLinearVelocityX( this.owner.getLinearVelocityX() + this.value );
  } else if (keyCode == this.downX) {
    this.owner.setLinearVelocityX( this.owner.getLinearVelocityX() - this.value );
  } else if (keyCode == this.upY) {
    this.owner.setLinearVelocityY( this.owner.getLinearVelocityY() - this.value );
  } else if (keyCode == this.downY) {
    this.owner.setLinearVelocityY( this.owner.getLinearVelocityY() + this.value );
  }
}

ChangeVelocityComponent.prototype.getSystems = function(){
  var systems = new Array();
  systems = ArrayUtils.addElement(systems, KeySystem.getTag());
  return systems;
}

ChangeVelocityComponent.prototype.getTag = function(){
  return "CHANGE_VELOCITY_COMPONENT";
}