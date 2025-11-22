import { UUID } from "crypto";

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
  sn?: string;
  description?: string;
}
