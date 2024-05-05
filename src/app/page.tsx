"use client";
import { useState, useEffect } from "react";
import seedrandom from "seedrandom";

export default function HomePage() {
  const MAX_SEED_VALUE = 1000000000;
  const nrows = 3;
  const ncols = 3;
  const [board, setBoard] = useState([[0]]);

  useEffect(() => {
    const seed = Math.floor(Math.random() * MAX_SEED_VALUE);
    const rng = seedrandom(seed + "");
    let new_board = [];
    for (let i = 0; i < nrows; i++) {
      new_board.push(
        new Array(ncols).fill(1).map(() => (rng() >= 0.5 ? 1 : 0)),
      );
    }
    setBoard(new_board);
  }, []); // Dependency array ensures this effect runs only once (TODO: Check if there's a better way of doing this or this is the standard)

  console.log(board);

  const getImageUrl = (cellValue: number) => {
    return cellValue === 1
      ? "sprites/squared/dog.jpg"
      : "sprites/squared/lion.jpg";
  };

  const handleClick = (row_idx: number, col_idx: number) => {
    console.log(`row: ${row_idx} col: ${col_idx}`);
    console.log(board);
    // Implement your logic for handling clicks here
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
                  className={`flex h-24 w-24 cursor-pointer items-center justify-center p-2`}
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
