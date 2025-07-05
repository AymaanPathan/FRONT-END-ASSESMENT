import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export const SelectInput = ({ config, value, onChange }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-full mb-1 bg-background text-foreground border-border">
      <SelectValue placeholder={config.placeholder} />
    </SelectTrigger>
    <SelectContent className="bg-background border-border">
      {config.options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          className="text-foreground"
        >
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
