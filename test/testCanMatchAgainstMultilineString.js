var matchall = require('../matchall.js');
module.exports = function() {
    return matchall('hello world,\nhello universe,\nhow are you today?', ['hello','world','universe','today']);
}