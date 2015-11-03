VLab.Collection = function (title, description) {
  var _title = title;
  var _description = description;
  var _components = [];

  Object.defineProperties( this, {
    title: { enumerable: true, value: _title, writable: false },
    description: { enumerable: true, value: _description, writable: false },
    components: { enumerable: true, value: _components, writable: false },
  });
};

VLab.Collection.prototype = {
  construtor: VLab.Collection,

  addComponent: function (component) {
    this.components.push(component);
    component.parent = this;
  }
};

VLab.ComponentBridge = function() {

};

VLab.ComponentBridge.prototype = {
  construtor: VLab.ComponentBridge,

  load: function() {},
  execute: function() {},
  onSuccess: function() {},
  onCancel: function() {}
};

VLab.Component = function (title, type, bridge, description) {
  var _id  = VLab.util.guid();
  var _title = title;
  var _type = type;
  var _parent = undefined;
  var _bridge = bridge;
  var _description = description;
  var _parent = undefined;

  Object.defineProperties( this, {
    id: { enumerable: true, value: _id, writable: false },
    title: { enumerable: true, value: _title, writable: false },
    type: { enumerable: true, value: _type, writable: false },
    parent: { enumerable: true, value: _parent, writable: false },
    bridge: { enumerable: true, value: _bridge, writable: false },
    description: { enumerable: true, value: _description, writable: false },
    parent: { enumerable: true, value: _parent, writable: true },
  });
};
VLab.Component.prototype = { construtor: VLab.Component,

  load: function() {
    if (this.bridge) {
      this.bridge.load();
    }
  }
};

VLab.ComponentInput = function(type) {
  var _id  = VLab.util.guid();
  var _title = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
  var _type = type;
  var _isInput = true;
  var _parent = undefined;

  Object.defineProperties( this, {
    id: { enumerable: true, value: _id, writable: false },
    title: { enumerable: true, value: _title, writable: false },
    type: { enumerable: true, value: _type, writable: false },
    isInput: { enumerable: true, value: _isInput, writable: false },
    parent: { enumerable: true, value: _parent, writable: true },
  });
}
VLab.ComponentInput.prototype = { construtor: VLab.ComponentInput, };

/** COMPONENT TYPE */

VLab.ComponentType = function (id, plugables, styleClass, singleShot) {
    var _id = id;
    var _plugables = plugables ? plugables : [];
    var _styleClass = styleClass ? styleClass : id + "-comp";
    var _singleShot = singleShot ? singleShot : false;

    Object.defineProperties( this, {
        id: { enumerable: true, value: _id, writable: false },
        plugables: { enumerable: true, value: _plugables, writable: false },
        styleClass: { enumerable: true, value: _styleClass, writable: false },
        singleShot: { enumerable: true, value: _singleShot, writable: false },
    });
};
VLab.ComponentType.prototype = { construtor: VLab.ComponentType, };
