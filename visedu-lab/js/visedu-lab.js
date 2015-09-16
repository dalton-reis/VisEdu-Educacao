VLab = {revision : "0.1"};


/** UTIL **/
VLab.util = {};

VLab.util.adjustRenderSpace = function() {
  //adjust render-space height
  var lmRect = document.getElementById('component-store').getBoundingClientRect();
  var rsRect = document.getElementsByClassName('render-space')[0].getBoundingClientRect();


  var height = (lmRect.bottom - lmRect.top) - (rsRect.top - lmRect.top);

  //padding
  height -= 20;

  document.getElementsByClassName('render-space')[0].style.height = height + 'px';
};

VLab.util.getRenderSpaceDimension = function() {
  var result = {};

  var rsRect = document.getElementsByClassName('render-space')[0].getBoundingClientRect();

  result.height = rsRect.bottom - rsRect.top;
  result.width = rsRect.right - rsRect.left;

  return result;
};


VLab.util.drawComponentStore = function() {
  var cs = document.getElementById('component-store');

  for(var l in VLab.libs) {
    l = VLab.libs[l];

    var ul = document.createElement('ul');
    ul.setAttribute('class','nav nav-sidebar');
    cs.appendChild(ul);

    var title = document.createElement('li');
    title.setAttribute('class','sidebar-title');
    title.innerHTML = l.title;
    ul.appendChild(title);

    for (var c in l.components) {
      c = l.components[c];

      var li = document.createElement('li');
      ul.appendChild(li);

      var a = document.createElement('a');
      li.appendChild(a);
      a.setAttribute('href','javascript:void(0);');
      a.setAttribute('onclick',c.action);
      a.innerHTML = c.title;
    }
  }

};


/** LIBS **/

VLab.addLib = function(lib) {
  if (!this.libs) {
    this.libs = [];
  }
  this.libs.push(lib);
}

VLab.getLibs = function() {
  if (!this.libs) {
    this.libs = [];
  }
  return this.libs;
}
