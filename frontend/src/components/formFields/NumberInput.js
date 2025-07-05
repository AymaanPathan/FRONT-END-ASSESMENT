import { Input } from "../../components/ui/input";
export const NumberInput = ({ config, value, onChange }) => (
  <Input
    type="number"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    min={config.min}
    max={config.max}
    step={config.step}
    placeholder={config.placeholder}
    className="w-full mb-1 bg-background text-foreground border-border"
  />
);
