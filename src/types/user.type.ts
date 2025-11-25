// src.types/user.type.ts
import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    email: z.email(),
    username: z.string(),
    name: z.string(),
    age: z.number()
});

export type User = z.infer<typeof userSchema>;

// Database related type
export type UserDocument = User & {
    // id: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
};