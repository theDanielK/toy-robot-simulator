import { Toy } from '../entities/toys';
import { runMode } from './runMode';
import { Separator } from '@inquirer/select';
import { input, select } from '@inquirer/prompts';
import { ExitPromptError } from '@inquirer/core';

export class InteractiveMode extends runMode {
  /**
   * Run the interactive mode
   */
  async run(): Promise<void> {
    console.log('Toy Robot Simulator - Interactive Mode');
    try {
      let command: string = await this.promptCommand();
      while (command !== 'exit') {
        this.executeToyCommand(command);
        command = await this.promptCommand();
      }
      process.exit();
    } catch (error) {
      // When the user exits the program, a known error is thrown by the library. Handle this case gracefully.
      if (error instanceof ExitPromptError) {
        console.log('User exited the program');
      } else {
        console.error('An error occurred:', error);
      }
    }
  }

  /**
   * Prompt the user for a command to give to the toy
   */
  async promptCommand(): Promise<string> {
    const prompt = select({
      message: 'Choose command to give to your toy:',
      choices: [
        {
          name: 'PLACE',
          value: 'place',
          description:
            'Issue the place command to the toy. An input will fire to ask for the coordinates and facing direction.'
        },
        {
          name: 'MOVE',
          value: 'move',
          description: 'Issue the move command to the toy'
        },
        {
          name: 'LEFT',
          value: 'left',
          description: 'Issue the left command to the toy'
        },
        {
          name: 'RIGHT',
          value: 'right',
          description: 'Issue the right command to the toy'
        },
        {
          name: 'REPORT',
          value: 'report',
          description: 'Issue the report command to the toy'
        },
        new Separator(),
        {
          name: 'EXIT',
          value: 'exit',
          description: 'Exit the program'
        }
      ]
    });

    return await this.handlePrompt(prompt);
  }

  /**
   * Handle the prompt.
   * The Place prompt requires a special handler to ask for the coordinates and facing direction
   * Else, just fetch the answer and return it
   * @param prompt
   * @private
   */
  // TODO: Remove when inquirer/prompts exports a type for Prompt
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private async handlePrompt(prompt): Promise<string> {
    const answer = await prompt;
    if (answer === 'place') {
      return await this.handlePlaceCommand();
    }
    return answer;
  }

  /**
   * Handle the PLACE command by asking the user for the coordinates and facing direction
   * @private
   */
  private async handlePlaceCommand(): Promise<string> {
    return input({
      message: 'Enter PLACE coordinates X,Y,F (eg. 0,0,NORTH):',
      validate: (input) => {
        console.log('input: ', input);
        const validDirections = Toy.validDirections.join('|');
        const regex = new RegExp(`^([0-9]+),([0-9]+),(${validDirections})$`);
        return (
          regex.test(input) ||
          `Please enter in the format X,Y,F - F must be one of [${validDirections}] | (e.g. 0,0,NORTH)`
        );
      }
    }).then((answer) => {
      console.log('handlePlaceCommand answer:', answer);
      return `PLACE ${answer}`;
    });
  }
}
