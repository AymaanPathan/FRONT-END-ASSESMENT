import { useState } from "react";
import { NumberInput } from "../components/formFields/NumberInput";
import { SelectInput } from "../components/formFields/SelectInput";
import { TextInput } from "../components/formFields/TextInput";
import { TextareaInput } from "../components/formFields/TextareaInput";

import { Handle } from "reactflow";

export const UniversalNode = ({ id, data, nodeConfig }) => {
  const [nodeFieldValues, setNodeFieldValues] = useState(() => {
    const initialValues = {};

    nodeConfig.fields?.forEach((field) => {
      initialValues[field.name] =
        data?.[field.name] || field.defaultValue || "";
    });

    return initialValues;
  });

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
            config={fieldConfig}
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

  return (
    <div
      style={{
        width: nodeConfig.width || 200,
        height: nodeConfig.height || "auto",
        minHeight: 80,
        border: "1px solid #333",
        borderRadius: "8px",
        background: "white",
        padding: "8px",
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Render all input connection handles */}
      {nodeConfig.handles
        ?.filter((handle) => handle.type === "target")
        .map(renderConnectionHandle)}

      {/* Node header with title */}
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

      {/* Node description (optional) */}
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
