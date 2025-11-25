// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { CreatedUserDto } from "../dtos/user.dto.ts";
import { UserService } from "../services/user.service.ts";
import { UserRepositoryInterface } from "../interfaces/user.repository.interface.ts";


export class UserController {
    private userRepo: UserRepositoryInterface;
    private userService: UserService;

    constructor(userRepo: UserRepositoryInterface) {
        this.userRepo = userRepo;
        this.userService = new UserService(this.userRepo);
    }

    createUser = (req: Request, res: Response) => {
        try {
            const body = req.body;
            const validatedData = CreatedUserDto.safeParse(body);

            if (!validatedData.success) {
                return res.status(400).json({ success: false, message: validatedData.error });
            }

            const result = this.userService.createUser(validatedData.data);

            return res.status(result?.status ?? 400).json({
                success: result?.success,
                message: result?.message,
                token: result?.token,
                user: result?.user,
            });
        }
        catch (error: any) {
            console.error("Error in user signup:", error);
            return res.status(500).json({
                success: false,
                message: error.message ?? "Internal Server Error"
            });
        }
    };

    updateUser = (req: Request, res: Response) => {
        try {
            const userId = req.params.id;
            const body = req.body;
            const validatedData = CreatedUserDto.safeParse(body);

            if (!validatedData.success) {
                return res.status(400).json({ success: false, message: validatedData.error });
            }

            const result = this.userService.updateUser(userId, validatedData.data);

            return res.status(result?.status ?? 400).json({
                success: result?.success,
                message: result?.message,
                user: result?.user,
            });

        }
        catch (error: any) {
            console.error("Error in updating user with the id: ", error);
            return res.status(500).json({
                success: false,
                message: error.message ?? "Internal Server Error"
            });
        }
    };

    deleteUser = (req: Request, res: Response) => {
        try {
            const userId = req.params.id;

            const result = this.userService.deleteUser(userId);

            return res.status(result?.status ?? 400).json({
                success: result?.success,
                message: result?.message,
            });

        }
        catch (error: any) {
            console.error("Error in deleting user with the id: ", error);
            return res.status(500).json({
                success: false,
                message: error.message ?? "Internal Server Error"
            });
        }
    };

    getUserById = (req: Request, res: Response) => {
        try {
            const userId = req.params.id;

            const result = this.userService.getUserById(userId);

            return res.status(result?.status ?? 400).json({
                success: result?.success,
                message: result?.message,
                user: result?.user,
            });

        }
        catch (error: any) {
            console.error("Error in fetching user by the id: ", error);
            return res.status(500).json({
                success: false,
                message: error.message ?? "Internal Server Error"
            });
        }
    };

    getAllUsers = (req: Request, res: Response) => {
        try {
            const result = this.userService.getAllUsers();

            return res.status(result?.status ?? 400).json({
                success: result?.success,
                message: result?.message,
                users: result?.users,
            });

        }
        catch (error: any) {
            console.error("Error in fetching all users: ", error);
            return res.status(500).json({
                success: false,
                message: error.message ?? "Internal Server Error"
            });
        }
    };
}