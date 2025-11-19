import { BackButton } from "../BackButton/BackButton";
import { Footer } from "../Footer";

export function JobCreationForm() {
  return (
    <>
      <div
        style={{
          paddingTop: "100px",
          backgroundColor: "rgba(14, 12, 12, 0.9)",
          fontFamily: "'Valera Round', sans-serif",
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
        <BackButton buttonText="Return to Incoming Jobs" to="/jobs/incoming" />
      </div>
      <Footer />
    </>
  );
}
