'use client'
import { createJob } from '@/app/actions/job'
import { useActionState } from "react"
import { Field, FieldError } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { FaSpinner } from 'react-icons/fa'
import clsx from 'clsx'
import BaseicInformation from './BasicInformation'
import JobDetails from './JobDetails'
import ReqRes from "./ReqRes";
import { Card, CardContent } from '@/components/ui/card'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useRouter } from 'next/navigation'

interface Props {
    jobTypes: Record<string, string>[],
    departments: Record<string, string>[],
    locations: Record<string, string>[],
}

export default function NewJobForm({ jobTypes, departments, locations }: Props) {
    const router = useRouter()
    const [state, action, pending] = useActionState(createJob, { success: false, message: '' })
    return (
        <form action={action} className='flex flex-col gap-4'>

            <BaseicInformation {...{ jobTypes, locations, departments }} />
            <JobDetails />
            <ReqRes />
            <Card className="w-full select-none">
                <CardContent>
                    <Field orientation={"horizontal"} dir='rtl' className='space-between'>
                        <Button size={"lg"} type="submit" disabled={pending} >
                            {pending ? <FaSpinner className={clsx({ 'animate-spin': pending })} /> : <RiSendPlaneFill />}
                            Create Job
                        </Button>
                        <Button size={"lg"} variant={"outline"} onClick={() => router.back()}> Cancel </Button>
                    </Field>
                    <Field>
                        <FieldError>
                            {state.message}
                        </FieldError>
                    </Field>
                </CardContent>
            </Card>

        </form>
    )
}