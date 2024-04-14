import * as fs from 'fs';
import { FileReaderError } from '../errors';

export class FileReader {
  /**
   * Read lines from a file
   * @param filename
   */
  static readLinesFromFile(filename: string): string[] {
    let lines: string[] = [];
    if (fs.existsSync(filename)) {
      lines = fs.readFileSync(filename, 'utf-8').trim().split('\n');
    } else {
      throw new FileReaderError({
        name: 'FileDoesntExist',
        message: `File [${filename}] not found`
      });
    }
    return lines;
  }
}
