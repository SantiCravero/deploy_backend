import { promises as fs } from "fs";

class Cart {
  constructor(id) {
    this.id = id;
    this.products = [];
  }
}

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async createCart() {
    try {
      const read = await fs.readFile(this.path, "utf-8");
      const dataCart = JSON.parse(read);

      let idCart = dataCart.length === 0 ? 1 : (dataCart[Number(dataCart.length) - 1].id + 1);
      const newCart = new Cart(idCart);
      dataCart.push(newCart);
      await fs.writeFile(this.path, JSON.stringify(dataCart), "utf-8");
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart (idCart, idProduct, quantityProd) {
   try {
      const read = await fs.readFile(this.path, 'utf-8')
      const dataCart = JSON.parse(read)

      if(dataCart.some((cart => cart.id === parseInt(idCart)))) {
         let cartIndex = dataCart.findIndex(cart => cart.id === parseInt(idCart))
         let productCart = dataCart[cartIndex].products
         let productIndex = productCart.findIndex(product => product.id === idProduct)
         if(productIndex === -1) {
            dataCart[cartIndex].products.push({id: idProduct, quantity: quantityProd})
         } else {
            dataCart[cartIndex].products[productIndex].quantity += quantityProd
         }
         await fs.writeFile(this.path, JSON.stringify(dataCart), 'utf-8')
      } else {
         return "El carrito seleccionado no existe"
      }
   } catch (error) {
      throw error
   }
  }

  async getCartById(id) {
    try { 
      const read = await fs.readFile(this.path, 'utf-8')
      const dataCart = JSON.parse(read)

      const cart = dataCart.find(cart => cart.id === id)
      if(cart) {
        return cart
      } else {
        return "El id del carrito seleccionado no existe"
      }

    } catch (error) {
      throw error
    }
  }
}

export default CartManager;
