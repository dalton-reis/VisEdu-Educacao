/*

	FrameViewer2D - Classe que representa o visualizador de Frames/s (FPS)
	
*/
var FrameViewer2D = function(){
	var fps;	
	
	fps = new Stats();
	fps.domElement.style.position = 'absolute';
	fps.domElement.style.bottom = '0px';
	fps.domElement.style.right = '0px';
	
	if (BrowserDetect.browser == 'Firefox'){
		var posX = ((document.getElementById('td_drawArea').offsetWidth)+(document.getElementById('td_drawArea').offsetLeft))-80;
		var posY = ((document.getElementById('td_drawArea').offsetHeight)+(document.getElementById('td_drawArea').offsetTop))-48;	
		fps.domElement.style.left = posX+'px';
		fps.domElement.style.top = posY+'px';
	}
	
	this.getFrameViewer = function(){
		return fps.domElement;
	};
	
	this.updateFPS = function(){
		fps.update();
	};
};
