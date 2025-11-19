// frontend/src/entities/job.ts
export interface Job {
  job_id: number;
  customerName: string;
  customerLocation: string;
  rma?: string;
  purchaseOrder: string;
  status: string;
  priority: number;
  difficulty: number;
  assignedTo?: string;
  createdDate?: string;
}
