export const TextInput = ({ config, value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={config.placeholder}
    style={{ width: "100%", marginBottom: "4px" }}
  />
);
