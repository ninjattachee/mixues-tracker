import { Status } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(20000),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(20000)
    .optional(),
  assigneeId: z
    .string()
    .min(1, "Assignee is required")
    .max(255)
    .optional()
    .nullable(),
  status: z.nativeEnum(Status).optional(),
  archived: z.boolean().optional(),
});
