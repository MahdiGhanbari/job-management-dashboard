import { getJobDetails } from "@/lib/api/jobs"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

type Props = {params: Promise<{id: string}>}

export async function  generateMetadata({params}: Props): Promise<Metadata> {
    const {id} = await params
    const res = await getJobDetails(id)
    if(res) {
        return {
            title: res.id + '',
            description: res.description
        }
    }
    return {}
}

export default async function Page({params}: Props) {
    const {id} = await params
  
        const res = await getJobDetails(id)
        if(!res) {
            notFound()
        }

        return (
            <Suspense fallback={<div>...</div>}>

                <h1>{res.description}</h1>
            </Suspense>
        
        )
   
    
}