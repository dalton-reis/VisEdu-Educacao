View = function() {
  var _storeTree = undefined;
  var _storeTreeElement = undefined;

  Object.defineProperties( this, {
    storeTree: { enumerable: true, value: _storeTree, writable: true },
    storeTreeElement: { enumerable: true, value: _storeTreeElement, writable: true },
  });

  this.buildStoreTree = function( storeModel ) {
    this.storeTreeElement = $('#component-library');

    this.storeTree = this.storeTreeElement.easytree({
      enableDnd: true,
      data: storeModel
    });
    this.storeTreeElement.children()[0].className = "nav nav-sidebar";
  };

  this.buildGameTree = function( gameModel ) {
    this.gameTreeElement = $('#component-tree');

    this.gameTree = $(this.gameTreeElement).easytree({
      data: gameModel,
      enableDnd: true,

      canDrop: this.gameTree_canDropEvent,
      dropping: this.gameTree_droppingEvent,
      dropped: this.gameTree_droppedEvent,
      built: this.gameTree_builtEvent
    });
  };


  this.gameTree_canDropEvent = function(event, nodes, isSourceNode, source, isTargetNode, target) {
     if (!isTargetNode && target.id == 'divAcceptHref' && isSourceNode){
         return source.href ? true : false;
     }
     console.log(target.text);
     if (isTargetNode && target.text == '...') {
         return true;
     }
  };

  this.gameTree_droppingEvent = function(event, nodes, isSourceNode, source, isTargetNode, target, canDrop) {
      if (isSourceNode && !canDrop && target && (!isTargetNode && (target.id == 'divRejectAll' || target.id == 'divAcceptHref'))) {
          alertMessage("Dropping node rejected '" + source.text + "'");
      }
  };

  this.gameTree_droppedEvent = function(event, nodes, isSourceNode, source, isTargetNode, target) {
      //VLab.library.componentTree.addNode(source, target.id);
      VLab.view.gameTree.addBrotherNode(source, target.id);
      VLab.view.gameTree.rebuildTree(); // rebuild 'other' tree

  };

  this.gameTree_builtEvent = function(nodes) {
    VLab.view.storeTreeElement.children()[0].className = "nav nav-sidebar";
    VLab.view.gameTreeElement.children()[0].className = "nav nav-sidebar";
  };

};

VLab.view = new View();
