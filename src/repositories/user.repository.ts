// src/interfaces/user.repository.ts
import { UserRepositoryInterface } from "../interfaces/user.repository.interface.ts";
import { User, UserDocument } from "../types/user.type.ts";

export class UserRepository implements UserRepositoryInterface {
    private users: UserDocument[] = [
        { id: "user1", username: 'john_doe', email: 'john@example.com', name: 'John Doe', age: 30 },
        { id: "user2", username: 'jane_smith', email: 'jane@example.com', name: 'Jane Smith', age: 25 },
    ];

    createUser = (user: User): UserDocument | null => {
        const newUser: UserDocument = {
            ...user,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.users.push(newUser);
        return newUser;
    };

    updateUser = (id: string, user: Partial<User>): UserDocument | null => {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            return null;
        }

        const updatedUser: UserDocument = {
            ...this.users[index],
            ...user,
            updatedAt: new Date(),
        };

        this.users.push(updatedUser);
        return updatedUser;
    };

    deleteUser = (id: string): void | null => {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            return null;
        }

        this.users.splice(index, 1);
        // this.users = this.users.filter(user => user.id !== id);
        return;
    };

    findUserById = (id: string): UserDocument | null => {
        const user = this.users.find(user => user.id === id) as UserDocument;
        return user;
    }

    getAllUsers = (): UserDocument[] | null => {
        return this.users;
    };

    findUserByEmail = (email: string): UserDocument | null => {
        const user = this.users.find(user => user.email === email) as UserDocument;
        return user;
    };

    findUserByUsername = (username: string): UserDocument | null => {
        const user = this.users.find(user => user.username === username) as UserDocument;
        return user;
    };
}