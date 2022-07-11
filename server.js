const express = require("express");
const app = express();

const port = 8080;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const produtosRoute = require("./routers/productos");
app.use("/api/productos", produtosRoute);
const carritoRoute = require("./routers/carritos");
app.use("/api/carritos", carritoRoute);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
server.on("error", (err) => {
  console.log(err);
});
