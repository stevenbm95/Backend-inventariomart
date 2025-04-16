import { BaseRepository } from "./baseRepository.js";
import { prisma } from "../config/bd.js";

export class UserRepository extends BaseRepository {
  constructor() {
    super("User");
  }

  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user || null;
  }
}

