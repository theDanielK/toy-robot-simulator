// Create type for move object
// eg. EAST: [1, 0] - ie. When moving east, modify x and y respectively
export type Moves = {
  [key: string]: [number, number];
};
