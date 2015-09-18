VLab = {revision : "0.1"};


/** UTIL **/
VLab.util = {};

VLab.util.guid = function() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}


VLab.util.adjustRenderSpace = function() {
  //adjust render-space height
  var lmRect = document.getElementById('component-library').getBoundingClientRect();
  var rsRect = document.getElementsByClassName('render-space')[0].getBoundingClientRect();


  var height = (lmRect.bottom - lmRect.top) - (rsRect.top - lmRect.top);
  height -= 20; //padding
  document.getElementsByClassName('render-space')[0].style.height = height + 'px';
};


VLab.util.adjustComponentTreeSpace = function() {
  var csRect = document.getElementById('component-library').getBoundingClientRect();

  document.getElementById('game-space').style.left = (csRect.right + 1) + 'px';
};

VLab.util.getRenderSpaceDimension = function() {
  var result = {};

  var rsRect = document.getElementsByClassName('render-space')[0].getBoundingClientRect();

  result.height = rsRect.bottom - rsRect.top;
  result.width = rsRect.right - rsRect.left;

  return result;
};
