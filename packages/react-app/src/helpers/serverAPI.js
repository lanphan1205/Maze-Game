import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:8000",
  responseType: "json",
});

const startMaze = async () => {
  try {
    let response = await server.get("/start");
    // console.log(response);
    return { response };
  } catch (error) {
    return { error };
  }
};

async function updatePosition(position) {
  try {
    let response = await server.post("/move", {
      position: position,
    });
    return { response };
  } catch (error) {
    return { error };
  }
}

export { updatePosition, startMaze };
