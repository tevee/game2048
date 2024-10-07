import './App.css';
import {useReducer, useEffect} from 'react';
import Board from './components/Board.jsx';
import { gridReducer, actionTypes } from './gridReducer.js';

// TODO:
//  Fixa så att om man går en direction och det går inte att multiplicera talen returnera inget
//  eller gör så att inget händer om man fortsätter gå den riktningen 

// Tankar:
// När spelet är över kan sätta state till initalState vilket är en 4x4 matris med null värden


/**
 * Notes:
 * Think of the grid as a static 2D 4x4 grid, which means you can position numbers based on rows and columns.
 * Since it's 4x4 we can:
 *  - get the row by n / 4 (because its 4x4)
 *  - get the column by n % 4
 * Example: n = 8
 *  - row = 8 / 4 = 2
 *  - col = 8 % 4 = 0
 * We get a position of (2, 0)
 * In the 2D 4x4 grid that would be:
 * [
 *    [0, 0, 0, 0],
 *    [0, 0, 0, 0],
 *    [here, 0, 0, 0],
 *    [0, 0, 0, 0]
 * ]
 * 
 * And that makes sense because if we convert it to a 1D grid it would look something like:
 * [0, 0, 0, 0, 0, 0, 0, here, 0, 0, 0, 0, 0, 0, 0, 0]
 * 
 * To manipulate the 2D grid you can do:
 * grid[i][j] 
 * Because we have an array which contains 4 arrays with 4 elements
 */

// Action types
const {moveLeft, moveRight, moveUp, moveDown, spawnNumbers} = actionTypes;

const initialGrid = Array(4).fill().map(() => Array(4).fill(null))

function App() {
  const [grid, dispatch] = useReducer(gridReducer, initialGrid);
  console.log(grid);
  
  // Run once when component mounts
  useEffect(() => {
    dispatch({type: spawnNumbers});
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])
  
  const handleKeyDown = (e) => {

    switch(e.code) {
      case 'ArrowUp':
        dispatch({type: moveUp});
        break;
      case 'ArrowDown':
        dispatch({type: moveDown});
        break;
      case 'ArrowLeft':
        dispatch({type: moveLeft});
        break;
      case 'ArrowRight':
        dispatch({type: moveRight});
        break;
      default: 
        break;
    }
  }

  return (
    <div className="App">
        <Board grid={grid}/>
    </div>
  );
}

export default App;
