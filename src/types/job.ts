export interface IJob {
    id: number;
    title: string;
    department: string;
    location: string;
    jobType: "Full-time" | "Part-time" | "Contract";
    status: "Active" | "Closed" | "Draft";
    postedAt: string;
  }
  
  export interface IJobDetails {
    id: number;
    description: string;
    requirements: string[];
    responsibilities?: string[];
    experience: string;
    salaryRange: string;
    deadline?: string;
    updatedAt?: string;
    createdBy?: string;
    notes?: string;
  
    pipeline: {
      applied: number;
      screening: number;
      interview: number;
      offered: number;
      hired: number;
    };
  
    totalCandidates?: number;
    interviewsScheduled?: number;
    timeToHire?: string;
  }