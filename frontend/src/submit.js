// submit.js
import { Button } from "./components/ui/button";
import { useStore } from "./store";
import axios from "axios";
export const handleSubmit = async () => {
  const { nodes, edges } = useStore.getState();

  try {
    const response = await axios.post("http://localhost:8000/pipelines/parse", {
      nodes: nodes.map((n) => ({ id: n.id })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    });

    const { num_nodes, num_edges, is_dag } = response.data;

    alert(`📊 Backend Response:
- Nodes: ${num_nodes}
- Edges: ${num_edges}
- DAG: ${is_dag ? "✅ Yes" : "❌ No (Cycle Detected)"}`);
  } catch (error) {
    console.error("❌ Pipeline submission failed:", error);
    alert("❌ Failed to submit pipeline. Check console for details.");
  }
};

export const SubmitButton = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button variant="default" onClick={handleSubmit}>
        Click me
      </Button>
    </div>
  );
};
