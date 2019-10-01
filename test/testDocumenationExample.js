var matchall = require('../matchall.js');
module.exports = function() {
     if(matchall('Friends, hold my arms! For in the mere act of penning \
                my thoughts of this Leviathan, they weary me, and make me \
                faint with their out-reaching comprehensiveness of sweep, as \
                if to include the whole circle of the sciences, and all the \
                generations of whales, and men, and mastodons, past, present, \
                and to come, with all the revolving panoramas of empire on earth,\
                and throughout the whole universe, not excluding its suburbs. - Moby Dick', 
                [
                    'arms!', 
                    'out-reaching',
                    'mastodons',
                    'revolving panoramas',
                    'excluding',
                    'suburbs.'
                ])) {
                    return 'MOBY DICK';
                }
                return 'NO WHALE';
}