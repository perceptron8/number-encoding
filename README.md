number-encoding
===============

NumberEncoder/NumberDecoder with API similar to TextEncoder/TextDecoder.

* https://github.com/inexorabletash/text-encoding
* https://encoding.spec.whatwg.org/

Usage
-----

```
var number = ...;
var encoder = new NumberEncoder("Int16");
var bytes = encoder.encode(number);

var bytes = ...;
var decoder = new NumberDecoder("Float64");
var number = decoder.decode(bytes);
```

See also
-------
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
* http://www.ecma-international.org/ecma-262/6.0/#sec-typedarray-objects
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
* http://www.ecma-international.org/ecma-262/6.0/#sec-arraybuffer-constructor
