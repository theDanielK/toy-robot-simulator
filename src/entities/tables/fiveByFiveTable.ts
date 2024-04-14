import { Table } from './table';

/**
 * SquareTable class
 * @extends Table
 * Square table with equal width and height
 */
export class FiveByFiveTable extends Table {
  /**
   * Constructor for SquareTable
   */
  constructor() {
    super(5, 5);
  }
}
