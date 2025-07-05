import { TextInput } from "../../components/formFields/TextInput";
import { TextareaInput } from "../../components/formFields/TextareaInput";
import { SelectInput } from "../../components/formFields/SelectInput";
import { NumberInput } from "../../components/formFields/NumberInput";

export const renderInputControl = (fieldConfig, currentValue, onChange) => {
  switch (fieldConfig.type) {
    case "text":
      return (
        <TextInput
          config={fieldConfig}
          value={currentValue}
          onChange={onChange}
        />
      );
    case "textarea":
      return (
        <TextareaInput
          config={{ ...fieldConfig, style: { resize: "none" } }}
          value={currentValue}
          onChange={onChange}
        />
      );
    case "select":
      return (
        <SelectInput
          config={fieldConfig}
          value={currentValue}
          onChange={onChange}
        />
      );
    case "number":
      return (
        <NumberInput
          config={fieldConfig}
          value={currentValue}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};
