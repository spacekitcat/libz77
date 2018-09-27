import { SlidingWindow } from '../src/sliding-window';

describe('SlidingWindow', () => {
  let inputStream = [97, 97, 98, 97];

  let slidingWindow;
  describe('intial cursor', () => {
    beforeAll(() => {
      slidingWindow = new SlidingWindow(4, 4);
      slidingWindow.setInput(inputStream);
    });

    it('has the correct lookAhead contents', () => {
      expect(slidingWindow.lookAhead()).toEqual(['61', '61', '62', '61']);
    });

    it('has the correct lookBack contents', () => {
      expect(slidingWindow.lookBack()).toEqual([]);
    });
  });

  describe('slide 2', () => {
    beforeAll(() => {
      slidingWindow = new SlidingWindow(4, 4);
      slidingWindow.setInput(inputStream);
      slidingWindow.slideBy(2);
    });

    it('has the correct lookAhead contents', () => {
      expect(slidingWindow.lookAhead()).toEqual(['62', '61']);
    });

    it('has the correct lookBack contents', () => {
      expect(slidingWindow.lookBack()).toEqual(['61', '61']);
    });
  });

  describe('slide callback 2', () => {
    beforeAll(() => {
      slidingWindow = new SlidingWindow(4, 4);
      slidingWindow.setInput(inputStream);
      slidingWindow.slide((lookAhead, lookbackLength) => ({
        prefix: [0, 0]
      }));
    });

    it('has the correct lookAhead contents', () => {
      expect(slidingWindow.lookAhead()).toEqual(['61', '62', '61']);
    });

    it('has the correct lookBack contents', () => {
      expect(slidingWindow.lookBack()).toEqual(['61']);
    });
  });
});
