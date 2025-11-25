// src/dtos/user.dto.ts
import { z } from 'zod';
import { userSchema } from '../types/user.type.ts';

export const CreatedUserDto = userSchema;
// export const CreatedUserDto = userSchema.extend({
//     password: z.string().min(6),
// });

export type CreatedUserDtoType = z.infer<typeof CreatedUserDto>;

export const UpdatedUserDto = userSchema.partial();

export type UpdatedUserDtoType = z.infer<typeof UpdatedUserDto>;


export const UserResponseDto = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    username: z.string(),
    age: z.number(),
    createAt: z.date().optional().nullish(),
    updatedAt: z.date().optional().nullish()
})

export type CommonApiResponseType = {
    success: boolean;
    message: string;
    status?: number | null;
}

export type UserResponseDtoType = CommonApiResponseType & {
    token?: string | null;
    user?: z.infer<typeof UserResponseDto> | null;
}

export type AllUsersResposeDtoType = CommonApiResponseType & {
    users?: z.infer<typeof UserResponseDto>[] | null;
}