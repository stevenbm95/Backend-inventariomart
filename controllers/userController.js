import { UserService } from "../services/userService.js";

export class UserController {

  constructor(service = new UserService()){
    this.userService = service;
  }

  getUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  getUserById = async (req, res, next) => {
    try {
      const user = await this.userService.getById(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  updateUser = async (req, res, next) => {
    try {
      const user = await this.userService.update(req.params.id, req.body);
      return res.status(201).json({ message: "user updated successfully", user });
    } catch (error) {
      next(error);
    }
  }

  createUser = async (req, res, next) => {
    try {
      const user = await this.userService.createUser(req.body);
      return res.status(201).json({ message: "user created successfully", user });
    } catch (error) {
      next(error);
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const user = await this.userService.deleteById(req.params.id);
      return res.status(201).json({ message: "user deleted successfully", user });
    } catch (error) {
      next(error);
    }
  }
}
