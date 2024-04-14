import { runMode } from './runMode';
import { RunOptionsType } from '../types';
import { FileReader } from '../utils';
import { FileReaderError } from '../errors';

export class FileMode extends runMode {
  /**
   * Run the file mode
   */
  async run(options: RunOptionsType): Promise<void> {
    console.log('Toy Robot Simulator - File Mode');
    // Get contents of file, split by line and execute each command
    if (options.filename) {
      try {
        const lines = FileReader.readLinesFromFile(options.filename);
        this.executeLines(lines);
      } catch (error) {
        if (error instanceof FileReaderError) {
          console.log(error.message);
        } else {
          console.error(error);
        }
      }
    }
  }

  private executeLines(lines: string[]): void {
    lines.forEach((line: string) => {
      this.executeToyCommand(line);
    });
  }
}
