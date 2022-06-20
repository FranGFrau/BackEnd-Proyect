const { options } = require("./mysql");
const knex = require("knex")(options);

knex.schema
  .createTable("productos", (table) => {
    table.increments("id").primary();
    table.string("nombre");
    table.integer("precio");
    table.string("descripcion");
    table.string("imagen");
  })
  .then(() => {
    console.log("Tabla productos creada");
    return knex.schema.createTable("mensajes", (table) => {
      table.increments("id").primary();
      table.string("mensaje");
      table.string("usuario");
      table.string("fecha");
    });
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
