var MathUtils = new function(){
	
this.reduceSinAngle = function(radians) {
	var orig = radians;
 	radians %= Math.PI * 2.0;
    if (Math.abs(radians) > Math.PI) {
    	radians = radians - (Math.PI * 2.0);
    }
    if (Math.abs(radians) > Math.PI / 2) {
    	radians = Math.PI - radians;
    }
    return radians;
}

this.sin = function(radians) {
	radians = this.reduceSinAngle(radians);
    if (Math.abs(radians) <= Math.PI / 4) {
    	return Math.sin(radians);
    } else {
    	return Math.cos(Math.PI / 2 - radians);
    }
}

this.cos = function(radians) {
	return this.sin(radians + Math.PI / 2);
}

this.toDegrees = function(radians){
	return radians/(Math.PI/180);
}

this.toRadians = function(degrees){ 
	return Math.PI/180*degrees;
};
	
}

