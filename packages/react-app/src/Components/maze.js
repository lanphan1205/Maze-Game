import React, { useEffect, useState } from "react";
import styles from "../Styles/arrows.module.css";
import {
  generateFullMaze,
  revealBlocks,
  FullMaze,
  RevealedMaze,
} from "../testMazeLogic";
const Display = {
  WALL: 0,
  PATH: 1,
  EXIT: 2,
  START: 3,
  HIDDEN: 4,
  BORDER: 5,
  CURRENT: 6,
};
const Direction = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
};
// SET MAZE HERE
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
  const [position, setPosition] = useState([]);
  useEffect(() => {
    setFullMaze(FullMaze.maze);
    setPosition(FullMaze.start);
    console.log("Init call");
  }, []);
  useEffect(() => {
    setRevealedMaze(RevealedMaze);
  }, [position]);

  function move(dir) {
    let newPosition;
    switch (dir) {
      case Direction.UP:
        newPosition = [position[0] - 1, position[1]];
        break;
      case Direction.DOWN:
        newPosition = [position[0] + 1, position[1]];
        break;
      case Direction.LEFT:
        newPosition = [position[0], position[1] - 1];
        break;
      case Direction.RIGHT:
        newPosition = [position[0], position[1] + 1];
        break;
      default:
        newPosition = [position[0], position[1]];
    }
    if (
      newPosition[0] < 0 ||
      newPosition[1] < 0 ||
      newPosition[0] > revealedMaze.length - 1 ||
      newPosition[1] > revealedMaze[0].length - 1
    ) {
      return;
    }
    revealBlocks(newPosition[0], newPosition[1], fullMaze, revealedMaze);
    setPosition(newPosition);
  }

  function renderPosition(rid, cid) {
    if (rid === position[0] && cid === position[1]) {
      return "border-2 border-yellow-500";
    }
  }

  return (
    <div className="flex flex-auto gap-14 flex-wrap justify-center">
      {/* Revealed Maze */}
      <div className="flex flex-col flex-nowrap align-middle">
        <div className="flex flex-nowrap justify-center h-4 xl:h-5">
          {Array.from({ length: revealedMaze[0].length + 2 }, (v, index) => (
            <div className=" bg-black h-4 w-4 xl:h-5 xl:w-5" key={index}></div>
          ))}
        </div>
        {revealedMaze.map((row, rid) => (
          <div
            className="flex flex-nowrap justify-center first:overflow-visible whitespace-nowrap h-4 xl:h-5"
            key={String(rid)}
          >
            <div className=" bg-black h-4 w-4 xl:h-5 xl:w-5"></div>
            {row.map((item, cid) => (
              <div
                className={` shrink-0 ${renderColour(
                  item
                )} h-4 w-4 xl:h-5 xl:w-5 ${renderPosition(rid, cid)}`}
                key={String(rid) + String(cid)}
              ></div>
            ))}
            <div className=" bg-black h-4 w-4 xl:h-5 xl:w-5"></div>
          </div>
        ))}
        <div className="flex flex-nowrap justify-center overflow-visible whitespace-nowrap h-4 xl:h-5">
          {Array.from({ length: revealedMaze[0].length + 2 }, (v, index) => (
            <div className=" bg-black h-4 w-4 xl:h-5 xl:w-5" key={index}></div>
          ))}
        </div>
      </div>
      {/* Full Maze */}
      <div className="flex flex-col flex-nowrap align-middle">
        <div className="flex flex-nowrap justify-center h-4 xl:h-5">
          {Array.from({ length: fullMaze[0].length + 2 }, (v, index) => (
            <div className=" bg-black h-4 w-4 xl:h-5 xl:w-5" key={index}></div>
          ))}
        </div>
        {fullMaze.map((row, rid) => (
          <div
            className="flex flex-nowrap justify-center first:overflow-visible whitespace-nowrap h-4 xl:h-5"
            key={rid}
          >
            <div className=" bg-black h-4 w-4 xl:h-5 xl:w-5"></div>
            {row.map((item, cid) => (
              <div
                className={` shrink-0 ${renderColour(
                  item
                )} h-4 w-4 xl:h-5 xl:w-5`}
                key={String(rid) + String(cid)}
              ></div>
            ))}
            <div className=" bg-black h-4 w-4 xl:h-5 xl:w-5"></div>
          </div>
        ))}
        <div className="flex flex-nowrap justify-center overflow-visible whitespace-nowrap h-4 xl:h-5">
          {Array.from({ length: fullMaze[0].length + 2 }, (v, index) => (
            <div className=" bg-black h-4 w-4 xl:h-5 xl:w-5" key={index}></div>
          ))}
        </div>
      </div>
      {/* Controls */}
      <div className="flex flex-col mx-24 my-auto">
        <button
          className={styles.arrowUp}
          onClick={() => move(Direction.UP)}
        ></button>
        <div className="flex">
          <button
            className={styles.arrowLeft}
            onClick={() => move(Direction.LEFT)}
          ></button>
          <div className={styles.divider}></div>
          <button
            className={styles.arrowRight}
            onClick={() => move(Direction.RIGHT)}
          ></button>
        </div>
        <button
          className={styles.arrowDown}
          onClick={() => move(Direction.DOWN)}
        ></button>
      </div>
      <div>
        Current Position: {position[0]},{position[1]}
      </div>
    </div>
  );
}
