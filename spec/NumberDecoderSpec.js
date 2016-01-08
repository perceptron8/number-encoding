"use strict";

var NumberDecoder = require("../lib/NumberDecoder");

var decoder = function(type, endianess) {
	return new NumberDecoder(type, endianess);
};

describe("NumberDecoder", function() {
	it("knows type, length and endianess", function() {
		var decoder = new NumberDecoder("Int8");
		expect(decoder.type).toEqual("Int8");
		expect(decoder.length).toEqual(1);
		expect(decoder.littleEndian).toEqual(false);
	});
	
	// TypedArray
	
	it("decodes Int8", function() {
		expect(decoder("Int8", false).decode(Uint8Array.of(0x01))).toEqual(1);
		expect(decoder("Int8", true).decode(Uint8Array.of(0x01))).toEqual(1);
	});
	it("decodes Uint8", function() {
		expect(decoder("Uint8", false).decode(Uint8Array.of(0x01))).toEqual(1);
		expect(decoder("Uint8", true).decode(Uint8Array.of(0x01))).toEqual(1);
	});
	it("decodes Int16", function() {
		expect(decoder("Int16", false).decode(Uint8Array.of(0x00, 0x01))).toEqual(1);
		expect(decoder("Int16", true).decode(Uint8Array.of(0x01, 0x00))).toEqual(1);
	});
	it("decodes Uint16", function() {
		expect(decoder("Uint16", false).decode(Uint8Array.of(0x00, 0x01))).toEqual(1);
		expect(decoder("Uint16", true).decode(Uint8Array.of(0x01, 0x00))).toEqual(1);
	});
	it("decodes Int32", function() {
		expect(decoder("Int32", false).decode(Uint8Array.of(0x00, 0x00, 0x00, 0x01))).toEqual(1);
		expect(decoder("Int32", true).decode(Uint8Array.of(0x01, 0x00, 0x00, 0x00))).toEqual(1);
	});
	it("decodes Uint32", function() {
		expect(decoder("Uint32", false).decode(Uint8Array.of(0x00, 0x00, 0x00, 0x01))).toEqual(1);
		expect(decoder("Uint32", true).decode(Uint8Array.of(0x01, 0x00, 0x00, 0x00))).toEqual(1);
	});
	it("decodes Float32", function() {
		expect(decoder("Float32", false).decode(Uint8Array.of(0x3f, 0x80, 0x00, 0x00))).toEqual(1);
		expect(decoder("Float32", true).decode(Uint8Array.of(0x00, 0x00, 0x80, 0x3f))).toEqual(1);
	});
	it("decodes Float64", function() {
		expect(decoder("Float64", false).decode(Uint8Array.of(0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00))).toEqual(1);
		expect(decoder("Float64", true).decode(Uint8Array.of(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f))).toEqual(1);
	});
	
	// ArrayBuffer
	
	it("decodes Int8", function() {
		expect(decoder("Int8", false).decode(Uint8Array.of(0x01).buffer)).toEqual(1);
		expect(decoder("Int8", true).decode(Uint8Array.of(0x01).buffer)).toEqual(1);
	});
	it("decodes Uint8", function() {
		expect(decoder("Uint8", false).decode(Uint8Array.of(0x01).buffer)).toEqual(1);
		expect(decoder("Uint8", true).decode(Uint8Array.of(0x01).buffer)).toEqual(1);
	});
	it("decodes Int16", function() {
		expect(decoder("Int16", false).decode(Uint8Array.of(0x00, 0x01).buffer)).toEqual(1);
		expect(decoder("Int16", true).decode(Uint8Array.of(0x01, 0x00).buffer)).toEqual(1);
	});
	it("decodes Uint16", function() {
		expect(decoder("Uint16", false).decode(Uint8Array.of(0x00, 0x01).buffer)).toEqual(1);
		expect(decoder("Uint16", true).decode(Uint8Array.of(0x01, 0x00).buffer)).toEqual(1);
	});
	it("decodes Int32", function() {
		expect(decoder("Int32", false).decode(Uint8Array.of(0x00, 0x00, 0x00, 0x01).buffer)).toEqual(1);
		expect(decoder("Int32", true).decode(Uint8Array.of(0x01, 0x00, 0x00, 0x00).buffer)).toEqual(1);
	});
	it("decodes Uint32", function() {
		expect(decoder("Uint32", false).decode(Uint8Array.of(0x00, 0x00, 0x00, 0x01).buffer)).toEqual(1);
		expect(decoder("Uint32", true).decode(Uint8Array.of(0x01, 0x00, 0x00, 0x00).buffer)).toEqual(1);
	});
	it("decodes Float32", function() {
		expect(decoder("Float32", false).decode(Uint8Array.of(0x3f, 0x80, 0x00, 0x00).buffer)).toEqual(1);
		expect(decoder("Float32", true).decode(Uint8Array.of(0x00, 0x00, 0x80, 0x3f).buffer)).toEqual(1);
	});
	it("decodes Float64", function() {
		expect(decoder("Float64", false).decode(Uint8Array.of(0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00).buffer)).toEqual(1);
		expect(decoder("Float64", true).decode(Uint8Array.of(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xf0, 0x3f).buffer)).toEqual(1);
	});
	
	// Array
	
	it("throws when necessary", function() {
		for (var numberType of ["Int8", "Uint8", "Int16", "Uint16", "Int32", "Uint32", "Float32", "Float32", "Float64", "Float64"]) {
			for (var networkOrder of [false, true]) {
				expect(decoder(numberType, networkOrder).decode.bind(null, [])).toThrow();
			}
		}
	});
});
