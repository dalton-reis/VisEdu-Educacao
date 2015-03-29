/**
 *
 */

function ItemEditorSpline() {
	AItemEditorEncaixeQuadrado.call( this );

	var scope = this;

	//eventos

	//@Override
	scope.onChange = function () {
		scope.object3D = createObject3D();
		scope.object3D.item = scope;
	}; //evento será executado quando um filho for adicionado ou removido ou alguma propriedade for alterada
	//@Override
	scope.onAddFilho = function ( item ) {};; //evento será executado quando um filho for adicionado
	//@Override
	scope.onRemoveFilho = function ( item ) {};; //evento será executado quando um filho for removido
	//@Override
	scope.onChangeFilhos = function ( filho ) {};; //evento será executado quando for removido ou inserido algum filho em um dos filhos do objeto, ou filho dos filhos e assim por diante
	//@Override
	scope.afterChangeNome = function ( nomeAntigo ) {}; //evento será executado quando o nome do item for alterado

	//propriedades
	scope.id =  EIdsItens.SPLINE;
	scope.valorXYZ = undefined; //NÃO DEVE TER ESTA PROPRIEDADE VISIVEL
	scope.posicao  = undefined; //NÃO DEVE TER ESTA PROPRIEDADE VISIVEL

	scope.tipoSpline = CG.listaTipoSpline.Bezier;

	scope.listaPontos    = new Array();
	scope.listaPontos[0] = new THREE.Vector3(-200, -200, 0);
	scope.listaPontos[1] = new THREE.Vector3(-200, 200, 0);
	scope.listaPontos[2] = new THREE.Vector3(200, 200, 0);
	scope.listaPontos[3] = new THREE.Vector3(200, -200, 0);

	scope.qtdPontos = 20;
	scope.poliedroEnabled = true;

	scope.propriedadeCor.setHex(0x098011);

	scope.corPoliedro = new THREE.Color();
	scope.corPoliedro.setHex(0x9EA8B0);
	scope.object3D = createObject3D();

	function createObject3D() {
		var geometria   = new THREE.Geometry();
		geometria.vertices = scope.listaPontos;
		geometria.computeLineDistances();
		var material = new THREE.LineBasicMaterial( { linewidth: 1, color: scope.corPoliedro.getHex(), transparent: false } );
		/**objeto 3D do poliedro que deve ser renderizado*/
		scope.poliedro = new THREE.Line(geometria, material, THREE.LineStrip);
		var pontosSpline = [];
		var t;
		var p0, p1, p2, p3;
		var x, y, z;
		for (var i = 0; i <= scope.qtdPontos; i++) {
			t  =  (i / scope.qtdPontos);
			p0 = Math.pow((1 - t), 3);
			p1 = (3 * t * Math.pow((1 - t), 2));
			p2 = (3 * Math.pow(t, 2) * (1 - t));
			p3 = Math.pow(t, 3);
			x = (p0 * scope.listaPontos[0].x + p1 * scope.listaPontos[1].x + p2 * scope.listaPontos[2].x + p3 * scope.listaPontos[3].x);
			y = (p0 * scope.listaPontos[0].y + p1 * scope.listaPontos[1].y + p2 * scope.listaPontos[2].y + p3 * scope.listaPontos[3].y);
			z = (p0 * scope.listaPontos[0].z + p1 * scope.listaPontos[1].z + p2 * scope.listaPontos[2].z + p3 * scope.listaPontos[3].z);
			pontosSpline.push(new THREE.Vector3(x, y, z));
		}
		var geometria = new THREE.Geometry();
		geometria.vertices = pontosSpline;
		geometria.computeLineDistances();
		var material  = new THREE.LineBasicMaterial({ linewidth: 2, color: scope.propriedadeCor.getHex(), transparent: false });
		var spline =  new THREE.Line(geometria, material, THREE.LineStrip);
		if( scope.object3D != undefined ){
			spline.position = scope.object3D.position;
		}
		return spline;
	}

}

ItemEditorSpline.prototype = Object.create(AItemEditorEncaixeQuadrado.prototype);
