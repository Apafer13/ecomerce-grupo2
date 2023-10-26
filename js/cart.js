let cart = document.getElementById('infoCart');
let tipodeEnvio = document.getElementById('shippingType');
let envioCosto = document.getElementById('envioCosto');
let totalCantidad = document.getElementById('totalCantidad');
let subtotalCantidad = document.getElementById('subtotalCantidad');

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
    let moneda = document.getElementsByClassName("moneda");
    let monedaSubTotal = document.getElementsByClassName ("monedaSubTotal");

    for (let i = 0; i < cantidad.length; i++) {
        if (moneda[i].innerHTML=="UYU") {
            let conversion = parseFloat(costo[i].innerHTML);
            costo[i].innerHTML = (conversion/39).toFixed(2);  
            moneda[i].innerHTML = "USD";
            monedaSubTotal[i].innerHTML = "USD";
        }

        let cantidadValor = parseInt(cantidad[i].value);
        let costoValor = parseFloat(costo[i].textContent);
        let subtotal = (cantidadValor * costoValor).toFixed(2);
        total += cantidadValor * costoValor;
        subTotal[i].textContent = subtotal;
    }
    subtotalCantidad.innerHTML = total.toFixed(2);

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
        let envio = total * envioPorcentaje;
        envioCosto.innerHTML = envio.toFixed(2);
/*         const total = subtotal + envio; */
totalCantidad.innerHTML = (envio + total).toFixed(2);
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
        <td class="align-middle"><span class="moneda">${producto.currency}</span> <span class="costo">${producto.unitCost}</span></td>
        <td class="align-middle"><input type="number" value="${producto.count}" class="w-25 text-center cantidad" min="1"  onchange="recalcular()"></td>
        <td class="align-middle"><b><span class="monedaSubTotal">${producto.currency}</span>&nbsp;</b><b> <span class="subtotal">${producto.unitCost}</span></b></td>
        </tr>`;
    }
    cart.innerHTML += htmlContentToAppend;
}

// Escucho el evento 'change' en el tipo de envío para actualizar los valores cuando cambie
tipodeEnvio.addEventListener('change', recalcular);





