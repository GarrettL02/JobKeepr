import { themeColors } from "../../Themes/themes";

interface FormSectionProps {
  children: React.ReactNode;
}

export function FormSection({ children }: FormSectionProps) {
  return (
    <div
      style={{
        backgroundColor: themeColors.darkMode.background2,
        border: "1px solid white",
        borderRadius: "4px",
        width: "90%",
        padding: "20px",
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
}
