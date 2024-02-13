console.log("probando web socket");
const socketClient = io();

const form = document.getElementById("form");
const listaProductos = document.getElementById("listaProducto");

const formBorrar = document.getElementById("form__delete");
const inputBorrar = document.getElementById("numberDelete");

const tituloProducto = document.getElementById("tittle");
const DescProducto = document.getElementById("desc");
const precioProducto = document.getElementById("price");
const linkProducto = document.getElementById("thumbnail");
const stockProducto = document.getElementById("stock");
const codigoProducto = document.getElementById("code");
const categoriaProducto = document.getElementById("category");
const parrafoP = document.getElementById("titleP");

socketClient.on("products", (products) => {
  productsUpdate(products);
});
socketClient.on("productsUpdated", (productsUpdated) => {
  productsUpdate(productsUpdated);
  form.reset();
});

const productsUpdate = (products) => {
  let productsHtml = "";
  products.forEach((product) => {
    productsHtml += `
  <p>Id:${product.id}</p>
  <p>Producto:${product.title}</p>
  <p>Descripcion:${product.description}</p>
  <p>Precio:${product.price}</p>
  <p>${product.thumbnail}</p>
  <p>Stock:${product.stock}</p>
  <p>Codigo:${product.code}</p>

  `;
  });

  listaProductos.innerHTML = productsHtml;
};
form.onsubmit = (e) => {
  e.preventDefault();
  const producto = {
    title: tituloProducto.value,
    description: DescProducto.value,
    price: precioProducto.value,
    thumbnail: linkProducto.value,
    stock: stockProducto.value,
    code: codigoProducto.value,
  };
  socketClient.emit("addProduct", producto);
};

formBorrar.onsubmit = (e) => {
  e.preventDefault();
  let id;
  id = inputBorrar.value;
  socketClient.emit("id", id);
};

const restaurarviamail = async (paramEmail) => {
  const token = document.getElementById("token").value;
  const email = document.getElementById("email").value;
  const url = `http://localhost:8080/api/session/restaurarviamail`;
  const data = {
    email: email,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(
        "Error al enviar el mail:",
        response.status,
        response.statusText
      );
      return;
    }

    const result = await response.json();
    if (result.success) {
      form.reset();
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
};
