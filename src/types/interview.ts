export interface IInterview {
    id: number;
    candidateId: number;
    jobId: number;
    date: string;
    time: string;
    type: "video" | "onsite";
    status: "Scheduled" | "Completed" | "Cancelled";
    notes?: string;
  }