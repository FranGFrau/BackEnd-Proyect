const express = require("express");
const Contenedor = require("./tpasync");

const app = express();

const port = 8080;

const contenedor = new Contenedor("productosOP.txt");

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
server.on("error", (err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("este es el inicio");
});
app.get("/productos", (req, res) => {
  contenedor
    .getAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/productoRandom", (req, res) => {
  contenedor
    .read()
    .then((data) => {
      let datos = JSON.parse(data);
      let random = Math.floor(Math.random() * datos.length);
      res.send(datos[random]);
    })
    .catch((err) => {
      res.send(err);
    });
});
