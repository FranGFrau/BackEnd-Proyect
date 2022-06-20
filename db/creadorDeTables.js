const DBSQLite = require("./controladorSQLite");

const mensajesDB = new DBSQLite("mensajes");

const mensaje = {
  mensaje: "Hola",
  usuario: "Juan",
  fecha: "2020-01-01",
};

mensajesDB
  .getAll()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
