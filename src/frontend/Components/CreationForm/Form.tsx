import React, { useState } from "react";
import { FileField, FormConfig, FormField } from "../../types/EntityTypes";
import { InfoCard } from "../Information/InfoCard";
import { FormSection } from "./FormSection";

interface FormProps {
  formConfig: FormConfig;
  onChange: (updated: FormConfig) => void;
  onSubmit: () => void;
}

export default function Form({ formConfig, onChange, onSubmit }: FormProps) {
  //
  // ---- MAIN CHANGE HANDLERS ----
  //

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
          <div key={key} className="field">
            <label>{field.label}</label>
            <input
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
          </div>
        );

      case "textarea":
        return (
          <div key={key} className="field">
            <label>{field.label}</label>
            <textarea
              value={field.value}
              required={field.required}
              onChange={(e) =>
                updateField(section, key, e.target.value, itemIndex)
              }
            />
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
            <label>{field.label}</label>
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
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {/* JOB FIELDS */}
      <FormSection>
        <div>
          <h2>Job Info</h2>
          {Object.entries(formConfig.job).map(([key, field]) =>
            renderField(key, field, "job")
          )}
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

      <button type="submit">Submit</button>
    </form>
  );
}
