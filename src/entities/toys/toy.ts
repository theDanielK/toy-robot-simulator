import { Table } from '../tables';
import { Moves } from '../../types';
import { ToyError } from '../../errors';

/**
 * Abstract class for a robot
 */
export abstract class Toy {
  protected x: number = -1;
  protected y: number = -1;
  protected facing: string = '';
  readonly table: Table;
  protected readonly moves: Moves;
  static validDirections: string[] = ['NORTH', 'SOUTH', 'EAST', 'WEST'];
  static validCommands: string[] = ['place', 'move', 'right', 'left', 'report'];

  /**
   * Constructor for the Robot class
   * Initialize the robot with a chosen table
   * @param table - which table is chosen
   * @param moves - what is the move structure like (This is the only different component between robot types (currently))
   * @protected
   */
  protected constructor(table: Table, moves: Moves) {
    this.table = table;
    this.moves = moves;
  }

  /**
   * Check if the toy has been placed on the table
   * @protected
   */
  protected checkIfToyIsPlaced(): void {
    if (!this.table.isValidPosition(this.x, this.y)) {
      throw new ToyError({
        name: 'InvalidInitialPlacementCoordinates',
        message: 'Invalid command. Toy has not been placed yet'
      });
    }
  }

  /**
   * Place the robot on the table
   * @param x: number
   * @param y: number
   * @param facing: string
   */
  place(x: number, y: number, facing: string): void {
    // Ensure facing direction string is one of Robot.validDirections
    if (!Toy.validDirections.includes(facing)) {
      throw new ToyError({
        name: 'InvalidInitialPlacementDirection',
        message: `Invalid PLACE command. Please provide valid facing direction - must be one of [${Toy.validDirections}]`
      });
    }

    // Ensure placed coordinates are on the table
    if (!this.table.isValidPosition(x, y)) {
      throw new ToyError({
        name: 'InvalidInitialPlacementCoordinates',
        message: `Invalid PLACE command. Please provide valid coordinates - must be within the table dimensions. [${JSON.stringify(this.table.getTableSize())}]`
      });
    }

    // If all's good, then place the robot
    this.x = x;
    this.y = y;
    this.facing = facing.toUpperCase();
  }

  /**
   * Move the robot
   * Update position based on move direction speed, defined in moves
   * If the robot is going to fall off the table, do not move
   */
  move(): void {
    this.checkIfToyIsPlaced();
    const [dx, dy] = this.moves[this.facing];
    const newX = this.x + dx;
    const newY = this.y + dy;

    if (!this.table.isValidPosition(newX, newY)) {
      throw new ToyError({
        name: 'InvalidMove',
        message:
          'Invalid MOVE command. Toy would have fallen off if it had listened to you.'
      });
    }

    this.x = newX;
    this.y = newY;
  }

  left(): void {
    this.checkIfToyIsPlaced();
    const directions = ['NORTH', 'WEST', 'SOUTH', 'EAST'];
    const currentIndex = directions.indexOf(this.facing);
    this.facing = directions[(currentIndex + 1) % 4];
  }

  right(): void {
    this.checkIfToyIsPlaced();
    const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const currentIndex = directions.indexOf(this.facing);
    this.facing = directions[(currentIndex + 1) % 4];
  }

  /**
   * Report the current position of the robot
   */
  report(): void {
    this.checkIfToyIsPlaced();
    console.log(`${this.x},${this.y},${this.facing}`);
  }
}
