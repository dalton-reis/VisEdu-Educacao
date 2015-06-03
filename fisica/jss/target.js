function buildTarget(scene, radius, position, rotation, interval) {
	var materialRed = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0xFF0000, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );
	var materialBlue = new THREE.MeshPhongMaterial( { ambient: 0x030303, color: 0x0000FF, specular: 0x009900, shininess: 30, shading: THREE.FlatShading } );

	var count = radius / interval;
	var i = 0;
	for (i = 0; i < count; i++) {
		var material = i % 2 == 0 ? materialBlue : materialRed;

		var geometry = new THREE.SphereGeometry( (radius - (i * interval)), 32, 16, Math.PI, Math.PI, 3*Math.PI/2);
		var mesh = new THREE.Mesh( geometry, material);
		mesh.material.side = THREE.DoubleSide;

		positionateMesh(mesh, position, rotation);
		scene.add( mesh );


		var geometry2 = new THREE.CircleGeometry((radius - (i * interval)), 32);
		var mesh2 = new THREE.Mesh( geometry2, material);
		mesh2.material.side = THREE.DoubleSide;

		positionateMesh(mesh2, position, rotation);
		mesh2.position.x += (count - i) * 0.5;

		mesh2.rotation.y = 3*Math.PI/2;
		scene.add( mesh2 );
	}
	
	createLight(scene, position.x, position.y, position.z);
};

function positionateMesh(mesh, position, rotation) {
	mesh.position.x = position.x;
	mesh.position.y = position.y;
	mesh.position.z = position.z;

	mesh.rotation.x = rotation.x;
	mesh.rotation.y = rotation.y;
	mesh.rotation.z = rotation.z;
}

function createLight(scene, x, y, z) {
	var particleLight = new THREE.Mesh( new THREE.SphereGeometry( 1, 8, 8 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ) );
	scene.add( particleLight );

	var directionalLight = new THREE.DirectionalLight( 0x5f0f5f, 1 );
	directionalLight.position.set( 1, 1,  1).normalize();
	scene.add( directionalLight );

	var pointLight = new THREE.PointLight( 0xffffff, 1, 100 );
	particleLight.add( pointLight );

	particleLight.position.x = x;
	particleLight.position.y = y;
	particleLight.position.z = z;	
};