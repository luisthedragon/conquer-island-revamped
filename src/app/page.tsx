"use client";
import { useState, useEffect } from "react";
import seedrandom from "seedrandom";

export default function HomePage() {
  const MAX_SEED_VALUE = 1000000000;
  const nrows = 3;
  const ncols = 3;
  const [board, setBoard] = useState<number[][]>([]);

  // We compute the winning state so that we can check if we won later
  const winningState: number[][] = [];
  for (let i = 0; i < nrows; i++) {
    winningState.push(new Array(ncols).fill(1) as number[]);
  }

  useEffect(() => {
    const seed = Math.floor(Math.random() * MAX_SEED_VALUE);
    const rng = seedrandom(seed + "");

    // We initialize a random board with the calculated seed
    const newBoard = [];
    for (let i = 0; i < nrows; i++) {
      newBoard.push(new Array(ncols).fill(1).map(() => (rng() >= 0.5 ? 1 : 0)));
    }
    setBoard(newBoard);
    console.log("Server-side board:", newBoard);
  }, []); // Make sure this code runs only one to avoid entering an infinite loop (TODO: Check if there's a better way of doing this or this is the standard)

  console.log("board");
  console.log(board);

  const getImageUrl = (cellValue: number) => {
    return cellValue === 1
      ? "sprites/squared/dog.jpg"
      : "sprites/squared/lion.jpg";
  };

  const handleClick = (rowIndex: number, colIndex: number) => {
    console.log(`row: ${rowIndex} col: ${colIndex}`);
    console.log(board);

    const newBoard = [...board];
    newBoard[rowIndex]![colIndex] = 1 - newBoard[rowIndex]![colIndex]!;
    calcAdjIndexes(rowIndex, colIndex).forEach((position) => {
      newBoard[position.row]![position.col] =
        1 - newBoard[position.row]![position.col]!;
    });
    setBoard(newBoard);
    const winner = checkWinner();
    console.log(`Winner?: ${winner}`);
  };

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="home">
          <h2>You are in the dogs&apos; team.</h2>
          <h3>
            <b>Mission:</b> Defeat the lions by dominating the island.
          </h3>
        </div>
        <div className="">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row">
              {row.map((cell, columnIndex) => (
                <div
                  key={columnIndex}
                  onClick={() => handleClick(rowIndex, columnIndex)}
                  className="flex h-24 w-24 cursor-pointer items-center justify-center p-2"
                  style={{
                    backgroundImage: `url(${getImageUrl(cell)})`,
                    backgroundSize: "cover",
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
