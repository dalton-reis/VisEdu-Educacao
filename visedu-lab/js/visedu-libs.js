VLab.Lib = function (title) {
  var _title = title;
  var _components = [];

  Object.defineProperties( this, {
    title: { enumerable: true, value: _title, writable: false },
    components: { enumerable: true, value: _components, writable: false },
  });
};

VLab.Lib.prototype = {
  construtor: VLab.Lib,

  addComponent: function (component) {
    this.components.push(component);
  }
};


VLab.Component = function (title, action, type, description) {
  var _title = title;
  var _action = action;
  var _type = type;
  var _description = description;

  Object.defineProperties( this, {
    title: { enumerable: true, value: _title, writable: false },
    action: { enumerable: true, value: _action, writable: false },
    type: { enumerable: true, value: _type, writable: false },
    description: { enumerable: true, value: _description, writable: false },
  });
};

/** COMPONENT TYPE */

VLab.ComponentType = function (id) {
    var _id = id;
    var _plugables = [];

    Object.defineProperties( this, {
        id: { enumerable: true, value: _id, writable: false },
        plugables: { enumerable: true, value: _plugables, writable: false }
    });
};
VLab.ComponentType.prototype = { construtor: VLab.ComponentType, };


VLab.BasicType = function () { VLab.ComponentType.call( this , 'BASIC'); };
VLab.BasicType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.Form2DType = function () { VLab.ComponentType.call( this , 'FORM2D'); };
VLab.Form2DType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.Form3DType = function () { VLab.ComponentType.call( this , 'FORM3D'); };
VLab.Form3DType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.ActionType = function () { VLab.ComponentType.call( this , 'ACTION'); };
VLab.ActionType.prototype = Object.create( VLab.ComponentType.prototype );



VLab.ComponentType = {
	BASIC: new VLab.BasicType(),
  FORM2D: new VLab.Form2DType(),
  FORM3D: new VLab.Form3DType(),
  ACTION: new VLab.ActionType()
};
