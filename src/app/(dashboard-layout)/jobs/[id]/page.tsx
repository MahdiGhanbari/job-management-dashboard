import { notFound } from "next/navigation"

export default async function Page({params}: {params: Promise<{id: string}>}) {
    const {id} = await params
    if(+id == 3 ) {
        notFound()
    }
    return <h1>{id}</h1>
}