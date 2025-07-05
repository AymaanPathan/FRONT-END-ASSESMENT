import { useStore } from "../store";
import axios from "axios";

export const checkIsDagOrNotApi = async () => {
  const { nodes, edges } = useStore.getState();

  try {
    const response = await axios.post("http://127.0.0.1:8000/pipelines/parse", {
      nodes: nodes.map((n) => ({
        id: n.id,
      })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    });

    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data.detail;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};
