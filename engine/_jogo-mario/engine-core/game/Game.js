function Game(){}

JSUtils.addMethod(Game.prototype, "initialize", 
function(canvas){
	this.currentScene = null;
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.lastUpdateTime = 0;
	this.frameRate = 60;
	this.camera = new Camera().initialize();
	this.createB2DWorld();
	return this;
}
);

Game.prototype.createB2DWorld = function(){
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-5000, -5000);
	worldAABB.maxVertex.Set(5000, 5000);
	var gravity = new b2Vec2(0, 1000);
	var doSleep = true;
	this.b2World = new b2World(worldAABB, gravity, doSleep);
}

Game.prototype.init = function(){
	this.configListeners();
	
	window.requestAnimFrame = (function(){
    	return  window.requestAnimationFrame       || 
                window.webkitRequestAnimationFrame || 
                window.mozRequestAnimationFrame    || 
                window.oRequestAnimationFrame      || 
                window.msRequestAnimationFrame     || 
             	function(callback, element){
                	window.setTimeout(callback, 1000 / 60);
              	};
    })();
    
	window.loop = function(){
		requestAnimFrame(loop);
		game.gameLoop();
	}
	
    loop();
}

Game.prototype.configListeners = function(){
	window.addEventListener("keydown",   this.fireKeyDownLisener);
	window.addEventListener("keyup",     this.fireKeyUpListener);
	window.addEventListener("click",     this.fireClickListener);
	window.addEventListener("mousedown", this.fireMouseDownListener);
	window.addEventListener("mouseup",   this.fireMouseUpListener);
	window.addEventListener("mousemove", this.fireMouseMoveListener);
}

Game.prototype.gameLoop = function(){
	var deltaTime = (Date.now() - this.lastUpdateTime) / 1000;

	//if(this.currentScene != null && deltaTime <= 1){
		this.update(deltaTime);
		
		//var collides = CollideUtils.getCollides(this.currentScene);
		//for(var i=0; i<collides.length; i++){
		//	var collideInfo = collides[i];
		//	var goOne = collideInfo.gameObjectOne;
		//	for(var j=0; j<goOne.components.length; j++){
		//		var component = goOne.components[j];
		//		component.onCollide(collideInfo);
		//	}
		//}
		
		
		
		if(this.currentScene != null && deltaTime <= 1){
			for(var i=0; i<this.currentScene.gameObjects.length; i++){
				var go = this.currentScene.gameObjects[i];
				for(var j=0; j<go.components.length; j++){
					var component = go.components[j];
					component.onBeforeRender();
				}
			}
		}
		
		var timeStep = 1.0/60;
		var iteration = 1;
		this.b2World.Step(timeStep, iteration);
		
		this.render();
	//}
	this.lastUpdateTime = Date.now();
}

Game.prototype.update = function(deltaTime){
	for(var i=0; i<this.currentScene.gameObjects.length; i++){
		var go = this.currentScene.gameObjects[i];
		for(var j=0; j<go.components.length; j++){
			var component = go.components[j];
			component.update(deltaTime);
		}
	}
}

Game.prototype.render = function(){
	if(this.context != null){
		this.context.clearRect(0, 0, 1280, 800);
		for(var i=0; i<this.currentScene.gameObjects.length; i++){
		var go = this.currentScene.gameObjects[i];
		for(var j=0; j<go.components.length; j++){
			var component = go.components[j];
			component.onRender(this.context, this.camera);
		}
	}
	}else{
		console.log("contexto nulo");
	}
}

Game.prototype.fireKeyDownLisener = function(evt){
	if(game.currentScene != null){
		for(var i=0; i<game.currentScene.gameObjects.length; i++){
			var go = game.currentScene.gameObjects[i];
			for(var j=0; j<go.components.length; j++){
				var component = go.components[j];
				component.onKeyDown(evt.keyCode);
			}
		}
	}
}

Game.prototype.fireKeyUpListener = function(evt){
	if(game.currentScene != null){
		for(var i=0; i<game.currentScene.gameObjects.length; i++){
			var go = game.currentScene.gameObjects[i];
			for(var j=0; j<go.components.length; j++){
				var component = go.components[j];
				component.onKeyUp(evt.keyCode);
			}
		}
	}
}

Game.prototype.fireClickListener = function(evt){
	if(game.currentScene != null){
		for(var i=0; i<game.currentScene.gameObjects.length; i++){
			var go = game.currentScene.gameObjects[i];
			for(var j=0; j<go.components.length; j++){
				var component = go.components[j];
				component.onClick(evt.offsetX, evt.offsetY, evt.which);
			}
		}
	}
}

Game.prototype.fireMouseDownListener = function(evt){
	if(game.currentScene != null){
		for(var i=0; i<game.currentScene.gameObjects.length; i++){
			var go = game.currentScene.gameObjects[i];
			for(var j=0; j<go.components.length; j++){
				var component = go.components[j];
				component.onMouseDown(evt.offsetX, evt.offsetY, evt.which);
			}
		}
	}
}

Game.prototype.fireMouseUpListener = function(evt){
	if(game.currentScene != null){
		for(var i=0; i<game.currentScene.gameObjects.length; i++){
			var go = game.currentScene.gameObjects[i];
			for(var j=0; j<go.components.length; j++){
				var component = go.components[j];
				component.onMouseUp(evt.offsetX, evt.offsetY, evt.which);
			}
		}
	}
}

Game.prototype.fireMouseMoveListener = function(evt){
	if(game.currentScene != null){
		for(var i=0; i<game.currentScene.gameObjects.length; i++){
			var go = game.currentScene.gameObjects[i];
			for(var j=0; j<go.components.length; j++){
				var component = go.components[j];
				component.onMouseMove(evt.offsetX, evt.offsetY);
			}
		}
	}
}
