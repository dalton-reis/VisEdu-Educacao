View = function(storeManager, gameBuilder) {
  var _storeTree = undefined;
  var _storeTreeElement = undefined;
  var that = this;
  var _storeManager = storeManager;
  var _gameBuilder = gameBuilder;


  Object.defineProperties( this, {
    storeTree: { enumerable: true, value: _storeTree, writable: true },
    storeTreeElement: { enumerable: true, value: _storeTreeElement, writable: true },
    storeManager: { enumerable: true, value: _storeManager, writable: true },
    gameBuilder: { enumerable: true, value: _gameBuilder, writable: true },
  });

  this.buildStoreTree = function() {
    var storeModel = this.storeManager.buildStoreModel();

    this.storeTreeElement = $('#store-tree-component');

    this.storeTree = this.storeTreeElement.easytree({
      enableDnd: true,
      data: storeModel
    });
    this.storeTreeElement.children()[0].className = "nav nav-sidebar";
  };

  this.buildGameTree = function() {
    var gameModel = this.gameBuilder.buildTreeData();
    this.gameTreeElement = $('#game-tree-component');
    if (this.gameTreeElement && this.gameTreeElement.children() && this.gameTreeElement.children()[0]) {
      this.gameTreeElement.children()[0].remove()
    }

    this.gameTree = $(this.gameTreeElement).easytree({
      data: gameModel,
      enableDnd: true,

      canDrop: this.gameTree_canDropEvent,
      dropping: this.gameTree_droppingEvent,
      dropped: this.gameTree_droppedEvent,
      afterDrop: this.gameTree_afterDropEvent,
      built: this.gameTree_builtEvent
    });
  };


  this.gameTree_canDropEvent = function(event, nodes, isSourceNode, source, isTargetNode, target) {

     var destin = that.gameBuilder.getNodeById(target.id);

     if (!destin) { return; }

     if (!destin.isInput) { return; }

     var origin = that.storeManager.componentMap[source.id];

     if (!origin.type || !destin.type) { return; }

     if (origin.type.id != destin.type.id) { return; }

     if (isTargetNode && target.text == '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;') { return true; }
  };

  this.gameTree_droppingEvent = function(event, nodes, isSourceNode, source, isTargetNode, target, canDrop) {
      if (isSourceNode && !canDrop && target && (!isTargetNode && (target.id == 'divRejectAll' || target.id == 'divAcceptHref'))) {
          alertMessage("Dropping node rejected '" + source.text + "'");
      }
  };

  this.gameTree_droppedEvent = function(event, nodes, isSourceNode, source, isTargetNode, target) {
      //VLab.library.componentTree.addNode(source, target.id);
      var origin = that.storeManager.componentMap[source.id];

      var parent = origin.parent;
      origin.parent = undefined;
      try {
        var copy = that.cloneComponent(that.storeManager.componentMap[source.id]);
        copy.id = VLab.util.guid();
        var parentId = that.gameTree.getParentNode(target.id).id;

        var parent = undefined;
        if (parentId != 'root-node') {
          parent = that.gameBuilder.getNodeById(parentId);
        }
        that.gameBuilder.addNode(copy, parent);

        if (copy.type.plugables && copy.type.plugables.length > 0) {
          copy.children = [];
          for (p in copy.type.plugables) {
            p = copy.type.plugables[p];
            that.gameBuilder.addPlugable(p, copy);
          }
        }

        //that.gameTree.addBrotherNode(source, target.id);
        //that.gameTree.rebuildTree(); // rebuild 'other' tree
      } finally {
        origin.parent = parent;
      }
  };

  this.gameTree_afterDropEvent = function(event, nodes, isSourceNode, source, isTargetNode, target) {
    that.gameTree.rebuildTree(that.gameBuilder.buildTreeData());
  };

  this.cloneComponent = function(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = that.cloneComponent(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = that.cloneComponent(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

  this.gameTree_builtEvent = function(nodes) {
    that.storeTreeElement.children()[0].className = "nav nav-sidebar";
    that.gameTreeElement.children()[0].className = "nav nav-sidebar";
  };

};
