/**
 * Painel que controla as animações. Com ele eh possivel iniciar e visualizar os valores
 * durante as animações.
 */
function PainelAnimacao( editor ) {

	UI.Panel.call( this );

	var scope = this;

	scope.setClass( 'painel' );
	scope.dom.id = 'painelAnimacao';
	scope.setPosition( 'absolute' );
	scope.setDisplay( 'broke' );

	if ( !(editor instanceof Editor) ) {
		throw new Error ( 'argumento deve ser da classe Editor !' );
	}
	scope.editor = editor;
	//campos utilizados no painel
	scope.positionX = new UI.Text('-').setColor('#666');
	scope.positionY = new UI.Text('-').setColor('#666');
	scope.positionZ = new UI.Text('-').setColor('#666');
	scope.rotationX = new UI.Text('-').setColor('#666');
	scope.rotationY = new UI.Text('-').setColor('#666');
	scope.rotationZ = new UI.Text('-').setColor('#666');
	scope.time = new UI.Number().setWidth('50px');
	scope.time.setValue(2000);
	//adiciona os campos para exibiram os valores do posicionamento do objeto
	var linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Posição').setColor('#666'));
	scope.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('X: ').setColor('#666'));
	linhaValues.add(scope.positionX);
	scope.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Y: ').setColor('#666'));
	linhaValues.add(scope.positionY);
	scope.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Z: ').setColor('#666'));
	linhaValues.add(scope.positionZ);
	scope.add(linhaValues);
	//adiciona os campos para exibiram os valores de rotação do objeto
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Rotação').setColor('#666'));
	scope.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('X: ').setColor('#666'));
	linhaValues.add(scope.rotationX);
	scope.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Y: ').setColor('#666'));
	linhaValues.add(scope.rotationY);
	scope.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Z: ').setColor('#666'));
	linhaValues.add(scope.rotationZ);
	scope.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Time: ').setColor('#666'));
	linhaValues.add(scope.time);
	scope.add(linhaValues);
	//botão que inicia as animações
	var playButton = new UI.Button();
	playButton.setLabel('Play!');
	playButton.onClick( function () {
			  startAnimations(editor.painelMontagem);
	});
	scope.add(playButton);

	/**
	 * Método que vai percorrer todos os itens de objetos gráficos existentes
	 * e vai iniciar as animações
	 */
	function startAnimations(item){
		if (item.filhos.length > 0){
			//percorre os filhos procurando um objeto grafico que tenha animação
			for (var i = 0; i < item.filhos.length; i++) {
				var filho = item.filhos[i];
				if( filho.id == EIdsItens.OBJETOGRAFICO && filho.isAnimated ){
					//encontrou um filho animado \o/
					var animationChain = []
					var easing = undefined;
					var object3D = undefined;
					//pega a função de interpolação da animação para esse filho
					for( var q = 0; q < filho.filhos.length; q++ ){
						if( filho.filhos[q].id == EIdsItens.ANIMACAO ){
							easing = filho.filhos[q].easing;
							break;
						}
						if( filho.filhos[q].tipoEncaixe == ETiposEncaixe.QUADRADO ){
							object3D = filho.filhos[q].object3D;
						}
					}
					//pega todas as animações para esse filho
					for( var q = 0; q < filho.filhos.length; q++ ){
						var animation = null;
						if( filho.filhos[q].tipoEncaixe == ETiposEncaixe.DIAMANTE ){
							var animationItem = filho.filhos[q];
							if( animationItem.id == EIdsItens.TRANSLADAR ){
								animation = new TWEEN.Tween(object3D.position)
									.to({x: (animationItem.valorXYZ.x >= 0 ? "+" : "-") + Math.abs(animationItem.valorXYZ.x),
									     y: (animationItem.valorXYZ.y >= 0 ? "+" : "-") + Math.abs(animationItem.valorXYZ.y),
									     z: (animationItem.valorXYZ.z >= 0 ? "+" : "-") + Math.abs(animationItem.valorXYZ.z)}, scope.time.getValue())
									.easing(CG.getEasingFunction(easing))
									.onUpdate( function() {
										updateValues(object3D);
									});
							} else if( animationItem.id == EIdsItens.ROTACIONAR ){
								animation = new TWEEN.Tween(object3D.rotation)
									.to({x: (animationItem.valorXYZ.x >= 0 ? "+" : "-") + Util.math.converteGrausParaRadianos(Math.abs(animationItem.valorXYZ.x)),
									     y: (animationItem.valorXYZ.y >= 0 ? "+" : "-") + Util.math.converteGrausParaRadianos(Math.abs(animationItem.valorXYZ.y)),
									     z: (animationItem.valorXYZ.z >= 0 ? "+" : "-") + Util.math.converteGrausParaRadianos(Math.abs(animationItem.valorXYZ.z))}, scope.time.getValue())
									.easing(CG.getEasingFunction(easing))
									.onUpdate( function(){
										updateValues(object3D);
									});
							}
							animationChain.push(animation);
						}
					}
					//monta o chain com todas as animações para esse obj gráfico
					for( var ai = animationChain.length-1; ai > 0; ai-- ){
						animationChain[ai-1].chain(animationChain[ai]);
					}
					//iniciar!
					if( animationChain[0] != undefined ){
						animationChain[0].start();
					}
				}//if
			}//for
		}
	}

	/**
	 * Função para atualizar os valores do object3D durante a animação
	 */
	function updateValues( object3D ){
		scope.positionX.setValue(object3D.position.x);
		scope.positionY.setValue(object3D.position.y);
		scope.positionZ.setValue(object3D.position.z);
		scope.rotationX.setValue(Util.math.converteRadianosParaGraus(object3D.rotation.x));
		scope.rotationY.setValue(Util.math.converteRadianosParaGraus(object3D.rotation.y));
		scope.rotationZ.setValue(Util.math.converteRadianosParaGraus(object3D.rotation.z));
	}
}

PainelAnimacao.prototype = Object.create( UI.Panel.prototype );
