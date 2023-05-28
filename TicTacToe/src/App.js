import { useState } from "react";

// creating Square component
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board component containing 9 Square components
function Board({ xIsNext, squares, onPlay }) {
  // defining handle function in the parent component (Board) to pass it later to child components (Squares)
  function handleClick(i) {
    // returning early in case square is already filled or game has ended
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // passing X or O (alternating) to the square i
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    // Game component updates the Board when square is clicked
    onPlay(nextSquares);
  }

  // status based on the state of the game (did it end? which player is next?)
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // passing corresponding square values and handle functions to all Square components
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// top-level component Game with Board and game history
export default function Game() {
  // moved state of the Board to the parent component Game to store in history
  // history = [[null, null, null, ...]] (array of arrays with 9 items)
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // keeping track of game moves
  const [currentMove, setCurrentMove] = useState(0);
  // Next player is X if current move is even
  const xIsNext = currentMove % 2 === 0;
  // current game state in current move
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // if you go back in time you only want to keep the history up to that point (current move)
    // then adding squares for next move
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    // each time move is made we update currentMove
    setCurrentMove(nextHistory.length - 1);
  }

  // function for reseting game state based on move number
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // creating buttons with game moves
  // squares - element of history array, move - index of array
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    // keys in lists tell React about identity of a component
    // this allows React to maintain state between re-renders
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // return 1. Board with the info on current squares and next player 2. moves buttons
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// helper function for declaring a winner, returns: O/X/null
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const element of lines) {
    const [a, b, c] = element;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
