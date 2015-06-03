var TUTIL = { REVISION: '1'};

TUTIL.textures = [];
TUTIL.paths = [ 'imgs/1001.jpg',
				'imgs/clouds.jpg',
				'imgs/crate.gif',
				'imgs/crate3.jpg',
				'imgs/crate4.png',
				'imgs/crate5.png',
				'imgs/crate6.jpg',
				'imgs/crate7.jpg',
				'imgs/create2.gif',
				'imgs/grass.jpg',
				'imgs/moon_1024.jpg',
				'imgs/waternormals.jpg'];

TUTIL.getTexture = function(path) {
	var img = new THREE.ImageUtils.loadTexture( path );
	img.anisotropy = DEMO._renderer.getMaxAnisotropy();
	return new THREE.MeshBasicMaterial( { map: img } );
};

TUTIL.loadAllTextures = function() {
	for (i = 0; i < TUTIL.paths.length; i++) {
		TUTIL.textures[TUTIL.textures.length] = TUTIL.getTexture(TUTIL.paths[i]);
	}
};

TUTIL.randomTexture = function() {
	var r = TUTIL.getRandon();
	while (r > TUTIL.textures.length) {
		r = TUTIL.getRandon();
	}
	return TUTIL.textures[r];
};

TUTIL.getRandon = function() {
	return parseInt(Math.random() * 10);
};