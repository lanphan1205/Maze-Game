import styles from "../Styles/arrows.module.css";
const Display = {
  WALL: 0,
  PATH: 1,
  EXIT: 2,
  START: 3,
  HIDDEN: 4,
  BORDER: 5,
};

const test_maze = [
  [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1,
    0, 0, 0, 0, 0, 1,
  ],
  [
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1,
    1, 1, 1, 1, 0, 1,
  ],
  [
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
    0, 1, 0, 2, 0, 0,
  ],
  [
    1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    0, 1, 1, 1, 0, 1,
  ],
  [
    0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 1,
  ],
  [
    1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1,
    0, 1, 1, 1, 1, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0,
  ],
  [
    1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
  ],
  [
    1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,
    0, 0, 0, 1, 0, 1,
  ],
  [
    1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 1, 0, 1,
  ],
  [
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 0,
  ],
  [
    1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
    1, 1, 0, 1, 1, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0,
    0, 0, 0, 1, 0, 0,
  ],
  [
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
    0, 0, 0, 0, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 0, 1,
  ],
  [
    1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 1,
  ],
  [
    1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1,
    0, 1, 0, 1, 1, 1,
  ],
  [
    0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 1, 0, 1,
  ],
  [
    1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 1, 0, 1,
  ],
  [
    1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 1,
  ],
  [
    1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1,
    1, 1, 1, 1, 0, 1,
  ],
  [
    1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1,
    0, 0, 0, 0, 0, 0,
  ],
  [
    1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 0, 1,
  ],
  [
    0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 1,
  ],
  [
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 1, 0, 1,
  ],
  [
    0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 2, 1, 0, 1,
  ],
  [
    1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
  ],
  [
    1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1,
    0, 0, 0, 1, 0, 1,
  ],
  [
    1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 0, 1, 0, 1,
  ],
];

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
      return "bg-gray-200";
    default:
      return "bg-white";
  }
}

export default function Maze() {
  return (
    <div class="flex flex-auto gap-14 flex-wrap justify-center">
      {/* Maze */}
      <div class="flex flex-col flex-nowrap align-middle">
        <div class="flex flex-nowrap justify-center h-4 xl:h-5">
          {Array.from({ length: test_maze[0].length + 2 }, (v, index) => (
            <div class=" bg-black h-4 w-4 xl:h-5 xl:w-5" key={index}></div>
          ))}
        </div>
        {test_maze.map((row, rid) => (
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
          {Array.from({ length: test_maze[0].length + 2 }, (index) => (
            <div class=" bg-black h-4 w-4 xl:h-5 xl:w-5" key={index}></div>
          ))}
        </div>
      </div>
      {/* Controls */}
      <div class="flex flex-col mx-24 my-auto">
        <button class={styles.arrowUp}></button>
        <button class="flex">
          <button class={styles.arrowLeft}></button>
          <div class={styles.divider}></div>
          <button class={styles.arrowRight}></button>
        </button>
        <button class={styles.arrowDown}></button>
      </div>
    </div>
  );
}
