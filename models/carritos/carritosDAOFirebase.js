const ContenedorFirebase = require("../../contenedores/contenedorFirebase");

class CarritosDAOArchivo extends ContenedorFirebase {
  constructor() {
    super("Carritos");
  }
}

module.exports = CarritosDAOArchivo;
