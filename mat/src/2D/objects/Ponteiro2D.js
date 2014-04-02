/*
	Classe que representa a entidade 'Ponteiro' na cena
	
	Descricao: Ao selecionar uma funcao, e clicar no checkbox para exibir o 'Cursor', 
			   o ponteiro deslizara sobre a funcao exibindo o valor correspondente de y naquele ponto
*/
var Ponteiro2D = function(){	

	var geometria, material, ponteiro;
	
	geometria = new THREE.CircleGeometry(0.5, 30);
	material = new THREE.MeshBasicMaterial({color: 0x0000ff});
	ponteiro = new THREE.Mesh(geometria, material);
	
	ponteiro.name = "ponteiro";
	ponteiro.material.visible = false;
	
	this.getPonteiro = function(){
		return ponteiro;
	};
	
	this.setPosition = function(x,y){
		ponteiro.position.x = x;
		ponteiro.position.y = y;
	};
	
	this.getPonteiroMaterial = function(){
		return ponteiro.material;
	}
}