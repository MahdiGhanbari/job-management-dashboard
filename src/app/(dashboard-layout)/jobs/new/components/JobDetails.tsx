"use client";

import { JobFormValues } from "@/app/schemas/job.schema";
import { TextareaField } from "@/components/common/TextareaField";
import TextField from "@/components/common/TextField";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { useFormContext } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { FaBriefcase } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";

export default function JobDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<JobFormValues>();
  return (
    <>
      <Card className="w-full select-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaRegRectangleList size="24" />
            <span>Job Details</span>
          </CardTitle>
          <CardDescription>
            Provide a clear description of the role and what you're looking for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <Field orientation="horizontal">
              <TextareaField
                {...register("description")}
                error={errors.description}
                label="Description"
                placeholder="e.g We are looking for a full stack developer with 2+ years of experience in React and Node.js"
                showRequired
              />
            </Field>
            <Field orientation="horizontal">
              <TextField
                {...register("experience", { valueAsNumber: true })}
                error={errors.experience}
                type="number"
                label="Experience"
                placeholder="e.g 2+ years"
                innerLeftIcon={<FaBriefcase />}
                showRequired
              />
              <TextField
                {...register("salary", { valueAsNumber: true })}
                error={errors.salary}
                type="number"
                label="Salary"
                placeholder="e.g $60,000"
                innerLeftIcon={<BiDollar />}
                showRequired
              />
            </Field>
          </Field>
        </CardContent>
      </Card>
    </>
  );
}
