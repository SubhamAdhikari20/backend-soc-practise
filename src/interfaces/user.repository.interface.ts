// src/interfaces/user.repository.interface.ts
import { User, UserDocument } from "../types/user.type.ts";

export interface UserRepositoryInterface {
    createUser(user: User): UserDocument | null;
    updateUser(id: string, user: Partial<User>): UserDocument | null;
    deleteUser(id: string) : void | null;
    findUserById(id: string): UserDocument | null;
    getAllUsers(): UserDocument[] | null;
    findUserByEmail(email: string): UserDocument | null;
    findUserByUsername(username: string): UserDocument | null;
}