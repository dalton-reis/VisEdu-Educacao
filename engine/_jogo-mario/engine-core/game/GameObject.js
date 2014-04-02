var gameObjectUID = 0;

function GameObject(){}

JSUtils.addMethod(GameObject.prototype, "initialize", 
function(x, y){
	this.img = null;
	this.width = 0;
	this.height = 0;
	this.movable = false;
	this.staticObject = false;
	this.position = new Vector2D().initialize(x, y);
	this.velocity = new Vector2D().initialize(0, 0);
	this.aceleration = new Vector2D().initialize(0, 0);
	this.direction = new Vector2D().initialize(1, 0);
	this.direction.normalise();
	this.bbox = new BBox().initialize(x, y, x, y);
	this.components = new Array();
	this.id = "gameObjectUID_" + (++gameObjectUID);
	return this;
}
);

JSUtils.addMethod(GameObject.prototype, "initialize", 
function(x, y, img){
	this.img = img;
	this.width = img.width;
	this.height = img.height;
	this.movable = false;
	this.staticObject = false;
	this.position = new Vector2D().initialize(x, y);
	this.velocity = new Vector2D().initialize(0, 0);
	this.aceleration = new Vector2D().initialize(0, 0);
	this.direction = new Vector2D().initialize(1, 0);
	this.direction.normalise();
	this.bbox = new BBox().initialize(x, y, x + this.width, y + this.height);
	this.components = new Array();
	this.id = "gameObjectUID_" + (++gameObjectUID);
	return this;
}
);

JSUtils.addMethod(GameObject.prototype, "initialize", 
function(x, y, w, h){
	this.img = null;
	this.width = w;
	this.height = h;
	this.movable = false;
	this.staticObject = false;
	this.position = new Vector2D().initialize(x, y);
	this.velocity = new Vector2D().initialize(0, 0);
	this.aceleration = new Vector2D().initialize(0, 0);
	this.direction = new Vector2D().initialize(1, 0);
	this.direction.normalise();
	this.bbox = new BBox().initialize(x, y, (x+w), (y+h));
	this.components = new Array();
	this.id = "gameObjectUID_" + (++gameObjectUID);
	return this;
}
);

GameObject.prototype.getComponent = function(tag){
	return ArrayUtils.getElement(this.components, tag);
}

GameObject.prototype.render = function(context, camera){
	context.fillStyle = "rgb(0,0,255)"; 
	if(this.img != null){
		context.drawImage(this.img, 
		                  (this.position.x - camera.centerX), 
						  (this.position.y - camera.centerY), 
						  this.width, 
						  this.height);
	}
	context.strokeRect((this.bbox.minX - camera.centerX), 
	                   (this.bbox.minY - camera.centerY), 
					   (this.bbox.maxX - this.bbox.minX), 
					   (this.bbox.maxY - this.bbox.minY));
}

GameObject.prototype.updateBBox = function(){
	this.bbox.minX = this.position.x;
	this.bbox.minY = this.position.y;
	this.bbox.maxX = this.position.x + this.width;
	this.bbox.maxY = this.position.y + this.height;
}

GameObject.prototype.move = function(vector){
	this.position.add(vector.x, vector.y);
}

GameObject.prototype.rotate = function(angle){
	this.direction.add(angle);
}

GameObject.prototype.addComponent = function(component){
	component.gameObject = this;
	component.posConstruct();
	this.components = ArrayUtils.addElement(this.components, component);
}

GameObject.prototype.removeComponent = function(component){
	var index = ArrayUtils.getIndexOf(this.components, component);
	if(index > -1){
		component.gameObject = null;
		this.components = ArrayUtils.removeElement(this.components, index);
	}
}