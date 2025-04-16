import { prisma } from "../config/bd.js";

export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    const data = await prisma[this.model].findMany();
    return data;
  }

  async getById(id) {
    const data = await prisma[this.model].findUnique({
      
      where: {
        id: parseInt(id),
      },
    });
    return data;
  }

  async create(data) {
    const created = await prisma[this.model].create({
      data,
    });
    return created;
  }

  async update(id, data) {
    const updated = await prisma[this.model].update({
      where: {
        id: parseInt(id),
      },
      data,
    });
    return updated;
  }

  async deleteById(id) {
    const deleted = await prisma[this.model].delete({
      where: {
        id: parseInt(id),
      },
    });
    return deleted;
  }
}
