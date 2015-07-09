var PropertiesController = new function() {
	
	this.wrappers = [];
	
	this.bindProperties = function() {
		var name = new TextInputProperty().init('input', 'name', 'name', true, false);
		name.bind();
		
		var sizeX = new NumberInputProperty().init('x', 'size', 'width', false, true);
		var sizeY = new NumberInputProperty().init('y', 'size', 'height', false, true);
		var sizeZ = new NumberInputProperty().init('z', 'size', 'depth', false, true);
		sizeX.bind();
		sizeY.bind();
		sizeZ.bind();
		
		var positionX = new NumberInputProperty().init('x', 'position', 'x', false, true);
		var positionY = new NumberInputProperty().init('y', 'position', 'y', false, true);
		var positionZ = new NumberInputProperty().init('z', 'position', 'z', false, true);
		positionX.bind();
		positionY.bind();
		positionZ.bind();
		
		var positionCameraX = new NumberInputProperty().init('x', 'position-camera', 'x', false, true);
		var positionCameraY = new NumberInputProperty().init('y', 'position-camera', 'y', false, true);
		var positionCameraZ = new NumberInputProperty().init('z', 'position-camera', 'z', false, true);
		positionCameraX.bind();
		positionCameraY.bind();
		positionCameraZ.bind();
		
		
		var lookatX = new NumberInputProperty().init('x', 'lookat', 'x_lookat', false, true);
		var lookatY = new NumberInputProperty().init('y', 'lookat', 'y_lookat', false, true);
		var lookatZ = new NumberInputProperty().init('z', 'lookat', 'z_lookat', false, true);
		lookatX.bind();
		lookatY.bind();
		lookatZ.bind();
		
		var pointsLength = new PointsLengthProperty().init('length', 'points', 'points_length', false, true);
		pointsLength.bind();
		
		var points = new PointsDynamicComboBoxProperty().init('points', 'points', 'points_index', false, true);
		points.bind();
				
		var lightType = new ComboBoxProperty().init('types', 'lightType', 'typeIndex', false, true);
		lightType.bind();
		
		var pointX = new PointsNumberInputProperty().init('x', 'points', 'x', false, true);
		var pointY = new PointsNumberInputProperty().init('y', 'points', 'y', false, true);
		var pointZ = new PointsNumberInputProperty().init('z', 'points', 'z', false, true);
		pointX.bind();
		pointY.bind();
		pointZ.bind();
		
		var primitiveSelect = new ComboBoxProperty().init('select', 'primitive', 'primitive', false, true);
		primitiveSelect.bind();

		var pointP1X = new NumberSubProperty().init('x', 'p1', 'x', false, true);
		var pointP1Y = new NumberSubProperty().init('y', 'p1', 'y', false, true);
		var pointP1Z = new NumberSubProperty().init('z', 'p1', 'z', false, true);
		pointP1X.bind();
		pointP1Y.bind();
		pointP1Z.bind();

		var pointP2X = new NumberSubProperty().init('x', 'p2', 'x', false, true);
		var pointP2Y = new NumberSubProperty().init('y', 'p2', 'y', false, true);
		var pointP2Z = new NumberSubProperty().init('z', 'p2', 'z', false, true);
		pointP2X.bind();
		pointP2Y.bind();
		pointP2Z.bind();

		var pointP3X = new NumberSubProperty().init('x', 'p3', 'x', false, true);
		var pointP3Y = new NumberSubProperty().init('y', 'p3', 'y', false, true);
		var pointP3Z = new NumberSubProperty().init('z', 'p3', 'z', false, true);
		pointP3X.bind();
		pointP3Y.bind();
		pointP3Z.bind();

		var pointP4X = new NumberSubProperty().init('x', 'p4', 'x', false, true);
		var pointP4Y = new NumberSubProperty().init('y', 'p4', 'y', false, true);
		var pointP4Z = new NumberSubProperty().init('z', 'p4', 'z', false, true);
		pointP4X.bind();
		pointP4Y.bind();
		pointP4Z.bind();
		
		var transformX = new NumberSubProperty().init('x', 'values', 'x', false, true);
		var transformY = new NumberSubProperty().init('y', 'values', 'y', false, true);
		var transformZ = new NumberSubProperty().init('z', 'values', 'z', false, true);
		transformX.bind();
		transformY.bind();
		transformZ.bind();
		pointP4Z.bind();
		
		var rotateX = new AngleSubProperty().init('x', 'values-rotate', 'x', false, true);
		var rotateY = new AngleSubProperty().init('y', 'values-rotate', 'y', false, true);
		var rotateZ = new AngleSubProperty().init('z', 'values-rotate', 'z', false, true);
		rotateX.bind();
		rotateY.bind();
		rotateZ.bind();
		
		var splinePointsLength = new NumberInputProperty().init('length', 'splineLength', 'numPoints', false, true);
		splinePointsLength.bind();
		
		var color = new ColorInputProperty().init('picker', 'color', 'color', false, true);
		color.bind();
		
		var textureCheck = new CheckBoxProperty().init('check', 'texture', 'enableTexture', false, true);
		textureCheck.bind();
		
		var textureImage = new FileInputProperty().init('chooser', 'texture', 'textureFile', false, true);
		textureImage.bind();
		
		var textureSelect = new ComboBoxProperty().init('select', 'texture', 'listTextureImage', false, true);
		textureSelect.bind();

		var activeCheck = new CheckBoxProperty().init('check', 'polyhedron', 'polyhedron_enable', false, true);
		activeCheck.bind();
		
		var polyhedronColor = new ColorInputProperty().init('picker', 'polyhedron', 'polyhedron_color', false, true);
		polyhedronColor.bind();
		
		var activeCheck = new CheckBoxProperty().init('check', 'active', 'active', false, true);
		activeCheck.bind();
		
		var matrix = new LabelMatrixProperty().init('field', 'matrix', 'matrix', false, true);
		activeCheck.bind();
		
		var near = new NumberInputProperty().init('near', 'near', 'near', false, true);
		near.bind();
		
		var far = new NumberInputProperty().init('far', 'far', 'far', false, true);
		far.bind();
		
		var fov = new NumberInputProperty().init('fov', 'fov', 'fov', false, true);
		fov.bind();
		
		var intensity = new NumberInputProperty().init('intensity', 'intensity', 'intensity', false, true, function(properties) {
			return  properties['typeIndex'] > 0;
		});
		intensity.bind();
		
		var distance = new NumberInputProperty().init('distance', 'distance', 'distance', false, true, function(properties) {return  properties['typeIndex'] > 2; });
		distance.bind();
		
		var angle = new NumberInputProperty().init('angle', 'angle', 'angle', false, true, function(properties) {return  properties['typeIndex'] == 4; });
		angle.bind();
		
		var exponent = new NumberInputProperty().init('exponent', 'exponent', 'exponent', false, true, function(properties) {return  properties['typeIndex'] == 4; });
		exponent.bind();

		var clear = new ColorInputProperty().init('picker', 'clear', 'clear', false, true);
		clear.bind();
		
		var backgroundColor = new ColorInputProperty().init('picker', 'background-color', 'background', false, true);
		backgroundColor.bind();
		
		var background = new ColorInputProperty().init('picker', 'background', 'background', false, true, function(properties) {return  properties['typeIndex'] == 1; });
		background.bind();
		
		var wrapperTarget = new PropertiesWrapper().init('targetPosition', function(properties) {return properties['typeIndex'] == 2 || properties['typeIndex'] == 4;});
		this.wrappers.push(wrapperTarget);

		var targetX = new NumberInputProperty().init('x', 'targetPosition', 'target_x', false, true);
		var targetY = new NumberInputProperty().init('y', 'targetPosition', 'target_x', false, true);
		var targetZ = new NumberInputProperty().init('z', 'targetPosition', 'target_x', false, true);
		targetX.bind();
		targetY.bind();
		targetZ.bind();

		var gridCheck = new CheckBoxProperty().init('check', 'grid', 'grid', false, true);
		gridCheck.bind();
		
		var axisCheck = new CheckBoxProperty().init('check', 'axis', 'axis', false, true);
		axisCheck.bind();

		var mode = new ComboBoxProperty().init('mode', 'mode', 'mode', false, true);
		mode.bind();
		
	}
	
	this.setupProperties = function() {
		var selected = PiecesController.selected;
		var piece = $(selected).data('piece');
		if (selected) {
			var properties = piece.properties;
			var fields = $('.property.'+piece.type.id);
			this.showProperties(fields);
			$.each(fields, function(index, item) {
				$.each($(item).find('.prop-field'), function(index, field) {
					$(field).data("property").checkEvaluate(item, properties);					
				});
			});
			$.each(PropertiesController.wrappers, function(index, item) {
				item.check(properties);
			});
		} else {
			this.hideProperties();
		}
		PropertiesController.check3DProperties();
	}
	
	this.hideProperties = function() {
		$('.property').hide()
		$('.property.none').show();		
	}
	
	this.showProperties = function(properties) {
		$('.property').hide();
		properties.show();		
	}
	
	this.check3DProperties = function () {
		if (VisEdu.mode === '2D') {
			PropertiesController.hide3DProperties();	
		}
	}
	

	this.hide3DProperties = function() {
		$('.3d:visible').hide();
	}	
}