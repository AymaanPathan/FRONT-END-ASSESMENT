import { Position } from "reactflow";
export const EMAIL_NODE_CONFIG = {
  title: "Email",
  description: "Send emails with templates",
  icon: "✉️",
  badge: "Notify",
  fields: [
    {
      name: "emailProvider",
      label: "Provider",
      type: "select",
      defaultValue: "smtp",
      options: [
        { value: "smtp", label: "SMTP" },
        { value: "sendgrid", label: "SendGrid" },
        { value: "mailgun", label: "Mailgun" },
        { value: "ses", label: "AWS SES" },
      ],
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      defaultValue: "",
      placeholder: "Email subject line",
    },
    {
      name: "template",
      label: "Template",
      type: "textarea",
      defaultValue: "Hello {{name}},\n\nYour order is ready!",
      placeholder: "Email template with {{variables}}",
      rows: 4,
    },
  ],
  handles: [
    {
      id: "to",
      type: "target",
      position: Position.Left,
      topOffset: "20%",
      color: "#3b82f6",
    },
    {
      id: "data",
      type: "target",
      position: Position.Left,
      topOffset: "50%",
      color: "#8b5cf6",
    },
    {
      id: "trigger",
      type: "target",
      position: Position.Left,
      topOffset: "80%",
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
