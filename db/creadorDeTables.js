const DBSQLite = require("./controladorSQLite");
const { optionsSQLite } = require("./mysqlite");
const knexSQLite = require("knex")(optionsSQLite);
const mensajesDB = new DBSQLite("mensajes");

async () => {
  await knexSQLite.schema
    .createTableIfNotExists("mensajes", (table) => {
      table.increments("id").primary();
      table.string("nombre");
      table.string("mensaje");
      table.timestamp("fecha");
    })
    .then(() => {
      console.log("Tabla mensajes creada");
    })
    .catch((err) => {
      console.log(err);
    });
};
