import { BaseService } from "../services/baseService.js";

export class InventoryController {
  constructor(service = new BaseService("InventoryChange")) {
    this.inventoryService = service;
  }

  getChanges = async (req, res, next) => {
    try {
      const changes = await this.inventoryService.getAll();
      return res.status(200).json(changes);
    } catch (error) {
      next(error);
    }
  }

  getChangeById = async (req, res, next) => {
    try {
      const change = await this.inventoryService.getById(req.params.id);
      return res.status(200).json(change);
    } catch (error) {
      next(error);
    }
  }

  createChange = async (req, res, next) => {
    try {
      const change = await this.inventoryService.create(req.body);
      return res.status(201).json({ message: "Inventory change created successfully", change });
    } catch (error) {
      next(error);
    }
  }

  updateChange = async (req, res, next) => {
    try {
      const change = await this.inventoryService.update(req.params.id, req.body);
      return res.status(200).json({ message: "Inventory change updated successfully", change });
    } catch (error) {
      next(error);
    }
  }

  deleteChange = async (req, res, next) => {
    try {
      const change = await this.inventoryService.deleteById(req.params.id);
      return res.status(200).json({ message: "Inventory change deleted successfully", change });
    } catch (error) {
      next(error);
    }
  }
}
