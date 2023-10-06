console.log("probando web socket");
const socketClient = io();

const form = document.getElementById("form");
const listaProductosUl = document.getElementById("listaProducto");

const tituloProducto = document.getElementById("tittle");
const DescProducto = document.getElementById("desc");
const precioProducto = document.getElementById("price");
const linkProducto = document.getElementById("thumbnail");
const stockProducto = document.getElementById("stock");
const codigoProducto = document.getElementById("code");
const categoriaProducto = document.getElementById("category");
const parrafoP = document.getElementById("titleP");
// let productId = 1;
// const listaProducto = [];
form.onsubmit = (e) => {
  e.preventDefault();
  const producto = {
    // id: productId++,
    tituloProducto: tituloProducto.value,
    DescProducto: DescProducto.value,
    precioProducto: precioProducto.value,
    linkProducto: linkProducto.value,
    stockProducto: stockProducto.value,
    codigoProducto: codigoProducto.value,
    categoriaProducto: categoriaProducto.value,
  };
  //   listaProducto.push(producto);

  socketClient.emit("titleP", producto);
  console.log(producto);
  socketClient.on("listaProducto", (producto) => {
    producto.innerText = parrafoP;
  });
};

// socketClient.on("listaProducto", (producto) => {
//   const li = document.createElement("li");
//   li.innerHTML = `
//   <strong>Id:</strong> ${producto.id}<br>
//     <strong>Titulo:</strong> ${producto.tituloProducto}<br>
//     <strong>Descripcion:</strong> ${producto.DescProducto}<br>
//     <strong>Precio:</strong> ${producto.precioProducto}<br>
//     <strong>Link:</strong> ${producto.linkProducto}<br>
//     <strong>Stock:</strong> ${producto.stockProducto}<br>
//     <strong>Codigo:</strong> ${producto.codigoProducto}<br>
//     <strong>Categoria:</strong> ${producto.categoriaProducto}<br

//   `;

//   // Agrega el nuevo elemento li al elemento ul
//   listaProductosUl.appendChild(li);
// });

// socketClient.on("welcome", (mensaje) => {
//   alert(mensaje);
// });
