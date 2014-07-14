/**
 * Classe criada a partir da classe THREE.Detector, com alguns ajustes específicos para o sistema
 * @author james.montibeler 
 * @author alteredq / http://alteredqualia.com/ 
 *
 *	- shows frustum, line of sight and up of the camera
 *	- suitable for fast updates
 * 	- based on frustum visualization in lightgl.js shadowmap example
 *		http://evanw.github.com/lightgl.js/tests/shadowmap.html
 */

CGCameraHelper = function ( camera ) {
	
	THREE.Line.call( this );

	var scope = this;

	this.geometry = new THREE.Geometry();
	this.material = new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );
	this.type = THREE.LinePieces;

	this.matrixWorld = camera.matrixWorld;
	this.matrixAutoUpdate = false;

	this.pointMap = {};

	// colors

	var hexFrustum = 0xffaa00;
	var hexCone = 0x000000;
	var hexUp = 0x00aaff;
	var hexTarget = 0xffffff;
	var hexCross = 0xcccccc;	

	// near

	addLine( "n1", "n2", hexFrustum );
	addLine( "n2", "n4", hexFrustum );
	addLine( "n4", "n3", hexFrustum );
	addLine( "n3", "n1", hexFrustum );

	// far

	addLine( "f1", "f2", hexFrustum );
	addLine( "f2", "f4", hexFrustum );
	addLine( "f4", "f3", hexFrustum );
	addLine( "f3", "f1", hexFrustum );

	// sides

	addLine( "n1", "f1", hexFrustum );
	addLine( "n2", "f2", hexFrustum );
	addLine( "n3", "f3", hexFrustum );
	addLine( "n4", "f4", hexFrustum );

	// cone

	addLine( "p", "n1", hexCone );
	addLine( "p", "n2", hexCone );
	addLine( "p", "n3", hexCone );
	addLine( "p", "n4", hexCone );

	// up

	addLine( "u1", "u2", hexUp );
	addLine( "u2", "u3", hexUp );
	addLine( "u3", "u1", hexUp );

	// target

	addLine( "c", "t", hexTarget );
	addLine( "p", "c", hexCross );

	// cross

	addLine( "cn1", "cn2", hexCross );
	addLine( "cn3", "cn4", hexCross );

	addLine( "cf1", "cf2", hexCross );
	addLine( "cf3", "cf4", hexCross );

	this.camera = camera;

	function addLine( a, b, hex ) {

		addPoint( a, hex );
		addPoint( b, hex );

	}

	function addPoint( id, hex ) {

		scope.geometry.vertices.push( new THREE.Vector3() );
		scope.geometry.colors.push( new THREE.Color( hex ) );

		if ( scope.pointMap[ id ] === undefined ) scope.pointMap[ id ] = [];

		scope.pointMap[ id ].push( scope.geometry.vertices.length - 1 );

	}

	this.nearPlane = null;	
	this.nearPlane2 = null;	
	this.farPlane = null;
	this.farPlane2 = null;
	
	this.update( );

};

CGCameraHelper.prototype = Object.create( THREE.Line.prototype );

CGCameraHelper.prototype.update = function () {

	var scope = this;

	var w = 1, h = 1;

	// we need just camera projection matrix
	// world matrix must be identity

	CGCameraHelper.__c.projectionMatrix.copy( this.camera.projectionMatrix );

	// center / target

	setPoint( "c", 0, 0, -1 );
	setPoint( "t", 0, 0,  1 );

	// near

	setPoint( "n1", -w, -h, -1 );
	setPoint( "n2",  w, -h, -1 );
	setPoint( "n3", -w,  h, -1 );
	setPoint( "n4",  w,  h, -1 );

	// far

	setPoint( "f1", -w, -h, 1 );
	setPoint( "f2",  w, -h, 1 );
	setPoint( "f3", -w,  h, 1 );
	setPoint( "f4",  w,  h, 1 );

	// up

	setPoint( "u1",  w * 0.7, h * 1.1, -1 );
	setPoint( "u2", -w * 0.7, h * 1.1, -1 );
	setPoint( "u3",        0, h * 2,   -1 );

	// cross

	setPoint( "cf1", -w,  0, 1 );
	setPoint( "cf2",  w,  0, 1 );
	setPoint( "cf3",  0, -h, 1 );
	setPoint( "cf4",  0,  h, 1 );

	setPoint( "cn1", -w,  0, -1 );
	setPoint( "cn2",  w,  0, -1 );
	setPoint( "cn3",  0, -h, -1 );
	setPoint( "cn4",  0,  h, -1 );
	
	//setPoint( "planoFar",  0,  h, -1 );

	var c, t, n1, n2, n3, n4, f1, f2, f3, f4;
	
	function setPoint( point, x, y, z ) {

		CGCameraHelper.__v.set( x, y, z );
		CGCameraHelper.__projector.unprojectVector( CGCameraHelper.__v, CGCameraHelper.__c );

		var points = scope.pointMap[ point ];

		if ( points !== undefined ) {

			for ( var i = 0, il = points.length; i < il; i ++ ) {

				scope.geometry.vertices[ points[ i ] ].copy( CGCameraHelper.__v );

			}

		}
		
		var pClone = CGCameraHelper.__v.clone();
		
		if	(point == "t") {
			t = pClone;
		} else if (point == "c") {
			c = pClone;			
		} else if (point == "n1") {
			n1 = pClone;			
		} else if (point == "n2") {
			n2 = pClone;			
		} else if (point == "n3") {
			n3 = pClone;			
		} else if (point == "n4") {
			n4 = pClone;	
		} else if (point == "f1") {
			f1 = pClone;			
		} else if (point == "f2") {
			f2 = pClone;			
		} else if (point == "f3") {
			f3 = pClone;			
		} else if (point == "f4") {
			f4 = pClone;	
		}		

	}
	
	

	var corPlano = 0x000000;
	var opacidade = 0.2;
	
	//NEAR
	
	var width = n4.x-n3.x;
	var height = n3.y-n1.y;
	var widthSegments = 1;
	var heightSegments = 1;
	var farGeometry = new THREE.PlaneGeometry( width, height, widthSegments, heightSegments);	
	
	//cria plano para o far 
	if	(this.nearPlane) this.remove(this.nearPlane);				
	this.nearPlane = new THREE.Mesh( farGeometry, new THREE.MeshBasicMaterial( { color: corPlano } ));
	this.nearPlane.position.copy( c );
	this.nearPlane.material.opacity = opacidade;
	this.nearPlane.material.transparent = true;	
	this.add(this.nearPlane);
	
	//cria outro lado do plano far
	if	(this.nearPlane2) this.remove(this.nearPlane2);
	this.nearPlane2 = new THREE.Mesh( farGeometry, new THREE.MeshBasicMaterial( { color: corPlano } ));
	this.nearPlane2.position.copy( c );
	this.nearPlane2.rotation.x = Math.PI; //gira 180 graus pra tampar o outro lado	
	this.nearPlane2.material.opacity = opacidade;
	this.nearPlane2.material.transparent = true;		
	this.add(this.nearPlane2);	
	
	//FAR
	
	width = f4.x-f3.x;
	height = f3.y-f1.y;
	
	var farGeometry = new THREE.PlaneGeometry( width, height, widthSegments, heightSegments);	
	
	//cria plano para o far 
	if	(this.farPlane) this.remove(this.farPlane);				
	this.farPlane = new THREE.Mesh( farGeometry, new THREE.MeshBasicMaterial( { color: corPlano } ));
	this.farPlane.position.copy( t );
	this.farPlane.material.opacity = opacidade;
	this.farPlane.material.transparent = true;
	this.add(this.farPlane);
	
	//cria outro lado do plano far
	if	(this.farPlane2) this.remove(this.farPlane2);
	this.farPlane2 = new THREE.Mesh( farGeometry, new THREE.MeshBasicMaterial( { color: corPlano } ));
	this.farPlane2.position.copy( t );
	this.farPlane2.rotation.x = Math.PI; //gira 180 graus pra tampar o outro lado	
	this.farPlane2.material.opacity = opacidade;
	this.farPlane2.material.transparent = true;	
	this.add(this.farPlane2);	
	
	
	this.geometry.verticesNeedUpdate = true;
	
	passou++;
	$("#codigoFonte").html("co"+passou);
};
var passou = 1;
CGCameraHelper.__projector = new THREE.Projector();
CGCameraHelper.__v = new THREE.Vector3();
CGCameraHelper.__c = new THREE.Camera();