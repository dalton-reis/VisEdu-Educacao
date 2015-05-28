function Type() {}

Type.prototype.init = function(connector, clazz, name, specificBehaviour, graphicalBehaviour) {
	this.connector = connector;
	this.clazz = clazz;
	this.name= name;
	this.count = 0;
	this.specificBehaviour = specificBehaviour;
	this.graphicalBehaviour = graphicalBehaviour;
	return this;
}