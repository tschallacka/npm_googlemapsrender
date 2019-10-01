var matchall = require('../matchall.js');
module.exports = function() {
    return matchall('hello world, hello universe, how are you today?', ['hello','world','universe','today']);
}