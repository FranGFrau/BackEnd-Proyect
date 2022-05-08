const fs = require("fs");

class Contenedor {
  constructor(name) {
    this.name = name;
  }

  async read() {
    try {
      let data = await fs.promises.readFile("./" + this.name, "utf-8");
      return data;
    } catch (error) {
      throw Error("Error al leer el archivo");
    }
  }

  async write(datos, msg) {
    try {
      await fs.promises.writeFile(
        "./" + this.name,
        JSON.stringify(datos, null, 2)
      );
      console.log(msg);
    } catch (error) {
      throw Error("Error al escribir en el archivo");
    }
  }

  async save(product) {
    let newId = 1;
    let newProduct = {};

    let data = await this.read();
    let datos = JSON.parse(data);

    if (!data) {
      product.id = newId;
      newProduct = [product];
    } else {
      newProduct = product;
      product.id = datos.length + 1;
    }
    datos.push(newProduct);

    await this.write(datos, "Agregado!");
  }

  async getById(num) {
    let data = await this.read();
    let datos = JSON.parse(data);

    let result = datos.filter((product) => product.id == num);
    return result;
  }

  async getAll() {
    let data = await this.read();
    let datos = JSON.parse(data);

    return datos;
  }

  async deleteById(num) {
    let data = await this.read();
    let datos = JSON.parse(data);

    let product = datos.find((product) => product.id == num);

    if (product) {
      let index = datos.indexOf(product);
      console.log(index);
      datos.splice(index, 1);
      await this.write(datos, `Producto con ID: ${num} eliminado`);
    } else {
      console.log(`Producto con ID: ${num} no existe`);
    }
  }

  async deleteAll() {
    let data = [];
    await this.write(data, "Se eliminaron todos los productos");
  }
}

module.exports = Contenedor;

let contenedor = new Contenedor("productosOP.txt");

async function test() {
  await contenedor.read();
}
test();
