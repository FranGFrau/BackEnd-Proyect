const { Router } = require("express");

const productos = [];

const productosRouter = Router();

productosRouter.get("api/productos", (req, res) => {
  return res.json(productos);
});

productosRouter.post("api/productos", (req, res) => {
  const producto = req.body;

  producto.id = productos.length + 1;
  productos.push(producto);

  return res.status(201).json(producto);
});

module.exports = productosRouter;
