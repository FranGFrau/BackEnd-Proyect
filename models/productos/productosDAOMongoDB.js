const { Schema } = require("mongoose");
const ContenedorMongoDB = require("./contenedores/contenedorMongoDB");

const productoSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: false },
});

class ProductosDAOMongoDB extends ContenedorMongoDB {
  constructor() {
    super(productoSchema, "Product");
  }
}

export default ProductosDAOMongoDB;
