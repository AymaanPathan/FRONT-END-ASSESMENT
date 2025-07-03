import { Position } from "reactflow";

export const LLM_NODE_CONFIG = {
  title: "LLM",
  description: "Large Language Model",
  width: 200,
  height: 100,
  fields: [],
  handles: [
    {
      id: "system",
      type: "target",
      position: Position.Left,
      topOffset: "25%",
      color: "#9C27B0",
    },
    {
      id: "prompt",
      type: "target",
      position: Position.Left,
      topOffset: "75%",
      color: "#673AB7",
    },
    {
      id: "response",
      type: "source",
      position: Position.Right,
      color: "#3F51B5",
    },
  ],
};
