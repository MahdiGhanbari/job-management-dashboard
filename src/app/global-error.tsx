'use client'

import { Button } from "@/components/ui/button"

export default function GlobalError({error, retry}: {error: Error, retry: ()=> void}) {
        return (
            <html>
                <body>
                    <h2>SOMTHING WENT WRONG</h2>
                    <Button onClick={retry}>retruy</Button>
                </body>
            </html>
        )
}
