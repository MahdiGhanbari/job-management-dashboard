import { ICandidate } from "@/types/candidate";
const API_URL = process.env.API_URL

export async function getCandidates(): Promise<ICandidate[]> {
    const res = await fetch(`${API_URL}/candidates`)

    if(!res.ok) {
        throw new Error("Failed to fetch Candidates")
    }

    return res.json()
}