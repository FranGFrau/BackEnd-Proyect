const ContenedorArchivo = require("./contenedores/contenedorArchivo");

class ProductosDAOArchivo extends ContenedorArchivo {
  constructor() {
    super("../../productosOP.txt");
  }
}

module.exports = ProductosDAOArchivo;
