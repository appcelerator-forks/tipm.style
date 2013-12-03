
/*!
 *
 */

/**
 * expose all styles as usable functions
 */

module.exports = Style;

function Style(styles){
  if (!(this instanceof Style)) return new Style(styles);
  this._style = styles;
  return compile(this._style,styles);
}

/**
 * [set description]
 * @param {[type]} name  [description]
 * @param {[type]} style [description]
 */

Style.prototype.set = function(name, style) {
  this._style[name.toUpperCase()] = style;
  this[name.toLowerCase()] = ('object' == typeof style) ? mixin(style) : style;
}


/**
 * [compile description]
 * @param  {[type]} style [description]
 * @return {[type]}       [description]
 */

function compile(style, obj) {
  var _style = obj || {};
  for (var key in style){
    var name = key.toLowerCase();
    var sty = style[key];
    _style[name] = ('object' == typeof sty)
      ? mixin(sty)
      : sty;
  }
  return _style;
}


/**
 * combine two objects
 * @param  {Object} base
 * @param  {Object} obj
 * @return {Object}
 * @api public
 */

function mixin(base) {
  return function (obj) {
    for (var key in base) {
      obj[key] = (obj[key]) ? obj[key] : base[key];
    }
    return obj;
  }
}
