"use strict";

const assert = require("assert");

function length(type) {
	const array = global[type + "Array"];
	assert.equal(typeof array, "function");
	const length = array.BYTES_PER_ELEMENT;
	assert.equal(typeof length, "number");
	return length;
}

function getter(type) {
	const getter = DataView.prototype["get" + type];
	assert.equal(typeof getter, "function");
	return getter;
}

function setter(type) {
	const setter = DataView.prototype["set" + type];
	assert.equal(typeof setter, "function");
	return setter;
}

function view(data) {
	if (data instanceof DataView) {
		return data;
	} else if (data instanceof ArrayBuffer) {
		return new DataView(data);
	} else if (ArrayBuffer.isView(data)) {
		return new DataView(data.buffer, data.byteOffset, data.byteLength);
	} else {
		assert.fail("The provided value must be an instance of ArrayBuffer or ArrayBufferView");
	}
}

class NumberCoder {
	constructor(type, littleEndian) {
		this.type = type;
		this.length = length(type);
		this.getter = getter(type);
		this.setter = setter(type);
		this.littleEndian = !!littleEndian;
	}
	
	encode(number) {
		assert.equal(typeof number, "number", "The provided value must be a number");
		const buffer = new ArrayBuffer(this.length);
		const view = new DataView(buffer);
		this.setter.call(view, 0, number, this.littleEndian);
		const array = new Uint8Array(buffer);
		return array;
	}
	
	decode(data) {
		return this.getter.call(view(data), 0, this.littleEndian);
	}
}

module.exports = NumberCoder;
