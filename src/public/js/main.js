const socket = io();

const formAdd = document.getElementById("addProductForm");
const formDelete = document.getElementById("deleteProductForm");

// Mandar info al servidor

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;

  if(title != "" && description != "" && price != "" && thumbnail != "" && code != "" && stock != "" ) {
    socket.emit("addProduct", {title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock});
    formAdd.reset();
  } else {
    console.log("Completa todos los campos")
  }
});

formDelete.addEventListener("submit", (e) => {
  e.preventDefault();
  const productDelete = document.getElementById("deleteProdId").value;
  socket.emit("deleteProduct", productDelete);
  formDelete.reset()
});

// Recibir info del servidor

socket.on("showProducts", products => {

    const cardProduct = document.getElementById('productsCard')
    cardProduct.innerHTML= ""

    products.forEach(product => {
        cardProduct.innerHTML +=
        `
        <div class="card text-center p-2 g-col-6" style="width: 14rem;">
            <img src="${product.thumbnail}" alt="${product.description}" class="card-img-top">
            <h3 class="text-center ">${product.title}</h3>
            <p class="text-center card-text fs-6">${product.description}</p>
            <p class="card-title fs-5">$ ${product.price}</p>
            <button class="btn btn-danger m-2" id= "botonProduct${product.id}">Elminar Pruducto</button>
        </div>
        `
    })

    products.forEach(product => {
        const botonDelete = document.getElementById(`botonProduct${product.id}`)
        botonDelete.addEventListener('click', () => {
          socket.emit("deleteProduct", product.id)
          console.log(`Producto con ID ${product.id} ha sido eliminado correctamente`)
        })
    })
})