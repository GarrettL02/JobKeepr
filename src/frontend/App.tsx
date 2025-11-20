import { Header } from "./Components/Header";
import { SideBar } from "./Components/SideBar/SideBar";
import { JobDetailsPage } from "./Components/Jobs/JobDetailsPage";
import { HomePageJob } from "./JobKeepr/HomePageJob";
import { HomePagePart } from "./PartsKeepr/HomePagePart";
import { JobCreationForm } from "./Components/Jobs/JobCreationForm";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@fontsource/varela-round";

export function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  return (
    <div style={{ display: "flex" }}>
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
              <Route
                path="/jobs/:status/:jobNumber"
                element={<JobDetailsPage />}
              />
              <Route
                path="/jobs/:status/create"
                element={<JobCreationForm />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
