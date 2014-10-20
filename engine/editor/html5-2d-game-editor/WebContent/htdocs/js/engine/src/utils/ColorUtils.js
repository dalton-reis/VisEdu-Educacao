var ColorUtils = new function() {

	/*this.hx = function () { 
		return parseInt((Math.random() * 255)).toString(16);
	}
	*/

	this.randomColor = function() { 
		return "#" + parseInt((Math.random() * 16777215)).toString(16); // 2 ^ 24 -1 equivale a 24 bits, menus 1 por partir de zero.
	}

}
