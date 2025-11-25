import { UUID } from "crypto";

//Entity Types//
//Job Entity Type
export interface Job {
  job_id: UUID;
  jobNumber: number;
  description: string;
  customerName: string;
  customerLocation: string;
  tagNumber?: string;
  rma?: string;
  purchaseOrder: string;
  status: string;
  priority: number;
  difficulty: number;
  assignedTo?: string;
  createdDate: string;
}

// Item Entity Type
export interface Item {
  job_id: number;
  item_id: number;
  title: string;
  sn?: string;
  description?: string;
}

//Other Types//
export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "file"
  | "date"
  | "select"
  | "checkbox"
  | "hidden";

export interface BaseField {
  label: string;
  type: FieldType;
  required?: boolean;
  hidden?: boolean;
}

export interface TextField extends BaseField {
  type: Exclude<FieldType, "file">;
  value: string | number;
}

export interface FileField extends BaseField {
  type: "file";
  multiple?: boolean;
  value: File[]; // always an array for consistency
}

export type FormField = TextField | FileField;

export interface FormConfig {
  job: Record<string, FormField>;
  items: Array<Record<string, FormField>>;
}
