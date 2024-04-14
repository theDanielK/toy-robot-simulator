# Toy Robot Simulator

Toy Robot Simulator is a simple command line application that simulates a toy robot moving on a table of set grid dimensions according to fixed rules and instructions.

## Installation

### Versions
- Node: v20.12.2
- NPM: 10.5.0

Use npm to install dependencies

```bash
npm install
```

## Set up

Run the build script to compile the typescript files
```bash
npm run build
```

You can run the tests, using jest
```bash
npm run test
```

## Usage
Once you have this application built using `npm run build`
You can run it by either
- Running the compiled javascript file directly:
```bash
node ./dist/index.js
```

- Installing it globally by running: 
```bash
npm install -g .
```
This will install the application with the name `toy-robot-simulator` and you can run it from anywhere in your terminal by running:
```bash
toy-robot-simulator
```

## Notes
- I have provided two mechanisms for receiving commands.
- Without specifying any flags or arguments, the application will give you a help script to guide you.

### The Two Modes:
- You can run the application in interactive mode with the `-i` flag; or
- You can run it while passing in a file with the `-f` flag 
- I have provided a sample file called [example-command-file.txt](example-command-file.txt)

### Example Usage
```bash
node ./dist/index.js -i
node ./dist/index.js -f example-command-file.txt
node ./dist/index.js -h

Or once installed:
toy-robot-simulator -i
toy-robot-simulator -f example-command-file.txt
toy-robot-simulator -h
```

### Extra Notes
- I have also provided examples of other tables and toys
- This can be built into the cli application with more flags