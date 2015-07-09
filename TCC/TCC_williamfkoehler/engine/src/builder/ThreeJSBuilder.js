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
	
	this.createSquareObject = function(x, y, z, width, height, fillstyle, strokeStyle, texture) {
		var component = new BoxRenderComponent().initialize(fillstyle, strokeStyle, texture);
		var object = this.createTemplateObject(x, y, z, width, height, 0, component, "SQUARE_OBJECT");
		return object;
	}
	
	this.createCubeObject = function(x, y, z, width, height, depth, fillstyle, strokeStyle, texture) {
		var component = new CubeRenderComponent().initialize(fillstyle, strokeStyle, texture);
		var object = this.createTemplateObject(x, y, z, width, height, depth, component, "CUBE_OBJECT");
		return object;
	}
	
	this.createPolygonObject = function(x, y, z, points, faces, fillstyle, strokeStyle) {
		var component = new PolygonRenderComponent().initialize(fillstyle, strokeStyle);
		var object = this.createTemplateObject(x, y, z, 0, 0, 0, component, "POLYGON_OBJECT");
		object.faces = faces;
		object.points = points;
		return object;
	}
	
	this.createLinesObject = function(x, y, z, points, fillstyle) {
		var component = new LinesRenderComponent().initialize(fillstyle);
		var object = new TemplateWithPointsObject().initialize(x, y, z, 0, 0, 0, points, component, "LINES_OBJECT");
		return object;
	}
	
	this.createSpheresObject = function(x, y, z, points, fillStyle, radius) {
		var component = new SpheresRenderComponent().initialize(fillStyle, radius);
		var object = new TemplateWithPointsObject().initialize(x, y, z, 0, 0, 0, points, component, "SPHERES_OBJECT");
		return object;
	}
	
	this.createCirclesObject = function(x, y, z, points, fillStyle, radius) {
		var component = new CirclesRenderComponent().initialize(fillStyle, radius);
		var object = new TemplateWithPointsObject().initialize(x, y, z, 0, 0, 0, points, component, "CIRCLES_OBJECT");
		return object;
	}
	
	this.createSplineObject = function(x, y, z, points, numPoints, color, enablePolyhedron, polyhedronColor) {
		var component = new SplineRenderComponent().initialize(numPoints, color, enablePolyhedron, polyhedronColor);
		var object = new TemplateWithPointsObject().initialize(x, y, z, 0, 0, 0, points, component, "SPLINE_OBJECT");
		return object;
	}

	this.createAmbientLightObject = function(color) {
		var component = new AmbientLightComponent().initialize(color);
		var object = this.createTemplateObject(0, 0, 0, 0, 0, 0, component, "AMBIENT_LIGHT_OBJECT");
		return object;
	}
	
	this.createHemisphereLightObject = function(x, y, z, color, background, intensity) {
		var component = new HemisphereLightComponent().initialize(color, background, intensity);
		var object = this.createTemplateObject(x, y, z, 0, 0, 0, component, "HEMISPHERE_LIGHT_OBJECT");
		return object;
	}
	
	this.createDirectionalLightObject = function(x, y, z, target_x, target_y, target_z, color, intensity) {
		var component = new DirectionalLightComponent().initialize(target_x, target_y, target_z, color, intensity);
		var object = this.createTemplateObject(x, y, z, 0, 0, 0, component, "DIRECTIONAL_LIGHT_OBJECT");
		return object;
	}
	
	this.createPointLightObject = function(x, y, z, color, intensity, distance) {
		var component = new PointLightComponent().initialize(color, intensity, distance);
		var object = this.createTemplateObject(x, y, z, 0, 0, 0, component, "POINT_LIGHT_OBJECT");
		return object;
	}
	
	this.createSpotLightObject = function(x, y, z, target_x, target_y, target_z, color, intensity, distance, angle, exponent) {
		var component = new SpotLightComponent().initialize(target_x, target_y, target_z, color, intensity, distance, angle, exponent);
		var object = this.createTemplateObject(x, y, z, 0, 0, 0, component, "SPOT_LIGHT_OBJECT");
		return object;
	}
	
	this.createAnimationObject = function(x, y, z, width, height, spriteSheet, columns, rows) {
		var component = new AnimationRenderComponent().initialize(spriteSheet, columns, rows);
		var object = this.createTemplateObject(x, y, z, width, height, 0, component, "ANIMATION_OBJECT");
		return object;
	}
	
	this.createGridObject = function(x, y, z, width, steps) {
		var component = new GridRenderComponent().initialize(steps);
		var object = this.createTemplateObject(x, y, z, width, width, width, component, "GRID_OBJECT");
		return object;
	}
	
	this.createCameraObject = function(x, y, z, aspect, fov, near, far) {
		var component = new CameraComponent().initialize(aspect, fov, near, far);
		var object = this.createTemplateObject(x, y, z, 0, 0, 0, component, "CAMERA_OBJECT");
		return object;
	}
	
	this.createAxisObject = function(x, y, z, width) {
		var component = new AxisRenderComponent().initialize();
		var object = this.createTemplateObject(x, y, z, width, width, width, component, "AXIS_OBJECT_OBJECT");
		return object;
	}

}