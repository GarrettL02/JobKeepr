import { useTheme } from "../../Themes/ThemeContextType";

interface FormFieldWrapperProps {
  label: string;
  children: React.ReactNode;
  hidden?: boolean;
}

export function FormFieldWrapper({
  label,
  children,
  hidden,
}: FormFieldWrapperProps) {
  const { theme } = useTheme();

  if (hidden) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "50px",
        fontFamily: "'Valera Round', sans-serif",
      }}
    >
      <div style={{ display: "flex" }}>
        {label && (
          <label
            style={{
              fontWeight: 600,
              borderBottom: `6px solid ${theme.background2}`,
              marginLeft: "15px",
              marginBottom: "-4px",
              zIndex: 1000,
            }}
          >
            {label}
          </label>
        )}
      </div>
      {children}
    </div>
  );
}
