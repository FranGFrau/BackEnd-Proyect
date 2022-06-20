const { optionsSQLite } = require("./mysqlite");
const knex = require("knex")(optionsSQLite);

knex.schema
  .createTable("productos", (table) => {
    table.increments("id").primary();
    table.string("mensaje");
    table.string("usuario");
    table.string("fecha");
  })
  .then(() => {
    console.log("Tabla mensajes creada");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
