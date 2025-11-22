import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Themes/ThemeContextType";

interface SectionNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function SectionNavigation({
  activeSection,
  onSectionChange,
}: SectionNavigationProps) {
  const sections = ["Incoming", "Evaluated", "Approved", "Completed"];
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    navigate(`/jobs/${section.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "15px",
        borderBottom: "2px solid #999999ff",
        fontFamily: "'Valera Round', sans-serif",
        fontWeight: 550,
      }}
    >
      {sections.map((section) => (
        <div
          key={section}
          onClick={() => handleSectionChange(section)}
          style={{
            cursor: "pointer",
            color: activeSection === section ? theme.text : "#999999ff",
            backgroundColor:
              activeSection === section ? theme.background2 : "transparent",
            padding: "10px",
            width: "25%",
            textAlign: "center",
          }}
        >
          {section}
        </div>
      ))}
    </div>
  );
}
