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

var NumberCoder = function(type, littleEndian) {
	this.type = type;
	this.length = length(type);
	this.getter = getter(type);
	this.setter = setter(type);
	this.littleEndian = !!littleEndian;
};

// NumberEncode#encode implementation
NumberCoder.prototype.encode = function(number) {
	var buffer = new ArrayBuffer(this.length);
	var view = new DataView(buffer);
	this.setter.call(view, 0, number, this.littleEndian);
	var array = new Uint8Array(buffer);
	return array;
};

// NumberDecoder#decode implementation
NumberCoder.prototype.decode = function(array) {
	var bytes = new Uint8Array(array);
	var buffer = bytes.buffer;
	var view = new DataView(buffer);
	var number = this.getter.call(view, 0, this.littleEndian);
	return number;
};

module.exports = NumberCoder;
