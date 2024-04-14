import { Toy } from './toy';
import { Table } from '../tables';
import { Moves } from '../../types/move.type';

export class ToyRocketCar extends Toy {
  /**
   * Constructor for RocketRobot
   * Define ruleset for moving the robot
   * This is the only configurable component between robot types (For now ;) )
   * @param table
   */
  constructor(table: Table) {
    const moves: Moves = {
      NORTH: [0, 3],
      SOUTH: [0, -3],
      EAST: [3, 0],
      WEST: [-3, 0]
    };
    super(table, moves);
  }
}
