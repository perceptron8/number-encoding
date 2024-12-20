number-encoding
===============

NumberEncoder/NumberDecoder with API similar to TextEncoder/TextDecoder.

* https://encoding.spec.whatwg.org/

Usage
-----

encoding:

```ts
const number = ...;
const encoder = new NumberEncoder("Uint32");
const bytes = encoder.encode(number);
```

decoding:

```ts
const bytes = ...;
const decoder = new NumberDecoder("Uint32");
const number = decoder.decode(bytes);
```

See also
-------
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
