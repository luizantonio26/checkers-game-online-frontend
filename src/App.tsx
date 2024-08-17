import { useEffect, useState } from 'react';
import './App.css';
import { Board } from './components/Board/Board';
import data from './example.json';
import BoardModel from './models/BoardModel';
import { Labels } from './models/Labels';

function App() {
  const [board, setBoard] = useState<BoardModel>(new BoardModel())
  const [gameState, setGameState] = useState<Boolean | {
    piece_color: string;
    piece_type: string;
    piece_position: number[];
  }>();


  function showState(board: BoardModel) {
    for (let row = 0; row < data.state.length; row++) {
      for (let col = 0; col < data.state[row].length; col++) {
        if (typeof (data.state[row][col]) === "object") {
          board.addFigure(data.state[row][col].piece_color === "black" ? Labels.Dark : Labels.Light, data.state[row][col].piece_position[1], data.state[row][col].piece_position[0]);
        }
      }
    }
  }

  const restart = () => {
    const newBoard = new BoardModel();
    newBoard.createCells();
    setGameState(data.state);
    showState(newBoard);
    setBoard(newBoard);
  }

  useEffect(() => {
    restart();
  }, [])

  return (
    <div className="App">
      <Board board={board} onSetBoard={setBoard} />
    </div>
  )
}

export default App
