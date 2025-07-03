import { Position } from "reactflow";

export const DELAY_NODE_CONFIG = {
  title: "Delay",
  description: "Pause execution for a duration",
  icon: "⏱️",
  badge: "Utility",
  fields: [
    {
      name: "duration",
      label: "Delay (ms)",
      type: "number",
      defaultValue: 1000,
      placeholder: "e.g. 2000",
    },
  ],
  handles: [
    {
      id: "input",
      type: "target",
      position: Position.Left,
      color: "#3b82f6",
    },
    {
      id: "output",
      type: "source",
      position: Position.Right,
      color: "#10b981",
    },
  ],
};
