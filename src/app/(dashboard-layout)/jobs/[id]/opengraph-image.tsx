import { getJobDetails } from "@/lib/api/jobs"
import { ImageResponse } from 'next/og'
type Props = { params: Promise<{ id: string }> }
export const size = {
    width: 1200,
    height: 630
}
export const contentType = 'image/png'


export default async function Image({ params }: Props) {
    const { id } = await params
    const res = await getJobDetails(id)

    return new ImageResponse(
        (
            <div>
            <img src="/images/job.jpg"/>
            <div style={{
                fontSize: 128,
                background: 'white'
            }}>
                {res?.description}
            </div>
        </div>
        )
      )
}