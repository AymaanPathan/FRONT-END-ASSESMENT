import { useState, useEffect } from "react";
import { NumberInput } from "../components/formFields/NumberInput";
import { SelectInput } from "../components/formFields/SelectInput";
import { TextInput } from "../components/formFields/TextInput";
import { TextareaInput } from "../components/formFields/TextareaInput";
import { Handle, Position } from "reactflow";
import { Card } from "../components/ui/card";
import { CardHeader } from "../components/ui/card";
import { CardTitle } from "../components/ui/card";
import { CardDescription } from "../components/ui/card";
import { CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
export const UniversalNode = ({ id, data, nodeConfig }) => {
  const [nodeFieldValues, setNodeFieldValues] = useState(() => {
    const initialValues = {};

    nodeConfig.fields?.forEach((field) => {
      initialValues[field.name] =
        data?.[field.name] || field.defaultValue || "";
    });

    return initialValues;
  });

  // State for dynamic dimensions (for text nodes)
  const [dynamicDimensions, setDynamicDimensions] = useState({
    width: nodeConfig.width || 200,
    height: Math.min(nodeConfig.height || 200, 220),
  });

  // State for dynamic handles based on variables
  const [dynamicHandles, setDynamicHandles] = useState([]);

  // Function to extract variables from text content
  const extractVariables = (text) => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const variables = new Set();
    let match;

    while ((match = variableRegex.exec(text)) !== null) {
      variables.add(match[1]);
    }

    return Array.from(variables);
  };

  // Function to calculate dynamic dimensions for text content
  const calculateDynamicDimensions = (text, fieldConfig) => {
    if (!text || fieldConfig.type !== "textarea") {
      return {
        width: nodeConfig.width || 200,
        height: nodeConfig.height || "auto",
      };
    }

    // Create a temporary element to measure text
    const tempElement = document.createElement("textarea");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.fontSize = "12px";
    tempElement.style.fontFamily = "Arial, sans-serif";
    tempElement.style.padding = "1px";
    tempElement.style.border = "1px solid #ccc";
    tempElement.style.borderRadius = "4px";
    tempElement.style.width = "1px";
    tempElement.style.height = "1px";
    tempElement.value = text;

    document.body.appendChild(tempElement);

    const scrollHeight = tempElement.scrollHeight;
    const lineHeight = 16; // Approximate line height
    const lines = Math.max(3, Math.ceil(scrollHeight / lineHeight));

    const textLines = text.split("\n");
    const longestLine = textLines.reduce(
      (longest, current) =>
        current.length > longest.length ? current : longest,
      ""
    );

    const charWidth = 7; // Approximate character width in pixels
    const minWidth = 220;
    const calculatedWidth = Math.max(
      minWidth,
      longestLine.length * charWidth + 40
    );

    document.body.removeChild(tempElement);

    return {
      width: Math.min(calculatedWidth, 400), // Cap at 400px
      height: Math.max(140, lines * lineHeight + 100), // Base height + padding
    };
  };

  // Effect to update dynamic handles and dimensions when text content changes
  useEffect(() => {
    const textField = nodeConfig.fields?.find(
      (field) => field.name === "textContent"
    );
    if (textField && nodeFieldValues.textContent) {
      const textContent = nodeFieldValues.textContent;

      // Extract variables and create dynamic handles
      const variables = extractVariables(textContent);
      const newDynamicHandles = variables.map((variable, index) => ({
        id: `var-${variable}`,
        type: "target",
        position: Position.Left,
        color: "#10b981",
        topOffset: 60 + index * 25, // Offset from existing handles
        label: variable,
      }));

      setDynamicHandles(newDynamicHandles);

      // Calculate dynamic dimensions
      const newDimensions = calculateDynamicDimensions(textContent, textField);
      setDynamicDimensions(newDimensions);
    }
  }, [nodeFieldValues.textContent, nodeConfig.fields]);

  const handleFieldValueChange = (fieldName, newValue) => {
    setNodeFieldValues((previousValues) => ({
      ...previousValues,
      [fieldName]: newValue,
    }));
  };

  const renderInputControl = (fieldConfig) => {
    const currentValue = nodeFieldValues[fieldConfig.name];
    const handleChange = (value) =>
      handleFieldValueChange(fieldConfig.name, value);

    switch (fieldConfig.type) {
      case "text":
        return (
          <TextInput
            config={fieldConfig}
            value={currentValue}
            onChange={handleChange}
          />
        );

      case "textarea":
        return (
          <TextareaInput
            config={{
              ...fieldConfig,
              style: {
                ...fieldConfig.style,
                minHeight: fieldConfig.name === "textContent" ? "60px" : "auto",
                resize: "none",
              },
            }}
            value={currentValue}
            onChange={handleChange}
          />
        );

      case "select":
        return (
          <SelectInput
            config={fieldConfig}
            value={currentValue}
            onChange={handleChange}
          />
        );

      case "number":
        return (
          <NumberInput
            config={fieldConfig}
            value={currentValue}
            onChange={handleChange}
          />
        );

      default:
        return null;
    }
  };

  const renderConnectionHandle = (handleConfig) => {
    return (
      <Handle
        key={handleConfig.id}
        type={handleConfig.type}
        position={handleConfig.position}
        id={`${id}-${handleConfig.id}`}
        style={{
          top: handleConfig.topOffset,
          background: handleConfig.color || "#64748b",
          width: "8px",
          height: "8px",
        }}
      />
    );
  };

  const renderDynamicHandle = (handleConfig) => {
    return (
      <div key={handleConfig.id} style={{ position: "relative" }}>
        <Handle
          type={handleConfig.type}
          position={handleConfig.position}
          id={`${id}-${handleConfig.id}`}
          style={{
            top: handleConfig.topOffset,
            background: handleConfig.color || "#10b981",
            width: "8px",
            height: "8px",
            left: "-4px",
          }}
        />
        {/* Variable label */}
        <div
          style={{
            position: "absolute",
            left: "-60px",
            top: handleConfig.topOffset - 8,
            fontSize: "10px",
            color: "#10b981",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          {handleConfig.label}
        </div>
      </div>
    );
  };

  const nodeWidth =
    nodeConfig.title === "Text"
      ? dynamicDimensions.width
      : nodeConfig.width || 200;
  const nodeHeight =
    nodeConfig.title === "Text"
      ? dynamicDimensions.height
      : nodeConfig.height || "auto";

  return (
    <div className="border border-zinc-700 rounded-lg shadow-2xl backdrop-blur-sm bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 hover:from-zinc-800/90 hover:to-zinc-900/90 transition-all duration-300 hover:shadow-cyan-500/20 hover:shadow-xl">
      <Card
        className="bg-zinc-900/80 border-zinc-700 shadow-inner ring-1 ring-zinc-600/30 backdrop-blur-sm"
        style={{
          width: nodeWidth,
          height: nodeHeight,
          minHeight: 80,
        }}
      >
        {/* Render all static input connection handles */}
        {nodeConfig.handles
          ?.filter((handle) => handle.type === "target")
          .map(renderConnectionHandle)}

        {dynamicHandles.map(renderDynamicHandle)}

        <CardHeader className="pb-2 border-b border-zinc-800/50">
          <CardTitle className="text-sm text-center text-zinc-100 font-semibold tracking-wide">
            {nodeConfig.title}
          </CardTitle>
          {nodeConfig.description && (
            <CardDescription className="text-xs text-center text-zinc-400 leading-relaxed">
              {nodeConfig.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="pt-3 space-y-4">
          {/* Variables preview (for text nodes) */}
          {nodeConfig.title === "Text" && dynamicHandles.length > 0 && (
            <div className="p-3 bg-gradient-to-r from-emerald-950/50 to-teal-950/50 border border-emerald-800/40 rounded-lg backdrop-blur-sm ring-1 ring-emerald-700/20">
              <div className="text-xs text-emerald-300 font-medium">
                Variables:{" "}
                {dynamicHandles.map((h, i) => (
                  <Badge
                    key={h.label}
                    variant="secondary"
                    className="ml-1.5 text-xs bg-gradient-to-r from-emerald-900/70 to-teal-900/70 text-emerald-200 border border-emerald-700/40 shadow-sm hover:from-emerald-800/70 hover:to-teal-800/70 transition-all duration-200"
                  >
                    {h.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {nodeConfig.fields?.map((fieldConfig) => (
            <div key={fieldConfig.name} className="space-y-2">
              <Label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
                {fieldConfig.label}:
              </Label>
              <div className="relative">{renderInputControl(fieldConfig)}</div>
            </div>
          ))}
        </CardContent>

        {/* Render all output connection handles */}
        {nodeConfig.handles
          ?.filter((handle) => handle.type === "source")
          .map(renderConnectionHandle)}
      </Card>
    </div>
  );
};
