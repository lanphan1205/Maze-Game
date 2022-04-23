import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:8000",
  responseType: "json",
});

async function startMaze(address) {
  try {
    let response = await server.post("/start", {
      address: address,
    });
    // console.log(response);
    return { response };
  } catch (error) {
    return { error };
  }
}

async function updatePosition(address, position) {
  try {
    let response = await server.post("/move", {
      address: address,
      position: position,
    });
    return { response };
  } catch (error) {
    return { error };
  }
}

export { updatePosition, startMaze };
