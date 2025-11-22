import { BackButton } from "../BackButton/BackButton";
import { Footer } from "../Footer";

export function JobCreationPage() {
  const JobformConfig = {
    job: {
      title: { label: "Job Title", value: "", type: "text", required: true },
      description: { label: "Job Description", value: "", type: "textarea" },
    },
    items: [
      {
        name: { label: "Item Name", value: "", type: "text", required: true },
        quantity: { label: "Quantity", value: 1, type: "number" },
        images: {
          label: "Upload Images",
          type: "file",
          multiple: true,
          required: false,
        },
      },
    ],
  };

  return (
    <>
      <div
        style={{
          paddingTop: "100px",
          backgroundColor: "#0f0e0eff",
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
