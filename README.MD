A simple utility to check if a String contains all elements of a String array in the provided order.  
  
Sometimes you just wish to pattern match, without having to figure out all the regex for it and just go!  
  
This utility does just that. It matches the string against all the strings in the test array, in the given order.  
When your string contains all the matches in given pattern, it will return true.  

`'hello world'` will match against `['hel', ' ', 'rld']` but not against `['rld', 'hel']` because the order is different.

## installation:  
```
npm install @tschallacka/shouldmatchall
```     
## usage:

> var matches = require('@tschallacka/shouldmatchall');  
  
> matches ( STRING, ARRAY)  
  
> STRING: The string that should be searched.  
  
> ARRAY: An Array that contains strings, in the order it should be matched against.

## example:
```  
var matches = require('@tschallacka/shouldmatchall');
if(matches('Friends, hold my arms! For in the mere act of penning \
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
            console.log('yes it's moby dick');
        }
```