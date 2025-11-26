import React, { useState } from "react";
import { FileField, FormConfig, FormField } from "../../types/EntityTypes";
import { InfoCard } from "../Information/InfoCard";
import { FormSection } from "./FormSection";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { useTheme } from "../../Themes/ThemeContextType";

interface FormProps {
  formConfig: FormConfig;
  onChange: (updated: FormConfig) => void;
  onSubmit: () => void;
}

export default function Form({ formConfig, onChange, onSubmit }: FormProps) {
  const { theme } = useTheme();

  const updateField = (
    section: "job" | "items",
    fieldKey: string,
    value: any,
    itemIndex?: number
  ) => {
    const updatedConfig: FormConfig = structuredClone(formConfig);

    if (section === "job") {
      updatedConfig.job[fieldKey].value = value;
    } else if (section === "items" && itemIndex !== undefined) {
      updatedConfig.items[itemIndex][fieldKey].value = value;
    }

    onChange(updatedConfig);
  };

  const updateFileField = (
    section: "job" | "items",
    fieldKey: string,
    files: FileList,
    itemIndex?: number
  ) => {
    const fileArr = Array.from(files);
    const updatedConfig: FormConfig = structuredClone(formConfig);

    if (section === "job") {
      (updatedConfig.job[fieldKey] as FileField).value = fileArr;
    } else if (section === "items" && itemIndex !== undefined) {
      (updatedConfig.items[itemIndex][fieldKey] as FileField).value = fileArr;
    }

    onChange(updatedConfig);
  };

  //
  // ---- FIELD RENDERER ----
  //

  const renderField = (
    key: string,
    field: FormField,
    section: "job" | "items",
    itemIndex?: number
  ) => {
    if (field.hidden) return null;

    switch (field.type) {
      case "text":
      case "number":
      case "date":
        return (
          <div key={key}>
            <FormFieldWrapper label={field.label}>
              <input
                style={{
                  backgroundColor: theme.background2,
                  width: field.label === "Description" ? "85vw" : "300px",
                  height: field.label === "Description" ? "150px" : "35px",
                  borderRadius: "10px",
                  border: "2px solid white",
                  color: "white",
                }}
                type={field.type}
                value={field.value}
                required={field.required}
                onChange={(e) =>
                  updateField(
                    section,
                    key,
                    field.type === "number"
                      ? Number(e.target.value)
                      : e.target.value,
                    itemIndex
                  )
                }
              />
            </FormFieldWrapper>
          </div>
        );

      case "textarea":
        return (
          <div key={key}>
            <FormFieldWrapper label={field.label}>
              {field.label !== "Description" ? (
                <input
                  style={{
                    backgroundColor: theme.background2,
                    width: "300px",
                    height: "35px",
                    borderRadius: "10px",
                    border: "2px solid white",
                    color: "white",
                  }}
                  value={field.value}
                  required={field.required}
                  onChange={(e) =>
                    updateField(section, key, e.target.value, itemIndex)
                  }
                />
              ) : (
                <textarea
                  style={{
                    backgroundColor: theme.background2,
                    width: "85vw",
                    height: "200px",
                    borderRadius: "10px",
                    border: "2px solid white",
                    color: "white",
                    fontSize: "15px",
                    padding: "10px",
                  }}
                  value={field.value}
                  required={field.required}
                  onChange={(e) =>
                    updateField(section, key, e.target.value, itemIndex)
                  }
                />
              )}
            </FormFieldWrapper>
          </div>
        );

      case "checkbox":
        return (
          <div key={key} className="field">
            <label>
              <input
                type="checkbox"
                checked={Boolean(field.value)}
                onChange={(e) =>
                  updateField(section, key, e.target.checked, itemIndex)
                }
              />
              {field.label}
            </label>
          </div>
        );

      case "select":
        return (
          <div key={key} className="field">
            <label>{field.label}</label>
            <select
              value={String(field.value)}
              onChange={(e) =>
                updateField(section, key, e.target.value, itemIndex)
              }
            >
              {/* You can extend the field with .options[] */}
            </select>
          </div>
        );

      case "file":
        return (
          <div key={key} className="field">
            {/* GARRETT - Chaange to Custom Form file wrapper */}
            <FormFieldWrapper label={field.label}>
              <input
                type="file"
                multiple={field.multiple}
                onChange={(e) =>
                  updateFileField(
                    section,
                    key,
                    e.target.files as FileList,
                    itemIndex
                  )
                }
              />
            </FormFieldWrapper>
          </div>
        );

      default:
        return null;
    }
  };

  //
  // ---- RENDER ----
  //

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        overflow: "hidden",
        marginTop: "30px",
        marginBottom: "100px",
      }}
    >
      {/* JOB FIELDS */}
      <FormSection>
        <div>
          <h2>Job Info</h2>
          <div
            style={{
              display: "flex",
              columnGap: "450px",
              flexWrap: "wrap",
              margin: "10px",
            }}
          >
            {Object.entries(formConfig.job).map(([key, field]) =>
              renderField(key, field, "job")
            )}
          </div>
        </div>
      </FormSection>

      {/* ITEM FIELDS */}
      <FormSection>
        {formConfig.items.map((item, index) => (
          <div key={index} className="item-block">
            <h3>Item {index + 1}</h3>
            {Object.entries(item).map(([key, field]) =>
              renderField(key, field, "items", index)
            )}
          </div>
        ))}
      </FormSection>
    </form>
  );
}
