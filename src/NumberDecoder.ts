export interface NumberDecoder {
	decode(buffer: ArrayBuffer | ArrayBufferView): number;
}
