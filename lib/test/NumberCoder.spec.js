import { expect } from "chai";
import { describe, it } from "node:test";
import { NumberCoder } from "../src/NumberCoder.js";
function makeInt(byteLength, littleEndian) {
    const array = new Array(byteLength).fill(0);
    const index = littleEndian ? 0 : byteLength - 1;
    array[index] = 0x01;
    return array;
}
function makeFloat(byteLength, littleEndian) {
    const array = byteLength === 4
        ? [0x3f, 0x80, 0x00, 0x00]
        : [0x3f, 0xf0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    if (littleEndian) {
        array.reverse();
    }
    return array;
}
const toTypedArray = (array) => {
    return new Uint8Array(array);
};
const toArrayBuffer = (array) => {
    return new Uint8Array(array).buffer;
};
const toDataView = (array) => {
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
describe("NumberCoder", () => {
    for (const typePrefix of ["Int", "Uint", "Float"]) {
        for (const byteLength of LENGTH[typePrefix]) {
            const typeSuffix = (2 ** byteLength).toString();
            const typeName = typePrefix + typeSuffix;
            for (const littleEndian of [false, true]) {
                const array = CREATOR[typePrefix](byteLength, littleEndian);
                const typedArray = toTypedArray(array);
                const arrayBuffer = toArrayBuffer(array);
                const dataView = toDataView(array);
                const coder = new NumberCoder(typeName, littleEndian);
                it("encodes " + typeName + " with littleEndian = " + littleEndian, () => {
                    // knows itself
                    expect(coder.type).to.equal(typeName);
                    expect(coder.littleEndian).to.equal(littleEndian);
                    // encodes well
                    expect(coder.encode(1)).to.equal(typedArray);
                    // throws accordingly
                    expect(coder.encode.bind(coder, null)).to.throw();
                    // decodes well
                    expect(coder.decode(typedArray)).to.equal(1);
                    expect(coder.decode(arrayBuffer)).to.equal(1);
                    expect(coder.decode(dataView)).to.equal(1);
                    // throws accordingly
                    expect(coder.decode.bind(coder, null)).to.throw();
                    expect(coder.decode.bind(coder, array)).to.throw();
                });
            }
        }
    }
});
