// src/services/user.service.ts
import jwt from "jsonwebtoken";
import { AllUsersResposeDtoType, CreatedUserDtoType, UserResponseDtoType } from "../dtos/user.dto.ts";
import { UserRepositoryInterface } from "../interfaces/user.repository.interface.ts";

export class UserService {
    private userRepo: UserRepositoryInterface;

    constructor(
        userRepo: UserRepositoryInterface
    ) { 
        this.userRepo = userRepo;
    }

    createUser = (userData: CreatedUserDtoType): UserResponseDtoType | null => {
        const { id, email, username, name, age } = userData;

        if (!id || !username || !email || !name) {
            const response: UserResponseDtoType = {
                success: false,
                message: "Id, username, email, and name are required",
                status: 400
            };
            return response;
        }

        // Checking exsiting user by id
        const existingUserById = this.userRepo.findUserById(id);
        if (existingUserById) {
            const response: UserResponseDtoType = {
                success: false,
                message: "User ID already exists",
                status: 400
            };
            return response;
        }

        
        // Check for existing username
        const existingBuyerByUsername = this.userRepo.findUserByUsername(username);
        if (existingBuyerByUsername) {
            const response: UserResponseDtoType = {
                success: false,
                message: "Username already exists",
                status: 400
            };
            return response;
        }
        
        let newUser;
        
        // Check for existing email
        const existingUserByEmail = this.userRepo.findUserByEmail(email);
        if (existingUserByEmail) {
            const response: UserResponseDtoType = {
                success: false,
                message: "Email already registered",
                status: 400
            };
            return response;
        }
        else {
            // Create new user
            newUser = this.userRepo.createUser({
                id,
                email,
                username,
                name,
                age
            });

            if (!newUser) {
                const response: UserResponseDtoType = {
                    success: false,
                    message: "User with this id not found",
                    status: 404
                }
                return response;
            }
        }

        // JWT Expiry Calculation in seconds for Signup Token
        const secondsInAYear = 365 * 24 * 60 * 60;
        const expiresInSeconds = Number(process.env.JWT_SIGNUP_EXPIRES_IN) * secondsInAYear;

        // Generate Token
        const token = jwt.sign(
            { _id: newUser.id, email: newUser.email, username: newUser.username },
            process.env.JWT_SECRET!,
            { expiresIn: expiresInSeconds }
        );

        const respose: UserResponseDtoType = {
            success: true,
            message: "User registered successfully.",
            status: 201,
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                name: newUser.name,
                age: newUser.age,
                createAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        };
        return respose;
    };

    updateUser = (id: string, userData: CreatedUserDtoType): UserResponseDtoType | null => {
        const updatedUser = this.userRepo.updateUser(id, userData);
        if (!updatedUser) {
            const response: UserResponseDtoType = {
                success: false,
                message: "User with this id not found",
                status: 404
            };
            return response;
        }

        const response: UserResponseDtoType = {
            success: true,
            message: "User details updated successfully.",
            status: 200,
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                name: updatedUser.name,
                age: updatedUser.age,
                createAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
            }
        };
        return response;
    };

    deleteUser = (id: string): UserResponseDtoType | null => {
        const user = this.userRepo.findUserById(id);
        if (!user) {
            const response: UserResponseDtoType = {
                success: false,
                message: "User with this id not found",
                status: 404
            };
            return response;
        }
        this.userRepo.deleteUser(user.id);

        const response: UserResponseDtoType = {
            success: true,
            message: "User has bee deleted successfully.",
            status: 200,
        };
        return response;
    };

    getUserById = (id: string): UserResponseDtoType | null => {
        const user = this.userRepo.findUserById(id);
        if (!user) {
            const response: UserResponseDtoType = {
                success: false,
                message: "User with this id not found",
                status: 404
            };
            return response;
        }

        const response: UserResponseDtoType = {
            success: true,
            message: "User with this id fetched successfully.",
            status: 200,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                name: user.name,
                age: user.age,
                createAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        };
        return response;
    };

    getAllUsers = (): AllUsersResposeDtoType | null => {
        const users = this.userRepo.getAllUsers();
        if (!users) {
            const response: AllUsersResposeDtoType = {
                success: false,
                message: "Users not found.",
                status: 404
            };
            return response;
        }

        const response: AllUsersResposeDtoType = {
            success: true,
            message: "All Users fetched successfully.",
            status: 200,
            users: {
                ...users.map((user) => ({
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    name: user.name,
                    age: user.age,
                    createAt: user.createdAt,
                    updatedAt: user.updatedAt
                }))
            }
        };
        return response;
    };
}