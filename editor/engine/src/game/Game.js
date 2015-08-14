/**
* Classe que representa o jogo.
*
* @author Marcos Harbs
* @class Game
* @static
*/
var Game = new function(){

	this.canvas = null;
	this.context = null;
	this.camera = null;
	this.listComponents = null;
	this.listAssets = null;
	this.scene = null;
	this.lastUpdateTime = null;
	this.frameRate = null;
	this.running = false;
	this.paused = false;
	this.apiHandler = null;
	this.componentFactory = null;
	this.objectFactory = null;

	this.loadAPI = function (api) {
		if (api) {
			if (api == 'ThreeJS') {
				Game.apiHandler = new ThreeJSHandler();
			} else {
				Game.apiHandler = api;				
			}
		} else {
			Game.apiHandler = new HTML5CanvasHandler();
		}
		Game.componentFactory  = Game.apiHandler.getComponentFactory();
		Game.objectFactory  = Game.apiHandler.getObjectFactory();
	}
	
	/**
	* Método que inicializa o jogo.
	*
	* @author Marcos Harbs
	* @method init
	* @param {Element} element
	* @param {Scene} scene
	*/
	this.init = function(element, scene){
		if (!this.apiHandler) {
			this.loadAPI();
		}
		this.canvas = Game.apiHandler.setupCanvas(element);
		this.context = Game.apiHandler.getContext();
		this.camera = Game.apiHandler.setupCamera();
		this.loadGame();
		this.setScene(scene);
		this.lastUpdateTime = 0;
		this.frameRate = 60;
		this.apiHandler.startGameLoop();
		this.running = true;
		this.paused = false;
	}

	/**
	* Executa o onLoad dos componentes do jogo.
	*
	* @author Marcos Harbs
	* @method loadGame
	*/
	this.loadGame = function(){
		for(var i in this.listComponents){
			var component = this.listComponents[i];
			component.onLoad();
		}
	}

	/**
	* Para o Loop principal do jogo.
	*
	* @author Marcos Harbs
	* @method stopGame
	*/
	this.stopGame = function(){
		cancelRequestAnimFrame(Game.requestAnimFram);
		window.removeEventListener("click",      MouseSystem.fireClickListener);
		window.removeEventListener("mousedown",  MouseSystem.fireMouseDownListener);
		window.removeEventListener("mouseup",    MouseSystem.fireMouseUpListener);
		window.removeEventListener("mousemove",  MouseSystem.fireMouseMoveListener);
		window.removeEventListener("touchstart", MouseSystem.fireMouseDownListener);
		window.removeEventListener("touchmove",  MouseSystem.fireMouseMoveListener);
		window.removeEventListener("touchend",   MouseSystem.fireMouseUpListener);
		window.removeEventListener("keydown",    KeySystem.fireKeyDownListener);
		window.removeEventListener("keyup",      KeySystem.fireKeyUpListener);
	}
	
	/**
	* Loop principal do jogo.
	*
	* @author Marcos Harbs
	* @method gameLoop
	*/
	this.gameLoop = function(){
		var deltaTime = (Date.now() - this.lastUpdateTime) / 1000;
		if(!Game.paused){
			this.updateGame(deltaTime);
			this.stepGame();
			this.renderGame();
		}
		this.lastUpdateTime = Date.now();
	}

	/**
	* Chama o onUpdate dos componentes do jogo.
	*
	* @author Marcos Harbs
	* @method updateGame
	* @param {Float} deltaTima
	*/
	this.updateGame = function(deltaTime){
		LogicSystem.fireUpdateListener(deltaTime);
	}

	/**
	* Realiza as verficiações do mundo da Box2D
	* e dispara o evento de onCollide dos objetos
	* do jogo.
	*
	* @author Marcos Harbs
	* @method stepGame
	*/
	this.stepGame = function(){
		for(var i=0; i<this.scene.listLayers.length; i++){
			var layer = this.scene.listLayers[i];
			layer.world.Step((1.0/60), 1);
		}
		LogicSystem.fireCollideListener();
	}

	/**
	* Dispara o onRender dos componentes do jogo.
	*
	* @author Marcos Harbs
	* @method renderGame
	*/
	this.renderGame = function(){
		RenderSystem.fireRenderListener(this.context);
	}

	/**
	* Seta a cena atual.
	*
	* @author Marcos Harbs
	* @method setScene
	*/
	this.setScene = function(scene){
		this.scene = scene;
		this.loadScene();
	}

	/**
	* Carrega a cena atual.
	*
	* @author Marcos Harbs
	* @method loadScene
	*/
	this.loadScene = function(){
		this.scene.onLoad();
		for(var i in this.scene.listComponents){
			var component = this.scene.listComponents[i];
			component.onLoad();
		}
		for(var i=0; i<this.scene.listLayers.length; i++){
			var layer = this.scene.listLayers[i];
			layer.onLoad();
			for(var j in layer.listComponents){
				var component = layer.listComponents[j];
				component.onLoad();
			}
			for(var j=0; j<layer.listGameObjects.length; j++){
				var gameObject = layer.listGameObjects[j];
				gameObject.onLoad();
				for(var k in gameObject.listComponents){
					var component = gameObject.listComponents[k];
					component.onLoad();
				}
			}
		}
	}

}
