VLab.BgPanelBridge = function () {

	VLab.ComponentBridge.call( this );

  var _loaded = false;

  Object.defineProperties( this, {
    loaded: { enumerable: true, value: _loaded, writable: true },
  });
};

VLab.BgPanelBridge.prototype = Object.create(
  VLab.ComponentBridge.prototype
);

VLab.BgPanelBridge.prototype.load = function() {
  if (!this.loaded) {
    loadAppendFile("lib/vlab-plugins/bg_panel.html");
    this.loaded = true;
  }
};

VLab.BgPanelBridge.prototype.execute = function() {
  console.log('lalalalalala');
	$('#bg-panel-modal').modal('show')
  console.log('lolololololo');
};
