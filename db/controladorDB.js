const { options } = require("./mysql");
const knex = require("knex")(options);

class ControladorDB {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async getAll() {
    const result = await knex(this.tableName).select("*");
    return result;
  }

  async getOne(id) {
    const result = await knex(this.tableName).where("id", id).first();
    return result;
  }

  async create(producto) {
    const result = await knex(this.tableName).insert(producto);
    return result;
  }

  async update(id, producto) {
    const result = await knex(this.tableName).where("id", id).update(producto);
    return result;
  }

  async delete(id) {
    const result = await knex(this.tableName).where("id", id).del();
    return result;
  }
}

module.exports = ControladorDB;
