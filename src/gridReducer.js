// Action types
const MOVE_LEFT = 'MOVE_LEFT';
const MOVE_RIGHT = 'MOVE_RIGHT';
const MOVE_UP = 'MOVE_UP';
const MOVE_DOWN = 'MOVE_DOWN';
const SPAWN_NUMBERS = 'SPAWN_NUMBERS';

const actionTypes = {
  moveLeft: MOVE_LEFT,
  moveRight: MOVE_RIGHT,
  moveUp: MOVE_UP,
  moveDown: MOVE_DOWN,
  spawnNumbers: SPAWN_NUMBERS,
}

function gridReducer(grid, action) {
  switch(action.type) {
    case SPAWN_NUMBERS:
      return spawnRandomNumbers(grid);
    case MOVE_LEFT:
      return mergeTiles(grid, MOVE_LEFT);
    case MOVE_RIGHT:
      return mergeTiles(grid, MOVE_RIGHT);
    case MOVE_UP:
      return mergeTiles(grid, MOVE_UP);
    case MOVE_DOWN:
      return mergeTiles(grid, MOVE_DOWN);
    default:
      return grid;
  }
}

// Spawns two random numbers on the grid and returns the new grid
const spawnRandomNumbers = (grid) => {
  const newGrid = grid.map(row => [...row]);
  let spawnedCount = 0;
  
  while (spawnedCount < 2) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    
    if (newGrid[row][col] === null) {
      const value = Math.random() < 0.9 ? 2 : 4;
      newGrid[row][col] = value;
      spawnedCount++;
    }
  }
  return newGrid;
}

const spawnRandomNumberOnMove = (grid) => {
  const newGrid = grid.map(row => [...row]);
  let hasEmptyCells = true;

  const checkForEmptyCells = () => {
    return newGrid.some(row => row.includes(null))
  }

  if(!checkForEmptyCells()) return newGrid;

  while(hasEmptyCells) {
    const row = Math.floor(Math.random() * 4);
    const col = Math.floor(Math.random() * 4);
    
    if (newGrid[row][col] === null) {
      newGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
      hasEmptyCells = false;
    }
 
    if(!checkForEmptyCells()) return newGrid;
  }
  return newGrid;
}

const mergeTiles = (grid, direction) => {
  const newGrid = moveGrid(grid, direction)
  return spawnRandomNumberOnMove(newGrid);
}


const moveGrid = (grid, direction) => {
  let newGrid = grid.map(row => [...row])
  
  switch(direction) {
    case MOVE_LEFT:
      newGrid = newGrid.map(row => mergeRow(row));
      break;
    case MOVE_RIGHT:
      newGrid = newGrid.map(row => mergeRow(row.reverse()).reverse());
      break;
    case MOVE_UP:
      newGrid = transpose(newGrid);
      newGrid = newGrid.map(row => mergeRow(row));
      newGrid = transpose(newGrid);
      break;
    case MOVE_DOWN:
      newGrid = transpose(newGrid);
      newGrid = newGrid.map(row => mergeRow(row.reverse()).reverse());
      newGrid = transpose(newGrid);
      break;
    default:
      throw new Error('Invalid direction');
  }
  return newGrid;
}

/**
 * lastMergeIndex makes sure that a merge only occurs once
 * -1 !== 0 which is true since -1 is not 0
 * after first merge lastMergeIndex = 0
 * 0 !== 0 which is false since 0 is 0 
 */
const mergeRow = (row) => {
  let lastMergedIndex = -1;

  const mergedRow = row.reduce((acc, value) => {
    if(value === null) return acc;

    if(acc.length > 0 && acc[acc.length - 1] === value && lastMergedIndex !== acc.length - 1) {
      acc[acc.length - 1] *= 2;
      lastMergedIndex = acc.length - 1;
    }
    else acc.push(value);
    return acc;
  }, []);
  
  while(mergedRow.length < 4) {
    mergedRow.push(null);
  }
  console.log(mergedRow);
  return mergedRow;
}
          
/**
 * Function transposes columns to rows
 * Outer map method is for creating a new array 4 times and accessing colIndex in the inner loop
 * Inner map method is for collecting the element at the current colIndex and build it as new row
 * Example:
 * [           transposed: [
 *  [1,2,3,4]                [1,5,9,13]
 *  [5,6,7,8]                [2,6,10,14]
 *  [9,10,11,12]             [3,7,11,15]
 *  [13,14,15,16]            [4,8,12,16]
 * ]                       ]
 */
const transpose = (matrix) => {
return matrix[0].map((cell, colIndex) => matrix.map(row => row[colIndex]))
}

// const a = [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12],
//   [13, 14, 15, 16]
// ];
// const transposed = transpose(a);
// console.log(transposed);
// const reversedTransposed = transpose(transposed)
// console.log(reversedTransposed);

export {gridReducer, actionTypes}