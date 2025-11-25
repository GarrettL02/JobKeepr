import { useTheme } from "../../Themes/ThemeContextType";
import { TextField } from "../../types/EntityTypes";

interface FormInfoSectionProps {
  field: TextField;
  onChange: (e: any) => void;
}

export function FormInfoSection({ field }: FormInfoSectionProps) {
  const { theme } = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <label>{field.label}</label>
      </div>
      <div>
        <input
          type={field.type}
          value={field.value}
          required={field.required}
          style={{
            borderRadius: "5px",
            backgroundColor: theme.listSection,
            border: "1px solid white",
            height: "30px",
          }}
        />
      </div>
    </div>
  );
}
