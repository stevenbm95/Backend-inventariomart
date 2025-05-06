import { BaseService } from "../services/baseService.js";

export class DrinkController {
  constructor(service = new BaseService("Drink")) {
    this.drinkService = service;
  }

  getDrinks = async (req, res, next) => {
    try {
      const drinks = await this.drinkService.getAll();
      return res.status(200).json(drinks);
    } catch (error) {
      next(error);
    }
  }

  getDrinkById = async (req, res, next) => {
    try {
      const drink = await this.drinkService.getById(req.params.id);
      return res.status(200).json(drink);
    } catch (error) {
      next(error);
    }
  }

  createDrink = async (req, res, next) => {
    try {
      const drink = await this.drinkService.create(req.body);
      return res.status(201).json({ message: "Drink created successfully", drink });
    } catch (error) {
      next(error);
    }
  }

  updateDrink = async (req, res, next) => {
    try {
      const drink = await this.drinkService.update(req.params.id, req.body);
      return res.status(200).json({ message: "Drink updated successfully", drink });
    } catch (error) {
      next(error);
    }
  }

  deleteDrink = async (req, res, next) => {
    try {
      const drink = await this.drinkService.deleteById(req.params.id);
      return res.status(200).json({ message: "Drink deleted successfully", drink });
    } catch (error) {
      next(error);
    }
  }
}