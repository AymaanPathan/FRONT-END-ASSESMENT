import { Position } from "reactflow";

export const TEXT_NODE_CONFIG = {
  title: "Text",
  description: "Text processing node with variable support",
  fields: [
    {
      name: "textContent",
      label: "Text Content",
      type: "textarea",
      defaultValue: "{{input}}",
      placeholder: "Enter text or use {{variable}} syntax for dynamic inputs",
      rows: 3,
      style: {
        fontFamily: "Arial, sans-serif",
        fontSize: "12px",
        lineHeight: "16px",
      },
    },
  ],
  handles: [
    {
      id: "input",
      type: "target",
      position: Position.Left,
      color: "#2196F3",
      topOffset: 35,
    },
    {
      id: "output",
      type: "source",
      position: Position.Right,
      color: "#FF9800",
      topOffset: 35,
    },
  ],
};
