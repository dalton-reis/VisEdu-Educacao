function Polygon(){}

JSUtils.addMethod(Polygon.prototype, "initialize", 
function(){
	this.points = new Array();
	return this;
}
)

JSUtils.addMethod(Polygon.prototype, "initialize", 
function(points){
	this.points = points;
	return this;
}
)

Polygon.prototype.transform = function(transform){
	var resultPolygon = new Polygon().initialize();
	var result = new Array();
	transform.transform(points, 0, result, 0, points.length / 2);
    resultPolygon.points = result;
    return resultPolygon;
}