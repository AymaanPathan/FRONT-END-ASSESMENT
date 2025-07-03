import { Position } from "reactflow";

export const INPUT_NODE_CONFIG = {
  title: "Input",
  description: "Define input parameters",
  width: 200,
  height: 120,
  fields: [
    {
      name: "inputName",
      label: "Name",
      type: "text",
      defaultValue: "input_field",
      placeholder: "Enter input name",
    },
    {
      name: "inputType",
      label: "Type",
      type: "select",
      defaultValue: "Text",
      options: [
        { value: "Text", label: "Text" },
        { value: "File", label: "File" },
        { value: "Number", label: "Number" },
        { value: "Boolean", label: "Boolean" },
      ],
    },
  ],
  handles: [
    {
      id: "value",
      type: "source",
      position: Position.Right,
      color: "#4CAF50",
    },
  ],
};
