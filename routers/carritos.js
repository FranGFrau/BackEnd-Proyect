const express = require("express");
const Daos = require("../models/confg");

const router = express.Router();

let carros = Daos.carritos;
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

router.post("/", (req, res) => {
  let carrito = {
    timestamp: darFecha(),
    productos: [],
  };
  (async function saveCart() {
    let aux = await carros.create(carrito);
    res.send({ aux });
  })();
});

router.post("/:idCarrito/:id", (req, res) => {
  (async function saveById() {
    let productID = await productos.getById(req.params.id);
    let carrito = await carros.getById(req.params.idCarrito);
    if (carrito) {
      carrito.productos.push(productID);
      carros.update(carrito);
      res.send({ carrito });
    } else {
      res.status(400);
      res.send({ error: "carrito no encontrado" });
    }
  })();
});

router.delete("/:id", (req, res) => {
  (async function deleteById() {
    let carrito = await carros.getById(req.params.id);
    if (carrito) {
      carros.delete(req.params.id);
      res.send({ carrito });
    } else {
      res.status(400);
      res.send({ error: "carrito no encontrado" });
    }
  })();
});

router.delete("/:idCarrito/:id", (req, res) => {
  (async function deletePdctById() {
    let carritoId = await carros.getById(req.params.idCarrito);
    let ptosCarro = carritoId.productos;
    let indexPto = ptosCarro.findIndex((aux) => aux.id == req.params.idPto);
    if (indexPto >= 0) {
      carritoId.productos.splice(indexPto, 1);
      carros.update(carritoId);
      res.send(carritoId);
    } else {
      res.status(400);
      res.send({ error: "Pto con ID solicitado no existe en el carrito" });
    }
  })();
});

router.get("/:id", (req, res) => {
  (async function GetAll() {
    let carrito = await carros.getById(req.params.id);
    if (carrito) {
      ptos = carrito.productos;
      res.send(ptos);
    } else {
      res.status(400);
      res.send({ error: "Carrito con ID solicitado no existe" });
    }
  })();
});

router.get("/", (req, res) => {
  (async function getCarrito() {
    let aux = await carros.getAll();
    res.send(aux);
  })();
});

module.exports = router;
