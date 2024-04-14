import { Table } from './table';

/**
 * SquareTable class
 * @extends Table
 * Square table with equal width and height
 */
export class GiantTable extends Table {
  /**
   * Constructor for SquareTable
   */
  constructor() {
    super(100, 75); // Default size for a square table
  }
}
