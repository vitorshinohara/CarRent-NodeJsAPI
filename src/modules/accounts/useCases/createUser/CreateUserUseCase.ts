import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const passwordHashed = await hash(password, 8);

    const userExists = this.usersRepository.verifyIfUserExists(email);
    if (userExists) {
      throw new AppError("User already exists.");
    }

    await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
