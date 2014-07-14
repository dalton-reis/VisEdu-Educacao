var UtilCG = { 

	generateMaterialItems: function ( colorItem ) {

		return new THREE.MeshLambertMaterial( { color: colorItem, overdraw: true } );	
		
	},

	generateContorno: function ( shape ) {

		var geometry = shape.createPointsGeometry();
		var material = new THREE.LineBasicMaterial( { linewidth: 1, color: CG.colors.corContorno, transparent: true } );

		return new THREE.Line( geometry, material );
		
	},
		
	generateMeshFromShape: function ( shape, color ) {

		var geometry = new THREE.ShapeGeometry( shape );
		var material = CG.objects.generateMaterialItems( color );
		var mesh = new THREE.Mesh( geometry, material );
		return mesh;
		
	},
		
	addRetangulo: function ( grupo, shape, color, x, y, z, rx, ry, rz, s, usarContorno, colorContorno) {
		
		var mesh = UtilCG.generateMeshFromShape( shape, color );
		mesh.position.set( x, y, z );
		mesh.rotation.set( rx, ry, rz );
		mesh.scale.set( s, s, s );
		
		grupo.add( mesh );
		
		if	(usarContorno !== undefined && usarContorno) {
			// line
			var line = UtilCG.generateContorno( shape );
			mesh.contorno = line;
			line.position.set( x, y, z );
			line.rotation.set( rx, ry, rz );
			line.scale.set( s, s, s );
			grupo.add( line );
		}
		
		return mesh;
	},
						
	generateLabelMaterialTexture: function ( text ) {

		var x = document.createElement( "canvas" );
		var xc = x.getContext( "2d" );
		x.width = 128;
		x.height = 32;

		xc.fillStyle = "rgba( 0, 0, 0, 0.95 )";
		xc.fillRect( 0, 0, 128, 32 );

		xc.fillStyle = "white";
		xc.font = "12pt arial bold";
		xc.fillText( text, 10, 22 );

		var map = new THREE.Texture( x );
		map.needsUpdate = true;

		var material = new THREE.MeshBasicMaterial( { map: map, transparent: true } );
		return material;
		
	},

	generateTextMesh: function ( texto, color, pai ) {
		var material = new THREE.MeshFaceMaterial( [ 
			new THREE.MeshPhongMaterial( { color: color, shading: THREE.FlatShading } ), // front
			new THREE.MeshPhongMaterial( { color: color, shading: THREE.SmoothShading, transparent: false } ) // side
		] );	
		var geometry = CG.objects.generateLabelGeometry( texto );
		var mesh = new THREE.Mesh( geometry, material );	
		
		if	( pai !== undefined ) {
		
			 pai.textGeometry = geometry;
			
		}
		
		return mesh;
	},

	generateLabelGeometry: function (texto) {

		//propriedades texto	
		var	height = 0,
			size = 30,

			curveSegments = 4,

			bevelThickness = 2,//2,
			bevelSize = 1,//1.5,
			bevelEnabled = true;

			font = "gentilis", // helvetiker, optimer, gentilis, droid sans, droid serif
			weight = "bold", // normal bold
			style = "normal"; // normal italichis
		
		var textoGeo = new THREE.TextGeometry( texto, {
						size: size,
						height: height,
						curveSegments: curveSegments,

						font: font,
						weight: weight,
						style: style,

						bevelThickness: bevelThickness,
						bevelSize: bevelSize,
						bevelEnabled: bevelEnabled,

						material: 0,
						extrudeMaterial: 1
					});

		textoGeo.computeBoundingBox();
		textoGeo.computeVertexNormals();

		return textoGeo;
		
	},

	generateShapeSeta: function () {

		var points = [];

		points.push( new THREE.Vector2 ( -25, 50 ) );
		points.push( new THREE.Vector2 (  30, 50 ) );
		points.push( new THREE.Vector2 (  30, 80 ) );
		points.push( new THREE.Vector2 ( 100, 40 ) );
		points.push( new THREE.Vector2 (  30,  1 ) );
		points.push( new THREE.Vector2 (  30, 30 ) );
		points.push( new THREE.Vector2 ( -25, 30 ) );	

		return new THREE.Shape( points );	
		
	},

	generateShapeEncaixeSeta: function () {

		var points = [];

		
		points.push( new THREE.Vector2 (   0, 85 ) );
		points.push( new THREE.Vector2 ( 110, 85 ) );
		points.push( new THREE.Vector2 ( 110, -5 ) );
		points.push( new THREE.Vector2 (   0, -5 ) );
		points.push( new THREE.Vector2 (  0,  30 ) );
		points.push( new THREE.Vector2 (  30, 30 ) );
		points.push( new THREE.Vector2 (  30, 0 ) );
		points.push( new THREE.Vector2 ( 100, 40 ) );
		points.push( new THREE.Vector2 (  30, 80 ) );
		points.push( new THREE.Vector2 (  30, 50 ) );
		points.push( new THREE.Vector2 (   0, 50 ) );		

		return new THREE.Shape( points );	
		
	},

	generateShapeQuadrado: function () {

		var points = [];

		points.push( new THREE.Vector2 ( -20, 50 ) );
		points.push( new THREE.Vector2 (  30, 50 ) );
		points.push( new THREE.Vector2 (  30, 70 ) );
		points.push( new THREE.Vector2 (  95, 70 ) );
		points.push( new THREE.Vector2 (  95, 10 ) );
		points.push( new THREE.Vector2 (  30, 10 ) );
		points.push( new THREE.Vector2 (  30, 30 ) );
		points.push( new THREE.Vector2 ( -20, 30 ) );	

		return new THREE.Shape( points );	
		
	},

	generateShapeEncaixeQuadrado: function () {

		var points = [];	
		
		points.push( new THREE.Vector2 (   0, 85 ) );
		points.push( new THREE.Vector2 ( 110, 85 ) );
		points.push( new THREE.Vector2 ( 110, -5 ) );
		points.push( new THREE.Vector2 (   0, -5 ) );
		points.push( new THREE.Vector2 (  0,  30 ) );
		points.push( new THREE.Vector2 (  30, 30 ) );
		points.push( new THREE.Vector2 (  30, 10 ) );
		points.push( new THREE.Vector2 (  90, 10 ) );
		points.push( new THREE.Vector2 (  90, 70 ) );
		points.push( new THREE.Vector2 (  30, 70 ) );
		points.push( new THREE.Vector2 (  30, 50 ) );
		points.push( new THREE.Vector2 (   0, 50 ) );

		return new THREE.Shape( points );	
		
	},

	generateShapeDiamante: function () {

		var points = [];

		points.push( new THREE.Vector2 ( -25, 50 ) );
		points.push( new THREE.Vector2 (  30, 50 ) );
		points.push( new THREE.Vector2 (  64, 78 ) );
		points.push( new THREE.Vector2 ( 108, 40 ) );
		points.push( new THREE.Vector2 (  64,  2 ) );
		points.push( new THREE.Vector2 (  30, 30 ) );
		points.push( new THREE.Vector2 ( -25, 30 ) );

		return new THREE.Shape( points );	
		
	}, 

	generateShapeEncaixeDiamante: function () {

		var points = [];
		
		points.push( new THREE.Vector2 (   0, 85 ) );
		points.push( new THREE.Vector2 ( 110, 85 ) );
		points.push( new THREE.Vector2 ( 110, -5 ) );
		points.push( new THREE.Vector2 (   0, -5 ) );
		points.push( new THREE.Vector2 (  0,  30 ) );
		points.push( new THREE.Vector2 (  30, 30 ) );
		points.push( new THREE.Vector2 (  64,  2 ) );
		points.push( new THREE.Vector2 ( 108, 40 ) );
		points.push( new THREE.Vector2 (  64, 78 ) );
		points.push( new THREE.Vector2 (  30, 50 ) );
		points.push( new THREE.Vector2 (   0, 50 ) );

		return new THREE.Shape( points );	
		
	},

	generateShapeCruz: function () {

		var points = [];

		points.push( new THREE.Vector2 ( -25, 50 ) );
		points.push( new THREE.Vector2 (  49, 50 ) );
		points.push( new THREE.Vector2 (  49, 78 ) );
		points.push( new THREE.Vector2 (  69, 78 ) );
		points.push( new THREE.Vector2 (  69, 50 ) );
		points.push( new THREE.Vector2 (  98, 50 ) );
		points.push( new THREE.Vector2 (  98, 30 ) );
		points.push( new THREE.Vector2 (  69, 30 ) );
		points.push( new THREE.Vector2 (  69,  2 ) );
		points.push( new THREE.Vector2 (  49,  2 ) );
		points.push( new THREE.Vector2 (  49, 30 ) );	
		points.push( new THREE.Vector2 ( -25, 30 ) );

		return new THREE.Shape( points );	
		
	}, 

	generateShapeEncaixeCruz: function () {

		var points = [];
		
		points.push( new THREE.Vector2 (   0, 85 ) );
		points.push( new THREE.Vector2 ( 110, 85 ) );
		points.push( new THREE.Vector2 ( 110, -5 ) );
		points.push( new THREE.Vector2 (   0, -5 ) );
		points.push( new THREE.Vector2 (   0, 30 ) );
		points.push( new THREE.Vector2 (  49, 30 ) );
		points.push( new THREE.Vector2 (  49,  2 ) );
		points.push( new THREE.Vector2 (  69,  2 ) );
		points.push( new THREE.Vector2 (  69, 30 ) );
		points.push( new THREE.Vector2 (  98, 30 ) );
		points.push( new THREE.Vector2 (  98, 50 ) );
		points.push( new THREE.Vector2 (  69, 50 ) );
		points.push( new THREE.Vector2 (  69, 78 ) );
		points.push( new THREE.Vector2 (  49, 78 ) );
		points.push( new THREE.Vector2 (  49, 50 ) );	
		points.push( new THREE.Vector2 (   0, 50 ) );

		return new THREE.Shape( points );	
		
	},

	generateShapeLixeira: function () {

		var points = [];

		points.push( new THREE.Vector2 (   0, 100 ) );
		points.push( new THREE.Vector2 (  15, 100 ) );
		points.push( new THREE.Vector2 (  28,  15 ) );
		points.push( new THREE.Vector2 (  45,  15 ) );
		points.push( new THREE.Vector2 (  45, 100 ) );
		points.push( new THREE.Vector2 (  60, 100 ) );
		points.push( new THREE.Vector2 (  60,  15 ) );
		points.push( new THREE.Vector2 (  77,  15 ) );
		points.push( new THREE.Vector2 (  90, 100 ) );
		points.push( new THREE.Vector2 ( 105, 100 ) );
		points.push( new THREE.Vector2 ( 105, 105 ) );	
		points.push( new THREE.Vector2 (  90,   0 ) );
		points.push( new THREE.Vector2 (  15,   0 ) );

		return new THREE.Shape( points );	
		
	},
		
	generateShapeTampaLixeira: function () {

		var points = [];

		//tampa
		points.push( new THREE.Vector2 (   0,  0 ) );
		points.push( new THREE.Vector2 (   0, 15 ) );
		points.push( new THREE.Vector2 (  40, 15 ) );
		points.push( new THREE.Vector2 (  40, 30 ) );
		points.push( new THREE.Vector2 (  60, 30 ) );
		points.push( new THREE.Vector2 (  65, 15 ) );
		points.push( new THREE.Vector2 ( 105, 15 ) );
		points.push( new THREE.Vector2 ( 105,  0 ) );

		return new THREE.Shape( points );	
		
	} 	

};