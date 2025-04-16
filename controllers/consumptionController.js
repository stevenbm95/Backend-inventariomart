import { BaseService } from "../services/baseService.js";

export class ConsumptionController {
  constructor(service = new BaseService("Consumption")) {
    this.consumptionService = service;
  }

  getConsumptions = async (req, res, next) => {
    try {
      const consumptions = await this.consumptionService.getAll();
      return res.status(200).json(consumptions);
    } catch (error) {
      next(error);
    }
  }

  getConsumptionById = async (req, res, next) => {
    try {
      const consumption = await this.consumptionService.getById(req.params.id);
      return res.status(200).json(consumption);
    } catch (error) {
      next(error);
    }
  }

  createConsumption = async (req, res, next) => {
    try {
      const consumption = await this.consumptionService.create(req.body);
      return res.status(201).json({ message: "Consumption created successfully", consumption });
    } catch (error) {
      next(error);
    }
  }

  updateConsumption = async (req, res, next) => {
    try {
      const consumption = await this.consumptionService.update(req.params.id, req.body);
      return res.status(200).json({ message: "Consumption updated successfully", consumption });
    } catch (error) {
      next(error);
    }
  }

  deleteConsumption = async (req, res, next) => {
    try {
      const consumption = await this.consumptionService.deleteById(req.params.id);
      return res.status(200).json({ message: "Consumption deleted successfully", consumption });
    } catch (error) {
      next(error);
    }
  }
}
