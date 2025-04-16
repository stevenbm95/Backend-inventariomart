import { UserRepository } from "../repositories/userRepository.js";
import { BaseRepository } from "../repositories/baseRepository.js";
import { prisma } from "../config/bd.js";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
    this.roleRepository = new BaseRepository();
  }

  async validateUser(email, password) {
    console.log(email, password);
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    if (user.password !== password) {
      const error = new Error("Invalid password");
      error.status = 401;
      throw error;
    }
    return user;
  }

  async validateRole(roleId) {
    const role = await this.roleRepository.getById(roleId);
    if (!role) {
      const error = new Error("Role not found");
      error.status = 404;
      throw error;
    }
    return role;
  }

  async validateUserRole(userId, roleId) {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    const role = await this.roleRepository.getById(roleId);
    if (!role) {
      const error = new Error("Role not found");
      error.status = 404;
      throw error;
    }
    if (!user.roleId) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    if (user.roleId !== roleId) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
  }

  async createToken(userId) {
    try {
      // const user = await this.userRepository.findById(userId);
      const user = await this.userRepository.getById(userId);
      if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
      }
      const token = await this.generateToken(user);
      return token;
    } catch (error) {
      throw error;
    }
  }

  async generateToken(user) {
    const cuerrentUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        roleId: true,
      },
    });
    const token = jwt.sign(cuerrentUser, process.env.JWT_SECRET);
    return token;
  }


}
