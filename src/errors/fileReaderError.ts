import { ErrorName } from '../types';

export class FileReaderError extends Error {
  name: ErrorName;
  constructor({ name, message }: { name: ErrorName; message: string }) {
    super(message);
    this.name = name;
  }
}
