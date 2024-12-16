import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  role: z.enum(["USER", "ADMIN", "SUPER_ADMIN", "EDITOR"]),
});

export const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(2, "Category must be at least 2 characters"),
  subCategory: z.string().optional(),
  published: z.boolean(),
});

export const reportSchema = z.object({
  userId: z.number(),
  questions: z.array(
    z.object({
      question: z.string(),
      answer: z.union([z.string(), z.array(z.string())]),
    }),
  ),
});

export const questionSchema = z.object({
  text: z.string().min(5, "Question text must be at least 5 characters"),
  sequence: z.number().int().positive(),
  questionType: z.enum(["SINGLE_SELECT", "MULTIPLE_SELECT", "TEXT"]),
  required: z.boolean(),
  isActive: z.boolean(),
  options: z
    .array(
      z.object({
        text: z.string().min(1, "Option text must not be empty"),
        sequence: z.number().int().positive(),
      }),
    )
    .optional(),
});

export const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  age: z.number().int().min(18, "You must be at least 18 years old"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  pinCode: z.string().regex(/^\d{6}$/, "Invalid PIN code"),
});

export const signinSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type SigninFormData = z.infer<typeof signinSchema>;
export type UserFormData = z.infer<typeof userSchema>;
export type BlogFormData = z.infer<typeof blogSchema>;
export type ReportFormData = z.infer<typeof reportSchema>;
export type QuestionFormData = z.infer<typeof questionSchema>;
