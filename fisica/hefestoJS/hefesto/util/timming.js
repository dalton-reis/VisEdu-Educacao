H.Timming = function () {

	this._lastTime = undefined;
	this._actualTime = undefined;
	this._duration = undefined;
};

H.Timming.prototype = {
	construtor: H.Timming
};

H.Timming.prototype.start = function() {
	this._lastTime = new Date().getTime();
	this._actualTime = new Date().getTime();
};

H.Timming.prototype.update = function() {
	this._lastTime = this._actualTime;
	this._actualTime = new Date().getTime();	
	this._duration = this._actualTime - this._lastTime;
};

H.Timming.prototype.getLastFrameDuration = function() {
	return this._duration;
};