import { ICandidate } from "@/types/candidate"
import { getCandidates } from "./candidates"
import { getInterviews } from "./interviews"
import { getJobs } from "./jobs"
import { IDashboard } from "@/types/dashboard"


function getChanges(array: any[], field: string): number {
    const today = '2026-08-17'
    const yesterday = '2026-08-16'
    const todayCount = array.filter(item => item[field] === today).length;
    const yesterdayCount = array.filter(item => item[field] === yesterday).length;
    return todayCount - yesterdayCount;
  }
  

function calculateTimeToHire(candidates: ICandidate[]): number {
    const hired = candidates.filter(c => c.stage === "Hired" && c.hiredAt);
    if (hired.length === 0) return 0;
  
    const totalDays = hired.reduce((sum, c) => {
      const applied = new Date(c.appliedAt).getTime();
      const hiredDate = new Date(c.hiredAt!).getTime();
      const diffDays = (hiredDate - applied) / (1000 * 60 * 60 * 24);
      return sum + diffDays;
    }, 0);
  
    return Math.round(totalDays / hired.length);
  }
  

export async function getDashboard():Promise<IDashboard> {
    try {
        const [jobsList, candidatesList, interviewsList] = await Promise.all([
            getJobs(),
            getCandidates(),
            getInterviews()
        ])

        
        return {
            candidates: {
                value: candidatesList.length,
                changes: getChanges(candidatesList, 'appliedAt')
            },
            jobs: {
                value: jobsList.length,
                changes: getChanges(jobsList, 'postedAt')
            },
            interviews: {
                value: interviewsList.length
            },
            timeToHire: {
                value: calculateTimeToHire(candidatesList),
                changes: 2 // todo: create the sepecific Changes function
            }
        }

    } catch(err) {
        throw new Error("failed to calculate the dashboard")
    }
    
}