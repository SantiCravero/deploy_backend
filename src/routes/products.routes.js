import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const productManager = new ProductManager("src/models/products.json");

const routerProduct = Router();

routerProduct.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  let { limit } = req.query;
  if (limit) {
    res.send(products.splice(0, limit));
  } else {
    res.send(products);
  }
});

routerProduct.get("/:id", async (req, res) => {
  const id = await productManager.getProductById(parseInt(req.params.id));
  if (id) {
    res.send(JSON.stringify(id));
  } else {
    res.send("ID no encontrado");
  }
});

routerProduct.post("/", async (req, res) => {
  let mensaje = await productManager.addProduct(req.body);
  res.send("Producto agregado " + mensaje);
});

routerProduct.put("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let mensaje = await productManager.updateProduct(id, req.body);
  res.send("Producto modificado " + mensaje);
});

routerProduct.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let mensaje = await productManager.deleteProduct(id);
  res.send("Producto eliminado " + mensaje);
});

export default routerProduct;
