var ThreeJSBuilder = new function() {

	this.createTemplateObject = function(x, y, z, width, height, depth, component, tag) {
		var object = new TemplateObject().initialize(x, y, z, width, height, depth, component, tag);
		return object;
	}
	
	this.createGroupObject = function() {
		var component = new GroupComponent().initialize();
		var object = this.createTemplateObject(0, 0, 0, 0, 0, 0, component, "GROUP_OBJECT");
		return object;
	}
	
	this.createSquareObject = function(x, y, z, width, height, fillstyle, strokeStyle) {
		var component = new BoxRenderComponent().initialize(fillstyle, strokeStyle);
		var object = this.createTemplateObject(x, y, z, width, height, 0, component, "SQUARE_OBJECT");
		return object;
	}
	
	this.createCubeObject = function(x, y, z, width, height, depth, fillstyle, strokeStyle) {
		var component = new CubeRenderComponent().initialize(fillstyle, strokeStyle);
		var object = this.createTemplateObject(x, y, z, width, height, depth, component, "CUBE_OBJECT");
		return object;
	}

	this.createAmbientLightObject = function(x, y, z, width, height, depth, color) {
		var component = new AmbientLightComponent().initialize(color);
		var object = this.createTemplateObject(x, y, z, width, height, depth, component, "AMBIENT_LIGHT_OBJECT");
		return object;
	}
	
	this.createAnimationObject = function(x, y, z, width, height, spriteSheet, columns, rows) {
		var component = new AnimationRenderComponent().initialize(spriteSheet, columns, rows);
		var object = this.createTemplateObject(x, y, z, width, height, 0, component, "ANIMATION_OBJECT_OBJECT");
		return object;
	}
	
	this.createGridObject = function(x, y, z, width, steps) {
		var component = new GridRenderComponent().initialize(steps);
		var object = this.createTemplateObject(x, y, z, width, width, width, component, "GRID_OBJECT_OBJECT");
		return object;
	}
	
	this.createAxisObject = function(x, y, z, width) {
		var component = new AxisRenderComponent().initialize();
		var object = this.createTemplateObject(x, y, z, width, width, width, component, "AXIS_OBJECT_OBJECT");
		return object;
	}

}