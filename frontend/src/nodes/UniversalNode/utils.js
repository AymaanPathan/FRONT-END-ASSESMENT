export const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = new Set();
  let match;
  while ((match = regex.exec(text))) {
    vars.add(match[1]);
  }
  return Array.from(vars);
};

export const calculateDynamicDimensions = (text, fieldConfig, nodeConfig) => {
  if (!text || fieldConfig.type !== "textarea") {
    return {
      width: nodeConfig.width || 200,
      height: nodeConfig.height || "auto",
    };
  }

  const temp = document.createElement("textarea");
  temp.style.position = "absolute";
  temp.style.visibility = "hidden";
  temp.style.fontSize = "12px";
  temp.style.padding = "1px";
  temp.style.border = "1px solid #ccc";
  temp.style.whiteSpace = "pre-wrap";
  temp.style.wordWrap = "break-word";
  temp.value = text;
  document.body.appendChild(temp);

  const longestLine = Math.max(...text.split("\n").map((l) => l.length));
  const estimatedWidth = Math.min(Math.max(longestLine * 7 + 40, 220), 400);

  temp.style.width = estimatedWidth + "px";

  const scrollHeight = temp.scrollHeight;
  const lineHeight = 16;
  const lines = Math.max(3, Math.ceil(scrollHeight / lineHeight));
  const height = Math.max(140, lines * lineHeight + 300);

  document.body.removeChild(temp);
  return { width: estimatedWidth, height };
};
