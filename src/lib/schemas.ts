import { z } from "zod";
import { branches, resourceTypes } from "./data";

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const resourceFormSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long."),
    subject: z.string().min(3, "Subject must be at least 3 characters long."),
    desc: z.string().min(10, "Description must be at least 10 characters long."),
    year: z.coerce.number().min(1, "Year is required.").max(4),
    semester: z.coerce.number().min(1, "Semester is required.").max(8),
    branch: z.enum(branches as [string, ...string[]], { errorMap: () => ({ message: "Please select a branch."}) }),
    type: z.enum(resourceTypes as [string, ...string[]], { errorMap: () => ({ message: "Please select a resource type."}) }),
    file_url: z.string().url("Please enter a valid URL for the file."),
});

export type ResourceFormData = z.infer<typeof resourceFormSchema>;
