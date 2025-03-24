import { Request, Response } from "express";
import { Repository, DataSource } from "typeorm";
import { RoutesHandler } from "../utils/error_handler";
import { Password } from "../entities/password.entity";
import { ResponseCodes } from "../utils/response_codes";

export class PasswordController {
  private PasswordRepository: Repository<Password>;

  constructor(private AppDataSource: DataSource) {
    this.PasswordRepository = this.AppDataSource.getRepository(Password);
  }

  public async CreatePassword(req: Request, res: Response): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { password } = req.body;

        if (!password) {
          return RoutesHandler.sendError(
            res,
            req,
            "Password is required.",
            ResponseCodes.badRequest
          );
        }

        const newPassword = new Password();
        newPassword.password = password;

        const savedPassword = await this.PasswordRepository.save(newPassword);

        return RoutesHandler.sendSuccess(
          res,
          req,
          savedPassword,
          "Password added successfully."
        );
      } catch (error) {
        console.error("Password Error:", error);
        return RoutesHandler.sendError(
          res,
          req,
          error.message,
          ResponseCodes.serverError
        );
      }
    });
  }

  public async GetPasswords(req: Request, res: Response): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const findPasswords = await this.PasswordRepository.find({
          order: {
            creadtedAt: "DESC",
          },
        });

        return RoutesHandler.sendSuccess(
          res,
          req,
          findPasswords,
          "Passwords retrieved successfully."
        );
      } catch (error) {
        console.error("Password Error:", error);
        return RoutesHandler.sendError(
          res,
          req,
          error.message,
          ResponseCodes.serverError
        );
      }
    });
  }

  public async GetPassword(req: Request, res: Response): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.params;

        const whereCluster = {
          id,
        };

        const findPassword = await this.PasswordRepository.findOne({
          where: whereCluster,
        });

        if (!findPassword) {
          return RoutesHandler.sendError(
            res,
            req,
            "Password not found.",
            ResponseCodes.notFound
          );
        }

        return RoutesHandler.sendSuccess(
          res,
          req,
          findPassword,
          "Password retrieved successfully."
        );
      } catch (error) {
        console.error("Password Error:", error);
        return RoutesHandler.sendError(
          res,
          req,
          error.message,
          ResponseCodes.serverError
        );
      }
    });
  }

  public async DeletePassword(req: Request, res: Response): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.params;

        const whereCluster = {
          id,
        };

        const findPassword = await this.PasswordRepository.findOne({
          where: whereCluster,
        });

        if (!findPassword) {
          return RoutesHandler.sendError(
            res,
            req,
            "Password not found.",
            ResponseCodes.notFound
          );
        }

        await this.PasswordRepository.delete(findPassword.id);

        return RoutesHandler.sendSuccess(
          res,
          req,
          null,
          "Password deleted successfully."
        );
      } catch (error) {
        console.error("Password Error:", error);
        return RoutesHandler.sendError(
          res,
          req,
          error.message,
          ResponseCodes.serverError
        );
      }
    });
  }

  public async EditPassword(req: Request, res: Response): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { id } = req.params;
        const { password } = req.body;

        const whereCluster = {
          id,
        };

        const findPassword = await this.PasswordRepository.findOne({
          where: whereCluster,
        });

        if (!findPassword) {
          return RoutesHandler.sendError(
            res,
            req,
            "Password not found.",
            ResponseCodes.notFound
          );
        }

        await this.PasswordRepository.update(findPassword.id, {
          password,
        });

        const updatePassword = await this.PasswordRepository.findOne({
          where: whereCluster,
        });

        return RoutesHandler.sendSuccess(
          res,
          req,
          updatePassword,
          "Password updated successfully."
        );
      } catch (error) {
        console.error("Password Error:", error);
        return RoutesHandler.sendError(
          res,
          req,
          error.message,
          ResponseCodes.serverError
        );
      }
    });
  }
}
