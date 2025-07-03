export const NumberInput = ({ config, value, onChange }) => (
  <input
    type="number"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    min={config.min}
    max={config.max}
    step={config.step}
    placeholder={config.placeholder}
    style={{ width: "100%", marginBottom: "4px" }}
  />
);
