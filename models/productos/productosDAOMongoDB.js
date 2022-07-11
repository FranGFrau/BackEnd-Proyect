const ContenedorMongoDB = require("../../contenedores/contenedorMongoDB");
class ProductosDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    super("productos", {
      timestamp: { type: String, required: true },
      nombre: { type: String, required: true },
      precio: { type: Number, required: true },
      stock: { type: Number, required: true },
      descripcion: { type: String, required: true },
      thumbnail: { type: String, required: true },
    });
  }
}

module.exports = ProductosDAOMongoDB;
