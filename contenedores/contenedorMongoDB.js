const db = require("./interactDB");

class ContenedorMongoDB {
  constructor(schema, name) {
    this.schema = schema;
    this.name = name;
  }

  async create(data) {
    const model = db.model(this.schema, this.name);
    const newData = new model(data);
    return await newData.save();
  }

  async update(id, data) {
    const model = db.model(this.schema, this.name);
    return await model.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    const model = db.model(this.schema, this.name);
    return await model.findByIdAndDelete(id);
  }

  async get(id) {
    const model = db.model(this.schema, this.name);
    return await model.findById(id);
  }

  async getAll() {
    const model = db.model(this.schema, this.name);
    return await model.find();
  }
}

export default ContenedorMongoDB;
