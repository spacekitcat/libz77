#!/usr/bin/env node
import { CompressorTransformer } from '../lib/compressor-transformer';
import { DecompressorTransformer } from '../lib/decompressor-transformer';

import fs from 'fs';

let filePath = process.argv[2];

if (!filePath) {
  console.log('No input file path specified. Please provide a file path.');
  process.exit(-1);
}

let fileReadStream = fs.createReadStream(filePath);
let fileWriteStream = fs.createWriteStream(`${filePath}.inflate`);

let decompressorTransformer = new DecompressorTransformer();

let accumulator = Buffer.from([]);
decompressorTransformer.on('data', chunk => {
  accumulator = Buffer.concat([accumulator, chunk]);
});

decompressorTransformer.on('finish', () => {
  console.log(`I inflated the heck outta ${filePath}`);
});

fileReadStream.pipe(decompressorTransformer).pipe(fileWriteStream);