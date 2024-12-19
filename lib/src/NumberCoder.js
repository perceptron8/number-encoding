import { assert } from "./utils/assert.js";
function length(type) {
    // @ts-ignore
    const array = globalThis[type + "Array"];
    assert(typeof array === "function");
    const length = array.BYTES_PER_ELEMENT;
    assert(typeof length === "number");
    return length;
}
function getter(type) {
    // @ts-ignore
    const getter = DataView.prototype["get" + type];
    assert(typeof getter === "function");
    return getter;
}
function setter(type) {
    // @ts-ignore
    const setter = DataView.prototype["set" + type];
    assert(typeof setter === "function");
    return setter;
}
function view(data) {
    if (data instanceof ArrayBuffer) {
        return new DataView(data);
    }
    else if (ArrayBuffer.isView(data)) {
        return new DataView(data.buffer, data.byteOffset, data.byteLength);
    }
    else {
        throw new Error("The provided value must be an instance of ArrayBuffer or ArrayBufferView");
    }
}
export class NumberCoder {
    type;
    length;
    #getter;
    #setter;
    littleEndian;
    constructor(type, littleEndian) {
        this.type = type;
        this.length = length(type);
        this.#getter = getter(type);
        this.#setter = setter(type);
        this.littleEndian = littleEndian;
    }
    encode(number) {
        assert(typeof number === "number", "The provided value must be a number");
        const buffer = new ArrayBuffer(this.length);
        const view = new DataView(buffer);
        this.#setter.call(view, 0, number, this.littleEndian);
        const array = new Uint8Array(buffer);
        return array;
    }
    decode(data) {
        return this.#getter.call(view(data), 0, this.littleEndian);
    }
}
