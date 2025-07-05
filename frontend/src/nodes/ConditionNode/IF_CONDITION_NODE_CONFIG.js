import { Position } from "reactflow";

export const IF_CONDITION_NODE_CONFIG = {
  title: "If Condition",
  description: "Branch logic based on conditions",
  icon: "🔀",
  badge: "Logic",
  fields: [
    {
      name: "condition",
      label: "Condition",
      type: "text",
      defaultValue: "input.value > 5",
      placeholder: "e.g. user.age > 18",
    },
  ],
  handles: [
    {
      id: "input",
      type: "target",
      position: Position.Left,
      color: "#8b5cf6",
    },
    {
      id: "true",
      type: "source",
      position: Position.Right,
      topOffset: "30%",
      color: "#10b981",
    },
    {
      id: "false",
      type: "source",
      position: Position.Right,
      topOffset: "70%",
      color: "#ef4444",
    },
  ],
};
