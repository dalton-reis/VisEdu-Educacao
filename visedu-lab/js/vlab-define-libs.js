VLab.Form2DType = function (plugables) { VLab.ComponentType.call( this , 'FORM2D', plugables ); };
VLab.Form2DType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.Form3DType = function (plugables) { VLab.ComponentType.call( this , 'FORM3D', plugables ); };
VLab.Form3DType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.ActionType = function (plugables) { VLab.ComponentType.call( this , 'ACTION', plugables ); };
VLab.ActionType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.PhysicsType = function (plugables) { VLab.ComponentType.call( this , 'PHYSICS', plugables ); };
VLab.PhysicsType.prototype = Object.create( VLab.ComponentType.prototype );


CT = { };
CT.FORM2D = new VLab.Form2DType(),
CT.PHYSICS = new VLab.PhysicsType(),
CT.FORM3D = new VLab.Form3DType([CT.PHYSICS])

VLab.allLibs = [];
VLab.allGamePlugs = [];

var f2D = new VLab.Collection('Formas 2D');
VLab.allLibs.push(f2D);
f2D.addComponent(new VLab.Component('Círculo', CT.FORM2D));
f2D.addComponent(new VLab.Component('Quadrado', CT.FORM2D));
f2D.addComponent(new VLab.Component('Polígono', CT.FORM2D));

var f3D = new VLab.Collection('Formas 3D');
VLab.allLibs.push(f3D);
f3D.addComponent(new VLab.Component('Esfera', CT.FORM3D));
f3D.addComponent(new VLab.Component('Cubo', CT.FORM3D));


var fPhy = new VLab.Collection('Física');
VLab.allLibs.push(fPhy);
fPhy.addComponent(new VLab.Component('Aceleração', CT.PHYSICS));


VLab.allGamePlugs.push(CT.FORM2D);
VLab.allGamePlugs.push(CT.FORM3D);
