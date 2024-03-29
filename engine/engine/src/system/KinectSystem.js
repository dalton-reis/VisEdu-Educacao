var KinectSystem = new function(){

	this.fireHandDownListener = function(x, y){
		var rect = Game.canvas.getBoundingClientRect();
		x = x - rect.left;
		y = y - rect.top;
		
		for(var i in Game.listComponents){
			var component = Game.listComponents[i];
			if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
				component.onMouseDown(x, y, -1);
			}
		}
		if(Game.scene){
			for(var i in Game.scene.listComponents){
				var component = Game.scene.listComponents[i];
				if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
					component.onMouseDown(x, y, -1);
				}
			}
			for(var i in Game.scene.listLayers){
				var layer = Game.scene.listLayers[i];
				if(layer instanceof Layer){
					for(var j in layer.listComponents){
						var component = layer.listComponents[j];
						if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
							component.onMouseDown(x, y, -1);
						}
					}
					for(var j in layer.listGameObjects){
						var gameObject = layer.listGameObjects[j];
						if(gameObject instanceof GameObject){
							for(var k in gameObject.listComponents){
								var component = gameObject.listComponents[k];
								if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
									component.onMouseDown(x, y, -1);
								}
							}
						}
					}
				}
			}
		}
	}

	this.fireHandUpListener = function(x, y){
		var rect = Game.canvas.getBoundingClientRect();
		x = x - rect.left;
		y = y - rect.top;
		
		for(var i in Game.listComponents){
			var component = Game.listComponents[i];
			if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
				component.onMouseUp(x, y, -1);
			}
		}
		if(Game.scene){
			for(var i in Game.scene.listComponents){
				var component = Game.scene.listComponents[i];
				if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
					component.onMouseUp(x, y, -1);
				}
			}
			for(var i in Game.scene.listLayers){
				var layer = Game.scene.listLayers[i];
				if(layer instanceof Layer){
					for(var j in layer.listComponents){
						var component = layer.listComponents[j];
						if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
							component.onMouseUp(x, y, -1);
						}
					}
					for(var j in layer.listGameObjects){
						var gameObject = layer.listGameObjects[j];
						if(gameObject instanceof GameObject){
							for(var k in gameObject.listComponents){
								var component = gameObject.listComponents[k];
								if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
									component.onMouseUp(x, y, -1);
								}
							}
						}
					}
				}
			}
		}
	}

	this.fireHandMoveListener = function(x, y){
		var rect = Game.canvas.getBoundingClientRect();
		x = x - rect.left;
		y = y - rect.top;
		
		for(var i in Game.listComponents){
			var component = Game.listComponents[i];
			if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
				component.onMouseMove(x, y);
			}
		}
		if(Game.scene){
			for(var i in Game.scene.listComponents){
				var component = Game.scene.listComponents[i];
				if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
					component.onMouseMove(x, y);
				}
			}
			for(var i in Game.scene.listLayers){
				var layer = Game.scene.listLayers[i];
				if(layer instanceof Layer){
					for(var j in layer.listComponents){
						var component = layer.listComponents[j];
						if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
							component.onMouseMove(x, y);
						}
					}
					for(var j in layer.listGameObjects){
						var gameObject = layer.listGameObjects[j];
						if(gameObject instanceof GameObject){
							for(var k in gameObject.listComponents){
								var component = gameObject.listComponents[k];
								if(component instanceof Component /*&& ArrayUtils.contains(component.getSystems(), MouseSystem.getTag())*/){
									component.onMouseMove(x, y);
								}
							}
						}
					}
				}
			}
		}
	}
	
	this.onLoadKinect = function(){
        // Create cursor and cursor dom element
		var c = zig.controls.Cursor();
		var ce = document.createElement('div');
		ce.id = 'mycursor';
		document.body.appendChild(ce);
		 
		// 1. show/hide cursor on session start/end
		zig.singleUserSession.addEventListener('sessionstart', function(focusPosition) {
			ce.style.display = 'block';
		});
		zig.singleUserSession.addEventListener('sessionend', function() {
			ce.style.display = 'none';
		});
		 
		// 2. move the cursor element on cursor move
		c.addEventListener('move', function(cursor) {
			ce.style.left = (c.x * window.innerWidth - (ce.offsetWidth / 2)) + "px";
			ce.style.top = (c.y * window.innerHeight - (ce.offsetHeight / 2)) + "px";
			var x = ce.style.left.replace("px", "");
			var y = ce.style.top.replace("px", "");
			KinectSystem.fireHandMoveListener(x, y);
		});
		 
		// 3. Add/remove 'pushed' class on cursor push/release
		c.addEventListener('push', function(c) {
			ce.classList.add('pushed');
			var x = ce.style.left.replace("px", "");
			var y = ce.style.top.replace("px", "");
			KinectSystem.fireHandDownListener(x, y);
		});
		c.addEventListener('release', function(c) {
			ce.classList.remove('pushed');
			var x = ce.style.left.replace("px", "");
			var y = ce.style.top.replace("px", "");
			KinectSystem.fireHandUpListener(x, y);
		});
 
		// Add cursor to our single user UI session
		zig.singleUserSession.addListener(c);
	}

	this.getTag = function(){
		return "KINECT_SYSTEM";
	}

}

document.addEventListener('DOMContentLoaded', KinectSystem.onLoadKinect, false);