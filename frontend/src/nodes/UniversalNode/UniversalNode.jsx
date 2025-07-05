import { Card } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { useUniversalNodeState } from "./useUniversalNodeState";
import { renderInputControl } from "./renderInputs";
import { renderConnectionHandle, renderDynamicHandle } from "./renderHandles";

export const UniversalNode = ({ id, data, nodeConfig }) => {
  const {
    nodeFieldValues,
    dynamicHandles,
    dynamicDimensions,
    handleFieldValueChange,
  } = useUniversalNodeState({ data, nodeConfig });

  const nodeWidth =
    nodeConfig.title === "Text"
      ? dynamicDimensions.width
      : nodeConfig.width || 200;
  const nodeHeight =
    nodeConfig.title === "Text"
      ? dynamicDimensions.height
      : nodeConfig.height || "auto";

  return (
    <div className="border border-zinc-700 rounded-lg shadow-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/90">
      <Card style={{ width: nodeWidth, height: nodeHeight, minHeight: 80 }}>
        {nodeConfig.handles
          ?.filter((h) => h.type === "target")
          .map((h) => renderConnectionHandle(h, id))}
        {dynamicHandles.map((h) => renderDynamicHandle(h, id))}

        <CardHeader>
          <CardTitle className="text-sm text-center">
            {nodeConfig.title}
          </CardTitle>
          {nodeConfig.description && (
            <CardDescription className="text-xs text-center">
              {nodeConfig.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="pt-3 space-y-4">
          {nodeConfig.title === "Text" && dynamicHandles.length > 0 && (
            <div className="p-2 bg-emerald-950 border border-emerald-800 rounded">
              <span className="text-xs text-emerald-300">Variables: </span>
              {dynamicHandles.map((h) => (
                <Badge key={h.label} className="ml-1 text-emerald-200">
                  {h.label}
                </Badge>
              ))}
            </div>
          )}
          {nodeConfig.fields?.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label className="text-xs font-semibold">{field.label}:</Label>
              {renderInputControl(
                field,
                nodeFieldValues[field.name],
                (newVal) => handleFieldValueChange(field.name, newVal)
              )}
            </div>
          ))}
        </CardContent>

        {nodeConfig.handles
          ?.filter((h) => h.type === "source")
          .map((h) => renderConnectionHandle(h, id))}
      </Card>
    </div>
  );
};
