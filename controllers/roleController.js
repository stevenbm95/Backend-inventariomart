import { BaseService } from "../services/baseService.js";


export class RoleController {

  constructor( service = new BaseService("Role")){
    this.rolsService = service;
  }

 getRols = async (req, res, next) => {
    try {
      const rols = await this.rolsService.getAll();
      return res.status(201).json(rols);
    } catch (error) {
      next(error);
    }
  }

 getRolById = async (req, res, next) => {
    try {
      const rol = await this.rolsService.getById(req.params.id);
      return res.status(201).json(rol);
    } catch (error) {
      next(error);
    }
  }

 createRol = async (req, res, next) => {
    try {
      const rol = await this.rolsService.create(req.body);
      return res.status(201).json({ message: "role created successfully", rol });
    } catch (error) {
      next(error);
    }
  }

 updateRol = async (req, res, next) => {
    try {
      const rol = await this.rolsService.update(req.params.id, req.body);
      return res.status(201).json({ message: "role updated successfully", rol });
    } catch (error) {
     next(error);
    }
  }

 deleteRol = async (req, res, next) => {
    try {
      const rol = await this.rolsService.deleteById(req.params.id);
      return res.status(201).json({ message: "role deleted successfully", rol });
    } catch (error) {
      next(error)
    }
  }
}
