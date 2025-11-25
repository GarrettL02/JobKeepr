import { Header } from "./Components/Header";
import { SideBar } from "./Components/SideBar/SideBar";
import { JobDetailsPage } from "./Components/Jobs/JobDetailsPage";
import { HomePageJob } from "./Pages/JobKeepr/JobKeeprPage";
import { HomePagePart } from "./Pages/PartOrdering/PartOrderingPage";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fontsource/varela-round";
import { SettingsPage } from "./Pages/Settings/SettingsPage";
import { ThemeProvider } from "./Themes/ThemeContextType";
import { JobCreationForm } from "./Components/CreationForm/JobCreationForm";

export function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div style={{ display: "flex" }}>
      <ThemeProvider>
        <BrowserRouter>
          <Header sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
          <div>
            <SideBar isOpen={sideBarOpen} onClose={() => {}} />
            <div
              style={{
                marginLeft: sideBarOpen ? "240px" : "40px",
                transition: "margin-left 0.3s ease",
              }}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/jobs" replace />} />
                <Route path="/jobs/*" element={<HomePageJob />} />
                <Route path="/parts" element={<HomePagePart />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                  path="/jobs/:status/create"
                  element={<JobCreationForm />}
                />
                <Route
                  path="/jobs/:status/:jobNumber"
                  element={<JobDetailsPage />}
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
