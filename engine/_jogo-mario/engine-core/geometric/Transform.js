function Transform(){}

JSUtils.addMethod(Transform.prototype, "initialize", 
function(){
	this.matrixPosition = new Array(1, 0, 0, 0, 1, 0, 0, 0, 1); 
	return this;
}
);

JSUtils.addMethod(Transform.prototype, "initialize", 
function(matrixPosition){
	if(matrixPosition.length == 6){
		this.matrixPosition = new Array(matrixPosition[0], 
		                                matrixPosition[1], 
		                                matrixPosition[2],    
                                        matrixPosition[3], 
                                        matrixPosition[4], 
                                        matrixPosition[5],    
                                        0, 0, 1);
	}
	return this;
}
);

JSUtils.addMethod(Transform.prototype, "initialize", 
function(point00, point01, point02, point10, point11, point12){
	this.matrixPosition = new Array(point00, point01, point02, point10, point11, point12, 0, 0, 1); 
	return this;
}
);

JSUtils.addMethod(Transform.prototype, "transform",
function(source, sourceOffset, destination, destOffset, numberOfPoints){
	var result = new Array();
	for(i=0;i<numberOfPoints * 2;i+=2) { 
		for(j=0;j<6;j+=3) {
			result[i + (j / 3)] = source[i + sourceOffset] * this.matrixPosition[j] + 
								  source[i + sourceOffset + 1] * this.matrixPosition[j + 1] 
								  + 1 * this.matrixPosition[j + 2];
		}
	} 
	for(i=0;i<numberOfPoints * 2;i+=2) {   
		destination[i + destOffset] = result[i];   
		destination[i + destOffset + 1] = result[i + 1];   
	} 
}
);

JSUtils.addMethod(Transform.prototype, "transform",
function(vector){
	var src = new Array(vector.x, vector.y);
	var dst = new Array();
    this.transform(src, 0, dst, 0, 1);
	return new Vector2D().initialize(dst[0], dst[1]);
}
);

Transform.prototype.concatenate = function(transform){
	var mp = new Array();
	var n00 = this.matrixPosition[0] * transform.matrixPosition[0] + this.matrixPosition[1] * transform.matrixPosition[3];
	var n01 = this.matrixPosition[0] * transform.matrixPosition[1] + this.matrixPosition[1] * transform.matrixPosition[4];
	var n02 = this.matrixPosition[0] * transform.matrixPosition[2] + this.matrixPosition[1] * transform.matrixPosition[5] + this.matrixPosition[2];
	var n10 = this.matrixPosition[3] * transform.matrixPosition[0] + this.matrixPosition[4] * transform.matrixPosition[3];
	var n11 = this.matrixPosition[3] * transform.matrixPosition[1] + this.matrixPosition[4] * transform.matrixPosition[4];
	var n12 = this.matrixPosition[3] * transform.matrixPosition[2] + this.matrixPosition[4] * transform.matrixPosition[5] + this.matrixPosition[5];
	mp[0] = n00;
	mp[1] = n01;
	mp[2] = n02;
	mp[3] = n10;
	mp[4] = n11;
	mp[5] = n12;
	this.matrixPosition = mp;
	return this;
}