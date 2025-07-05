import { Position } from "reactflow";

export const OUTPUT_NODE_CONFIG = {
  title: "Output",
  description: "Define output parameters",
  fields: [
    {
      name: "outputName",
      label: "Name",
      type: "text",
      defaultValue: "output_field",
      placeholder: "Enter output name",
    },
    {
      name: "outputType",
      label: "Type",
      type: "select",
      defaultValue: "Text",
      options: [
        { value: "Text", label: "Text" },
        { value: "Image", label: "Image" },
        { value: "File", label: "File" },
        { value: "Number", label: "Number" },
      ],
    },
  ],
  handles: [
    {
      id: "value",
      type: "target",
      position: Position.Left,
      color: "#F44336",
    },
  ],
};
