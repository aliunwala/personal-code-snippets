"use client";
// Starter code from:
// https://github.com/statelyai/xstate/tree/main/examples/tic-tac-toe-react

import { useMachine } from "@xstate/react";
import React from "react";
import { ticTacToeMachine } from "./ticTacToeMachine";
import styles from "./page.module.css"; // Import CSS Module

function range(start: number, end: number) {
  return Array(end - start)
    .fill(null)
    .map((_, i) => i + start);
}

const Tile: React.FC<{
  index: number;
  onClick: () => void;
  player: "x" | "o" | null;
}> = ({ index, onClick, player }) => {
  return (
    <div
      className={styles.tile}
      key={index}
      onClick={onClick}
      data-player={player}
    ></div>
  );
};

export default function App() {
  const [state, send] = useMachine(ticTacToeMachine);

  return (
    <div className={styles.game}>
      <h1>Tic-Tac-Toe</h1>
      {state.matches("gameOver") && (
        <div>
          {state.hasTag("winner") && <h2>Winner: {state.context.winner}</h2>}
          {state.hasTag("draw") && <h2>Draw</h2>}
          <button onClick={() => send({ type: "RESET" })}>Reset</button>
        </div>
      )}
      <div className={styles.board}>
        {range(0, 9).map((index) => {
          return (
            <Tile
              index={index}
              onClick={() => send({ type: "PLAY", value: index })}
              key={index}
              player={state.context.board[index]}
            />
          );
        })}
      </div>
    </div>
  );
}
