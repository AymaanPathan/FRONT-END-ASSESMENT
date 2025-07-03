// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="email" label="Email" />
        <DraggableNode type="api_call" label="API Call" />
        <DraggableNode type="if_condition" label="If Condition" />
        <DraggableNode type="delay" label="Delay" />
        <DraggableNode type="slack" label="Slack Msg" />
      </div>
    </div>
  );
};
