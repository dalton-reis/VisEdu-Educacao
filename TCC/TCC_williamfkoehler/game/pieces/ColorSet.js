function ColorSet() {}

ColorSet.prototype.init = function(normal, hover, selected) {
	this.normal = normal;
	this.hover = hover;
	this.selected = selected;
	return this;
}