import locateToken from '../src/locate-token';

describe('locateToken()', () => {
  describe('No arguments are provided', () => {
    it('returns undefined', () => {
      expect(locateToken()).toEqual({
        prefix: undefined,
        token: undefined
      });
    });
  });

  describe('Both arguments are null', () => {
    it('returns undefined', () => {
      expect(locateToken(null, null)).toEqual({
        prefix: undefined,
        token: undefined
      });
    });
  });

  describe('The history buffer is null', () => {
    const dictionaryValue = null;
    describe('The input buffer is not provided', () => {
      it('returns undefined', () => {
        expect(locateToken(dictionaryValue)).toEqual({
          prefix: undefined,
          token: undefined
        });
      });
    });

    describe('The input buffer is an empty string', () => {
      it('returns undefined', () => {
        expect(locateToken(dictionaryValue, [])).toEqual({
          prefix: undefined,
          token: undefined
        });
      });
    });

    describe('The input buffer is a string of length three', () => {
      it('returns the next character from the input buffer', () => {
        expect(locateToken(dictionaryValue, [78, 79, 80])).toEqual({
          prefix: undefined,
          token: 78
        });
      });
    });
  });

  describe('The history buffer is empty', () => {
    const dictionaryValue = [];
    describe('The input buffer is not provided', () => {
      it('returns undefined', () => {
        expect(locateToken(dictionaryValue)).toEqual({
          prefix: undefined,
          token: undefined
        });
      });
    });

    describe('The input buffer is an empty string', () => {
      it('returns undefined', () => {
        expect(locateToken(dictionaryValue, [])).toEqual({
          prefix: undefined,
          token: undefined
        });
      });
    });

    describe('The input buffer is a string of length three', () => {
      it('returns the next character from the input buffer', () => {
        expect(locateToken(dictionaryValue, [78, 79, 80])).toEqual({
          prefix: undefined,
          token: 78
        });
      });
    });
  });

  describe('The history buffer has a length of 3', () => {
    const dictionaryValue = [78, 79, 80];
    describe('The input buffer is not provided', () => {
      it('returns undefined', () => {
        expect(locateToken(dictionaryValue)).toEqual({
          prefix: undefined,
          token: undefined
        });
      });
    });

    describe('The input buffer is an empty array', () => {
      it('returns undefined', () => {
        expect(locateToken(dictionaryValue, [])).toEqual({
          prefix: undefined,
          token: undefined
        });
      });
    });

    describe('The input buffer contains characters which are not in the history buffer', () => {
      it('returns the next character from the input buffer', () => {
        expect(locateToken(dictionaryValue, [97, 98, 99])).toEqual({
          prefix: undefined,
          token: 97
        });
      });
    });

    describe('The input buffer contains characters which are in the histroy buffer', () => {
      it('returns the next character from the input buffer', () => {
        expect(locateToken(dictionaryValue, [79, 80, 97])).toEqual({
          prefix: [1, 2],
          token: 97
        });
      });
    });
  });
});
