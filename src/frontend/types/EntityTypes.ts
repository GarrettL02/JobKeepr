import { UUID } from "crypto";

//Entity Types//
//Job Entity Type
export interface Job {
  job_id: UUID;
  jobNumber: number;
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
//YesNo type
export interface YesNo {
  yes: string;
  no: string;
}
