const config = require("./interactDB");
const mongoose = require("mongoose");

const link = () => {
  mongoose.connect(config.mongodb.url);
  mongoose.connection.on("open", () => {
    console.log("Base de datos conectada");
  });
  mongoose.connection.on("error", () => {
    console.log("Error al conectarse en la base de datos");
  });
};
link();

/* const renameField = (record, from, to) => {
  record[to] = record[from];
  delete record[from];
  return record;
}; */
class ContenedorMongoDB {
  constructor(name, schema) {
    this.coleccion = mongoose.model(name, schema);
  }

  async create(data) {
    let documento = await this.coleccion.create(data);
    return documento;
  }

  async update(id, data) {
    let docs = false;
    docs = await this.coleccion.updateOne({ _id: id }, data);
    console.log(`documento con id ${id} actualizado`);
    return docs;
  }

  async delete(id) {
    let docs = await this.coleccion.deleteOne({ _id: id });
    console.log(`documento con id ${id} eliminado`);
    return docs;
  }

  async getById(id) {
    let docs = false;
    docs = await this.coleccion.findOne({ _id: id });
    if (docs) {
      return docs;
    } else {
      return false;
    }
  }

  async getAll() {
    let docs = false;
    docs = await this.coleccion.find({});
    return docs;
  }
}

module.exports = ContenedorMongoDB;
