import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing Bearer Token.", 401);
  }

  // [0] = Bearer
  // [1] = Token
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "dddad2120deda068bcc993c43693b397"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.verifyIfUserExistsById(sub);

    if (!user) {
      throw new AppError("User dosn't exists", 401);
    }
    next();
  } catch {
    throw new AppError("Invalid token.", 401);
  }
}
