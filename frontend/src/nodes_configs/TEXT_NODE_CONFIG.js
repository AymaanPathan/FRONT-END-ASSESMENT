import { Position } from "reactflow";

export const TEXT_NODE_CONFIG = {
  title: "Text",
  description: "Text processing node",
  width: 220,
  height: 140,
  fields: [
    {
      name: "textContent",
      label: "Text Content",
      type: "textarea",
      defaultValue: "{{input}}",
      placeholder: "Enter text or use {{variable}} syntax",
      rows: 3,
    },
  ],
  handles: [
    {
      id: "input",
      type: "target",
      position: Position.Left,
      color: "#2196F3",
    },
    {
      id: "output",
      type: "source",
      position: Position.Right,
      color: "#FF9800",
    },
  ],
};
