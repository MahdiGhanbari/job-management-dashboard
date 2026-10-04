'use client'

import { TextareaField } from "@/components/common/TextareaField"
import {  Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { LuClipboardList } from "react-icons/lu"

export default function ReqRes() {
    return (
        <>
            <Card className="w-full select-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <LuClipboardList  size="24" />
                        <span>Requirements & Responsibilities</span>
                    </CardTitle>
                    <CardDescription>
                        Tell us what the candidate need and what they'll be doing.
                    </CardDescription>

                    <CardContent>
                        <Field>
                            <Field orientation="horizontal">
                                <TextareaField label="Requirements" placeholder="Add requirment(one per line)" name="requirements" required/>
                            </Field>
                            <Field orientation="horizontal">
                                <TextareaField label="Responsibilities" placeholder="Add responsibility(one per line)" name="responsibilities" required/>
                            </Field>
                        </Field>
                    </CardContent>
                </CardHeader>
            </Card>
        </>
    )
}