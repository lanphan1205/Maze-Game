import React, { useEffect, useState } from "react";
import styles from "../Styles/arrows.module.css";
import { startMaze, updatePosition } from "../Helper/serverAPI";
import Spin from "./spin";
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

export default function Maze({web3Prop}) {
  // Deconstruct
  readContracts.MazeGame.
  const [isLoading, setIsLoading] = useState(false);
  const [revealedMaze, setRevealedMaze] = useState();
  const [position, setPosition] = useState();
  const [validMove, setValidMove] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const getMaze = async () => {
      const { response, error } = await startMaze();
      if (response.status === 200) {
        console.log(response.data.maze);
        console.log(response.data.start);
        setRevealedMaze(response.data.maze);
        setPosition(response.data.start);
      }
    };
    getMaze();
  }, []);

  useEffect(() => {
    const checkValidMove = () => {
      if (!revealedMaze || !position) {
        return;
      }
      let r = position[0];
      let c = position[1];
      let newValidMove = { up: true, down: true, left: true, right: true };
      // check up
      if (r === 0 || revealedMaze[r - 1][c] === Display.WALL) {
        newValidMove.up = false;
      }
      // check down
      if (
        r === revealedMaze.length - 1 ||
        revealedMaze[r + 1][c] === Display.WALL
      ) {
        newValidMove.down = false;
      }
      // check left
      if (c === 0 || revealedMaze[r][c - 1] === Display.WALL) {
        newValidMove.left = false;
      }
      // check right
      if (
        c === revealedMaze[0].length ||
        revealedMaze[r][c + 1] === Display.WALL
      ) {
        newValidMove.right = false;
      }
      setValidMove(newValidMove);
    };
    checkValidMove();
  }, [position, revealedMaze]);

  async function move(dir) {
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
      console.log("BLOCKED");
      return;
    }
    if (
      revealedMaze[newPosition[0]][newPosition[1]] === Display.WALL ||
      revealedMaze[newPosition[0]][newPosition[1]] === Display.HIDDEN
    ) {
      console.log("BLOCKED");
      return;
    }
    setIsLoading(true);
    const { response, error } = await updatePosition(newPosition);
    if (response.status === 200) {
      setPosition(newPosition);
      // console.log(response.data);
      setRevealedMaze(response.data);
      setIsLoading(false);
    } else if (error) {
      setIsLoading(false);
    }
  }

  function renderPosition(rid, cid) {
    if (rid === position[0] && cid === position[1]) {
      return "border-2 border-yellow-500";
    }
  }

  return (
    <div className="flex flex-auto gap-14 flex-wrap justify-center ">
      {/* Revealed Maze */}
      <div className="relative">
        {isLoading ? (
          <div className="absolute w-full h-full z-10 flex align-middle justify-center">
            <Spin />
          </div>
        ) : (
          <></>
        )}
        <div
          className={`flex flex-col flex-nowrap align-middle ${
            isLoading ? "opacity-60" : ""
          }`}
        >
          {revealedMaze && position ? (
            <>
              <div className="flex flex-nowrap justify-center h-4 xl:h-5">
                {Array.from(
                  { length: revealedMaze[0].length + 2 },
                  (v, index) => (
                    <div
                      className=" bg-black h-4 w-4 xl:h-5 xl:w-5"
                      key={index}
                    ></div>
                  )
                )}
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
                {Array.from(
                  { length: revealedMaze[0].length + 2 },
                  (v, index) => (
                    <div
                      className=" bg-black h-4 w-4 xl:h-5 xl:w-5"
                      key={index}
                    ></div>
                  )
                )}
              </div>
              <div className="flex flex-nowrap overflow-visible whitespace-nowrap">
                Current Position: {position[0]},{position[1]}
              </div>
            </>
          ) : (
            <Spin />
          )}
        </div>
      </div>
      {/* Controls */}
      <div className="flex flex-col mx-24 my-auto">
        <button
          className={
            styles.arrowUp + " " + (validMove.up ? "" : styles.disableUp)
          }
          onClick={() => move(Direction.UP)}
          disabled={!validMove.up || isLoading}
        ></button>
        <div className="flex">
          <button
            className={
              styles.arrowLeft +
              " " +
              (validMove.left ? "" : styles.disableLeft)
            }
            onClick={() => move(Direction.LEFT)}
            disabled={!validMove.left || isLoading}
          ></button>
          <div className={styles.arrowDivider}></div>
          <button
            className={
              styles.arrowRight +
              " " +
              (validMove.right ? "" : styles.disableRight)
            }
            onClick={() => move(Direction.RIGHT)}
            disabled={!validMove.right || isLoading}
          ></button>
        </div>
        <button
          className={
            styles.arrowDown + " " + (validMove.down ? "" : styles.disableDown)
          }
          onClick={() => move(Direction.DOWN)}
          disabled={!validMove.down || isLoading}
        ></button>
      </div>
    </div>
  );
}
