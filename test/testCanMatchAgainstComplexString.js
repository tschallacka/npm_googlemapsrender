var matchall = require('../matchall.js');
module.exports = function() {
    return matchall('-\\/\\\\^$*+?.()|[\\]{}', ['-\\/','^','+?.()','{}']);
}