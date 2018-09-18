import { Transform } from 'stream';
import { SlidingWindow } from './sliding-window.js';
import locateToken from './locate-token.js';

class CompressorTransformer extends Transform {
  constructor(options) {
    super(options);
    this.historyBufferSize = 32;
    this.currentWindowBufferSize = 32;

    this.slidingWindow = new SlidingWindow(
      [],
      this.historyBufferSize,
      this.currentWindowBufferSize
    );
  }

  _transform(chunk, encoding, callback) {
    let uncompressedStream = chunk.toString(encoding).split('');
    this.slidingWindow.setInput(uncompressedStream);

    while (this.slidingWindow.lookAhead().length > 0) {
      this.push(this.slidingWindow.slide(locateToken));
    }

    callback();
  }
}

export { CompressorTransformer };
