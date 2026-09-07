export interface ICandidate {
    id: number;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    jobId: number;
    appliedAt: string;
    hiredAt?: string
    stage: "Applied" | "Screening" | "Interview" | "Offered" | "Hired";
  }
  
  export interface ICandidateDetails {
    id: number;
    name: string;
    email: string;
    phone?: string;
    location?: string;
  
    tags?: string[];
    about?: string;
    experience?: string;
    skills: string[];
  
    attachments?: {
      name: string;
      url: string;
      size?: string;
    }[];
  
    jobId: number;
    appliedFor: string;
    appliedAt: string;
  
    stage: "Applied" | "Screening" | "Interview" | "Offered" | "Hired";
  
    interviewRound?: {
      current: number;
      total: number;
    };
  
    expectedSalary?: string;
    notes?: string;
  
    status?: "Active" | "Rejected" | "On Hold";
  
    activity?: {
      date: string;
      action: string;
      by?: string;
    }[];
  }