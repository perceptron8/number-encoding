"use strict";

var NumberCoder = require("../lib/NumberCoder");

var makeInt = function(byteLength, littleEndian) {
	var array = new Array(byteLength).fill(0);
	var index = littleEndian ? 0 : byteLength - 1;
	array[index] = 0x01;
	return array;
}

var makeFloat = function(byteLength, littleEndian) {
	var array = byteLength == 4
		? [0x3f, 0x80, 0x00, 0x00]
		: [0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
	if (littleEndian) {
		array.reverse();
	}
	return array;
}

var LENGTH = {
	"Int": [1, 2, 4],
	"Uint": [1, 2, 4],
	"Float": [4, 8]
};

var CREATOR = {
	"Int": makeInt,
	"Uint": makeInt,
	"Float": makeFloat
};

describe("NumberCoder", function() {
	for (var typePrefix of ["Int", "Uint", "Float"]) {
		for (var byteLength of LENGTH[typePrefix]) {
			var type = typePrefix + (byteLength << 3);
			for (var littleEndian of [false, true]) {
				var array = CREATOR[typePrefix](byteLength, littleEndian);
				var typedArray = Uint8Array.from(array);
				var arrayBuffer = typedArray.buffer;
				var dataView = new DataView(arrayBuffer);
				var coder = new NumberCoder(type, littleEndian);
				it("encodes " + type + " with littleEndian = " + littleEndian, function() {
					// knows itself
					expect(coder.type).toEqual(type);
					expect(coder.length).toEqual(byteLength);
					expect(coder.littleEndian).toEqual(littleEndian);
					// encodes well
					expect(coder.encode(1)).toEqual(typedArray);
					// throws accordingly
					expect(coder.encode.bind(coder, null)).toThrow();
					// decodes well
					expect(coder.decode(typedArray)).toEqual(1);
					expect(coder.decode(arrayBuffer)).toEqual(1);
					expect(coder.decode(dataView)).toEqual(1);
					// throws accordingly
					expect(coder.decode.bind(coder, null)).toThrow();
					expect(coder.decode.bind(coder, array)).toThrow();
				});
			}
		}
	}
});
