import { useEffect, useRef } from "react";
import { Textarea } from "../../components/ui/textarea";

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
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={config.placeholder}
      rows={config.rows || 3}
      className="w-full mb-1 resize-none overflow-hidden bg-background text-foreground border-border text-xs leading-relaxed"
      style={{
        minHeight: config.name === "textContent" ? "60px" : "auto",
        ...config.style,
      }}
    />
  );
};
