import { useEffect, useState } from "react";
import { SectionNavigation } from "./SectionNavigation";
import {
  useNavigate,
  useLocation,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { JobList } from "../../Components/Jobs/JobList";
import { themeColors } from "../../Themes/themes";
import { useTheme } from "../../Themes/ThemeContextType";

export function HomePageJob() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const mapKeyToLabel = (key: string) => {
    switch (key) {
      case "incoming":
        return "Incoming";
      case "evaluated":
        return "Evaluated";
      case "approved":
        return "Approved";
      case "completed":
        return "Completed";
      default:
        return "Incoming";
    }
  };

  const [activeSection, setActiveSection] = useState(() =>
    mapKeyToLabel(location.pathname.split("/").pop() || "incoming")
  );

  // Redirect /jobs -> /jobs/incoming and keep activeSection in sync with URL
  useEffect(() => {
    const parts = location.pathname.split("/").filter(Boolean); // removes empty segments
    const last = parts[parts.length - 1] || "";
    if (parts.length === 1 && parts[0] === "jobs") {
      navigate("/jobs/incoming", { replace: true });
      setActiveSection("Incoming");
      return;
    }

    setActiveSection(mapKeyToLabel(last));
  }, [location.pathname, navigate]);

  return (
    <div
      style={{
        paddingTop: "100px",
        backgroundColor: theme.background1,
        color: "white",
        width: "97.5%",
        minHeight: "100vh",
        boxSizing: "border-box",
        margin: 0,
        position: "absolute",
        paddingLeft: "10px",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <div
        style={{
          height: "150px",
          width: "100%",
          border: "2px solid black",
          fontFamily: "'Valera Round', sans-serif",
          display: "flex",
          alignItems: "center",
          backgroundImage: "linear-gradient(to bottom, #490404d0, #0e0101ff )",
        }}
      >
        <h1 style={{ padding: "20px", margin: 0 }}>Job Keepr</h1>
      </div>
      <SectionNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="incoming" replace />} />
          <Route path="incoming" element={<JobList status="incoming" />} />
          <Route path="evaluated" element={<JobList status="evaluated" />} />
          <Route path="approved" element={<JobList status="approveds" />} />
          <Route path="completed" element={<JobList status="completed" />} />
        </Routes>
      </div>
    </div>
  );
}
