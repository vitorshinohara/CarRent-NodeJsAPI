import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  verifyIfUserExists(email: string): Promise<User>;
  verifyIfUserExistsById(id: string): Promise<User>;
}

export { IUsersRepository };
