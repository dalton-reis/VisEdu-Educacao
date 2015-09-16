var f2D = new VLab.Lib('Formas 2D');
VLab.addLib(f2D);
f2D.addComponent(new VLab.Component('Círculo', 'alert("Círculo")', VLab.ComponentType.FORM2D));
f2D.addComponent(new VLab.Component('Quadrado', 'alert("Quadrado")', VLab.ComponentType.FORM2D, 'Quadrado'));
f2D.addComponent(new VLab.Component('Polígono', 'alert("Polígono")', VLab.ComponentType.FORM2D, 'Polígono'));
f2D.addComponent(new VLab.Component('Dalton', 'alert("Dalton")', VLab.ComponentType.FORM2D, 'Polígono'));

var f3D = new VLab.Lib('Formas 3D');
VLab.addLib(f3D);
f3D.addComponent(new VLab.Component('Esfera', 'alert("Esfera")', VLab.ComponentType.FORM3D));
f3D.addComponent(new VLab.Component('Cubo', 'alert("Cubo")', VLab.ComponentType.FORM3D, 'Cubo'));



//lib.addComponent(new VLab.Component(title, action, type, description));
