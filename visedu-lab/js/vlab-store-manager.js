/**
 * Gerenciador da loja de componentes.
 */
StoreManager = function() {
  var _collections = [];
  this.componentMap = [];

  Object.defineProperties( this, {
    collections: { enumerable: true,  value: _collections, writable: false },
  });

  /**
   * Adiciona uma coleção na loja de componentes.
   */
  this.addCollection = function(collection) {
    if (!collection) {
      return;
    }
    this.collections.push(collection);

    if (collection.components) {
      for (c in collection.components) {
        c = collection.components[c];
        this.componentMap[c.id] = c;
      }
    }
  };

  /**
   * Obtem um componente pelo identificador.
   */
  this.getComponent = function(id) {
    return this.componentMap[id];
  };

  /**
   * Cria o modelo da loja de componentes.
   */
  this.buildStoreModel = function() {
    var data = [];

    for(var col in VLab.storeManager.collections) {
      col = VLab.storeManager.collections[col];

      var c = {};
      c.isExpanded = true;
      c.isFolder = true;
      c.text = col.title;
      c.tooltip = col.description;
      c.styleClass = 'disable-component-box';
      c.spanStyleClass = 'sidebar-title';
      c.children = [];

      for(var com in col.components) {
        com = col.components[com];

        var i = {};
        i.text = com.title;
        i.tooltip = com.description;
        i.styleClass = com.type.styleClass;

        c.children.push(i);
      }
      data.push(c);
    }
    return data;
  };
};

StoreManager.prototype = {
  construtor: VLab.StoreManager
};

VLab.storeManager = new StoreManager();
