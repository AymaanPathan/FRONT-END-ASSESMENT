import { useEffect, useState } from "react";
import { extractVariables, calculateDynamicDimensions } from "./utils";

export const useUniversalNodeState = ({ data, nodeConfig }) => {
  const [nodeFieldValues, setNodeFieldValues] = useState(() => {
    const initial = {};
    nodeConfig.fields?.forEach(
      (f) => (initial[f.name] = data?.[f.name] || f.defaultValue || "")
    );
    return initial;
  });

  const [dynamicDimensions, setDynamicDimensions] = useState({
    width: nodeConfig.width || 200,
    height: nodeConfig.height || 200,
  });

  const [dynamicHandles, setDynamicHandles] = useState([]);

  useEffect(() => {
    const textField = nodeConfig.fields?.find((f) => f.name === "textContent");
    if (textField && nodeFieldValues.textContent) {
      const vars = extractVariables(nodeFieldValues.textContent);
      const handles = vars.map((v, i) => ({
        id: `var-${v}`,
        type: "target",
        position: "left",
        color: "#10b981",
        topOffset: 60 + i * 25,
        label: v,
      }));
      setDynamicHandles(handles);

      const dims = calculateDynamicDimensions(
        nodeFieldValues.textContent,
        textField,
        nodeConfig
      );
      setDynamicDimensions(dims);
    }
  }, [nodeFieldValues.textContent, nodeConfig]);

  const handleFieldValueChange = (name, val) => {
    setNodeFieldValues((prev) => ({ ...prev, [name]: val }));
  };

  return {
    nodeFieldValues,
    dynamicHandles,
    dynamicDimensions,
    handleFieldValueChange,
  };
};
