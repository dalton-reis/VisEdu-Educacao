function Vector2D(){}

JSUtils.addMethod(Vector2D.prototype, "initialize", 
function(theta){
	this.x = 1;
	this.y = 0;
	this.setTheta(theta);
	return this;
}
);
  	
 JSUtils.addMethod(Vector2D.prototype, "initialize", 
 function(x, y){
	this.x = x;
	this.y = y;
	return this;
 }
 );	
             
Vector2D.prototype.setTheta = function(theta){
	if ((theta < -360) || (theta > 360)) {
    	theta = theta % 360;
    }
    if (theta < 0) {
    	theta = 360 + theta;
    }
    var oldTheta = this.getTheta();
    if ((theta < -360) || (theta > 360)) {
    	oldTheta = oldTheta % 360;
    }
    if (theta < 0) {
    	oldTheta = 360 + oldTheta;
    }
    var len = this.length(); 
    this.x = len * MathUtils.cos(MathUtils.toRadians(theta));
    this.y = len * MathUtils.sin(MathUtils.toRadians(theta));
 }
 
Vector2D.prototype.getTheta = function() {
	var theta = MathUtils.toDegrees(Math.atan2(this.y, this.x));
    if ((theta < -360) || (theta > 360)) {
    	theta = theta % 360;
    }
    if (theta < 0) {
    	theta = 360 + theta;
    }
    return theta;
} 

JSUtils.addMethod(Vector2D.prototype, "add", 
function(theta) {
	this.setTheta(this.getTheta() + theta);
}
);

JSUtils.addMethod(Vector2D.prototype, "add", 
function(x, y) {
	this.x += x;
	this.y += y;
}
);

JSUtils.addMethod(Vector2D.prototype, "sub", 
function(theta) {
	this.setTheta(this.getTheta() - theta);
}
);

JSUtils.addMethod(Vector2D.prototype, "sub", 
function(x, y) {
	this.x -= x;
	this.y -= y;
}
);

Vector2D.prototype.lengthSquared = function() {
	return (this.x * this.x) + (this.y * this.y);
}

Vector2D.prototype.length = function() {
	return Math.sqrt(this.lengthSquared());
}

Vector2D.prototype.set = function(x, y){
	this.x = x;
	this.y = y;
}

Vector2D.prototype.negate = function(){
	this.x = -this.x;
	this.y = -this.y;
}

Vector2D.prototype.scale = function(scale){
	this.x *= scale;
	this.y *= scale;
}

Vector2D.prototype.normalise = function(){
	var l = this.length();
	if (l != 0) {
    	this.x /= l;
   		this.y /= l;
    }
}

Vector2D.prototype.getNormal = function() {
	var cp = this.copy();
	cp.normalise();
	return cp;
}

Vector2D.prototype.copy = function(){
	return new Vector2D().initialize(this.x, this.y);
}

Vector2D.prototype.distance = function(other){
	return Math.sqrt(this.distanceSquared(other));
}

Vector2D.prototype.distanceSquared = function(other){
	var dx = other.x - this.x;
    var dy = other.y - this.y;
	return (dx*dx)+(dy*dy);
}

Vector2D.prototype.equals = function(other){
	if((other.x == this.x) && (other.y == this.y)){
		return true;
	}else{
		return false;
	}
}

Vector2D.prototype.toString = function(){
	return this.x + ', ' + this.y;
}

function teste(){
	var v1 = new Vector2D().initialize(-9.949307700452986, 56.425327879361504);
	var v2 = new Vector2D().initialize(100);
	console.info('vector2 x-y = ' + v2.toString());
	console.info('vector1 theta = ' + v1.getTheta());
}

teste();