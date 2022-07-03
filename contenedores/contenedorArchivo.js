const fs = require("fs");

class ContenedorArchivo {
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

  async getProductos() {
    let data = await this.read();
    let datos = JSON.parse(data);

    return datos;
  }
  async getProducto(id) {
    let data = await this.read();
    let datos = JSON.parse(data);

    let result = datos.filter((product) => product.id == id);
    return result;
  }
  async addProducto(product) {
    let data = await this.read();
    let datos = JSON.parse(data);

    product.id = datos.length + 1;
    datos.push(product);

    await this.write(datos, "Agregado!");
  }
  async updateProducto(id, product) {
    let data = await this.read();
    let datos = JSON.parse(data);

    let producto = datos.find((product) => product.id == id);

    if (producto) {
      let index = datos.indexOf(producto);
      datos[index] = product;
      product.id = id;
      await this.write(datos, "Actualizado!");
    } else {
      console.log(`Producto con ID: ${id} no existe`);
    }
  }
  async deleteProducto(id) {
    let data = await this.read();
    let datos = JSON.parse(data);

    let product = datos.find((product) => product.id == id);

    if (product) {
      let index = datos.indexOf(product);
      datos.splice(index, 1);
      await this.write(datos, `Producto con ID: ${id} eliminado`);
    } else {
      console.log(`Producto con ID: ${id} no existe`);
    }
  }

  // Carrito

  async addCarrito() {
    let data = await this.read();
    let datos = JSON.parse(data);
    let timestamp = new Date().toLocaleDateString();

    let carrito = {
      id: datos.length + 1,
      timestamp: timestamp,
      productos: [],
    };
    datos.push(carrito);

    await this.write(datos, "Agregado!");
    return carrito;
  }
  async deleteCarrito(id) {
    let data = await this.read();
    let datos = JSON.parse(data);

    let carrito = datos.find((carrito) => carrito.id == id);

    if (carrito) {
      let index = datos.indexOf(carrito);
      datos.splice(index, 1);
      await this.write(datos, `Carrito con ID: ${id} eliminado`);
    } else {
      console.log(`Carrito con ID: ${id} no existe`);
    }
  }
  async getCarrito(id) {
    let data = await this.read();
    let datos = JSON.parse(data);

    let carrito = datos.find((carrito) => carrito.id == id);

    if (carrito) {
      return carrito;
    } else {
      console.log(`Carrito con ID: ${id} no existe`);
    }
  }
  async addProductoCarrito(id, producto) {
    let data = await this.read();
    let datos = JSON.parse(data);
    let timestamp = new Date().toLocaleDateString();
    producto.timestamp = timestamp;

    let carrito = datos.find((carrito) => carrito.id == id);

    producto.id = carrito.productos.length + 1;

    if (carrito) {
      carrito.productos.push(producto);
      await this.write(datos, "Agregado!");
    } else {
      console.log(`Carrito con ID: ${id} no existe`);
    }
  }
  async deleteProductoCarrito(id, producto) {
    let data = await this.read();
    let datos = JSON.parse(data);

    let carrito = datos.find((carrito) => carrito.id == id);

    if (carrito) {
      let index = carrito.productos.indexOf(producto);
      carrito.productos.splice(index, 1);
      await this.write(datos, "Eliminado!");
    } else {
      console.log(`Carrito con ID: ${id} no existe`);
    }
  }
}

module.exports = ContenedorArchivo;
