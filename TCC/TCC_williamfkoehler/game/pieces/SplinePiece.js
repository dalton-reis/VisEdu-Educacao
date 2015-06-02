function SplinePiece() {}

SplinePiece.prototype = new Piece();
SplinePiece.prototype.constructor = SplinePiece;
SplinePiece.prototype.$_setupProperties = SplinePiece.prototype._setupProperties;
SplinePiece.prototype.type = Types.typeSpline;


SplinePiece.prototype.genGameObject = function() {
	return VisEdu.factory.createSpline(this);
}

SplinePiece.prototype._setupProperties = function() {
	this.$_setupProperties();
	this.properties['points_length'] = 3;
	this.properties['p1'] = new Point3D().initialize(-200, -200, 0);
	this.properties['p2'] = new Point3D().initialize(-200, 200, 100);
	this.properties['p3'] = new Point3D().initialize(200, 200, 100);
	this.properties['p4'] = new Point3D().initialize(200, -200, 100);	
	this.properties['numPoints'] = '20';
	this.properties['color'] = 0x008040;
	this.properties['polyhedron_enable'] = true;
	this.properties['polyhedron_color'] = 0x00FFFF;
}