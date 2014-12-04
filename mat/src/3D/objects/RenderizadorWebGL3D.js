/*

	Classe que representa o 'RenderizadorWebGL3D' na cena.
	
*/
var RenderizadorWebGL3D = function(){
	var render, effect, width = 900, height = 700;
	
	//Cria o renderizador3D "WebGLRenderer"
	render = new THREE.WebGLRenderer({antialias: false});
	//Define o tamanho do renderizador3D
	render.setSize(width, height);
	//Cor de fundo do canvas
	render.setClearColor(0xF6F6F6, 1);
	//Adiciona o metodo que pinta a BBox no listener de duplo clique
	render.domElement.ondblclick = selecionaObjeto;
	
	// cria a cena com o efeito Anaglifo
    effect = new THREE.AnaglyphEffect( render, width, height );
	
	this.getRender = function(){
		return render.domElement;
	};
	
	this.renderiza = function(cena, camera){
        if ($('#checkbox_Anaglifo:checked').val()) {
            // Renderiza a cena com o efeito Anaglifo
            effect.render(cena, camera, $( "#slider-range_anaglifo" ).slider( "values", 0 )); 
        } else {
            // Renderiza a cena normalmente
            render.render(cena, camera);
        }
	};
	
};