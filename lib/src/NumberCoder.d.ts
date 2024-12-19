import { NumberDecoder } from "./NumberDecoder.js";
import { NumberEncoder } from "./NumberEncoder.js";
export declare class NumberCoder implements NumberEncoder, NumberDecoder {
    #private;
    readonly type: string;
    readonly length: number;
    readonly littleEndian: boolean;
    constructor(type: string, littleEndian: boolean);
    encode(number: number): Uint8Array;
    decode(data: ArrayBuffer | ArrayBufferView): number;
}
