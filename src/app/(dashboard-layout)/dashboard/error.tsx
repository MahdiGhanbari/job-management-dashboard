'use client'

import { Button } from "@/components/ui/button"
import { RiResetRightLine } from "react-icons/ri"

export default function error({error, retry}: {error: Error, retry: ()=> void}) {
    return <div className="h-full w-full">
        <h1>somthing went wrong</h1>
        <div>{error.message}</div>

        <Button onClick={retry}>
            <RiResetRightLine />
            Retry
        </Button>
    </div>
}