import { FiveByFiveTable } from '../entities/tables';

describe('FiveByFiveTable class', () => {
  let table: FiveByFiveTable;

  beforeEach(() => {
    table = new FiveByFiveTable();
  });

  describe('constructor', () => {
    test('initializes the table with width and height of 5', () => {
      expect(table['width']).toBe(5);
      expect(table['height']).toBe(5);
    });
  });

  describe('getTableSize method', () => {
    test('returns the correct table dimensions', () => {
      const dimensions = table.getTableSize();
      expect(dimensions.width).toBe(5);
      expect(dimensions.height).toBe(5);
    });
  });

  describe('isValidPosition method', () => {
    test('returns true for valid positions within the table', () => {
      expect(table.isValidPosition(0, 0)).toBe(true);
      expect(table.isValidPosition(4, 4)).toBe(true);
      expect(table.isValidPosition(2, 3)).toBe(true);
    });

    test('returns false for positions outside the table', () => {
      expect(table.isValidPosition(-1, 0)).toBe(false);
      expect(table.isValidPosition(5, 3)).toBe(false);
      expect(table.isValidPosition(2, 5)).toBe(false);
      expect(table.isValidPosition(6, 6)).toBe(false);
    });
  });
});
