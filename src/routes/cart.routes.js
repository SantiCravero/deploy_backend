import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import ProductManager from "../controllers/ProductManager.js";

const routerCart = Router()

const cartManager = new CartManager('src/models/cart.json')
const productManager = new ProductManager('src/models/products.json')

routerCart.post('/', async (req,res) => {
    let cart = await cartManager.createCart()
    res.send("Carrito creado con exito " + cart)
})

routerCart.get('/:idCart', async (req,res) => {
    let idCart = parseInt(req.params.idCart)
    let cart = await cartManager.getCartById(idCart)
    res.send(JSON.stringify(cart))
})

routerCart.post('/:idCart/product/:idProduct', async (req, res) => {
    const quantityProd = 1

    const idCart = parseInt(req.params.idCart)
    const idProduct = parseInt(req.params.idProduct)

    const dataProduct = await productManager.getProductById(idProduct)

    if(dataProduct) {
        const data = await cartManager.addProductToCart(idCart, idProduct, quantityProd)
        res.send(`Producto ${dataProduct.id} agregado al carrito.`)
    } else {
        res.send(`El producto ${idProduct} no se ha encontrado`)
    }
})

export default routerCart