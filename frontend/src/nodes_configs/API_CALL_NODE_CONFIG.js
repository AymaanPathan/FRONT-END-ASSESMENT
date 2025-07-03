import { Position } from "reactflow";

export const API_CALL_NODE_CONFIG = {
  title: "API Call",
  description: "Make a REST API call",
  icon: "🌐",
  badge: "External",
  fields: [
    {
      name: "method",
      label: "Method",
      type: "select",
      defaultValue: "GET",
      options: [
        { value: "GET", label: "GET" },
        { value: "POST", label: "POST" },
        { value: "PUT", label: "PUT" },
        { value: "DELETE", label: "DELETE" },
      ],
    },
    {
      name: "url",
      label: "URL",
      type: "text",
      defaultValue: "",
      placeholder: "https://api.example.com/data",
    },
    {
      name: "headers",
      label: "Headers (JSON)",
      type: "textarea",
      defaultValue: "{}",
      placeholder: `{"Authorization": "Bearer token"}`,
      rows: 3,
    },
    {
      name: "body",
      label: "Body (JSON)",
      type: "textarea",
      defaultValue: "{}",
      placeholder: `{"key": "value"}`,
      rows: 4,
    },
  ],
  handles: [
    {
      id: "trigger",
      type: "target",
      position: Position.Left,
      color: "#f59e0b",
    },
    {
      id: "response",
      type: "source",
      position: Position.Right,
      color: "#10b981",
    },
  ],
};
