import { useEffect, useState } from "react";
import styles from "../Styles/arrows.module.css";
import { generateFullMaze, FullMaze, RevealedMaze } from "../testMazeLogic";
const Display = {
  WALL: 0,
  PATH: 1,
  EXIT: 2,
  START: 3,
  HIDDEN: 4,
  BORDER: 5,
};

generateFullMaze(10, 10, 3);

function renderColour(param) {
  switch (param) {
    case Display.WALL:
      return "bg-gray-700";
    case Display.PATH:
      return "bg-gray-500";
    case Display.EXIT:
      return "bg-red-500";
    case Display.START:
      return "bg-blue-500";
    case Display.HIDDEN:
      return "bg-gray-200 border-r border-b border-gray-300";
    default:
      return "bg-white";
  }
}

export default function Maze() {
  const [revealedMaze, setRevealedMaze] = useState([[]]);
  const [fullMaze, setFullMaze] = useState([[]]);

  useEffect(() => {
    setFullMaze(FullMaze.maze);
    setRevealedMaze(RevealedMaze);
  });

  return (
    <div class="flex flex-auto gap-14 flex-wrap justify-center">
      {/* Revealed Maze */}
      <div class="flex flex-col flex-nowrap align-middle">
        <div class="flex flex-nowrap justify-center h-4 xl:h-5">
          {Array.from({ length: revealedMaze[0].length + 2 }, (v, index) => (
            <div class=" bg-black h-4 w-4 xl:h-5 xl:w-5" key={index}></div>
          ))}
        </div>
        {revealedMaze.map((row, rid) => (
          <div class="flex flex-nowrap justify-center first:overflow-visible whitespace-nowrap h-4 xl:h-5">
            <div class=" bg-black h-4 w-4 xl:h-5 xl:w-5"></div>
            {row.map((item, cid) => (
              <div
                class={` shrink-0 ${renderColour(item)} h-4 w-4 xl:h-5 xl:w-5`}
                key={String(rid) + String(cid)}
              ></div>
            ))}
            <div class=" bg-black h-4 w-4 xl:h-5 xl:w-5"></div>
          </div>
        ))}
        <div class="flex flex-nowrap justify-center overflow-visible whitespace-nowrap h-4 xl:h-5">
          {Array.from({ length: revealedMaze[0].length + 2 }, (index) => (
            <div class=" bg-black h-4 w-4 xl:h-5 xl:w-5" key={index}></div>
          ))}
        </div>
      </div>
      {/* Full Maze */}
      <div class="flex flex-col flex-nowrap align-middle">
        <div class="flex flex-nowrap justify-center h-4 xl:h-5">
          {Array.from({ length: fullMaze[0].length + 2 }, (v, index) => (
            <div class=" bg-black h-4 w-4 xl:h-5 xl:w-5" key={index}></div>
          ))}
        </div>
        {fullMaze.map((row, rid) => (
          <div class="flex flex-nowrap justify-center first:overflow-visible whitespace-nowrap h-4 xl:h-5">
            <div class=" bg-black h-4 w-4 xl:h-5 xl:w-5"></div>
            {row.map((item, cid) => (
              <div
                class={` shrink-0 ${renderColour(item)} h-4 w-4 xl:h-5 xl:w-5`}
                key={String(rid) + String(cid)}
              ></div>
            ))}
            <div class=" bg-black h-4 w-4 xl:h-5 xl:w-5"></div>
          </div>
        ))}
        <div class="flex flex-nowrap justify-center overflow-visible whitespace-nowrap h-4 xl:h-5">
          {Array.from({ length: fullMaze[0].length + 2 }, (index) => (
            <div class=" bg-black h-4 w-4 xl:h-5 xl:w-5" key={index}></div>
          ))}
        </div>
      </div>
      {/* Controls */}
      <div class="flex flex-col mx-24 my-auto">
        <button class={styles.arrowUp}></button>
        <div class="flex">
          <button class={styles.arrowLeft}></button>
          <div class={styles.divider}></div>
          <button class={styles.arrowRight}></button>
        </div>
        <button class={styles.arrowDown}></button>
      </div>
    </div>
  );
}
