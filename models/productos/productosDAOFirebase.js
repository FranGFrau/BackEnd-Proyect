const ContenedorFirebase = require("../../contenedores/contenedorFirebase");

class ProductosDAOFirebase extends ContenedorFirebase {
  constructor() {
    super("Productos");
  }
}

module.exports = ProductosDAOFirebase;
