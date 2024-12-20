import { NumberDecoder } from "./NumberDecoder.js";
import { NumberEncoder } from "./NumberEncoder.js";
import { assert } from "./utils/assert.js";

function length(type: string): number {
	// @ts-ignore
	const array = globalThis[type + "Array"];
	assert(typeof array === "function");
	const length = array.BYTES_PER_ELEMENT;
	assert(typeof length === "number");
	return length;
}

function getter(type: string): Function {
	// @ts-ignore
	const getter = DataView.prototype["get" + type];
	assert(typeof getter === "function");
	return getter;
}

function setter(type: string): Function {
	// @ts-ignore
	const setter = DataView.prototype["set" + type];
	assert(typeof setter === "function");
	return setter;
}

function view(data: ArrayBuffer | ArrayBufferView): DataView {
	if (data instanceof DataView) {
		// fast path
		return data;
	} else if (data instanceof ArrayBuffer) {
		// slow path #1
		return new DataView(data);
	} else if (ArrayBuffer.isView(data)) {
		// slow path #2
		return new DataView(data.buffer, data.byteOffset, data.byteLength);
	} else {
		// path of pain
		throw new Error("The provided value must be an instance of ArrayBuffer or ArrayBufferView");
	}
}

export class NumberCoder implements NumberEncoder, NumberDecoder {
	readonly type: string;
	readonly length: number;
	readonly #getter: Function;
	readonly #setter: Function;
	readonly littleEndian: boolean;

	constructor(type: string, littleEndian?: boolean) {
		this.type = type;
		this.length = length(type);
		this.#getter = getter(type);
		this.#setter = setter(type);
		this.littleEndian = littleEndian ?? false;
	}

	encode(number: number): Uint8Array {
		assert(typeof number === "number", "The provided value must be a number");
		const buffer = new ArrayBuffer(this.length);
		const view = new DataView(buffer);
		this.#setter.call(view, 0, number, this.littleEndian);
		const array = new Uint8Array(buffer);
		return array;
	}

	decode(data: ArrayBuffer | ArrayBufferView): number {
		return this.#getter.call(view(data), 0, this.littleEndian);
	}
}
