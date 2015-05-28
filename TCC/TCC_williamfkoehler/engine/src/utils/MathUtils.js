var MathUtils = new function () {
	
	this.radToAngle = function(rads) {
		return rads * 180 / Math.PI;
	}
	
	this.angleToRads = function(angle) {
		return angle * Math.PI / 180;
	}
	
}