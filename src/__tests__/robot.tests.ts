import { ToyRobot } from '../entities/toys';
import { FiveByFiveTable } from '../entities/tables';
import { ToyError } from '../errors';

describe('ToyRobot class', () => {
  let table: FiveByFiveTable;
  let toyRobot: ToyRobot;

  beforeEach(() => {
    table = new FiveByFiveTable();
    toyRobot = new ToyRobot(table);
  });

  describe('constructor', () => {
    test('initializes the toy robot with correct table and moves', () => {
      expect(toyRobot['table']).toBe(table);
      expect(toyRobot['moves']).toEqual({
        NORTH: [0, 1],
        SOUTH: [0, -1],
        EAST: [1, 0],
        WEST: [-1, 0]
      });
    });
  });

  describe('place method', () => {
    test('places the toy robot on the table', () => {
      toyRobot.place(0, 0, 'NORTH');
      expect(toyRobot['x']).toBe(0);
      expect(toyRobot['y']).toBe(0);
      expect(toyRobot['facing']).toBe('NORTH');
    });

    test('throws an error for invalid initial placement direction', () => {
      expect(() => toyRobot.place(0, 0, 'INVALID_DIRECTION')).toThrow(ToyError);
    });

    test('throws an error for invalid initial placement coordinates', () => {
      expect(() => toyRobot.place(-1, 0, 'NORTH')).toThrow(ToyError);
    });
  });

  describe('move method', () => {
    test('moves the toy robot correctly', () => {
      toyRobot.place(0, 0, 'NORTH');
      toyRobot.move();
      expect(toyRobot['x']).toBe(0);
      expect(toyRobot['y']).toBe(1);
    });

    test('throws an error when toy robot would fall off the table', () => {
      toyRobot.place(0, 4, 'NORTH');
      expect(() => toyRobot.move()).toThrow(ToyError);
    });
  });

  describe('left method', () => {
    test('turns the toy robot to the left correctly', () => {
      toyRobot.place(0, 0, 'NORTH');
      toyRobot.left();
      expect(toyRobot['facing']).toBe('WEST');
    });
  });

  describe('right method', () => {
    test('turns the toy robot to the right correctly', () => {
      toyRobot.place(0, 0, 'NORTH');
      toyRobot.right();
      expect(toyRobot['facing']).toBe('EAST');
    });
  });

  describe('report method', () => {
    test('reports the current position of the toy robot', () => {
      toyRobot.place(1, 2, 'SOUTH');
      // Mock console.log
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      toyRobot.report();
      expect(spy).toHaveBeenCalledWith('1,2,SOUTH');
      spy.mockRestore();
    });
  });

  describe('sequence of commands', () => {
    test('Test a sequence of commands and report result', () => {
      toyRobot.place(0, 0, 'NORTH');
      toyRobot.move();
      toyRobot.move();
      toyRobot.right();
      toyRobot.move();
      // Mock console.log
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      toyRobot.report();
      expect(spy).toHaveBeenCalledWith('1,2,EAST');
      spy.mockRestore();
    });
  });
});
