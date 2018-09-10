#!/usr/bin/env node
import compress from '../lib/compress';
import inflate from '../lib/inflate';

let dictionaryLen = 32;
let windowLen = 32;

let rawInput = process.argv[2];
let compressedPackets = compress(rawInput, dictionaryLen, windowLen);
let decompressed = inflate(compressedPackets, dictionaryLen, windowLen);
console.log(`Decompressed: ${decompressed}`);
console.log(
  `Compressed to ${((compressedPackets.length / rawInput.length) * 100).toFixed(
    2
  )}% of original size:`
);
console.log(
  `Compressed: ${compressedPackets
    .map(item => {
      return item.token;
    })
    .join('')}`
);