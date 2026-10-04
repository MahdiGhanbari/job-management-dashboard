import { IQeury } from "./common";

export type JopStatus = "Active" | "Closed" | "Draft"
export interface IJobFilter extends IQeury, Partial<IJob> {}
export interface IJobPipeline {
  applied: number;
  screening: number;
  interview: number;
  offered: number;
  hired: number;
}

export interface IJob {
    id?: string;
    title: string;
    department: string;
    location: string;
    jobType: "Full-time" | "Part-time" | "Contract" | string;
    status: JopStatus
    postedAt: string;
  }
  
  export interface IJobDetails {
    id?: string;
    jobId?: string;
    description: string;
    requirements: string;
    responsibilities: string;
    experience: number;
    salary: number;
    deadline?: string;
    updatedAt?: string;
    createdBy?: string;
    notes?: string;
  
    pipeline: IJobPipeline;
  
    totalCandidates?: number;
    interviewsScheduled?: number;
    timeToHire?: string;
  }