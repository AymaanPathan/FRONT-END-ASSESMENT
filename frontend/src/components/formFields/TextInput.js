import { Input } from "../../components/ui/input";

export const TextInput = ({ config, value, onChange }) => (
  <Input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={config.placeholder}
    className="w-full mb-1 bg-background text-foreground border-border"
  />
);
