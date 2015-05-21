/**
 * Painel que controla as animações. Com ele eh possivel iniciar e visualizar os valores
 * durante as animações.
 */
function PainelAnimacao( editor ) {
	UI.Panel.call( this );
	/**Objeto responsavel por controlar o drone utilizando o ROS*/
	var ros = new ROSHandler();
	this.setClass( 'painel' );
	this.dom.id = 'painelAnimacao';
	this.setPosition( 'absolute' );
	this.setDisplay( 'broke' );
	if ( !(editor instanceof Editor) ) { throw new Error ( 'argumento deve ser da classe Editor !' ); }
	var editor = editor;
	//campos utilizados no painel
	var positionX = new UI.Text('-').setColor('#666');
	var positionY = new UI.Text('-').setColor('#666');
	var positionZ = new UI.Text('-').setColor('#666');
	var rotationX = new UI.Text('-').setColor('#666');
	var rotationY = new UI.Text('-').setColor('#666');
	var rotationZ = new UI.Text('-').setColor('#666');
	var time = new UI.Number().setWidth('50px');
	var distanceAverage = new UI.Number().setWidth('50px').setValue(1);
	var rotationAverage = new UI.Number().setWidth('50px').setValue(1);
	time.setValue(2000);
	var linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Animação').setColor('#666'));
	this.add(linhaValues);
	this.add(new UI.Break());
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Posição').setColor('#666'));
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('X: ').setColor('#666'));
	linhaValues.add(positionX);
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Y: ').setColor('#666'));
	linhaValues.add(positionY);
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Z: ').setColor('#666'));
	linhaValues.add(positionZ);
	this.add(linhaValues);
	//adiciona os campos para exibiram os valores de rotação do objeto
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Rotação').setColor('#666'));
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('X: ').setColor('#666'));
	linhaValues.add(rotationX);
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Y: ').setColor('#666'));
	linhaValues.add(rotationY);
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Z: ').setColor('#666'));
	linhaValues.add(rotationZ);
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Tempo: ').setColor('#666'));
	linhaValues.add(time);
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	//botão que inicia as animações
	var playButton = new UI.Button();
	playButton.setLabel('Play!');
	var scope = this;
	playButton.onClick( startAnimations );
	linhaValues.add(playButton);
	this.add(linhaValues);
	this.add(new UI.Break());
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('ROS').setColor('#666'));
	this.add(linhaValues);
	this.add(new UI.Break());
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('ROS Server: ').setColor('#666'));
	var ros_server = new UI.Input().setWidth( '150px' ).setColor( '#444' ).setFontSize( '12px' ).setValue('localhost:9090');
	linhaValues.add(ros_server);
	var connectButton = new UI.Button();
	connectButton.setLabel('Connect');
	connectButton.onClick( function () { ros.connect(ros_server.getValue());});
	linhaValues.add(connectButton);
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	var executeButton = new UI.Button();
	executeButton.setLabel('Executar');
	executeButton.onClick( executeDrone );
	linhaValues.add(executeButton);
	var calibrateButton = new UI.Button();
	calibrateButton.setLabel('Calibrate');
	calibrateButton.onClick( function () { ros.calibrate(); });
	linhaValues.add(calibrateButton);
	var panicButton = new UI.Button();
	panicButton.setLabel('Panic!');
	panicButton.onClick( function () { ros.land(); });
	linhaValues.add(panicButton);
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Velocidade média (unidade/s): ').setColor('#666'));
	linhaValues.add(distanceAverage);
	this.add(linhaValues);
	linhaValues = new UI.Panel();
	linhaValues.add(new UI.Text('Tempo para girar 360 graus(segundos): ').setColor('#666'));
	linhaValues.add(rotationAverage);
	this.add(linhaValues);
	/**Animações correntes que estão/vão sendo executadas*/
	var currentAnimatios = [];
	/**Index de currentAnimatios que está atualmente em execução*/
	var currentAnimation = 0;
	/**Index da peça animada selecionada no editor*/
	var selectedAnimation = undefined;
	/**Objeto3D que sera animado*/
	var object3D = [];
	/**Função de easing que sera utilizada na interpolação da animação*/
	var easing = [];
	/**
	 * Método que vai percorrer todos os itens de objetos gráficos existentes
	 * e vai iniciar as animações
	 */
	function startAnimations() {
		loadAnimation();
		//se não tem animação, cai fora
		if( currentAnimatios.length == 0 ){ return; }
		//pega todas as animações para esse filho
		for( var q = 0; q < currentAnimatios.length; q++ ){
			var animation = undefined;
			var animationChain = [];
			for( var s = 0; s < currentAnimatios[q].length; s++ ){
				var animationItem = currentAnimatios[q][s];
				if( animationItem.id == EIdsItens.TRANSLADAR ){
					animation = new TWEEN.Tween(object3D[q].position)
					.to({x: (animationItem.valorXYZ.x >= 0 ? "+" : "-") + Math.abs(animationItem.valorXYZ.x),
					    y: (animationItem.valorXYZ.y >= 0 ? "+" : "-") + Math.abs(animationItem.valorXYZ.y),
					    z: (animationItem.valorXYZ.z >= 0 ? "+" : "-") + Math.abs(animationItem.valorXYZ.z)}, time.getValue())
					.easing(CG.getEasingFunction(easing[q]))
					if( selectedAnimation != undefined && q == selectedAnimation ){
						setAnimationCallbacks(animation, q, s);
					}
				} else if( animationItem.id == EIdsItens.ROTACIONAR ){
					animation = new TWEEN.Tween(object3D[q].rotation)
					.to({x: (animationItem.valorXYZ.x >= 0 ? "+" : "-") + Util.math.converteGrausParaRadianos(Math.abs(animationItem.valorXYZ.x)),
					    y: (animationItem.valorXYZ.y >= 0 ? "+" : "-") + Util.math.converteGrausParaRadianos(Math.abs(animationItem.valorXYZ.y)),
					    z: (animationItem.valorXYZ.z >= 0 ? "+" : "-") + Util.math.converteGrausParaRadianos(Math.abs(animationItem.valorXYZ.z))}, time.getValue())
					.easing(CG.getEasingFunction(easing[q]));
					if( selectedAnimation != undefined && q == selectedAnimation ){
						setAnimationCallbacks(animation, q, s);
					}
				}
				animationChain.push(animation);
			}
			//monta o chain com todas as animações para esse obj gráfico
			for( var ai = animationChain.length-1; ai > 0; ai-- ){
				animationChain[ai-1].chain(animationChain[ai]);
			}
			//iniciar!
			if( animationChain[0] != undefined ){
				animationChain[0].start();
			}
		}
	}

	function setAnimationCallbacks(animation, animationChain, animationStep) {
		animation.onUpdate(updateValues);
		//FIXME - encontrar uma maneira melhor de bloquear o botão de play durante da execução das animações
		if( animationStep == currentAnimatios[animationChain].length-1 ){
			animation.onComplete(onFinishAnimationChain).onStop(onFinishAnimationChain);
		} else {
			animation.onComplete(onFinishAnimation).onStop(onFinishAnimation);
		}
		if( animationStep == 0 ){
			animation.onStart(onStartAnimationChain);
		} else {
			animation.onStart(onStartAnimation);
		}
	}

	/**
	 * Função para atualizar os valores do object3D durante a animação
	 */
	function updateValues() {
		//var object3D = editor.getItemSelecionado().object3D;
		positionX.setValue(object3D[selectedAnimation].position.x);
		positionY.setValue(object3D[selectedAnimation].position.y);
		positionZ.setValue(object3D[selectedAnimation].position.z);
		rotationX.setValue(Util.math.converteRadianosParaGraus(object3D[selectedAnimation].rotation.x));
		rotationY.setValue(Util.math.converteRadianosParaGraus(object3D[selectedAnimation].rotation.y));
		rotationZ.setValue(Util.math.converteRadianosParaGraus(object3D[selectedAnimation].rotation.z));
	}

	/**
	 * Função volta para a cor default do item no editor
	 */
	function onFinishAnimation(){
		currentAnimatios[selectedAnimation][currentAnimation].setMeshsColor( CG.colors.corPecasDiamante );
		currentAnimation++;
	}

	/**
	 * Função muda a cor do item de animação no editor para indicar a execução do mesmo
	 */
	function onStartAnimation(){
		currentAnimatios[selectedAnimation][currentAnimation].setMeshsColor( CG.colors.corCurrentAnimation );
	}

	/**
	 * Função executada no inicio do animation chain
	 */
	function onStartAnimationChain(){
		onExecutionBegan();
		onStartAnimation();
	}

	/**
	 * Função executada no final do animation chain
	 */
	function onFinishAnimationChain(){
		onExecutionEnd();
		onFinishAnimation();
	}

	/**
	 * Função que executa as animações expecificadas no editor no drone real
	 */
	function executeDrone(){
		loadAnimation();
		//se não tem animação, cai fora
		if( currentAnimatios.length == 0 || selectedAnimation == undefined ){ return; }
		onExecutionBegan()
		var currentDroneStep = -1;
		var droneParado = true;
		var interval = setInterval(executeStepDrone, 10);
		function executeStepDrone() {
			if( droneParado && currentDroneStep == -1){
				ros.takeoff();
				droneParado = false;
				setTimeout(function(){
					ros.stop();
					console.log('decolou -' + new Date());
					droneParado = true;
					currentDroneStep += 1;
				}, 8000);
			} else if( droneParado && currentDroneStep < currentAnimatios[selectedAnimation].length){
				var valorX = currentAnimatios[selectedAnimation][currentDroneStep].valorXYZ.x > 0 ? 1: 0;
				var valorY = currentAnimatios[selectedAnimation][currentDroneStep].valorXYZ.y > 0 ? 1: 0;
				var valorZ = currentAnimatios[selectedAnimation][currentDroneStep].valorXYZ.z > 0 ? 1: 0;
				var wait = 0;
				if( currentAnimatios[selectedAnimation][currentDroneStep].id == EIdsItens.TRANSLADAR ){
					wait = calculateTime(currentAnimatios[selectedAnimation][currentDroneStep].valorXYZ.x,
							     	currentAnimatios[selectedAnimation][currentDroneStep].valorXYZ.y,
								currentAnimatios[selectedAnimation][currentDroneStep].valorXYZ.z, 0.0);
					console.log('transladou - ' + new Date());
					ros.move(valorX,valorY,valorZ, 0.0);
				} else if( currentAnimatios[selectedAnimation][currentDroneStep].id == EIdsItens.ROTACIONAR ){
					wait = calculateTime(0,0,0, currentAnimatios[selectedAnimation][currentDroneStep].valorXYZ.y);
					console.log('rotacionou - ' + new Date());
					ros.move(0,0,0, valorY);
				}
				droneParado = false;
				setTimeout(function(){
					ros.stop();
					console.log('parou - ' + new Date());
					setTimeout(function(){
						currentDroneStep += 1;
						droneParado = true;
					}, 2000);
				}, wait);
			} else if( droneParado && currentDroneStep == currentAnimatios[selectedAnimation].length){
				droneParado = false;
				setTimeout(function(){
					ros.land();
					console.log('posou - ' + new Date());
					clearInterval(interval);
					onExecutionEnd();
				}, 1000);
			}
		}
	}

	/** Função que calcula o tempo em milisegundos necessário para executar a movimentação
	 * informada pelo usuário
	 */
	function calculateTime(x, y, z, rotation){
		var seconds = 0
		if( x != undefined && x > 0 ){
			seconds = distanceAverage.getValue() * x;
		}
		if( seconds == 0 && y != undefined && y > 0 ){
			seconds = distanceAverage.getValue() * y;
		}
		if( seconds == 0 && z != undefined && z > 0 ){
			seconds = distanceAverage.getValue() * z;
		}
		if( seconds > 0 ){
			return seconds * 1000;
		}
		if( rotation != undefined && rotation > 0 ){
			return  ((rotation * rotationAverage.getValue()) / 360) * 1000;
		}
		return 0;
	}

	/**
	 * Função que percore o objeto gráfico selecionado no editor e carrega suas animações
	 * para o campo animationChain
	 */
	function loadAnimation(){
		currentAnimation = 0;
		selectedAnimation = undefined;
		currentAnimatios = [];
		easing = [];
		object3D = [];
		var item = editor.painelMontagem;
		if (item.filhos.length > 0){
			//percorre os filhos procurando um objeto grafico que tenha animação
			var totalAnimations = 0;
			for (var i = 0; i < item.filhos.length; i++) {
				var filho = item.filhos[i];
				//verifica se eh um filho animado \o/
				if (filho.id == EIdsItens.OBJETOGRAFICO && filho.isAnimated ){
					currentAnimatios[totalAnimations] = [];
					//verifica se o item esta selecionado no editor
					if ( filho === editor.getItemSelecionado() ){
						selectedAnimation = totalAnimations;
					}
					//pega todas as animações para esse filho
					for( var q = 0; q < filho.filhos.length; q++ ){
						var animation = null;
						if( filho.filhos[q].tipoEncaixe == ETiposEncaixe.DIAMANTE ){
							currentAnimatios[totalAnimations].push(filho.filhos[q]);
						} else if( filho.filhos[q].id == EIdsItens.ANIMACAO ){
							easing[totalAnimations] = filho.filhos[q].easing;
						} else if( filho.filhos[q].tipoEncaixe == ETiposEncaixe.QUADRADO ){
							object3D[totalAnimations] = filho.filhos[q].object3D;
						}
					}
					totalAnimations++;
				}
			}
		}
	}

	/**
	 * Esse método deve ser chamado quando alguma execução ( animação/drone ) for iniciada.
	 * Evitando problemas na execução que podem ser causados por duas execuções acontecendo ao mesmo tempo
	 * Esse método desabilita todos os botões que dão trigger nas execuções
	 */
	function onExecutionBegan(){
		executeButton.setEnable(false);
		playButton.setEnable(false);
	}

	/**
	 * Esse método deve ser chamado quando alguma execução ( animação/drone ) terminar.
	 * Esse método habilita todos os botões que dão trigger nas execuções que foram desabilitados por
	 * onExecutionBegan
	 */
	function onExecutionEnd(){
		executeButton.setEnable(true);
		playButton.setEnable(true);
	}
}
PainelAnimacao.prototype = Object.create( UI.Panel.prototype );