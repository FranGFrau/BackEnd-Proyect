const express = require("express");
const Contenedor = require("./tpasync");
const { Router } = require("express");
const multer = require("multer");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const routerProductos = Router();
const routerCarrito = Router();

const port = 8080;

const contenedor = new Contenedor("productosOP.txt");
const carritos = new Contenedor("carritosOP.txt");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

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
app.use(express.static(__dirname + "/public"));

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
server.on("error", (err) => {
  console.log(err);
});

let administrador = true;

// routerProductos

routerProductos.get("/:id?", async (req, res) => {
  const id = req.params.id;
  if (id) {
    const producto = await contenedor.getProducto(id);
    res.send({ producto });
  } else {
    const productos = await contenedor.getProductos();
    res.send({ productos });
  }
});

routerProductos.post("/", uploads.single("foto"), async (req, res) => {
  if (administrador == true) {
    const productoNuevo = req.body;
    const file = req.file;
    let today = new Date().toLocaleDateString();
    productoNuevo.timestamp = today;
    productoNuevo.foto = file.filename;
    const id = await contenedor.addProducto(productoNuevo);
    res.send({ productoNuevo, id });
    console.log(`Producto agregado con ID: ${productoNuevo.id}`);
  } else {
    res.send(
      "{ error : -1, descripcion: ruta '/api/productos' método 'POST' no autorizada }"
    );
  }
});

routerProductos.put("/:id", async (req, res) => {
  if (administrador == true) {
    const id = req.params.id;
    const producto = req.body;
    await contenedor.updateProducto(id, producto);
  } else {
    res.send(
      "{ error : -1, descripcion: ruta '/api/productos/id' método 'PUT' no autorizada }"
    );
  }
});

routerProductos.delete("/:id", async (req, res) => {
  if (administrador == true) {
    const id = req.params.id;
    await contenedor.deleteProducto(id);
  } else {
    res.send(
      "{ error : -1, descripcion: ruta '/api/productos/id' método 'DELETE' no autorizada }"
    );
  }
});

// routerCarrito

routerCarrito.post("/", async (req, res) => {
  const carrito = await carritos.addCarrito();
  res.json(carrito);
});

routerCarrito.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await carritos.deleteCarrito(id);
});

routerCarrito.get("/:id/productos", async (req, res) => {
  const id = req.params.id;
  const productos = await carritos.getCarrito(id);
  res.json(productos);
});

routerCarrito.post("/:id/productos", async (req, res) => {
  const id = req.params.id;
  const producto = req.body;
  await carritos.addProductoCarrito(id, producto);
});

routerCarrito.delete("/:id/productos/:idProducto", async (req, res) => {
  const id = req.params.id;
  const idProducto = req.params.idProducto;
  await carritos.deleteProductoCarrito(id, idProducto);
});

/* io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("sendForm", async (producto) => {
    await contenedor.addProducto(producto);
    let productos = await contenedor.getProductos();
    io.emit("myProducto", productos);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
 */
app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
