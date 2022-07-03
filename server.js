const express = require("express");
const DB = require("./db/controladorDB");
const DBSQLite = require("./db/controladorSQLite");
const { Router } = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { options } = require("./db/mysql");
const { optionsSQLite } = require("./db/mysqlite");
const knex = require("knex")(options);
const knexSQLite = require("knex")(optionsSQLite);

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const routerProductos = Router();

const port = 8080;

const mensajesDB = new DBSQLite("mensajes");
const productosDB = new DB("productos");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.static(__dirname + "/public"));
app.use("/api/productos", routerProductos);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
server.on("error", (err) => {
  console.log(err);
});

let administrador = true;

app.get("/chat", (req, res) => {
  mensajesDB
    .getAll()
    .then((result) => {
      res.render("chat", { logs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// routerProductos

routerProductos.get("/:id?", async (req, res) => {
  const id = req.params.id;
  if (id) {
    await productosDB
      .get(id)
      .then((producto) => {
        res.json(producto);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      })
      .finally(() => {
        knex.destroy();
      });
  } else {
    await productosDB
      .getAll()
      .then((productos) => {
        res.json(productos);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      })
      .finally(() => {
        knex.destroy();
      });
  }
});

routerProductos.post("/", uploads.single("imagen"), async (req, res) => {
  if (administrador == true) {
    const productoNuevo = req.body;
    await productosDB
      .create(productoNuevo)
      .then((result) => {
        res.send({ result });
        console.log(`Producto agregado`);
      })
      .catch((err) => {
        res.send({ err });
      })
      .finally(() => {
        knex.destroy();
      });
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
    await productosDB
      .update(id, producto)
      .then((result) => {
        res.send({ result });
        console.log(`Producto actualizado`);
      })
      .catch((err) => {
        res.send({ err });
      })
      .finally(() => {
        knex.destroy();
      });
  } else {
    res.send(
      "{ error : -1, descripcion: ruta '/api/productos/id' método 'PUT' no autorizada }"
    );
  }
});

routerProductos.delete("/:id", async (req, res) => {
  if (administrador == true) {
    const id = req.params.id;
    await productosDB
      .delete(id)
      .then(() => {
        res.send(`Producto ${id} eliminado`);
      })
      .catch((err) => {
        res.send({ err });
      })
      .finally(() => {
        knex.destroy();
      });
  } else {
    res.send(
      "{ error : -1, descripcion: ruta '/api/productos/id' método 'DELETE' no autorizada }"
    );
  }
});

// Chat

let users = [];
const messages = [];

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("joinChat", () => {
    users.push({
      username: socket.id,
    });

    socket.emit("notification", `Bienvenido ${username}`);
    socket.broadcast.emit("notification", `${username} se ha unido al chat`);
    io.sockets.emit("users", users);
  });

  socket.on("messageInput", (data) => {
    const now = new Date();
    const user = users.find((user) => user.id === socket.id);
    const message = {
      mensaje: data,
      fecha: `${now.getHours()}:${now.getMinutes()}`,
      usuario: user,
    };
    messages.push(message);

    socket.emit("myMessage", message);

    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", (reason) => {
    const user = users.find((user) => user.id === socket.id);
    users = users.filter((user) => user.id !== socket.id);
    if (user) {
      socket.broadcast.emit(
        "notification",
        `${user.username} se ha ido del chat`
      );
    }

    io.sockets.emit("users", users);
  });
});
