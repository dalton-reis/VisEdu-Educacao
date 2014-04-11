/*

	Classe que representa o 'RenderizadorWebGL3D' na cena.
	
*/
var RenderizadorWebGL3D = function(){
	var render;
	
	//Cria o renderizador3D "WebGLRenderer"
	render = new THREE.WebGLRenderer({antialias: false});
	//Define o tamanho do renderizador3D
	render.setSize(900, 700);
	//Cor de fundo do canvas
	render.setClearColor(0xF6F6F6, 1);
	//Adiciona o metodo que pinta a BBox no listener de duplo clique
	render.domElement.ondblclick = selecionaObjeto;
	
	this.getRender = function(){
		return render.domElement;
	};
	
	this.renderiza = function(cena, camera){
		render.render(cena, camera); 
	};
	
};