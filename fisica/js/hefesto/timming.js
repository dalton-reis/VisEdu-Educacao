HEFESTO.Timming = function () {

	this._lastTime = undefined;
	this._actualTime = undefined;
};

HEFESTO.Timming.prototype = {
	construtor: HEFESTO.Timming
};

HEFESTO.Timming.prototype.start = function() {
	this._lastTime = new Date();
	this._actualTime = new Date();
};

HEFESTO.Timming.prototype.update = function() {
	this._lastTime = this._actualTime;
	this._actualTime = new Date();	
};

HEFESTO.Timming.prototype.getLastFrameDuration = function() {
	var h = this._actualTime - this._lastTime; 
	return h;
};