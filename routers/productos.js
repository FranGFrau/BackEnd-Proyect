const express = require("express");
const Daos = require("../models/confg");

const router = express.Router();

let productos = Daos.productos;

function darFecha() {
  const fecha = new Date();
  let fechaOK =
    fecha.getDate() +
    "/" +
    (fecha.getMonth() + 1) +
    " - " +
    fecha.getHours() +
    ":" +
    fecha.getMinutes() +
    ":" +
    fecha.getSeconds();
  return fechaOK;
}

router.get("/", (req, res) => {
  (async function getAllPdcts() {
    let aux = await productos.getAll();
    res.send(aux);
  })();
});

router.get("/:id", (req, res) => {
  (async function getById() {
    let ptoId = await productos.getById(req.params.id);
    res.send(ptoId);
  })();
});

router.post("/", (req, res) => {
  let { nombre, precio, stock, descripcion, thumbnail } = req.body;
  let product = {
    timestamp: darFecha(),
    nombre,
    precio,
    stock,
    descripcion,
    thumbnail,
  };

  (async function savePrdct() {
    await productos.create(product);
    res.send(product);
  })();
});

router.put("/:id", (req, res) => {
  let { nombre, precio, stock, descripcion, thumbail } = req.body;
  let product = {
    id: req.params.id,
    timestamp: darFecha(),
    nombre,
    descripcion,
    thumbail,
    precio,
    stock,
  };

  (async function updatePrdct() {
    await productos.update(product.id, product);
    res.send(product);
  })();
});

router.delete("/:id", (req, res) => {
  (async function deletById() {
    await productos.delete(req.params.id);
    res.send(await productos.getAll());
  })();
});

module.exports = router;
