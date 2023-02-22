import { promises as fs } from "fs";

class Producto {
  constructor(title, description, price, thumbnail, code, status, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.status = status
    this.stock = stock;
  }
}

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(newProduct) {
    try {
      const validProduct = Object.values(newProduct);
      if (validProduct.includes("") || validProduct.includes(null)) {
        console.log("Todos los campos deben estar completos para ingresar");
      } else {
        const read = await fs.readFile(this.path, "utf-8");
        const data = JSON.parse(read);

        const objCode = data.map((product) => product.code);
        const objExist = objCode.includes(newProduct.code);

        if (objExist) {
          console.log("Codigo ingresado ya existe, pruebe con otro codigo");
        } else {
          let id;
          data.length === 0 ? (id = 1) : (id = data[data.length - 1].id + 1);
          data.push({ ...newProduct, id: id });
          await fs.writeFile(this.path, JSON.stringify(data), "utf-8");
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      return JSON.parse(read);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);
      const productId = data.find((producto) => producto.id === id);
      if (productId) {
        return productId;
      } else {
        console.error("Producto no encontrado");
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);

      if (data.some((product) => product.id === parseInt(id))) {
        const newData = data.filter((product) => product.id !== parseInt(id));
        await fs.writeFile(this.path, JSON.stringify(newData), "utf-8");
        return console.log("El producto ha sido eliminado correctamente");
      }
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, { title, description, price, thumbnail, stock, status, code }) {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const data = JSON.parse(read);

      if (data.some((producto) => producto.id === parseInt(id))) {
        let indice = data.findIndex((product) => product.id === parseInt(id));
        data[indice].title = title;
        data[indice].description = description;
        data[indice].price = price;
        data[indice].thumbnail = thumbnail;
        data[indice].stock = stock;
        data[indice].status = status;
        data[indice].code = code;

        await fs.writeFile(this.path, JSON.stringify(data));
      } else {
        console.log("Producto no encontrado");
      }
    } catch (error) {
      throw error;
    }
  }
}

const producto1 = new Producto(
  "DateJust 36",
  "Reloj para hombres",
  70000,
  "https://michaelkors.vercel.app/assets/watches/watch4.webp",
  246,
  true,
  10
);

const producto2 = new Producto(
  "Lady DateJust",
  "Reloj para mujeres",
  40000,
  "https://michaelkors.vercel.app/assets/watches/watch8.webp",
  359,
  true,
  15
);

const producto3 = new Producto(
    "GMT-Master",
    "Reloj de oro",
    70000,
    "https://michaelkors.vercel.app/assets/watches/watch5.webp",
    406,
    true,
    5
  );

  const producto4 = new Producto(
    "Air-King",
    "Reloj para hombres",
    20000,
    "https://michaelkors.vercel.app/assets/watches/watch2.webp",
    111,
    true,
    11
  );

  const producto5 = new Producto(
    "Cellini Moon",
    "Reloj para mujeres",
    10000,
    "https://michaelkors.vercel.app/assets/watches/watch7.webp",
    263,
    true,
    20
  );


// Creo el ProductManager
// const productManager = new ProductManager("src/models/products.json");

// await productManager.addProduct(producto1);
// await productManager.addProduct(producto2);
// await productManager.addProduct(producto3);
// await productManager.addProduct(producto4);
// await productManager.addProduct(producto5);

export default ProductManager;