import { useState } from "react";
import { FormConfig } from "../../types/EntityTypes";
import { BackButton } from "../BackButton/BackButton";
import { Footer } from "../Footer";
import Form from "./Form";

export function JobCreationForm() {
  const jobFormConfig: FormConfig = {
    job: {
      customerName: {
        label: "Customer Name",
        type: "textarea",
        value: "",
        required: true,
      },
      customerLocation: {
        label: "Customer Location",
        type: "textarea",
        value: "",
        required: true,
      },
      rma: {
        label: "RMA",
        type: "textarea",
        value: "",
      },
      tagNumber: {
        label: "Tag No.",
        type: "textarea",
        value: "",
      },
      description: {
        label: "Description",
        type: "textarea",
        value: "",
      },
    },

    items: [
      {
        name: {
          label: "Item Name",
          type: "text",
          value: "",
          required: true,
        },

        quantity: {
          label: "Quantity",
          type: "number",
          value: 1,
        },

        images: {
          label: "Upload Images",
          type: "file",
          multiple: true,
          value: [],
        },
      },
    ],
  };

  const [config, setConfig] = useState(jobFormConfig);

  const handleSubmit = () => {
    console.log("Final form data:", config);
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
        <Form
          formConfig={config}
          onSubmit={handleSubmit}
          onChange={setConfig}
        />
      </div>
      <Footer />
    </>
  );
}
