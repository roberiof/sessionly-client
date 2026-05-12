import { z } from "zod"

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

const registerBaseSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      })
    }
  })

export const mentorRegisterSchema = registerBaseSchema.and(
  z.object({
    role: z.literal("MENTOR"),
    niche: z.string().min(2, "Niche must be at least 2 characters"),
    specialties: z.array(z.string()).min(1, "Add at least one specialty"),
    chatPrice: z.number().positive("Chat price must be greater than 0"),
  }),
)

export const clientRegisterSchema = registerBaseSchema.and(
  z.object({
    role: z.literal("CLIENT"),
    interests: z.array(z.string()).min(1, "Add at least one interest"),
  }),
)

export type LoginFormData = z.infer<typeof loginSchema>
export type MentorRegisterFormData = z.infer<typeof mentorRegisterSchema>
export type ClientRegisterFormData = z.infer<typeof clientRegisterSchema>
export type RegisterFormData = MentorRegisterFormData | ClientRegisterFormData
