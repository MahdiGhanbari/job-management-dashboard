import z from "zod";

export const jobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  department: z.string({ error: "Department is required" }),
  location: z.string({ error: "Location is required" }),
  jobType: z.string({ error: "Job type is required" }),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description cannot exceed 200 characters"),
  experience: z
    .number({ error: "Experience is required" })
    .min(1, "Experience must be at least 1 year")
    .max(20, "Experience cannot exceed 20 years"),
  salary: z
    .number({ error: "Salary is required" })
    .min(1, "Salary must be greater than zero")
    .max(1_000_000_000, "Salary exceeds the maximum allowed"),
  requirements: z
    .string()
    .trim()
    .min(10, "At least 10 characters are required")
    .max(100, "Maximum 100 characters allowed"),

  responsibilities: z
    .string()
    .trim()
    .min(10, "At least 10 characters are required")
    .max(100, "Maximum 100 characters allowed"),
});

export type JobFormValues = z.infer<typeof jobSchema>;
