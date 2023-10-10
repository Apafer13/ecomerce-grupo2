document.addEventListener("DOMContentLoaded", ()=>{
const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
getJSONData(url)
.then(result => {
    if (result.status === "ok") {
        ShowCartData(result.data.articles[0]);
        
    } else {
        console.error(result.data);
    }
});
})

function modificar(data) {
    let subtotalProducto = document.getElementById('subtotalProducto');
    let cant = document.getElementById('cantidad');
    let cantidad = parseInt(cant.value);
    let subtotal = parseInt(cantidad * data);
    subtotalProducto.innerHTML = `${subtotal}`;
}

function ShowCartData(data){
    let cart = document.getElementById('infoCart')
    let htmlContentToAppend = ""
    htmlContentToAppend+= `
        <table class="table" id="tableCart">
            <thead>
                <tr>
                    <th scope="col" class="col-sm-1"></th>
                    <th scope="col" class="col-sm-1">Nombre</th>
                    <th scope="col" class="col-sm-1">Costo</th>
                    <th scope="col" class="col-sm-1">Cantidad</th>
                    <th scope="col" class="col-sm-1">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img class="img-fluid" src="${data.image}" alt=""></td>
                    <td class="align-middle">${data.name}</td>
                    <td class="align-middle">${data.currency} ${data.unitCost}</td>
                    <td class="align-middle"><input type="number" value="${data.count}" class="w-25 text-center" min="0" id="cantidad" onchange="modificar(${data.unitCost})"></td>
                    <td class="align-middle"><b>${data.currency}&nbsp;</b><b id="subtotalProducto">${data.unitCost}</b></td>
                </tr>
            </tbody>
        </table>`
        cart.innerHTML = htmlContentToAppend
}