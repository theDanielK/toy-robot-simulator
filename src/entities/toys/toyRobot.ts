import { Toy } from './toy';
import { Table } from '../tables';
import { Moves } from '../../types';

export class ToyRobot extends Toy {
  /**
   * Constructor for ToyRobot
   * Define ruleset for moving the robot
   * This is the only configurable component between robot types (For now ;) )
   * @param table
   */
  constructor(table: Table) {
    const moves: Moves = {
      NORTH: [0, 1],
      SOUTH: [0, -1],
      EAST: [1, 0],
      WEST: [-1, 0]
    };
    super(table, moves);
  }
}
