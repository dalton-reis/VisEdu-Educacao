var DirectoryUtils = new function(){

	this.getCurrentDir = function() {
		var myloc = window.location.href;
		var locarray = myloc.split("/");
		delete locarray[(locarray.length-1)];
		return locarray.join("/");
	}

	this.getAssetsDir = function() {
		var assetDir = this.getCurrentDir() + "assets/";
		return assetDir;
	}

}