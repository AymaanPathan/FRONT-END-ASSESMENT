import { useEffect, useRef } from "react";

export const TextareaInput = ({ config, value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={config.placeholder}
      rows={config.rows || 3}
      style={{
        width: "100%",
        marginBottom: "4px",
        resize: "none",
        overflow: "hidden",
        fontSize: "12px",
        lineHeight: "1.4",
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontFamily: "inherit",
      }}
    />
  );
};
