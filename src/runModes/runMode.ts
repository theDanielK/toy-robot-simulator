import { Toy } from '../entities/toys/toy';
import { ToyError } from '../errors/toyError';
import { RunOptionsType } from '../types/';

export abstract class runMode {
  protected readonly toy: Toy;

  /**
   * Constructor for the runMode class
   * @param toy
   */
  constructor(toy: Toy) {
    this.toy = toy;
  }

  /**
   * Run the program - this is extended by the child classes
   */
  async run(options: RunOptionsType): Promise<void> {
    console.error('Run method not implemented', options);
  }

  /**
   * Execute a command on the toy
   * This is a generic method that can be used by all run modes
   * @param command
   * @protected
   */
  protected executeToyCommand(command: string): void {
    try {
      if (command.includes('PLACE')) {
        const [x, y, facing] = command.split(' ')[1].split(',');
        this.toy.place(parseInt(x), parseInt(y), facing);
      } else {
        command = command.toLowerCase();
        if (Toy.validCommands.includes(command)) {
          // ---------------------------
          // NOTE: Using ts-ignore specifically here as the commands are dynamic.
          // A check is already made to make sure its catered for
          // ---------------------------
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.toy[command]();
        } else {
          console.log(
            'Invalid command: ',
            command,
            'Please provide a valid command.'
          );
        }
      }
    } catch (error) {
      if (error instanceof ToyError) {
        console.log(error.message);
      } else {
        // This is not a known error. Fire off to console.error for debugging
        console.error(error);
      }
    }
  }
}
