import { Command } from 'commander';
import { FiveByFiveTable } from './entities/tables';
import { ToyRobot } from './entities/toys';
import { FileMode, InteractiveMode } from './runModes';
import figlet from 'figlet';

export class ToyRobotSimulatorProgram {
  private readonly program: Command;

  constructor() {
    this.program = new Command();
    this.program.option('-i, --interactive', 'Enable interactive mode');
    this.program.option('-f, --file <filename>', 'Read commands from a file');
    this.program.parse(process.argv);
  }

  async run(): Promise<void> {
    console.log(figlet.textSync('Toy Robot Simulator'));

    // Extract options from command object
    const options = this.program.opts();

    // Validate that both options are not used simultaneously
    if (options.interactive && options.file) {
      console.error(
        'Cannot use both interactive and file modes simultaneously.'
      );
      process.exit(1);
    }

    // Set up the table and toy
    const table = new FiveByFiveTable();
    const toy = new ToyRobot(table);

    // Run the program in interactive mode if chosen
    if (options.interactive) {
      const runMode = new InteractiveMode(toy);
      await runMode.run();
    } else if (options.file) {
      const runMode = new FileMode(toy);
      await runMode.run({ filename: options.file });
    } else {
      this.program.outputHelp();
    }
  }
}
