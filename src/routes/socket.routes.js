import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const routerSocket = Router()
const productManager = new ProductManager('src/models/products.json')

routerSocket.get('/realTimeProducts', async (req, res) => {   // Podes agregar y eliminar productos
    const products = await productManager.getProducts()

    res.render('realTimeProducts', {
        titulo: "Michael Kors",
        products: products
    })
})

routerSocket.get('/', async (req,res) => {     // Muestra todos los productos
    const products = await productManager.getProducts()

    res.render("home", { 
        titulo: "Michael Kors - Catalogo en tiempo real",
        products: products
    })
})

export default routerSocket