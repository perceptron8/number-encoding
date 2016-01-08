"use strict";

var assert = require("assert");

function length(type) {
	var array = global[type + "Array"];
	assert.equal(typeof array, "function");
	var length = array.BYTES_PER_ELEMENT;
	assert.equal(typeof length, "number");
	return length;
}

function getter(type) {
	var getter = DataView.prototype["get" + type];
	assert.equal(typeof getter, "function");
	return getter;
}

function setter(type) {
	var setter = DataView.prototype["set" + type];
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
		throw new Error("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
	}
}

var NumberCoder = function(type, littleEndian) {
	this.type = type;
	this.length = length(type);
	this.getter = getter(type);
	this.setter = setter(type);
	this.littleEndian = !!littleEndian;
};

// NumberEncode#encode implementation
NumberCoder.prototype.encode = function(number) {
	if (typeof number !== "number") {
		throw new Error("The provided value is not a number");
	}
	var buffer = new ArrayBuffer(this.length);
	var view = new DataView(buffer);
	this.setter.call(view, 0, number, this.littleEndian);
	var array = new Uint8Array(buffer);
	return array;
};

// NumberDecoder#decode implementation
NumberCoder.prototype.decode = function(data) {
	return this.getter.call(view(data), 0, this.littleEndian);
};

module.exports = NumberCoder;
