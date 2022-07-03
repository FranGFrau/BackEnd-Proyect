const { Schema } = require("mongoose");

const carritoSchema = new Schema({
  fecha: { type: String, required: true },
  usuario: { type: String, required: true },
  carrito: { type: Array, required: true },
});

class CarritosDAOSMongoDB extends ContenedorMongoDB {
  constructor() {
    super(carritoSchema, "Cart");
  }
}

export default CarritosDAOSMongoDB;
