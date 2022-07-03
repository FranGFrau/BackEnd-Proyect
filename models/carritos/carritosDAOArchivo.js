const ContenedorArchivo = require("./contenedores/contenedorArchivo");

class CarritosDAOArchivo extends ContenedorArchivo {
  constructor() {
    super("../../carritosOP.txt");
  }
}

module.exports = CarritosDAOArchivo;
