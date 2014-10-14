var ColorUtils = new function() {

	this.hx = function () { 
		return parseInt((Math.random() * 255)).toString(16);
	}

	this.randomColor = function() { 
		return "#" + ColorUtils.hx() + ColorUtils.hx() + ColorUtils.hx();
	}

	this.hx2 = function () { 
		return parseInt((Math.random() * 16777215)).toString(16);
	}

	this.randomColor2 = function() { 
		return "#" + ColorUtils.hx2();
	}

}
