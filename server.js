const express = require("express");
const normalizr = require("normalizr");
const { Server: IOServer } = require("socket.io");
const { Server: HTTPServer } = require("http");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);
const creadorDatos = require("./creadorDatos");
const Daos = require("./models/confg");

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(
  session({
    secret: "qwerty",
    rolling: true,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 600 * 1000,
    },
  })
);

let chatsDAOS = Daos.chats;
let productosDAOS = Daos.productos;

const authorSchema = new normalizr.schema.Entity("author");
const messagesSchema = new normalizr.schema.Entity("messages", {
  author: authorSchema,
});
const chatSchema = new normalizr.schema.Entity("chat", {
  messages: [messagesSchema],
});

app.get("/api/productos-test", (req, res) => {
  const productos = creadorDatos();
  res.type("json").send(JSON.stringify(productos, null, 4));
});

/* const produtosRoute = require("./routers/productos");
app.use("/api/productos", produtosRoute);
const carritoRoute = require("./routers/carritos");
app.use("/api/carritos", carritoRoute); */

app.get("/", (req, res) => {
  const nombre = req.session.nombre;
  res.render("layouts/index", { nombre });
});

app.post("/login", (req, res) => {
  const { nombre } = req.body;
  req.session.nombre = nombre;
  res.json({ success: true });
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err.message);
    }

    res.status(204).end();
  });
});

io.on("connection", async (socket) => {
  const productos = await productosDAOS.getAll();
  console.log(productos);
  const arrayMensajes = await chatsDAOS.getAll();
  console.log(arrayMensajes);
  const mensajes = normalizr.normalize(
    { messages: arrayMensajes, id: "chat" },
    chatSchema
  );

  socket.emit("productos", productos);
  socket.emit("mensajes", mensajes);

  socket.on("productoPost", async (producto) => {
    const productos = await productosDAOS.create(producto);
    io.sockets.emit("productos", productos);
  });

  socket.on("mensajePost", async (mensaje) => {
    const mensajes = await chatsDAOS.create({
      ...mensaje,
      date: new Date(Date.now()).toLocaleString(),
    });
    io.sockets.emit("mensajes", mensajes);
  });
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
server.on("error", (err) => {
  console.log(err);
});
