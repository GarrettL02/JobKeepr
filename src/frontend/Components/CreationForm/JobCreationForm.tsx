import { useState } from "react";
import { FormConfig } from "../../types/EntityTypes";
import { BackButton } from "../BackButton/BackButton";
import { Footer } from "../Footer";
import Form from "./Form";
import { createJob } from "../../../services/job";
import { useNavigate } from "react-router-dom";

export function JobCreationForm() {
  const navigate = useNavigate();

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
      purchaseOrder: {
        label: "Purchase Order No.",
        type: "textarea",
        value: "",
      },
      difficulty: {
        label: "Difficulty",
        type: "number",
        value: 1,
      },
      priority: {
        label: "Priority",
        type: "number",
        value: 1,
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

        sn: {
          label: "Serial Number",
          type: "text",
          value: "",
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

  const handleSubmit = async () => {
    try {
      const jobDataPayload = transformConfigToPayload(config);
      //see if the job can be created with a api post
      await createJob(jobDataPayload);
      //alert that job creations is successful
      alert("Job Created Successfully");
      //navigate back to the incoming page
      navigate("/jobs/incoming");
    } catch (error) {
      alert("Job Creation Failed");
    }
  };

  const transformConfigToPayload = (config: FormConfig) => {
    return {
      // flatten job fields
      ...Object.fromEntries(
        Object.entries(config.job).map(([key, field]) => [key, field.value])
      ),

      // flatten items
      items: config.items.map((item) =>
        Object.fromEntries(
          Object.entries(item).map(([key, field]) => [key, field.value])
        )
      ),
    };
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
      <Footer
        options={
          <button
            style={{
              cursor: "pointer",
              backgroundColor: "#490404d0",
              color: "white",
              border: "2px solid white",
              borderRadius: "5px",
              height: "40px",
              width: "80px",
              marginTop: "-10px",
            }}
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        }
      />
    </>
  );
}
