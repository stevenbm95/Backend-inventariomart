import { hashPassword } from "../helpers/bcryptHelper.js";
import { BaseService } from "./baseService.js";
import { UserRepository } from "../repositories/userRepository.js";

export class UserService extends BaseService {
  constructor() {
    super("User");
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    const existUser = await this.userRepository.findByEmail(data.email);
    if (existUser) {
      const error = new Error("user already exist");
      error.status = 409;
      throw error;
    }
    const hashedPassword = await hashPassword(data.password);
    const created = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return created;
  }
}
