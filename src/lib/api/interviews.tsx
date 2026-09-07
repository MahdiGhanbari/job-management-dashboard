import { IInterview } from "@/types/interview"

const API_URL = process.env.API_URL

export async function getInterviews(): Promise<IInterview[]> {
    const res = await fetch(`${API_URL}/interviews`)

    if(!res.ok) {
        throw new Error("Failed to fetch Interviews")
    }

    return res.json()
}