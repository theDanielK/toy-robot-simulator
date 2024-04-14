/**
 * Table class
 * Base class for all possible table types
 */
import { TableDimensions } from '../../types';

export abstract class Table {
  protected readonly width: number;
  protected readonly height: number;

  /**
   * Constructor for Table base class
   * @param width
   * @param height
   * @protected
   */
  protected constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getTableSize(): TableDimensions {
    return {
      width: this.width,
      height: this.height
    };
  }

  /**
   * isValidPosition
   * Check if a position is valid on the table
   * @param x
   * @param y
   */
  isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}
