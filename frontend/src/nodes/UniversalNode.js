import { useState, useEffect, useRef } from "react";
import { NumberInput } from "../components/formFields/NumberInput";
import { SelectInput } from "../components/formFields/SelectInput";
import { TextInput } from "../components/formFields/TextInput";
import { TextareaInput } from "../components/formFields/TextareaInput";
import { Handle, Position } from "reactflow";

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
    height: nodeConfig.height || "auto",
  });

  // State for dynamic handles based on variables
  const [dynamicHandles, setDynamicHandles] = useState([]);

  // Ref for measuring text content
  const textMeasureRef = useRef(null);

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
        color: "#4CAF50",
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
          background: handleConfig.color || "#555",
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
            background: handleConfig.color || "#4CAF50",
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
            color: "#4CAF50",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          {handleConfig.label}
        </div>
      </div>
    );
  };

  // Use dynamic dimensions for text nodes, otherwise use config dimensions
  const nodeWidth =
    nodeConfig.title === "Text"
      ? dynamicDimensions.width
      : nodeConfig.width || 200;
  const nodeHeight =
    nodeConfig.title === "Text"
      ? dynamicDimensions.height
      : nodeConfig.height || "auto";

  return (
    <div
      style={{
        width: nodeWidth,
        height: nodeHeight,
        minHeight: 80,
        border: "1px solid #333",
        borderRadius: "8px",
        background: "white",
        padding: "8px",
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* Render all static input connection handles */}
      {nodeConfig.handles
        ?.filter((handle) => handle.type === "target")
        .map(renderConnectionHandle)}

      {dynamicHandles.map(renderDynamicHandle)}

      <div
        style={{
          fontWeight: "bold",
          marginBottom: "8px",
          textAlign: "center",
          borderBottom: "1px solid #eee",
          paddingBottom: "4px",
        }}
      >
        {nodeConfig.title}
      </div>

      {nodeConfig.description && (
        <div
          style={{
            fontSize: "10px",
            color: "#666",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          {nodeConfig.description}
        </div>
      )}

      {/* Variables preview (for text nodes) */}
      {nodeConfig.title === "Text" && dynamicHandles.length > 0 && (
        <div
          style={{
            fontSize: "9px",
            color: "#4CAF50",
            marginBottom: "8px",
            padding: "4px",
            background: "#f0f8f0",
            borderRadius: "4px",
            border: "1px solid #e0e0e0",
          }}
        >
          Variables: {dynamicHandles.map((h) => h.label).join(", ")}
        </div>
      )}

      {nodeConfig.fields?.map((fieldConfig) => (
        <div key={fieldConfig.name} style={{ marginBottom: "8px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "2px",
              fontWeight: "bold",
            }}
          >
            {fieldConfig.label}:
          </label>
          {renderInputControl(fieldConfig)}
        </div>
      ))}

      {/* Render all output connection handles */}
      {nodeConfig.handles
        ?.filter((handle) => handle.type === "source")
        .map(renderConnectionHandle)}
    </div>
  );
};
