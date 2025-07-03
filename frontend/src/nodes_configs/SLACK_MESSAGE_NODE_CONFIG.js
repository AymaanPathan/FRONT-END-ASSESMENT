import { Position } from "reactflow";

export const SLACK_MESSAGE_NODE_CONFIG = {
  title: "Slack Message",
  description: "Send a message to a Slack channel",
  icon: "💬",
  badge: "Notify",
  fields: [
    {
      name: "webhookUrl",
      label: "Webhook URL",
      type: "text",
      defaultValue: "",
      placeholder: "https://hooks.slack.com/services/...",
    },
    {
      name: "channel",
      label: "Channel",
      type: "text",
      defaultValue: "#general",
      placeholder: "#channel-name",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      defaultValue: "Hello from your agent!",
      placeholder: "Slack message content",
      rows: 3,
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
      id: "sent",
      type: "source",
      position: Position.Right,
      color: "#10b981",
    },
  ],
};
