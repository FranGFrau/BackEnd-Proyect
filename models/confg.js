let productosDao;
let carritosDao;

let contenedor = "mongodb";
switch (contenedor) {
  case "txt":
    const ProductosDaoArchivo = require("./productos/ProductosDAOArchivo");
    const CarritosDaoArchivo = require("./carritos/CarritoDAOArchivo");

    productosDao = new ProductosDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;
  case "firebase":
    const ProductosDaoFirebase = require("./productos/ProductosDAOFirebase");
    const CarritosDaoFirebase = require("./carritos/CarritosDAOFirebase");

    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;
  case "mongodb":
    const ProductosDaoMongoDb = require("./productos/ProductosDAOMongoDb");
    const CarritosDaoMongoDb = require("./carritos/CarritosDAOMongoDb");

    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    break;
}

exports.carritos = carritosDao;
exports.productos = productosDao;
