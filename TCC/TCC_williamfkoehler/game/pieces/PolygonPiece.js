function PolygonPiece() {}

PolygonPiece.prototype = new Piece();
PolygonPiece.prototype.constructor = PolygonPiece;
PolygonPiece.prototype.$_setupProperties = PolygonPiece.prototype._setupProperties;
PolygonPiece.prototype.$_load = PolygonPiece.prototype.load;
PolygonPiece.prototype.type = Types.typePolygon;

PolygonPiece.prototype.genGameObject = function() {
	return VisEdu.factory.createPolygon(this);
}

PolygonPiece.prototype._setupProperties = function() {
	this.$_setupProperties();
	this.properties['points_length'] = 3;
	this.properties['points_index'] = '0';
	this.properties['points'] = {
	                             '0':new Point3D().initialize(-100, 100, 100),
	                             '1':new Point3D().initialize(-100, -100, 100),
	                             '2':new Point3D().initialize(100, -100, -100)
	};
	this.properties['primitive'] = 'filled';
	this.properties['color'] = 0x007DBE;
}

PolygonPiece.prototype.load = function(properties) {
	this.$_load(properties);
	var newPoints = {};
	$.each(this.properties['points'], function(index, item) {
		newPoints[index] = new Point3D().initialize(item.x, item.y, item.z);
	});
	
	this.properties['points'] = newPoints;
	return this;
}