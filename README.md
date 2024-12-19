number-encoding
===============

NumberEncoder/NumberDecoder with API similar to TextEncoder/TextDecoder.

* https://encoding.spec.whatwg.org/

Usage
-----

encoding:

```
const number = ...;
const encoder = new NumberEncoder("Int16");
const bytes = encoder.encode(number);
```

decoding:

```
const bytes = ...;
const decoder = new NumberDecoder("Float64");
const number = decoder.decode(bytes);
```

See also
-------
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
