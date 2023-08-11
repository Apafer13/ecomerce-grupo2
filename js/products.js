
const URL_Autos = "https://japceibal.github.io/emercado-api/cats_products/101.json";
document.addEventListener("DOMContentLoaded", function() {
    let usuarioCargado = localStorage.getItem("sesion");    
    if (!usuarioCargado) {     
        Swal.fire({
            title: 'No has Iniciado Sesion',
            text: "Es mejor que inicies sesion para continuar",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iniciar sesion',
            cancelButtonText: 'Continuar offline'
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "login.html"; 
            }
          })
    }
});
const auto = document.getElementById("cat-list-container");
function showData(Array){
    let htmlContentToAppend = "";
    for(const item of Array){
        htmlContentToAppend +=`
    <div class="list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${item.image}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${item.name}</h4>
                    <small class="text-muted">${item.soldCount} artículos</small>
                </div>
                <p class="mb-1">${item.description}</p>
         </div>
     </div>`
    auto.innerHTML = htmlContentToAppend;
    }
}

fetch(URL_Autos)
.then (response => response.json())
.then (data => showData(data.products))