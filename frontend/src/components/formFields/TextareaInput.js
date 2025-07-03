export const TextareaInput = ({ config, value, onChange }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={config.placeholder}
    rows={config.rows || 3}
    style={{ width: "100%", marginBottom: "4px", resize: "vertical" }}
  />
);
