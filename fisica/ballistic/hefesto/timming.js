HEFESTO.Timming = function () {

	this._lastTime = undefined;
	this._actualTime = undefined;
	this._duration = undefined;
};

HEFESTO.Timming.prototype = {
	construtor: HEFESTO.Timming
};

HEFESTO.Timming.prototype.start = function() {
	this._lastTime = new Date().getTime();
	this._actualTime = new Date().getTime();
};

HEFESTO.Timming.prototype.update = function() {
	this._lastTime = this._actualTime;
	this._actualTime = new Date().getTime();	
	this._duration = this._actualTime - this._lastTime;
};

HEFESTO.Timming.prototype.getLastFrameDuration = function() {
	return this._duration;
};