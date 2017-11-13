"use strict";

const NumberCoder = require("../lib/NumberCoder");

function makeInt(byteLength, littleEndian) {
	const array = new Array(byteLength).fill(0);
	const index = littleEndian ? 0 : byteLength - 1;
	array[index] = 0x01;
	return array;
}

function makeFloat(byteLength, littleEndian) {
	const array = byteLength == 4
		? [0x3f, 0x80, 0x00, 0x00]
		: [0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
	if (littleEndian) {
		array.reverse();
	}
	return array;
}

const toNodeBuffer = array => new Buffer(array);
const toTypedArray = array => new Uint8Array(array);

const toArrayBuffer = array => {
	const typedArray = Uint8Array.from(array);
	const buffer = typedArray.buffer;
	return buffer;
};

const toDataView = array => {
	const padded = Uint8Array.from([].concat([0xff], array, [0xff]));
	const view = new DataView(padded.buffer, 1, array.length);
	return view;
};

const LENGTH = {
	"Int": [1, 2, 4],
	"Uint": [1, 2, 4],
	"Float": [4, 8]
};

const CREATOR = {
	"Int": makeInt,
	"Uint": makeInt,
	"Float": makeFloat
};

describe("NumberCoder", function() {
	for (let typePrefix of ["Int", "Uint", "Float"]) {
		for (let byteLength of LENGTH[typePrefix]) {
			const type = typePrefix + (byteLength << 3);
			for (let littleEndian of [false, true]) {
				const array = CREATOR[typePrefix](byteLength, littleEndian);
				const nodeBuffer = toNodeBuffer(array);
				const typedArray = toTypedArray(array);
				const arrayBuffer = toArrayBuffer(array);
				const dataView = toDataView(array);
				const coder = new NumberCoder(type, littleEndian);
				it("encodes " + type + " with littleEndian = " + littleEndian, () => {
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
					// decodes so well
					if (Buffer !== undefined) {
						expect(coder.decode(nodeBuffer)).toEqual(1);
					}
					// throws accordingly
					expect(coder.decode.bind(coder, null)).toThrow();
					expect(coder.decode.bind(coder, array)).toThrow();
				});
			}
		}
	}
});
