var ColorUtils = new function() {

	this.hx = function () { 
		return parseInt((Math.random() * 255)).toString(16);
	}

	this.randomColor = function() { 
		return "#" + ColorUtils.hx() + ColorUtils.hx() + ColorUtils.hx();
	}

}
