import { Transform } from 'stream';
import { SlidingWindow } from './sliding-window.js';
import locateToken from './locate-token.js';

class CompressorTransformer extends Transform {
  constructor(options) {
    super(options);
    this.historyBufferSize = 4;
    this.currentWindowBufferSize = 4;
  }

  _transform(chunk, encoding, callback) {
    let uncompressedStream = chunk.toString(encoding).split('');

    let slidingWindow = new SlidingWindow(
      { read: n => uncompressedStream },
      this.historyBufferSize,
      this.currentWindowBufferSize
    );

    while (slidingWindow.lookAhead().length > 0) {
      this.push(slidingWindow.slide(locateToken));
    }

    callback();
  }
}

export { CompressorTransformer };