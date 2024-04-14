import { Toy } from './toy';
import { Table } from '../tables';
import { Moves } from '../../types/move.type';

export class NorthBoundToyBoat extends Toy {
  /**
   * Constructor for RocketRobot
   * Define ruleset for moving the robot
   * This is the only configurable component between robot types (For now ;) )
   * @param table
   */
  constructor(table: Table) {
    const moves: Moves = {
      NORTH: [0, 3],
      SOUTH: [0, -1],
      EAST: [1, 0],
      WEST: [-1, 0]
    };
    super(table, moves);
  }
}
