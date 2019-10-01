var expect = require('chai').expect;

describe('matchall', function() 
{
   var stringfail = "No valid String provided to match against",
       arrayfail = "Nothing to match against. Provide a non empty Array of Strings as second argument";
       
   it('No parameters provided', function() {
     expect(require('./testEmpty.js')).to.throw();
   });
   
   it('Invalid String', function() {
     expect(require('./testInvalidString.js')).to.throw(stringfail);
   });
   
   
   
   it('Valid string, no second argument', function() {
     expect(require('./testValidStringNoSecondArgument.js')).to.throw(arrayfail);
   });
   
   it('Valid string, invalid second argument', function() {
     expect(require('./testValidStringWrongSecondArgument.js')).to.throw(arrayfail);
   });
   
   it('Valid string, empty array', function() {
     expect(require('./testValidStringEmptyArray.js')).to.throw(arrayfail);
   });
   
   it('Postive match against simple string', function() {
       expect(require('./testCanMatchAgainstSimpleString.js')()).to.be.true;
   });
   it('Fail against simple string', function() {
       expect(require('./testCanFailWithWrongOrderAgainstSimpleString.js')()).to.be.false;
   });
   
   it('Postive match against complex string', function() {
       expect(require('./testCanMatchAgainstComplexString.js')()).to.be.true;
   });
   it('Fail against complex string', function() {
       expect(require('./testCanFailWithWrongOrderAgainstComplexString.js')()).to.be.false;
   });
   
   it('Postive match against multiline string', function() {
       expect(require('./testCanMatchAgainstMultilineString.js')()).to.be.true;
   });
   it('Fail against multiline string', function() {
       expect(require('./testCanFailWithWrongOrderAgainstMultilineString.js')()).to.be.false;
   });
   it('documentation example', function() {
       expect(require('./testDocumenationExample.js')()).to.be.equal('MOBY DICK');
   });
   
});