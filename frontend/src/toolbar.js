// toolbar.js
import { Card } from "./components/ui/card";
import { CardContent } from "./components/ui/card";
import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <Card className="">
      <CardContent className="py-4 flex flex-wrap gap-3">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="email" label="Email" />
        <DraggableNode type="api_call" label="API Call" />
        <DraggableNode type="if_condition" label="If Condition" />
        <DraggableNode type="delay" label="Delay" />
        <DraggableNode type="slack" label="Slack Msg" />
      </CardContent>
    </Card>
  );
};
