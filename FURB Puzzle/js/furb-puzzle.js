
var SCENE_LEFT      = -5000;
var SCENE_TOP       = -5000;
var SCENE_WIDTH     = 5000;
var SCENE_HEIGHT    = 5000;
var CANVAS_ID       = 'canvas';
var UPLOAD_ID       = 'imageUpload';
var COLUMN_QUESTION = "Informe a quantidade de colunas!";
var ROW_QUESTION    = "Informe a quantidade de linhas!";

var layer = null;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createPiecesArray(columns, rows, pieceWidth, pieceHeight) {
    var pieces = new Array(columns);

    for(var i=0; i<columns; i++){
        var piecesAux = new Array(rows);
        for(var j=0; j<rows; j++){
            var pieceObj = new PuzzlePieceObject().initialize(getRandomArbitrary(0, canvas.width), 
                                                              getRandomArbitrary(0, canvas.height), 
                                                              pieceWidth, 
                                                              pieceHeight,
                                                              i, 
                                                              j);
            piecesAux[j] = pieceObj;
        }
        pieces[i] = piecesAux;
    }

    return pieces;
}

function createSockets(pieceObj, socket, otherPiece, otherSocket, hw1, hh1, hw2, hh2){
    var index = (getRandomArbitrary(0, 10) % 2) == 0 ? 1 : -1;
    pieceObj[socket] = new PuzzleSocketObject().initialize(pieceObj.getCenterX() + hw1, 
                                                 pieceObj.getCenterY() + hh1, 
                                                 pieceObj);
    pieceObj[socket].enterFlg = index;

    otherPiece[otherSocket] = new PuzzleSocketObject().initialize(otherPiece.getCenterX() + hw2, 
                                                      otherPiece.getCenterY() + hh2, 
                                                      otherPiece);
    otherPiece[otherSocket].enterFlg = index;

    pieceObj[socket].slave = otherPiece[otherSocket];
    otherPiece[otherSocket].slave = pieceObj[socket];
}

function createPieces(canvas, imgData){
	var columns = window.prompt(COLUMN_QUESTION, 0);
    var rows = window.prompt(ROW_QUESTION, 0);

    var imgObj = new Image();
    imgObj.src = imgData;

    var pieceWidth = imgObj.width / columns;
    var pieceHeight = imgObj.height / rows;

    var pieces = createPiecesArray(columns, rows, pieceWidth, pieceHeight);

    var halfW = pieceWidth / 2;
    var halfH = pieceHeight / 2;

    for(var i=0; i<columns; i++){
    	for(var j=0; j<rows; j++){

    		var pieceObj = pieces[i][j];

    		if(pieceObj.leftSocket == null && i > 0){
                createSockets(pieceObj, 
                              'leftSocket', 
                              pieces[i-1][j], 
                              'rightSocket', 
                              -halfW,
                              0,
                              halfW,
                              0);
    		}
			if(pieceObj.rightSocket == null && i < (columns-1)){
                createSockets(pieceObj, 
                              'rightSocket', 
                              pieces[i+1][j], 
                              'leftSocket', 
                              halfW,
                              0,
                              -halfW,
                              0);
			}
			if(pieceObj.topSocket == null && j > 0){
                createSockets(pieceObj, 
                              'topSocket', 
                              pieces[i][j-1], 
                              'bottomSocket', 
                              0,
                              -halfH,
                              0,
                              halfH);
			}
			if(pieceObj.bottomSocket == null && j < (rows-1)){
                createSockets(pieceObj, 
                              'bottomSocket', 
                              pieces[i][j+1], 
                              'topSocket', 
                              0,
                              halfH,
                              0,
                              -halfH);
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

    var originalRaster = new paper.Raster(imgData);
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

function createPuzzle(imgData){
    var canvas = document.getElementById(CANVAS_ID);

    paper.setup(canvas);

	layer = new Layer().initialize();

    var scene = new Scene().initialize(SCENE_LEFT, 
                                       SCENE_TOP, 
                                       SCENE_WIDTH, 
                                       SCENE_HEIGHT);

    createPieces(canvas, imgData);

    scene.addLayer(layer);

	layer.setGravity(0);

    ComponentUtils.addComponent(layer, new DropPieceLayerComponent().initialize());

	Game.init(canvas, scene);

	Game.camera.centerPoint.x = canvas.width / 2; 
    Game.camera.centerPoint.y = canvas.height / 2;

    RenderSystem.clearCanvas = false;

    ComponentUtils.addComponent(Game, new PaperJsRenderComponent().initialize());
}

function handleImageSelect(evt) {
	var file = document.getElementById(UPLOAD_ID).files[0];
	
	var reader  = new FileReader();

	reader.onloadend = function () {;
		createPuzzle(reader.result);
  	}

  	if (file) {
    	reader.readAsDataURL(file);
  	}
}

window.onload = function(){
	document.getElementById(UPLOAD_ID).addEventListener('change', handleImageSelect, false);
}