let cart = document.getElementById('infoCart');

document.addEventListener("DOMContentLoaded", () => {
    const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
    getJSONData(url)
        .then(result => {
            if (result.status === "ok") {
                ShowCartData(result.data.articles[0]);
                completarCarro();
                recalcular();
            } else {
                console.error(result.data);
            }
        });
});

function modificar(data) {
    let subtotalProducto = document.getElementById('subtotalProducto');
    let cant = document.getElementById('cantidad');
    let cantidad = parseInt(cant.value);
    let subtotal = parseInt(cantidad * data);
    subtotalProducto.innerHTML = `${subtotal}`;
}

function recalcular() {
    let cantidad = document.getElementsByClassName("cantidad");
    let costo = document.getElementsByClassName("costo");
    let subTotal = document.getElementsByClassName("subtotal");
    let total = 0;

    for (let i = 0; i < cantidad.length; i++) {
        let cantidadValor = parseInt(cantidad[i].value);
        let costoValor = parseFloat(costo[i].textContent);
        let subtotal = cantidadValor * costoValor;
        total += cantidadValor * costoValor;
        subTotal[i].textContent = subtotal;
    }
    subtotalCantidad.innerHTML = total;

    // Obtengo el elemento del botón de confrmación de envío
    const confirmButton = document.getElementById("confirmButton");

    // Escucho el evento 'click' en el botón de confirmación
    confirmButton.addEventListener("click", () => {
        const subtotal = parseFloat(subtotalCantidad.textContent);

        // Obtengo el porcentaje de envío en base al tipo seleccionado
        let envioPorcentaje = 0;
        switch (tipodeEnvio.value) {
            case 'premium':
                envioPorcentaje = 0.15;
                break;
            case 'express':
                envioPorcentaje = 0.07;
                break;
            case 'standard':
                envioPorcentaje = 0.05;
                break;
        }

        // Calculo el costo de envío y el total a pagar
        const envio = subtotal * envioPorcentaje;
        const total = subtotal + envio;

        // Actualizo el elemento HTML con el costo de envío y el total a pagar
        envioCosto.textContent = envio.toFixed(2);
        totalCantidad.textContent = total.toFixed(2);
    });
}

function ShowCartData(data) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `<tr>   
                    <td><img class="img-fluid" src="${data.image}" alt=""></td>
                    <td class="align-middle">${data.name}</td>
                    <td class="align-middle">${data.currency} ${data.unitCost}</td>
                    <td class="align-middle"><input type="number" value="${data.count}" class="w-25 text-center" min="1" id="cantidad" onchange="modificar(${data.unitCost})"></td>
                    <td class="align-middle"><b>${data.currency}&nbsp;</b><b id="subtotalProducto">${data.unitCost}</b></td>
                    </tr>`;
    cart.innerHTML = htmlContentToAppend;
}

function completarCarro() {
    let carrito = JSON.parse(localStorage.getItem("Carrito"));
    let htmlContentToAppend = "";

    for (let producto of carrito) {
        htmlContentToAppend += `<tr>   
        <td><img class="img-fluid" src="${producto.image}" alt=""></td>
        <td class="align-middle">${producto.name}</td>
        <td class="align-middle">${producto.currency} <span class="costo">${producto.unitCost}</span></td>
        <td class="align-middle"><input type="number" value="${producto.count}" class="w-25 text-center cantidad" min="1"  onchange="recalcular()"></td>
        <td class="align-middle"><b>${producto.currency}&nbsp;</b><b> <span class="subtotal">${producto.unitCost}</span></b></td>
        </tr>`;
    }
    cart.innerHTML += htmlContentToAppend;
}

function completarCarro() {
    let carrito = JSON.parse(localStorage.getItem("Carrito"));
    let htmlContentToAppend = "";

    for (let producto of carrito) {
        htmlContentToAppend += `<tr>   
        <td><img class="img-fluid" src="${producto.image}" alt=""></td>
        <td class="align-middle">${producto.name}</td>
        <td class="align-middle">${producto.currency} <span class="costo">${producto.unitCost}</span></td>
        <td class="align-middle"><input type="number" value="${producto.count}" class="w-25 text-center cantidad" min="1"  onchange="recalcular()"></td>
        <td class="align-middle"><b>${producto.currency}&nbsp;</b><b> <span class="subtotal">${producto.unitCost}</span></b></td>
        </tr>`;
    }
    cart.innerHTML += htmlContentToAppend;
}

// Obtengo los elementos del carrito y el tipo de envío seleccionado
const mesaCarrito = document.getElementById('tableCart');
const tipodeEnvio = document.getElementById('shippingType');

// Obtengo los elementos donde muestro los resultados
let subtotalCantidad = document.getElementById('subtotalCantidad');
let envioCosto = document.getElementById('envioCosto');
let totalCantidad = document.getElementById('totalCantidad');

// Escucho el evento 'change' en el tipo de envío para actualizar los valores cuando cambie
tipodeEnvio.addEventListener('change', actualizarTotal);

// Función para calcular y actualizar los valores
function actualizarTotal() {
  let subtotal = 0;

  // Recorremos las filas de la tbla del carrito para calcular el subtotal
  const rows = mesaCarrito.getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) { // Empezamos desde 1 para omitir la fila del encabezado
    const cells = rows[i].getElementsByTagName('td');
    const cantidad = parseInt(cells[3].innerText);
    const costo = parseFloat(cells[2].innerText);
    subtotal += cantidad * costo;
  }

  // Calculo el costo de envío en base al porcentaje seleccionado
  let envioPorcentaje = 0;
  switch (tipodeEnvio.value) {
    case 'premium':
        envioPorcentaje = 0.15;
      break;
    case 'express':
      envioPorcentaje = 0.07;
      break;
    case 'standard':
      envioPorcentaje = 0.05;
      break;
  }
  const envio = subtotal * envioPorcentaje;

  // Calculo el total a pagar
  const total = subtotal + envio;

  // Actualizo los elemetos HTML con los resultados
  subtotalCantidad.textContent = subtotal.toFixed(2);
  envioCosto.textContent = envio.toFixed(2);
  totalCantidad.textContent = total.toFixed(2);
}

// Llamo a la función para mostrar los valores iniciales
actualizarTotal();

// Obtengo el elemento del botón de confirmación de envío
const confirmButton = document.getElementById("confirmButton");

// Escucho el evento 'click' en el botón de confirmación
confirmButton.addEventListener("click", () => {
    const subtotal = parseFloat(subtotalCantidad.textContent);
    const shippingPercentage = parseFloat(envioCosto.textContent);
    const total = subtotal + (subtotal * shippingPercentage);

    // Actualizo el elemento HTML con el total a pagar
    totalCantidad.textContent = total.toFixed(2);
});



