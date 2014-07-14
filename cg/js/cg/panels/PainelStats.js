/**
 * 
 */

function PainelStats(editor) {
	UI.Panel.call(this);	
	var scope = this;
	
	scope.setClass('painel');
	scope.setPosition('absolute');	
	scope.setDisplay('broke');
	
	scope.editor = editor;
	
	scope.painel = new UI.Panel();	
	scope.painel.setWidth('50px');
	scope.painel.setHeight('18px');
	
	scope.painel.setLeft('250px');
	scope.painel.setTop('180px');
		
	scope.fps = new Stats();
		
	scope.fps.domElement.style.position = 'absolute';
	scope.fps.domElement.style.top = '0px';
	scope.fps.domElement.style.left = '0px';
	
	scope.painel.dom.appendChild( scope.fps.domElement );
	scope.add( scope.painel );
	
	scope.getFrameViewer = function(){
		return scope.fps.domElement;
	};
	
	scope.updateFPS = function(){
		scope.fps.update();
	};
}

PainelStats.prototype = Object.create(UI.Panel.prototype);
