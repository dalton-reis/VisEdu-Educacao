var layer = null;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createPieces(layer){
	var columns = window.prompt("Informe a quantidade de colunas!", 0);
    var rows = window.prompt("Informe a quantidade de linhas!", 0);

    var imgObj = AssetStore.getAsset("PUZZLE_IMAGE").getAssetInstance();
    var pieceWidth = imgObj.width / columns;
    var pieceHeight = imgObj.height / rows;

    var pieces = new Array(columns);

    for(var i=0; i<columns; i++){
    	var piecesAux = new Array(rows);
    	for(var j=0; j<rows; j++){
    		var pieceObj = new PuzzlePieceObject().initialize(getRandomArbitrary(0, 1000), 
    			                                              getRandomArbitrary(0, 550), 
    			                                              pieceWidth, 
    			                                              pieceHeight, 
    			                                              imgObj, 
    			                                              i, 
    			                                              j);
			piecesAux[j] = pieceObj;
    	}
    	pieces[i] = piecesAux;
    }

    for(var i=0; i<columns; i++){
    	for(var j=0; j<rows; j++){
    		var pieceObj = pieces[i][j];

    		var w = pieceWidth / 2;
    		var h = pieceHeight / 2;

    		if(pieceObj.leftSocket == null && i > 0){
    			pieceObj.leftSocket = new PuzzleSocketObject().initialize(pieceObj.getCenterX() - w, pieceObj.getCenterY());
    		
    			var leftPiece = pieces[i-1][j];
    			leftPiece.rightSocket = new PuzzleSocketObject().initialize(leftPiece.getCenterX() + w, leftPiece.getCenterY());
    		
    			pieceObj.leftSocket.slave = leftPiece.rightSocket;
    		}
			if(pieceObj.rightSocket == null && i < (columns-1)){
				pieceObj.rightSocket = new PuzzleSocketObject().initialize(pieceObj.getCenterX() + w, pieceObj.getCenterY());
			
				var rightPiece = pieces[i+1][j];
				rightPiece.leftSocket = new PuzzleSocketObject().initialize(rightPiece.getCenterX() - w, rightPiece.getCenterY());
			
				pieceObj.rightSocket.slave = rightPiece.leftSocket;
			}
			if(pieceObj.topSocket == null && j > 0){
				pieceObj.topSocket = new PuzzleSocketObject().initialize(pieceObj.getCenterX(), pieceObj.getCenterY() - h);
			
				var topPiece = pieces[i][j-1];
				topPiece.bottomSocket = new PuzzleSocketObject().initialize(topPiece.getCenterX(), topPiece.getCenterY() + h);
			
				pieceObj.topSocket.slave = topPiece.bottomSocket;
			}
			if(pieceObj.bottomSocket == null && j < (rows-1)){
				pieceObj.bottomSocket = new PuzzleSocketObject().initialize(pieceObj.getCenterX(), pieceObj.getCenterY() + h);
				
				var bottomPiece = pieces[i][j+1];
				bottomPiece.topSocket = new PuzzleSocketObject().initialize(bottomPiece.getCenterX(), bottomPiece.getCenterY() - h);
			
				pieceObj.bottomSocket.slave = bottomPiece.topSocket;
			}
    		
    		layer.addGameObject(pieceObj);

    		if(pieceObj.leftSocket != null){
    			layer.addGameObject(pieceObj.leftSocket);	
    		}
    		if(pieceObj.rightSocket != null){
    			layer.addGameObject(pieceObj.rightSocket);
    		}
    		if(pieceObj.topSocket != null){
    			layer.addGameObject(pieceObj.topSocket);
    		}
    		if(pieceObj.bottomSocket != null){
    			layer.addGameObject(pieceObj.bottomSocket);
    		}
    	}
    }
}

function createPuzzle(){
	layer = new Layer().initialize();
    var scene = new Scene().initialize(-5000, -5000, 5000, 5000);

    createPieces(layer);

    scene.addLayer(layer);
	layer.setGravity(0);

	Game.init(document.getElementById('canvas'), scene);
	Game.camera.centerPoint.x = 500; Game.camera.centerPoint.y = 275;
}

function handleImageSelect(evt) {
	var file = document.getElementById('imageUpload').files[0];
	
	var reader  = new FileReader();

	reader.onloadend = function () {
		if(AssetStore.getAsset("PUZZLE_IMAGE") == null){
			AssetStore.addAsset(new Asset().initialize("PUZZLE_IMAGE", "", "IMAGE"));
		}
		AssetStore.getAsset("PUZZLE_IMAGE").getAssetInstance().src = reader.result;
		createPuzzle();
  	}

  	if (file) {
    	reader.readAsDataURL(file);
  	}
}

window.onload = function(){
	document.getElementById('imageUpload').addEventListener('change', handleImageSelect, false);
}