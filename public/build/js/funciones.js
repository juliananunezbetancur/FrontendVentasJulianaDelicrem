//const Url = "http://localhost:8081/api/producto";
const Url = "https://bmoduloventasdeli.onrender.com/api/producto"
let id = "";

const Listar = () => {
  let respuesta = "";
  let contenido = document.getElementById("bodyTable");
  fetch(Url, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listarProductos = data.productos;
      datos = listarProductos.map(function (producto) {
        respuesta +=
          `<tr><td>${producto.producto}</td>` +
          `<td>${producto.cantidad}</td>` +
          `<td>${producto.cliente}</td>` +
          `<td>${producto.precio}</td>` +
          `<td><button type="button" id="${producto._id}" onclick="abrirEditar('${producto._id}')" class="btn btn-warning">Editar</button></td>` +
          `<td><button type="button" id="${producto._id}" onclick="Eliminar('${producto._id}')" class="btn btn-danger">Eliminar</button></td>` +
          `</tr>`;
        contenido.innerHTML = respuesta;
      });
    });
};

const Cancelar = () => {
  document.getElementById("Prod").value = "";
  document.getElementById("Cant").value = "";
  document.getElementById("Cli").value = "";
  document.getElementById("Pre").value = "";
};
document.getElementById("cancelar").addEventListener("click", Cancelar);

const Registrar = () => {
  const registrarProducto = {
    producto: document.getElementById("Prod").value,
    cantidad: document.getElementById("Cant").value,
    cliente: document.getElementById("Cli").value,
    precio: document.getElementById("Pre").value,
  };
  fetch(Url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(registrarProducto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then((json) => {
      if (json.msg == "Producto creado.") {
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          text: json.msg,
          timer: 1500,
        });
        document.getElementById("Prod").value = "";
        document.getElementById("Cant").value = "";
        document.getElementById("Cli").value = "";
        document.getElementById("Pre").value = "";
        Listar();
      } else {
        Swal.fire({
          icon: "warning",
          confirmButtonText: "Aceptar",
          text: json.msg,
        });
      }
    });
};
document.getElementById("enviar").addEventListener("click", Registrar);

const abrirEditar = (Id) => {
  const fondo = document.getElementById("contForm");
  if (fondo.style.display == "block") {
    fondo.style.display = "none";
  } else {
    fondo.style.display = "block";
  }

  fetch(Url, {
    method: "GET",
    mode: "cors",
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then(function (data) {
      let listarProductos = data.productos;
      datos = listarProductos.map(function (producto) {
        if (Id === producto._id) {
          id = Id;
          document.getElementById("Prod2").value = producto.producto;
          document.getElementById("Cant2").value = producto.cantidad;
          document.getElementById("Cli2").value = producto.cliente;
          document.getElementById("Pre2").value = producto.precio;
        }
      });
    });
};

const Editar = () => {
  const Prod = document.getElementById("Prod2").value;
  const Cant = document.getElementById("Cant2").value;
  const Cli = document.getElementById("Cli2").value;
  const Pre = document.getElementById("Pre2").value;
  if (Prod == "" && Cant == "" && Cli == "" && Pre == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese los datos primero...",
    });
  } else if (Prod == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese un producto...",
    });
  } else if (Cant == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese una cantidad...",
    });
  } else if (Cli == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese un cliente...",
    });
  } else if (Pre == "") {
    Swal.fire({
      icon: "warning",
      confirmButtonText: "Aceptar",
      text: "Ingrese un precio...",
    });
  } else {
    const editarProducto = {
      _id: id,
      producto: Prod,
      cantidad: Cant,
      cliente: Cli,
      precio: Pre,
    };
    fetch(Url, {
      method: "PUT",
      mode: "cors",
      body: JSON.stringify(editarProducto),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.msg == "Producto modificado exitosamente.") {
          Swal.fire({
            icon: "success",
            showConfirmButton: false,
            text: json.msg,
            timer: 1500,
          });
          document.getElementById("Prod").value = "";
          document.getElementById("Cant").value = "";
          document.getElementById("Cli").value = "";
          document.getElementById("Pre").value = "";
          Listar();
          abrirEditar();
        } else {
          Swal.fire({
            icon: "warning",
            confirmButtonText: "Aceptar",
            text: json.msg,
          });
        }
      });
  }
};
document.getElementById("editar").addEventListener("click", Editar);

const Eliminar = (Id) => {
  const eliminarProducto = {
    _id: Id,
  };
  fetch(Url, {
    method: "DELETE",
    mode: "cors",
    body: JSON.stringify(eliminarProducto),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((resp) => resp.json())
    .then((json) => {
      if (json.msg == "Producto eliminado.") {
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          text: json.msg,
          timer: 1500,
        });
        Listar();
      } else {
        Swal.fire({
          icon: "warning",
          confirmButtonText: "Aceptar",
          text: json.msg,
        });
      }
    });
};
