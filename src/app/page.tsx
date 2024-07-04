"use client";
import { useState, useEffect } from "react";
import seedrandom from "seedrandom";

export default function HomePage() {
  const MAX_SEED_VALUE = 1000000000;
  const nrows = 3;
  const ncols = 3;
  const [board, setBoard] = useState<number[][]>([]);
  const [winner, setWinner] = useState(false);
  const [nmoves, setNMoves] = useState(0);
  const [inputSeed, setInputSeed] = useState(Math.floor(Math.random() * MAX_SEED_VALUE))
  const [seed, setSeed] = useState(inputSeed)

  // We compute the winning state so that we can check if we won later
  const winningState: number[][] = [];
  for (let i = 0; i < nrows; i++) {
    winningState.push(new Array(ncols).fill(1) as number[]);
  }

  useEffect(() => {
    // We initialize a random board with the calculated seed
    setRandomState();
    // setTestState();
  }, [seed]); // Make sure this code runs only once to avoid entering an infinite loop (TODO: Check if there's a better way of doing this or this is the standard)

  console.log("board");
  console.log(board);

  const reloadPage = () => {
    window.location.reload();
  }

  const setRandomState = () => {
    console.log('seed');
    console.log(seed)
    const rng = seedrandom(seed + "");
    const newBoard = [];
    for (let i = 0; i < nrows; i++) {
      newBoard.push(new Array(ncols).fill(1).map(() => (rng() >= 0.5 ? 1 : 0)));
    }
    setBoard(newBoard);
    console.log("Server-side board:", newBoard);
    setNMoves(0);
  };

  // Set state as desired (used for testing specific positions)
  const setTestState = () => {
    // 3x3 board
    const newBoard = [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 0],
    ];

    // 4x4 board
    // const newBoard = [
    //   [1, 0, 1, 1],
    //   [0, 0, 0, 1],
    //   [1, 0, 1, 1],
    //   [1, 1, 1, 1],
    // ];
    setBoard(newBoard);
  };

  const getImageUrl = (cellValue: number) => {
    return cellValue === 1
      ? "sprites/squared/dog.jpg"
      : "sprites/squared/lion.jpg";
  };

  const handleTileClick = (rowIndex: number, colIndex: number) => {
    setNMoves(nmoves + 1);
    console.log(`row: ${rowIndex} col: ${colIndex}`);
    console.log(board);

    const newBoard = [...board];
    newBoard[rowIndex]![colIndex] = 1 - newBoard[rowIndex]![colIndex]!;
    calcAdjIndexes(rowIndex, colIndex).forEach((position) => {
      newBoard[position.row]![position.col] =
        1 - newBoard[position.row]![position.col]!;
    });
    setBoard(newBoard);
    setWinner(checkWinner());
    console.log(`Winner?: ${winner}`);
  };

  const handleStartGameFromSeed = () => {
    setSeed(inputSeed)
  }

  const handleStartRandomGame = () => {
    const newSeed = Math.floor(Math.random() * MAX_SEED_VALUE)
    setInputSeed(newSeed);
    setSeed(newSeed);

    // Este codigo no funciona, ahi la explicación
    // const newSeed = Math.floor(Math.random() * MAX_SEED_VALUE)
    // setInputSeed(newSeed); // Actualizando InputSeed (se ejecuta en el siguiente render)
    // setSeed(inputSeed); // Actualizando seed con el valor de inputSeed (No funciona porque inputSeed aun no se ha vuelto a renderizar)
  }

  interface Position {
    row: number;
    col: number;
  }

  const calcAdjIndexes = (rowIndex: number, colIndex: number) => {
    let adjIndexes: Position[] = [];
    // UP
    if (rowIndex >= 1) {
      adjIndexes = [...adjIndexes, { row: rowIndex - 1, col: colIndex }];
    }
    // RIGHT
    if (colIndex <= 1) {
      adjIndexes = [...adjIndexes, { row: rowIndex, col: colIndex + 1 }];
    }
    // DOWN
    if (rowIndex <= 1) {
      adjIndexes = [...adjIndexes, { row: rowIndex + 1, col: colIndex }];
    }
    // LEFT
    if (colIndex >= 1) {
      adjIndexes = [...adjIndexes, { row: rowIndex, col: colIndex - 1 }];
    }
    return adjIndexes;
  };

  const checkWinner = () => {
    // check if both the board and the winning state are the same. (i.e [[1 1 1...],[1 1 1...],...])
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        if (board[i]![j] !== winningState[i]![j]) {
          return false;
        }
      }
    }
    return true;
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="flex flex-row">
        {row.map((cell, columnIndex) => (
          <div
            key={columnIndex}
            onClick={() => handleTileClick(rowIndex, columnIndex)}
            className="flex h-24 w-24 cursor-pointer items-center justify-center p-2"
            style={{
              backgroundImage: `url(${getImageUrl(cell)})`,
              backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>
    ));
  };

  const renderWinnerScreen = () => (
    <div className="fixed inset-0 z-10 flex flex-col scale-150 items-center justify-center transition delay-150 duration-1000 ease-in-out">
      <div className="">
        <div
          className="h-20 w-20 md:h-24 md:w-24 bg-cover"
          style={{
            backgroundImage: `url(${getImageUrl(1)})`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      <div className="fixed-top-left">
        <div className="p-2">
          <h1 className="m-auto text-white text-center w-28 md:w-max mb-2">
            Congrats! You have defeated the lions!!
          </h1>
        </div>
      </div>
      <button className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={reloadPage}>Play again!</button>
    </div>
  );

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover text-white"
      style={{
        backgroundImage: 'url("sprites/og/forest_og.jpg")',
      }}
    >
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {!winner ? (
          <>
            <div className="text-center">
              <div className="mb-4">
                <label className="text-white" htmlFor="seed">
                  Insert a game seed to start from an specific board configuration
                </label>
                <br />
                <input className="my-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Seed" value={inputSeed} onChange={e => setInputSeed(parseInt(e.target.value || '0'))} />
                <div className="flex flex-wrap gap-2 justify-center">
                  <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleStartGameFromSeed}>
                    Start game from seed
                  </button>
                  <button className="bg-stone-500 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleStartRandomGame}>
                    Start random game
                  </button>
                </div>
              </div>
              <p className="pb-5">Current moves: {nmoves}</p>
              <h2>You are in the dogs&apos; team.</h2>
              <h3>
                <b>Mission:</b> Defeat the lions by dominating the island.
              </h3>
            </div>
            <div>{renderBoard()}</div>
          </>
        ) : (
          renderWinnerScreen()
        )}
      </div>
    </main>
  );
}

