function Type() {}

Type.prototype.init = function(connector, clazz, id, name, treeBehaviour, graphicalBehaviour) {
	this.connector = connector;
	this.clazz = clazz;
	this.name= name;
	this.id= id;
	this.count = 0;
	this.treeBehaviour = treeBehaviour;
	this.graphicalBehaviour = graphicalBehaviour;
	return this;
}