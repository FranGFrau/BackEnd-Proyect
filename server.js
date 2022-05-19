const express = require("express");
const Contenedor = require("./tpasync");
const { Router } = require("express");
const multer = require("multer");

const app = express();

const router = Router();

const port = 8080;

const contenedor = new Contenedor("productosOP.txt");

const productosRouter = require("./productosRouter.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.static("public"));

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
server.on("error", (err) => {
  console.log(err);
});

app.use("/api/productos", productosRouter);

router.get("/", async (req, res) => {
  const productos = await contenedor.getProductos();
  res.send(productos);
  console.log(req.body.nombre);
});

router.get("/:id", async (req, res) => {
  const producto = await contenedor.getProducto(req.params.id);
  res.send(producto);
});

router.post("/", uploads.single("thumbnail"), async (req, res) => {
  const productoNuevo = req.body;
  const file = req.file;
  productoNuevo.thumbnail = file.filename;
  const id = await contenedor.addProducto(productoNuevo);
  res.send({ productoNuevo, id });
  console.log(`Producto agregado con ID: ${productoNuevo.id}`);
});

router.put("/:id", async (req, res) => {
  const producto = await contenedor.updateProducto(req.params.id, req.body);
  console.log(`Producto con ID: ${req.params.id} actualizado`);
  res.send(producto);
});

router.delete("/:id", async (req, res) => {
  const producto = await contenedor.deleteProducto(req.params.id);
  res.send(producto);
});

app.use("/api/productos", router);
