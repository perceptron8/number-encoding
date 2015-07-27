"use strict";

var NumberEncoder = require("../lib/NumberEncoder");

var encoder = function(type, endianess) {
	return new NumberEncoder(type, endianess);
};

describe("NumberEncoder", function() {
	it("encodes Int8", function() {
		expect(encoder("Int8", false).encode(1)).toEqual(new Uint8Array([0x01]));
		expect(encoder("Int8", true).encode(1)).toEqual(new Uint8Array([0x01]));
	});
	it("encodes Uint8", function() {
		expect(encoder("Uint8", false).encode(1)).toEqual(new Uint8Array([0x01]));
		expect(encoder("Uint8", true).encode(1)).toEqual(new Uint8Array([0x01]));
	});
	it("encodes Int16", function() {
		expect(encoder("Int16", false).encode(1)).toEqual(new Uint8Array([0x00, 0x01]));
		expect(encoder("Int16", true).encode(1)).toEqual(new Uint8Array([0x01, 0x00]));
	});
	it("encodes Uint16", function() {
		expect(encoder("Uint16", false).encode(1)).toEqual(new Uint8Array([0x00, 0x01]));
		expect(encoder("Uint16", true).encode(1)).toEqual(new Uint8Array([0x01, 0x00]));
	});
	it("encodes Int32", function() {
		expect(encoder("Int32", false).encode(1)).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x01]));
		expect(encoder("Int32", true).encode(1)).toEqual(new Uint8Array([0x01, 0x00, 0x00, 0x00]));
	});
	it("encodes Uint32", function() {
		expect(encoder("Uint32", false).encode(1)).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x01]));
		expect(encoder("Uint32", true).encode(1)).toEqual(new Uint8Array([0x01, 0x00, 0x00, 0x00]));
	});
	it("encodes Float32", function() {
		expect(encoder("Float32", false).encode(1)).toEqual(new Uint8Array([0x3f, 0x80, 0x00, 0x00]));
		expect(encoder("Float32", true).encode(1)).toEqual(new Uint8Array([0x00, 0x00, 0x80, 0x3f]));
	});
	it("encodes Float64", function() {
		expect(encoder("Float64", false).encode(1)).toEqual(new Uint8Array([0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
		expect(encoder("Float64", true).encode(1)).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f]));
	});
});
