var layer = null;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createPieces(layer, canvas){
	var columns = window.prompt("Informe a quantidade de colunas!", 0);
    var rows = window.prompt("Informe a quantidade de linhas!", 0);

    var imgObj = AssetStore.getAsset("PUZZLE_IMAGE").getAssetInstance();
    var pieceWidth = imgObj.width / columns;
    var pieceHeight = imgObj.height / rows;

    var pieces = new Array(columns);

    for(var i=0; i<columns; i++){
    	var piecesAux = new Array(rows);
    	for(var j=0; j<rows; j++){
    		var pieceObj = new PuzzlePieceObject().initialize(getRandomArbitrary(0, canvas.width), 
    			                                              getRandomArbitrary(0, canvas.height), 
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
                var index = (getRandomArbitrary(0, 10) % 2) == 0 ? 1 : -1;
    			pieceObj.leftSocket = new PuzzleSocketObject().initialize(pieceObj.getCenterX() - w, pieceObj.getCenterY(), pieceObj);
    		    pieceObj.leftSocket.enterFlg = index;

    			var leftPiece = pieces[i-1][j];
    			leftPiece.rightSocket = new PuzzleSocketObject().initialize(leftPiece.getCenterX() + w, leftPiece.getCenterY(), leftPiece);
    		    leftPiece.rightSocket.enterFlg = index;

    			pieceObj.leftSocket.slave = leftPiece.rightSocket;
                leftPiece.rightSocket.slave = pieceObj.leftSocket;
    		}
			if(pieceObj.rightSocket == null && i < (columns-1)){
                var index = (getRandomArbitrary(0, 10) % 2) == 0 ? 1 : -1;
				pieceObj.rightSocket = new PuzzleSocketObject().initialize(pieceObj.getCenterX() + w, pieceObj.getCenterY(), pieceObj);
			    pieceObj.rightSocket.enterFlg = index;

				var rightPiece = pieces[i+1][j];
				rightPiece.leftSocket = new PuzzleSocketObject().initialize(rightPiece.getCenterX() - w, rightPiece.getCenterY(), rightPiece);
			    rightPiece.leftSocket.enterFlg = index;

				pieceObj.rightSocket.slave = rightPiece.leftSocket;
                rightPiece.leftSocket.slave = pieceObj.rightSocket;
			}
			if(pieceObj.topSocket == null && j > 0){
                var index = (getRandomArbitrary(0, 10) % 2) == 0 ? 1 : -1;
				pieceObj.topSocket = new PuzzleSocketObject().initialize(pieceObj.getCenterX(), pieceObj.getCenterY() - h, pieceObj);
			    pieceObj.topSocket.enterFlg = index;

				var topPiece = pieces[i][j-1];
				topPiece.bottomSocket = new PuzzleSocketObject().initialize(topPiece.getCenterX(), topPiece.getCenterY() + h, topPiece);
			    topPiece.bottomSocket.enterFlg = index;

				pieceObj.topSocket.slave = topPiece.bottomSocket;
                topPiece.bottomSocket.slave = pieceObj.topSocket;
			}
			if(pieceObj.bottomSocket == null && j < (rows-1)){
                var index = (getRandomArbitrary(0, 10) % 2) == 0 ? 1 : -1;
				pieceObj.bottomSocket = new PuzzleSocketObject().initialize(pieceObj.getCenterX(), pieceObj.getCenterY() + h, pieceObj);
				pieceObj.bottomSocket.enterFlg = index;

				var bottomPiece = pieces[i][j+1];
				bottomPiece.topSocket = new PuzzleSocketObject().initialize(bottomPiece.getCenterX(), bottomPiece.getCenterY() - h, bottomPiece);
			    bottomPiece.topSocket.enterFlg = index;

				pieceObj.bottomSocket.slave = bottomPiece.topSocket;
                bottomPiece.topSocket.slave = pieceObj.bottomSocket;
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

    var originalRaster = new paper.Raster(AssetStore.getAsset("PUZZLE_IMAGE").getAssetInstance().src);
    originalRaster.visible = false;

    for(var i=0; i<columns; i++){
        for(var j=0; j<rows; j++){
            var pieceObj = pieces[i][j];

            var raster = originalRaster.clone();
            raster.position = new paper.Point(raster.size.width/2, raster.size.height/2);
            raster.visible = true;
            var path = new paper.Path();
            path.strokeColor = "red";
            path.strokeWidth = 3;

            var px = pieceObj.offsetLeft * pieceObj.width;
            var py =  pieceObj.offsetTop * pieceObj.height;

            var p1 = new paper.Point(px, py);
            var p2 = new paper.Point(px + pieceObj.width, py);
            var p3 = new paper.Point(px + pieceObj.width, py + pieceObj.height);
            var p4 = new paper.Point(px, py + pieceObj.height);

            path.moveTo(p1);
            path.lineTo(p1);

            if(pieceObj.topSocket != null){
                var seg = pieceObj.width / 5;
                var enterSize = seg * 1.1 * pieceObj.topSocket.enterFlg;
                path.lineTo(new paper.Point(p1.x+(seg*2), p1.y));
                path.arcTo(new paper.Point(p1.x+(seg*2), p1.y+enterSize), 
                           new paper.Point(p1.x+(seg*3), p1.y));
                path.lineTo(p2);
            }else{
                path.lineTo(p2);    
            }
            
            if(pieceObj.rightSocket != null){
                var seg = pieceObj.height / 5;
                var enterSize = seg * 1.1 * pieceObj.rightSocket.enterFlg;
                path.lineTo(new paper.Point(p2.x, p2.y+(seg*2)));
                path.arcTo(new paper.Point(p2.x+enterSize, p2.y+(seg*2)), 
                           new paper.Point(p2.x, p2.y+(seg*3)));
                path.lineTo(p3);
            }else{
                path.lineTo(p3);    
            }
            
            if(pieceObj.bottomSocket != null){
                var seg = pieceObj.width / 5;
                var enterSize = seg * 1.1 * pieceObj.bottomSocket.enterFlg;
                path.lineTo(new paper.Point(p3.x-(seg*2), p3.y));
                path.arcTo(new paper.Point(p3.x-(seg*2), p3.y+enterSize), 
                           new paper.Point(p3.x-(seg*3), p3.y));
                path.lineTo(p4);
            }else{
                path.lineTo(p4);    
            }

            if(pieceObj.leftSocket != null){
                var seg = pieceObj.height / 5;
                var enterSize = seg * 1.1 * pieceObj.leftSocket.enterFlg;
                path.lineTo(new paper.Point(p4.x, p4.y-(seg*2)));
                path.arcTo(new paper.Point(p4.x+enterSize, p4.y-(seg*2)), 
                           new paper.Point(p4.x, p4.y-(seg*3)));
                path.lineTo(p1);
            }else{
                path.lineTo(p1);    
            }

            var group = new paper.Group([path, raster]);
            group.clipped = true;

            var segX = (pieceObj.width / 5) * 1.1 * 5;
            var segY = (pieceObj.height / 5) * 1.1 * 5;

            var groupRaster = group.rasterize();
            pieceObj.tileImage = groupRaster.getSubRaster(new paper.Rectangle(
                                                                               px - segX,
                                                                               py - segY,
                                                                               pieceObj.width + segX,
                                                                               pieceObj.height + segY
                                                                              ));
            pieceObj.visible = true;
            raster.visible = false;
            groupRaster.visible = false;
        }
    }
}

function createPuzzle(){
    var canvas = document.getElementById('canvas');

    paper.setup(canvas);

	layer = new Layer().initialize();
    var scene = new Scene().initialize(-5000, -5000, 5000, 5000);

    createPieces(layer, canvas);

    scene.addLayer(layer);
	layer.setGravity(0);

    ComponentUtils.addComponent(layer, new DropPieceLayerComponent().initialize("red", "red"));

	Game.init(canvas, scene);
	Game.camera.centerPoint.x = canvas.width / 2; 
    Game.camera.centerPoint.y = canvas.height / 2;

    RenderSystem.clearCanvas = false;
    ComponentUtils.addComponent(Game, new PaperJsRenderComponent().initialize());
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