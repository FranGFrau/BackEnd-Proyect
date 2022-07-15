let productosDao;
let carritosDao;
let chatsDao;

let contenedor = "mongodb";
switch (contenedor) {
  case "txt":
    const ProductosDaoArchivo = require("./productos/productosDAOArchivo");
    const CarritosDaoArchivo = require("./carritos/carritosDAOArchivo");

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
    const CarritosDaoMongoDb = require("./carritos/CarritosDAOMongoDB");
    const ChatsDAOMongoDB = require("./chats/ChatsDAOMongoDB");

    chatsDao = new ChatsDAOMongoDB();
    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    break;
}

exports.chats = chatsDao;
exports.carritos = carritosDao;
exports.productos = productosDao;
