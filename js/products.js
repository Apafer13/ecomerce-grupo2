const URL_Autos = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const buscador = document.getElementById("filtrado")
let productos = [];
let container = document.getElementById("cat-list-container");

function dataConverter(data) {
    return data.products;
}

function addItem(container, item) {
    container.innerHTML += `<div class="list-group-item list-group-item-action cursor-active">
    <div class="row">
        <div class="col-3">
            <img src="${item.image}" class="img-thumbnail">
        </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">${item.name}</h4>
            <small class="text-muted">${item.soldCount} vendidos</small>
        </div>
        <p class="mb-1">${item.description}</p>
        </div>
    </div>
 </div>`
}

function showData(filteredProducts) {
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar los nuevos resultados
    for (const item of filteredProducts) {
        addItem(container, item);
    }}

    fetch(URL_Autos)
    .then(response => response.json())
    .then(data => {
        productos = dataConverter(data); // Aquí asignas los productos obtenidos del JSON
        showData(productos); // Mostrar todos los productos al principio
    });

buscador.addEventListener('input', function() {
    showData(productos.filter(producto => producto.name.toLowerCase().includes(buscador.value.toLowerCase())));
})


/*     29 30 if(data.catID == idCategoria) {
        productos = data.products; */

/* function showData(data) {
    let auto = document.getElementById("cat-list-container");
    let htmlContentToAppend = "";
    let idCategoria=localStorage.getItem("catID")

   

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${item.image}" class="img-thumbnail">
                </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${item.name}</h4>
                    <small class="text-muted">${item.soldCount} vendidos</small>
                </div>
                <p class="mb-1">${item.description}</p>
                </div>
            </div>
         </div>`
        auto.innerHTML = htmlContentToAppend;
    }
}
} */