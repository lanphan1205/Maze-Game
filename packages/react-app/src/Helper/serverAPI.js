import axios from "axios";

const server = axios.create({
  baseURL: "localhost:8000",
  responseType: "json",
});

// async function startMaze() {
//   try {
//     response = await server.put("/start", {
//       row: row,
//       col: col
//     });
//     return { response };
//   } catch (error) {
//     return { error };
//   }
// }

async function updatePosition(row, col) {
  try {
    response = await server.put("/move", {
      row: row,
      col: col,
    });
    return { response };
  } catch (error) {
    return { error };
  }
}

module.exports = {
  updatePosition,
};
