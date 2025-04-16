
import { AuthService } from "../services/authService.js";
import { UserService } from "../services/userService.js";
// import { RoleService } from "../services/roleService.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
    // this.roleService = new RoleService();
  }

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.validateUser(email, password);
      const token = await this.authService.createToken(user.id);
      return res.status(201).json({ message: "login success", token, user });
    } catch (error) {
      next(error);
    }
  }


  register = async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
      const user = await this.userService.createUser({
        name,
        email,
        password,
        role,
      });
      const token = await this.authService.createToken(user.id);
      return res.status(201).json({ message: "register success", token });
    } catch (error) {
      next(error);
    }
  }

 

}