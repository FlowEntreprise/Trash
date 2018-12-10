module.exports.MyfunctionOverload = overloadMethod

/**
 * Overload An Method
 * 
 * @constructor
 * @this {overloadMethod}
 * @summary Overload An Method
 * @param {Object} object 
 * @param {string} name 
 * @param {function} fn 
 */
function overloadMethod(object, name, fn){
    if(!object._overload){
    object._overload = {};
    }

    if(!object._overload[name]){
    object._overload[name] = {};
    }

     if(!object._overload[name][fn.length]){
object._overload[name][fn.length] = fn;
    }

    object[name] = function() {
         if(this._overload[name][arguments.length])
         return this._overload[name][arguments.length].apply(this, arguments);
    };
}