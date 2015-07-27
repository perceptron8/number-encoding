"use strict";

var NumberDecoder = require("../lib/NumberDecoder");

var decoder = function(type, endianess) {
	return new NumberDecoder(type, endianess);
};

describe("NumberDecoder", function() {
	it("decodes Int8", function() {
		expect(decoder("Int8", false).decode(new Uint8Array([0x01]))).toEqual(1);
		expect(decoder("Int8", true).decode(new Uint8Array([0x01]))).toEqual(1);
	});
	it("decodes Uint8", function() {
		expect(decoder("Uint8", false).decode(new Uint8Array([0x01]))).toEqual(1);
		expect(decoder("Uint8", true).decode(new Uint8Array([0x01]))).toEqual(1);
	});
	it("decodes Int16", function() {
		expect(decoder("Int16", false).decode(new Uint8Array([0x00, 0x01]))).toEqual(1);
		expect(decoder("Int16", true).decode(new Uint8Array([0x01, 0x00]))).toEqual(1);
	});
	it("decodes Uint16", function() {
		expect(decoder("Uint16", false).decode(new Uint8Array([0x00, 0x01]))).toEqual(1);
		expect(decoder("Uint16", true).decode(new Uint8Array([0x01, 0x00]))).toEqual(1);
	});
	it("decodes Int32", function() {
		expect(decoder("Int32", false).decode(new Uint8Array([0x00, 0x00, 0x00, 0x01]))).toEqual(1);
		expect(decoder("Int32", true).decode(new Uint8Array([0x01, 0x00, 0x00, 0x00]))).toEqual(1);
	});
	it("decodes Uint32", function() {
		expect(decoder("Uint32", false).decode(new Uint8Array([0x00, 0x00, 0x00, 0x01]))).toEqual(1);
		expect(decoder("Uint32", true).decode(new Uint8Array([0x01, 0x00, 0x00, 0x00]))).toEqual(1);
	});
	it("decodes Float32", function() {
		expect(decoder("Float32", false).decode(new Uint8Array([0x3f, 0x80, 0x00, 0x00]))).toEqual(1);
		expect(decoder("Float32", true).decode(new Uint8Array([0x00, 0x00, 0x80, 0x3f]))).toEqual(1);
	});
	it("decodes Float64", function() {
		expect(decoder("Float64", false).decode(new Uint8Array([0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]))).toEqual(1);
		expect(decoder("Float64", true).decode(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f]))).toEqual(1);
	});
});
