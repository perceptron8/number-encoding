number-encoding
===============

NumberEncoder/NumberDecoder with API similar to TextEncoder/TextDecoder.

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
https://encoding.spec.whatwg.org/
