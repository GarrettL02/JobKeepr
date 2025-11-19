import { Header } from "./Components/Header.tsx";
import { SideBar } from "./Components/SideBar/SideBar.tsx";
import { JobDetailsPage } from "./Components/Jobs/JobDetailsPage.tsx";
import { HomePageJob } from "./JobKeepr/HomePageJob.tsx";
import { HomePagePart } from "./PartsKeepr/HomePagePart.tsx";
import { JobCreationForm } from "./Components/Jobs/JobCreationForm.tsx";
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
          <SideBar isOpen={sideBarOpen} />
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
