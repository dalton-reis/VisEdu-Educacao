function loadAppendFile(file) {
  var aa = document.getElementById('append-area');
  var div = document.createElement('div');
  $(div).load(file, function() {console.log('done')});
  aa.appendChild(div);
}

function loadAppendScriptFile(file) {
  var aa = document.getElementById('append-area');
  var sc = document.createElement('script');
  aa.appendChild(sc);
  $(sc).load(file, function() {console.log('done')});

}

loadAppendScriptFile('lib/vlab-plugins/plugins-imp.js')

VLab.PlugPanelType = function (plugables, singleShot) { VLab.ComponentType.call( this , 'PLUG-PANEL', plugables, 'PLUG-PANEL-comp', singleShot); };
VLab.PlugPanelType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.BackgroundImageType = function (plugables, singleShot) { VLab.ComponentType.call( this , 'BG-IMAGE', plugables, 'BG-IMAGE-comp', singleShot); };
VLab.BackgroundImageType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.ScrollBarType = function (plugables, singleShot) { VLab.ComponentType.call( this , 'SCROLL-BAR', plugables, 'SCROLL-BAR-comp', singleShot); };
VLab.ScrollBarType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.HotPointType = function (plugables) { VLab.ComponentType.call( this , 'HOT-POINT', plugables ); };
VLab.HotPointType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.HotPointValueType = function (plugables) { VLab.ComponentType.call( this , 'HP-VALUE', plugables ); };
VLab.HotPointValueType.prototype = Object.create( VLab.ComponentType.prototype );

VLab.HotPointItemType = function (plugables) { VLab.ComponentType.call( this , 'HP-ITEM', plugables ); };
VLab.HotPointItemType.prototype = Object.create( VLab.ComponentType.prototype );


CT = { };
CT.HP_ITEM = new VLab.HotPointItemType(),
CT.HP_VALUE = new VLab.HotPointValueType(),
CT.HP = new VLab.HotPointType([CT.HP_ITEM]),
CT.SCROLL_BAR = new VLab.ScrollBarType([CT.HP_VALUE], true),
CT.BG_IMAGE = new VLab.BackgroundImageType([], true),
CT.PLUG_PANEL = new VLab.PlugPanelType([CT.BG_IMAGE, CT.SCROLL_BAR, CT.HP], true)

VLab.allLibs = [];
VLab.allGamePlugs = [];

var baseCol = new VLab.Collection('Painel');
VLab.allLibs.push(baseCol);
baseCol.addComponent(new VLab.Component('Painel', CT.PLUG_PANEL, VLab.BgPanelBridge));
baseCol.addComponent(new VLab.Component('Imagem de fundo', CT.BG_IMAGE, VLab.BgPanelBridge));
baseCol.addComponent(new VLab.Component('Barra de rolagem', CT.SCROLL_BAR));


var hoCol = new VLab.Collection('Hot Point');
VLab.allLibs.push(hoCol);
hoCol.addComponent(new VLab.Component('Hot Point', CT.HP));
hoCol.addComponent(new VLab.Component('Valor do Hot Point', CT.HP_VALUE));
hoCol.addComponent(new VLab.Component('Imagem', CT.HP_ITEM));
hoCol.addComponent(new VLab.Component('Texto', CT.HP_ITEM));
hoCol.addComponent(new VLab.Component('Audio', CT.HP_ITEM));


VLab.allGamePlugs.push(CT.PLUG_PANEL);
