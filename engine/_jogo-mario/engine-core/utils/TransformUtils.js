var TransformUtils = new function(){

this.createRotateTransform = function(angle){
	return new Transform().initialize(MathUtils.cos(angle), 
	                                  -MathUtils.sin(angle), 
	                                  0, 
	                                  MathUtils.sin(angle), 
	                                  MathUtils.cos(angle), 
	                                  0);
}

this.createRotateTransform = function(angle, x, y){
	var temp = this.createRotateTransform(angle);
	var sinAngle = temp.matrixPosition[3];
    var oneMinusCosAngle = 1.0 - temp.matrixPosition[4];
    temp.matrixPosition[2] = x * oneMinusCosAngle + y * sinAngle;
    temp.matrixPosition[5] = y * oneMinusCosAngle - x * sinAngle;
    return temp;
}

this.createTranslateTransform = function(xOffset, yOffset) {   
	return new Transform().initialize(1, 0, xOffset, 0, 1, yOffset);   
}

this.createScaleTransform = function(xScale, yScale) {   
	return new Transform().initialize(xScale, 0, 0, 0, yScale, 0);   
}

}
