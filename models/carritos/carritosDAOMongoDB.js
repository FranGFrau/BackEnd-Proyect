const contenedorMongo = require("../../contenedores/contenedorMongoDB");

class CarritosDAOSMongoDB extends contenedorMongo {
  constructor() {
    super("carritos", {
      timestamp: { type: String, required: true },
      productos: { type: Array, required: true },
    });
  }
}

module.exports = CarritosDAOSMongoDB;
