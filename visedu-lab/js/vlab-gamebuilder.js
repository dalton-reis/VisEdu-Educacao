/**
 * Construtor de jogos.
 */
GameBuilder = function(){
  var _data = [];

  var _allNodes = [];

  Object.defineProperties( this, {
    allNodes: { enumerable: true, value: _allNodes, writable: false },
    data: { enumerable: true, value: _data, writable: true },
  });

  this.addPlugable = function(type, node) {
    var input = new VLab.ComponentInput(type);

    if (!node) {
      node = this.data;
    }
    if (node.children) {
      input.parent = node;
      node = node.children;
    }
    node.push(input);

    this.allNodes[input.id] = input;
  };

  this.addNode = function(node, parent) {
    if (!parent) {
      parent = this.data;
    }
    if (parent.children) {
      parent = parent.children;
      node.parent = parent;
    }
    parent.push(node);
    this.allNodes[node.id] = node;
  };

  this.buildTreeData = function() {
    function buildChildren(children, parent) {
      for (var c in children) {
        c = children[c];

        var comp = {};
        comp.id = c.id;
        comp.text = c.title;
        comp.styleClass = c.type.styleClass;

        if (c.children) {
          comp.children = [];
          comp.isExpanded = true;
          buildChildren(c.children, comp);
        }
        parent.children.push(comp);
      }
    }

    var data = [];

    var lib = {};
    lib.id = 'root-node'
    lib.isExpanded = true;
    lib.isFolder = true;
    lib.text = 'Novo Jogo';
    lib.styleClass = 'tree-game';

    var children = [];
    lib.children = children;

    buildChildren(this.data, lib);

    data.push(lib);
    return data;
  };

  this.getNodeById = function(id) {
    return this.allNodes[id];
  };

  this.getNodeParentById = function(id) {
    var node = this.getNodeById(id);
    return node.parent;
  };

  this.isPlugableInput = function(id) {
    return this.allNodes[id] && this.allNodes[id].isInput;
  };

};
