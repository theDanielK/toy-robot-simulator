#! /usr/bin/env node

// Start the command line program and run it
import { ToyRobotSimulatorProgram } from './toy-robot-simulator';
const toyRobotSimulatorProgram = new ToyRobotSimulatorProgram();
toyRobotSimulatorProgram.run().catch((error: Error) => console.error(error));
