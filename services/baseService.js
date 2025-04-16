import { BaseRepository } from "../repositories/baseRepository.js";

export class BaseService { 
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    const data = await new BaseRepository(this.model).getAll();
    return data;
  }

  async getById(id) {
    const data = await new BaseRepository(this.model).getById(id);
    if (!data) {
      const error = new Error(`${this.model} not found for get by id ${id}`);
      error.status = 404;
      throw error;
    }
    return data;
  }

  async create(data) {
    const created = await new BaseRepository(this.model).create(data);
    return created;
  }

  async update(id, data) {
    const updated = await new BaseRepository(this.model).update(id, data);
    if (!updated) {
      const error = new Error(`${this.model} not found for update`);
      error.status = 404;
      throw error;
    }
    return updated;
  }

  async deleteById(id) {
    const deleted = await new BaseRepository(this.model).deleteById(id);
    return deleted;
  }
}